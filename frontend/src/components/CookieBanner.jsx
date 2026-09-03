import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { getCookieConsent, setCookieConsent, initAnalyticsOnLoad } from '@/services/analytics';

export const CookieBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial check on mount
    const consent = getCookieConsent();
    if (!consent) {
      // Small delay so it animates nicely after initial render
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    } else {
      initAnalyticsOnLoad();
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent('accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookieConsent('declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-[hlxFadeUp_0.35s_ease-out]"
    >
      <div className="bg-card/95 backdrop-blur-md text-card-foreground border border-border/80 shadow-2xl rounded-2xl p-5 sm:p-6 relative overflow-hidden">
        {/* Top subtle decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                {t('cookieBannerTitle', 'Çerez ve Analitik Tercihleriniz 🍪')}
              </h4>
              <button
                type="button"
                onClick={handleDecline}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1 rounded-md"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {t('cookieBannerDesc', 'Deneyiminizi geliştirmek ve site performansını anonim olarak ölçümlemek amacıyla Google Analytics (GA4) analitik çerezleri kullanıyoruz.')}{' '}
              <Link
                to="/privacy"
                className="text-primary font-semibold hover:underline inline-flex items-center gap-0.5"
              >
                {t('cookieLearnMore', 'Gizlilik ve Çerez Politikamızı İnceleyin')}
              </Link>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <Button
                type="button"
                onClick={handleAccept}
                size="sm"
                className="w-full sm:flex-1 h-9 text-xs font-semibold gradient-primary shadow-sm hover:shadow transition-all"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                {t('cookieAccept', 'Tümünü Kabul Et')}
              </Button>

              <Button
                type="button"
                onClick={handleDecline}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto h-9 text-xs font-medium border-border/80 hover:bg-muted/70 text-muted-foreground hover:text-foreground"
              >
                {t('cookieDecline', 'Yalnızca Zorunlu Çerezler')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
