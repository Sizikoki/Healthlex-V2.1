/**
 * subscriptionService.js
 *
 * Merkezi plan değişikliği servisi.
 * Dashboard.jsx ve Pricing.jsx AYNI bu fonksiyonu kullanır — kopyala-yapıştır mantık yok.
 *
 * Desteklenen yönler:
 *   basic  → pro       : Paddle subscriptions.update (prorated_immediately)
 *   pro    → basic     : Paddle subscriptions.update (full_next_billing_period)
 *   any    → lifetime  : Paddle subscriptions.cancel → openPaddleCheckout (Lifetime)
 *   null   → any       : openPaddleCheckout (yeni abonelik)
 */

import { auth } from '@/firebase/config';
import { getPriceIdForPlan, openPaddleCheckout, IS_PAYMENT_ACTIVE } from '@/services/paddle';

// Planlar arasındaki hiyerarşi: yüksek indeks = daha kapsamlı plan
const PLAN_RANK = { basic: 1, pro: 2, lifetime: 3 };

/**
 * Plan değişikliği yapar — yükseltme, düşürme veya Lifetime geçişi.
 *
 * @param {object} options
 * @param {import('firebase/auth').User} options.firebaseUser   - Firebase Auth kullanıcısı (getIdToken için)
 * @param {object}  options.firestoreData   - Firestore kullanıcı belgesi (paddleSubscriptionId için)
 * @param {string}  options.targetPlanKey   - 'basic' | 'pro' | 'lifetime'
 * @param {string}  options.currentPlanKey  - 'basic' | 'pro' | 'lifetime' | null
 * @param {boolean} options.isTr            - Türkçe mi?
 * @returns {Promise<{ success: boolean, requiresCheckout?: boolean, error?: string }>}
 */
export async function changePlan({ firebaseUser, firestoreData, targetPlanKey, currentPlanKey, isTr }) {
  if (!IS_PAYMENT_ACTIVE) {
    return {
      success: false,
      error: isTr ? 'Ödeme sistemi yakında aktif olacak.' : 'Payment system coming soon.'
    };
  }

  if (!firebaseUser) {
    return {
      success: false,
      error: isTr ? 'Lütfen önce giriş yapın.' : 'Please sign in first.'
    };
  }

  const currentRank = PLAN_RANK[currentPlanKey] || 0;
  const targetRank  = PLAN_RANK[targetPlanKey]  || 0;
  const isUpgrade   = targetRank > currentRank;
  const isDowngrade = targetRank < currentRank && targetPlanKey !== 'lifetime';

  // Lifetime geçişi: mevcut aboneliği iptal + yeni Lifetime checkout
  if (targetPlanKey === 'lifetime') {
    return _handleLifetimeTransition({ firebaseUser, firestoreData, isTr });
  }

  // Mevcut abonelik yoksa yeni checkout aç
  const currentSubId = firestoreData?.paddleSubscriptionId;
  if (!currentSubId) {
    return _openCheckout({ firebaseUser, targetPlanKey, isTr });
  }

  // Mevcut abonelik var: subscriptions.update
  const prorationBillingMode = isUpgrade
    ? 'prorated_immediately'
    : 'full_next_billing_period'; // düşürme: dönem sonu geçiş (onaylandı)

  const targetPriceId = getPriceIdForPlan(targetPlanKey);

  let idToken;
  try {
    idToken = await firebaseUser.getIdToken();
  } catch (err) {
    console.error('[subscriptionService] getIdToken failed:', err);
    return {
      success: false,
      error: isTr ? 'Oturum bilgisi alınamadı. Lütfen tekrar giriş yapın.' : 'Could not retrieve session token. Please sign in again.'
    };
  }

  try {
    const response = await fetch('/api/subscription/upgrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        targetPriceId,
        prorationBillingMode,
        action: isUpgrade ? 'upgrade' : 'downgrade'
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true };
    }

    // NO_SUBSCRIPTION: abonelik kaydı yoktu, checkout'a yönlendir
    if (data.error === 'NO_SUBSCRIPTION') {
      return _openCheckout({ firebaseUser, targetPlanKey, isTr });
    }

    // Diğer tüm hatalarda ASLA yeni checkout açma
    console.error('[subscriptionService] API error:', data);
    return {
      success: false,
      error: data.message || (isTr
        ? 'Abonelik güncellenirken bir sorun oluştu. Lütfen tekrar deneyin.'
        : 'An error occurred while updating subscription. Please try again.')
    };
  } catch (err) {
    console.error('[subscriptionService] Network error:', err);
    return {
      success: false,
      error: isTr
        ? 'Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyiniz.'
        : 'Connection error. Please try again later.'
    };
  }
}

/**
 * Lifetime geçişi:
 * 1. /api/subscription/upgrade?action=lifetime → mevcut aboneliği iptal et
 * 2. requiresCheckout = true → Paddle Lifetime checkout aç
 */
async function _handleLifetimeTransition({ firebaseUser, firestoreData, isTr }) {
  let idToken;
  try {
    idToken = await firebaseUser.getIdToken();
  } catch (err) {
    return {
      success: false,
      error: isTr ? 'Oturum bilgisi alınamadı.' : 'Could not retrieve session token.'
    };
  }

  try {
    const response = await fetch('/api/subscription/upgrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ action: 'lifetime', targetPriceId: 'lifetime' })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[subscriptionService] Lifetime cancel failed:', data);
      return {
        success: false,
        error: data.message || (isTr
          ? 'Mevcut abonelik iptal edilemedi.'
          : 'Could not cancel existing subscription.')
      };
    }

    // Abonelik iptal edildi (veya zaten yoktu) — Lifetime checkout'u aç
    if (data.requiresCheckout) {
      return _openCheckout({ firebaseUser, targetPlanKey: 'lifetime', isTr });
    }

    return { success: true };
  } catch (err) {
    console.error('[subscriptionService] Lifetime transition network error:', err);
    return {
      success: false,
      error: isTr ? 'Bağlantı hatası oluştu.' : 'Connection error.'
    };
  }
}

/**
 * Yeni Paddle checkout açar (mevcut abonelik yoksa veya Lifetime geçişi sonrasında).
 */
async function _openCheckout({ firebaseUser, targetPlanKey, isTr }) {
  const planTitles = {
    pro: 'Annual Pro Membership',
    basic: 'Basic Plan (Yearly)',
    lifetime: 'Lifetime Membership'
  };

  try {
    await openPaddleCheckout({
      priceId: getPriceIdForPlan(targetPlanKey),
      customerEmail: firebaseUser?.email || undefined,
      customData: {
        plan: planTitles[targetPlanKey] || targetPlanKey,
        planId: targetPlanKey,
        billingPeriod: targetPlanKey === 'lifetime' ? 'lifetime' : 'yearly',
        userId: firebaseUser?.uid || 'unknown'
      }
    });
    return { success: true, requiresCheckout: true };
  } catch (err) {
    console.error('[subscriptionService] Checkout error:', err);
    return {
      success: false,
      error: isTr ? 'Ödeme ekranı açılamadı.' : 'Could not open payment screen.'
    };
  }
}
