import { initializePaddle } from '@paddle/paddle-js';
import { toast } from 'sonner';

// Environment variable configurations
const PADDLE_TOKEN = process.env.REACT_APP_PADDLE_CLIENT_TOKEN || 'test_6e3b91d057ac064f535d586f588';
const PADDLE_ENV = (process.env.REACT_APP_PADDLE_ENV || 'sandbox').toLowerCase();

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
        environment: PADDLE_ENV === 'production' ? 'production' : 'sandbox',
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

      if (!paddle) {
        console.error('[Paddle] Failed to initialize Paddle instance.');
      }

      return paddle;
    } catch (error) {
      console.error('[Paddle] Initialization error:', error);
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
}) => {
  try {
    const paddle = await getPaddle();
    if (!paddle) {
      toast.error('Ödeme sistemi başlatılamadı. Lütfen internet bağlantınızı kontrol edin.');
      return;
    }

    // Build line items
    const checkoutItems = items && items.length > 0
      ? items
      : priceId
      ? [{ priceId, quantity: 1 }]
      : [];

    if (checkoutItems.length === 0) {
      console.error('[Paddle] No items provided for checkout.');
      return;
    }

    const checkoutSettings = {
      displayMode: displayMode || 'overlay', // Varsayılan popup pencere
      theme: theme || 'light',              // 'light' veya 'dark'
      allowLogout: allowLogout ?? false,    // Oturumu kapatmaya izin verme
      locale: 'tr'
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

    // Prefill customer email to skip contact screen if available
    if (customerEmail && typeof customerEmail === 'string' && customerEmail.includes('@')) {
      checkoutOptions.customer = {
        email: customerEmail.trim()
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
