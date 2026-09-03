import { initializePaddle } from '@paddle/paddle-js';
import { toast } from 'sonner';
import { auth } from '@/firebase/config';
import { getUser } from '@/utils/storage';

// Environment variable configurations
const PADDLE_TOKEN = process.env.REACT_APP_PADDLE_CLIENT_TOKEN || 'live_66372dae24be5820f1b9b1ea264';
const PADDLE_ENV = (process.env.REACT_APP_PADDLE_ENV || 'production').toLowerCase().trim();

export const PADDLE_PRICE_BASIC = process.env.REACT_APP_PADDLE_PRICE_BASIC || process.env.REACT_APP_PADDLE_PRICE_ID_BASIC || 'pri_01m1hbbh54214d9yk28739s128';
export const PADDLE_PRICE_PRO = process.env.REACT_APP_PADDLE_PRICE_PRO || process.env.REACT_APP_PADDLE_PRICE_ID_PRO || process.env.REACT_APP_PADDLE_PRICE_ID || 'pri_01m1hbkgmff67g3mght6w6bj2q';
export const PADDLE_DEFAULT_PRICE_ID = PADDLE_PRICE_PRO;

let paddleInstancePromise = null;

/**
 * Initializes and returns the Paddle.js instance.
 * Reuses the singleton instance if already initialized.
 */
export const getPaddle = async () => {
  if (paddleInstancePromise) {
    return paddleInstancePromise;
  }

  paddleInstancePromise = (async () => {
    try {
      if (!PADDLE_TOKEN) {
        console.warn('[Paddle] REACT_APP_PADDLE_CLIENT_TOKEN is not defined in .env.');
      }

      // Initialize Paddle with environment & client token
      const paddle = await initializePaddle({
        environment: (PADDLE_ENV === 'production' || PADDLE_TOKEN.startsWith('live_')) ? 'production' : 'sandbox',
        token: PADDLE_TOKEN,
        eventCallback: (event) => {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[Paddle Event]', event?.name, event);
          }

          // Ödeme Başarılı Bildirimi
          if (event?.name === 'checkout.completed') {
            console.log('[Paddle] Checkout completed successfully!', event.data);
            toast.success('Ödemeniz başarıyla tamamlandı! Tüm içeriklerin kilidi açıldı 🎉', {
              duration: 6000
            });
          }

          // Ödeme Başarısız Bildirimi
          if (event?.name === 'checkout.payment.failed') {
            console.warn('[Paddle] Payment failed:', event.data);
            toast.error('Ödeme işlemi tamamlanamadı. Lütfen kart bilgilerinizi kontrol edip tekrar deneyin.', {
              duration: 6000
            });
          }

          // Genel Hata Bildirimi
          if (event?.name === 'checkout.error') {
            console.error('[Paddle] Checkout error:', event.data);
            toast.error('Ödeme sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
          }

          // Pencere Kapatıldığında
          if (event?.name === 'checkout.closed') {
            console.log('[Paddle] Checkout overlay closed.');
          }
        }
      });

      if (paddle) {
        if (typeof window !== 'undefined') {
          window.Paddle = paddle;
        }
      } else {
        console.error('[Paddle] Failed to initialize Paddle instance.');
      }

      return paddle;
    } catch (error) {
      console.error('[Paddle] Initialization error:', error);
      paddleInstancePromise = null;
      return null;
    }
  })();

  return paddleInstancePromise;
};

/**
 * Fetches localized prices for a list of price IDs using Paddle.PricePreview
 * @param {string[]} priceIds - Array of price IDs (e.g. ['pri_123', 'pri_456'])
 * @returns {Promise<Object>} Map of priceId -> { formattedTotal, currencyCode, lineItem }
 */
