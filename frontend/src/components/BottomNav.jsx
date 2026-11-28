import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Gamepad2,
  Compass,
  LogIn,
  LayoutDashboard,
  User,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useNavAuth } from '@/hooks/useNavAuth';
import { shouldShowBottomNav } from '@/utils/bottomNav';

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { loggedIn, isPro, isLifetime, isBasic, isTrialActive } = useNavAuth();

  const [studyMenuOpen, setStudyMenuOpen] = useState(false);
  const studyButtonRef = useRef(null);
  const studyMenuRef = useRef(null);

  const visible = shouldShowBottomNav(location.pathname);

  // Rota değiştiğinde Çalış alt menüsünü kapat
  useEffect(() => {
    setStudyMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // Dışarı dokunma ve Escape tuşu ile Çalış alt menüsünü kapat
  useEffect(() => {
    if (!studyMenuOpen) return undefined;

    const handlePointerDown = (e) => {
      if (
        studyMenuRef.current &&
        !studyMenuRef.current.contains(e.target) &&
        studyButtonRef.current &&
        !studyButtonRef.current.contains(e.target)
      ) {
        setStudyMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setStudyMenuOpen(false);
        studyButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [studyMenuOpen]);

  if (!visible) {
    return null;
  }

  const p = (location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';

  const isHomeActive = p === '/';
  const isDashboardActive = p === '/dashboard' || p === '/panel' || p === '/progress';
  const isTermsSubActive = p === '/study' || p.startsWith('/study/') || p.startsWith('/terms/');
  const isMorphemesSubActive =
    p === '/morphemes' ||
    p.startsWith('/morphemes/') ||
    p === '/morfemler' ||
    p === '/morpheme-explorer';
  const isFavoritesSubActive = p === '/favorilerim' || p === '/tekrar';
  const isStudyActive = isTermsSubActive || isMorphemesSubActive || isFavoritesSubActive;
  const isGamesActive = p === '/games' || p.startsWith('/games/');
  const isGuideActive = p === '/rehber' || p.startsWith('/rehber/');
  const isLoginActive = p === '/login' || p === '/register';
  const isAccountActive = p === '/profile';

  const isFreeUser = loggedIn && !isPro && !isLifetime && !isTrialActive && !isBasic;

  const firstTab = loggedIn
    ? {
        key: 'dashboard',
        type: 'link',
        to: '/dashboard',
        label: t('navDashboard', 'Panelim'),
        Icon: LayoutDashboard,
        active: isDashboardActive,
      }
    : {
        key: 'home',
        type: 'link',
        to: '/',
        label: t('navHome', 'Ana sayfa'),
        Icon: Home,
        active: isHomeActive,
      };

  const lastTab = loggedIn
    ? {
        key: 'account',
        type: 'link',
        to: '/profile',
        label: t('navAccount', 'Hesabım'),
        Icon: User,
        active: isAccountActive,
        showProDot: isFreeUser,
        ariaLabel: isFreeUser ? `${t('navAccount', 'Hesabım')}, Pro'ya geçiş önerisi` : undefined,
      }
    : {
        key: 'login',
        type: 'link',
        to: '/login',
        label: t('navLogin', 'Giriş'),
        Icon: LogIn,
        active: isLoginActive,
      };

  const tabs = [
    firstTab,
    {
      key: 'study',
      type: 'submenu',
      label: t('navStudy', 'Çalış'),
      Icon: BookOpen,
      active: isStudyActive,
    },
    {
      key: 'games',
      type: 'link',
      to: '/games',
      label: t('navGames', 'Oyunlar'),
      Icon: Gamepad2,
      active: isGamesActive,
    },
    {
      key: 'guide',
      type: 'link',
      to: '/rehber',
      label: t('navGuide', 'Rehber'),
      Icon: Compass,
      active: isGuideActive,
    },
    lastTab,
  ];

  return (
    <>
      {studyMenuOpen && (
        <div
          ref={studyMenuRef}
          role="menu"
          aria-label={t('navStudy', 'Çalış')}
          style={{
            bottom: 'calc(64px + env(safe-area-inset-bottom) + 8px)',
          }}
          className="desktop:hidden fixed left-[30%] -translate-x-1/2 z-[45] min-w-[156px] bg-white dark:bg-card border border-border rounded-xl shadow-lg py-1.5 px-1.5 flex flex-col gap-0.5"
        >
          <Link
            to="/study"
            role="menuitem"
            aria-current={isTermsSubActive ? 'page' : undefined}
            onClick={() => setStudyMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-colors min-h-[44px] ${
              isTermsSubActive
                ? 'text-[#0f766e] bg-[#0f766e]/10 font-semibold'
                : 'text-foreground hover:bg-muted font-medium'
            }`}
          >
            <span>{t('navTerms', 'Terimler')}</span>
            {isTermsSubActive && (
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" />
            )}
          </Link>
          <Link
            to="/morphemes"
            role="menuitem"
            aria-current={isMorphemesSubActive ? 'page' : undefined}
            onClick={() => setStudyMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-colors min-h-[44px] ${
              isMorphemesSubActive
                ? 'text-[#0f766e] bg-[#0f766e]/10 font-semibold'
                : 'text-foreground hover:bg-muted font-medium'
            }`}
          >
            <span>{t('navMorphemes', 'Morfemler')}</span>
            {isMorphemesSubActive && (
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" />
            )}
          </Link>
          {loggedIn && (
            <Link
              to="/favorilerim"
              role="menuitem"
              aria-current={isFavoritesSubActive ? 'page' : undefined}
              onClick={() => setStudyMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-colors min-h-[44px] ${
                isFavoritesSubActive
                  ? 'text-[#0f766e] bg-[#0f766e]/10 font-semibold'
                  : 'text-foreground hover:bg-muted font-medium'
              }`}
            >
              <span>{t('navFavorites', 'Favorilerim')}</span>
              {isFavoritesSubActive && (
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#0f766e]" />
              )}
            </Link>
          )}
        </div>
      )}

      <nav
        aria-label="Ana gezinme"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        className="desktop:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-card border-t border-border"
      >
        <div className="grid grid-cols-5 h-16 w-full">
          {tabs.map((tab) => {
            const Icon = tab.Icon;
            const itemClasses = `relative flex flex-col items-center justify-center gap-1 min-h-[44px] h-full px-1 select-none transition-colors ${
              tab.active ? 'text-[#0f766e] font-semibold' : 'text-muted-foreground hover:text-foreground font-medium'
            }`;

            if (tab.type === 'submenu') {
              return (
                <button
                  key={tab.key}
                  ref={studyButtonRef}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={studyMenuOpen}
                  aria-current={tab.active ? 'page' : undefined}
                  onClick={() => setStudyMenuOpen((prev) => !prev)}
                  className={`${itemClasses} cursor-pointer bg-transparent border-0`}
                >
                  {tab.active && (
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[2px] bg-[#0f766e]"
                    />
                  )}
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={1.8} />
                  <span className="text-[11px] leading-none truncate max-w-full">{tab.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={tab.key}
                to={tab.to}
                aria-current={tab.active ? 'page' : undefined}
                aria-label={tab.ariaLabel}
                className={itemClasses}
              >
                {tab.active && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-[#0f766e]"
                  />
                )}
                <span className="relative inline-flex">
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={1.8} />
                  {tab.showProDot && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#2563eb] ring-2 ring-white dark:ring-card"
                    />
                  )}
                </span>
                <span className="text-[11px] leading-none truncate max-w-full">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
