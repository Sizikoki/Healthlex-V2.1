import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { getCookieConsent, setCookieConsent } from '@/services/analytics';

export const CookieBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    // Initial check on mount: show on first scroll or after 2.5s so Hero content is seen first
    const consent = getCookieConsent();
    if (!consent) {
      let triggered = false;
      const show = () => {
        if (!triggered) {
          triggered = true;
          setIsVisible(true);
        }
      };
      const timer = setTimeout(show, 2500);
      const handleScroll = () => {
        if (window.scrollY > 40) show();
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const handleOpenPreferences = () => {
      const current = getCookieConsent();
      setAnalyticsConsent(current ? Boolean(current.analytics) : false);
      setMarketingConsent(current ? Boolean(current.marketing) : false);
      setShowPreferences(true);
      setIsVisible(true);
    };

    window.addEventListener('hlx_open_cookie_preferences', handleOpenPreferences);
    return () => window.removeEventListener('hlx_open_cookie_preferences', handleOpenPreferences);
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent('accepted');
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleDeclineAll = () => {
    setCookieConsent('declined');
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSaveChoices = () => {
    setCookieConsent({
      analytics: analyticsConsent,
      marketing: marketingConsent
    });
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleOpenManage = () => {
    const current = getCookieConsent();
    setAnalyticsConsent(current ? Boolean(current.analytics) : false);
    setMarketingConsent(current ? Boolean(current.marketing) : false);
    setShowPreferences(true);
  };

  const handleClose = () => {
    const consent = getCookieConsent();
    if (!consent) {
      setCookieConsent('declined');
    }
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent"
      className="fixed bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-[hlxFadeUp_0.35s_ease-out]"
    >
      <div className="bg-card/95 backdrop-blur-md text-card-foreground border border-border/80 shadow-2xl rounded-xl sm:rounded-2xl p-3.5 sm:p-5 relative overflow-hidden max-h-[82vh] overflow-y-auto">
        {/* Top subtle decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />

        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h4 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 inline-flex items-center justify-center shrink-0">
              <Cookie className="w-3.5 h-3.5" />
            </span>
            {t('cookieBannerTitle', 'Çerez tercihleri')}
          </h4>
          <button
            type="button"
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!showPreferences ? (
          <>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug mb-2.5">
              {t(
                'cookieBannerDesc',
                'Deneyimini iyileştirmek ve reklam performansını ölçmek için zorunlu, analitik ve pazarlama çerezleri kullanıyoruz.'
              )}
              {t('cookieDetails', ' ')}
              <Link
                to="/privacy"
                className="text-primary font-semibold hover:underline inline"
              >
                {t('cookiePolicyLinkText', 'Çerez Politikası')}
              </Link>
              <span className="mx-1.5 text-muted-foreground/60">·</span>
              <button
                type="button"
                onClick={handleOpenManage}
                className="text-foreground/85 hover:text-foreground underline underline-offset-2 transition-colors font-medium cursor-pointer inline"
              >
                {t('cookieManage', 'Tercihleri yönet')}
              </button>
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                onClick={handleAcceptAll}
                size="sm"
                className="w-full h-8 sm:h-9 text-xs font-semibold gradient-primary shadow-sm hover:shadow transition-all px-2.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span className="truncate">{t('cookieAccept', 'Tümünü kabul et')}</span>
              </Button>

              <Button
                type="button"
                onClick={handleDeclineAll}
                variant="outline"
                size="sm"
                className="w-full h-8 sm:h-9 text-xs font-medium border-border/80 hover:bg-muted/70 text-muted-foreground hover:text-foreground px-2.5"
              >
                <span className="truncate">{t('cookieDecline', 'Yalnızca zorunlu')}</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-2.5 pt-1">
            {/* 1. Zorunlu / Essential */}
            <div className="rounded-xl border border-border/70 p-2.5 bg-muted/30">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-xs font-bold text-foreground">
                  {t('cookieCategoryNecessary', 'Zorunlu')}
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] py-0 px-2 font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                >
                  {t('cookieBadgeAlwaysOn', 'Her zaman açık')}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {t(
                  'cookieCategoryNecessaryDesc',
                  'Giriş, dil tercihi ve güvenlik gibi sitenin çalışması için gereken çerezler.'
                )}
              </p>
            </div>

            {/* 2. Analitik / Analytics */}
            <div className="rounded-xl border border-border/70 p-2.5 bg-muted/30">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-xs font-bold text-foreground">
                  {t('cookieCategoryAnalytics', 'Analitik')}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsConsent}
                  onClick={() => setAnalyticsConsent((prev) => !prev)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    analyticsConsent ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      analyticsConsent ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {t(
                  'cookieCategoryAnalyticsDesc',
                  'Hangi sayfaların ve özelliklerin kullanıldığını anlamamıza yardımcı olur (Google Analytics, PostHog).'
                )}
              </p>
            </div>

            {/* 3. Pazarlama / Marketing */}
            <div className="rounded-xl border border-border/70 p-2.5 bg-muted/30">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-xs font-bold text-foreground">
                  {t('cookieCategoryMarketing', 'Pazarlama')}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={marketingConsent}
                  onClick={() => setMarketingConsent((prev) => !prev)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    marketingConsent ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      marketingConsent ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {t(
                  'cookieCategoryMarketingDesc',
                  'Reklamlarımızın sonuçlarını ölçmemize ve ilgilenebilecek kişilere ulaşmamıza yardımcı olur (Meta Pikseli).'
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                type="button"
                onClick={handleSaveChoices}
                size="sm"
                className="w-full h-8 sm:h-9 text-xs font-semibold gradient-primary shadow-sm hover:shadow transition-all"
              >
                {t('cookieSave', 'Seçimi kaydet')}
              </Button>

              <Button
                type="button"
                onClick={() => setShowPreferences(false)}
                variant="outline"
                size="sm"
                className="w-full h-8 sm:h-9 text-xs font-medium border-border/80 hover:bg-muted/70 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                {t('cookieBack', 'Geri')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