export const getPricePreviews = async (priceIds = []) => {
  const validIds = priceIds.filter((id) => Boolean(id && typeof id === 'string'));
  if (validIds.length === 0) return {};

  try {
    const paddle = await getPaddle();
    if (!paddle || typeof paddle.PricePreview !== 'function') {
      return {};
    }

    const response = await paddle.PricePreview({
      items: validIds.map((priceId) => ({
        priceId,
        quantity: 1
      }))
    });

    const priceMap = {};
    const lineItems = response?.data?.details?.lineItems || [];

    lineItems.forEach((item) => {
      const priceId = item?.price?.id;
      if (priceId) {
        priceMap[priceId] = {
          priceId,
          formattedTotal: item.formattedTotals?.total || '',
          formattedUnitTotal: item.formattedUnitTotals?.total || '',
          currencyCode: item.price?.unitPrice?.currencyCode || response?.data?.currencyCode || '',
          rawTotal: item.totals?.total,
          productId: item.product?.id,
          productName: item.product?.name
        };
      }
    });

    return priceMap;
  } catch (error) {
    console.warn('[Paddle] Error fetching price previews:', error);
    return {};
  }
};

/**
 * Opens the Paddle Checkout overlay for the given items and user.
 * Prefills the signed-in customer's email to skip the contact screen.
 * 
 * @param {Object} options
 * @param {string} [options.priceId] - Single price ID to checkout
 * @param {Array} [options.items] - Array of { priceId, quantity }
 * @param {string} [options.customerEmail] - Signed-in user's email address
 * @param {Object} [options.customData] - Additional metadata to associate with transaction
 * @param {string} [options.successUrl] - Optional redirect URL (omitted by default so Paddle keeps success screen in popup)
 * @param {string} [options.displayMode] - 'overlay' or 'inline' (default: 'overlay')
 * @param {string} [options.theme] - 'light' or 'dark' (default: 'light')
 * @param {boolean} [options.allowLogout] - allow user to switch Paddle account (default: false)
 */
export const openPaddleCheckout = async ({
  priceId,
  items,
  customerEmail,
  customData = {},
  successUrl,
  displayMode = 'overlay',
  theme = 'light',
  allowLogout = false
} = {}) => {
  try {
    const paddle = await getPaddle();
    if (!paddle) {
      toast.error('Ödeme sistemi başlatılamadı. Lütfen internet bağlantınızı kontrol edin.');
      return;
    }

    const activePriceId = priceId || PADDLE_DEFAULT_PRICE_ID;

    // Build line items
    const checkoutItems = items && items.length > 0
      ? items
      : activePriceId
      ? [{ priceId: activePriceId, quantity: 1 }]
      : [];

    if (checkoutItems.length === 0) {
      console.error('[Paddle] No items provided for checkout.');
      return;
    }

    const currentLang = typeof window !== 'undefined' && localStorage.getItem('healthlex_lang') === 'en' ? 'en' : 'tr';
    const checkoutSettings = {
      displayMode: displayMode || 'overlay', // Varsayılan popup overlay pencere
      theme: theme || 'light',              // 'light' veya 'dark'
      allowLogout: allowLogout ?? false,    // Oturumu kapatmaya izin verme
      locale: currentLang
    };

    // successUrl tanımlanmazsa Paddle kendi başarı ekranını pencere içinde tutar
    if (successUrl) {
      checkoutSettings.successUrl = successUrl;
    }

    const checkoutOptions = {
      items: checkoutItems,
      settings: checkoutSettings,
      customData
    };

    // Giriş yapmış kullanıcının e-postasını otomatik aktar
    const activeUser = auth.currentUser || getUser();
    const resolvedEmail = customerEmail || activeUser?.email;

    // Prefill customer email to skip contact screen if available
    if (resolvedEmail && typeof resolvedEmail === 'string' && resolvedEmail.includes('@')) {
      checkoutOptions.customer = {
        email: resolvedEmail.trim()
      };
    }

    paddle.Checkout.open(checkoutOptions);
  } catch (error) {
    console.error('[Paddle] Error opening checkout:', error);
    toast.error('Ödeme penceresi açılırken bir hata oluştu.');
  }
};

export default {
  getPaddle,
  getPricePreviews,
  openPaddleCheckout
};
