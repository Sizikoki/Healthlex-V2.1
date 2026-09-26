import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUser, logout, isLoggedIn, getStats, getUserTrialState, formatTurkishName } from '@/utils/storage';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getPreviewRole } from '@/utils/planAccess';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const previewRole = getPreviewRole();
  const [firebaseUser, setFirebaseUser] = useState(
    previewRole ? { uid: 'preview-uid', email: 'dr.kaya@healthlexmed.com', displayName: 'Dr. Ahmet Kaya' } : null
  );
  const [userData, setUserData] = useState(
    previewRole === 'trial' ? { subscriptionStatus: 'trialing', isTrial: true } : null
  );
  const [isPro, setIsPro] = useState(previewRole === 'pro');
  const [isBasic, setIsBasic] = useState(previewRole === 'basic');
  const [isLifetime, setIsLifetime] = useState(previewRole === 'lifetime');
  const { currentLanguage, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (previewRole) {
      if (previewRole === 'lifetime') {
        setIsLifetime(true);
        setIsPro(false);
        setIsBasic(false);
      } else if (previewRole === 'pro') {
        setIsLifetime(false);
        setIsPro(true);
        setIsBasic(false);
      } else if (previewRole === 'basic') {
        setIsLifetime(false);
        setIsPro(false);
        setIsBasic(true);
      } else if (previewRole === 'trial') {
        setIsLifetime(false);
        setIsPro(false);
        setIsBasic(false);
        setUserData({ subscriptionStatus: 'trialing', isTrial: true });
      }
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setFirebaseUser(usr);
    });
    return () => unsubscribe();
  }, [previewRole]);

  // Pro & Temel Durumu Kontrolü (Firestore canlı dinleme + localStorage fallback)
  useEffect(() => {
    if (previewRole) return;
    const uid = firebaseUser?.uid || getUser()?.uid;
    if (!uid) {
      const localUser = getUser();
      setUserData(localUser);
      const isLifetimePlan = localUser?.isLifetime === true || localUser?.planType === 'lifetime' || (localUser?.plan || '').toLowerCase().includes('lifetime') || (localUser?.plan || '').toLowerCase().includes('ömür');
      const isBasicPlan = !isLifetimePlan && (localUser?.isBasic === true || (localUser?.plan || '').toLowerCase().includes('basic'));
      const isProPlan = !isLifetimePlan && !isBasicPlan && (localUser?.isPro === true || localUser?.subscriptionStatus === 'active');
      setIsLifetime(isLifetimePlan);
      setIsPro(isProPlan);
      setIsBasic(isBasicPlan);
      return;
    }

    try {
      const userDocRef = doc(db, 'users', uid);
      const unsub = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          const isLifetimePlan = data.isLifetime === true || data.planType === 'lifetime' || (data.plan || '').toLowerCase().includes('lifetime') || (data.plan || '').toLowerCase().includes('ömür');
          const isBasicPlan = !isLifetimePlan && (data.isBasic === true || data.subscriptionStatus === 'basic' || (data.plan || '').toLowerCase().includes('basic'));
          const status = (data.subscriptionStatus || '').toLowerCase();
          const isPaidPro = !isLifetimePlan && !isBasicPlan && (data.isPro === true || status === 'active' || status === 'pro');
          setIsLifetime(isLifetimePlan);
          setIsPro(isPaidPro);
          setIsBasic(isBasicPlan);
        } else {
          setUserData(null);
          setIsLifetime(false);
          setIsPro(false);
          setIsBasic(false);
        }
      }, (err) => {
        console.warn('[Navbar] Could not read user pro status:', err);
      });
      return () => unsub();
    } catch (e) {
      console.warn('[Navbar] Firestore snapshot error:', e);
    }
  }, [firebaseUser, previewRole]);

  const loggedIn = !!firebaseUser || isLoggedIn();
  const user = getUser();
  const stats = loggedIn ? getStats() : null;
  const currentUserObj = userData || user || firebaseUser;
  const trialState = getUserTrialState(
    previewRole === 'trial'
      ? { ...currentUserObj, subscriptionStatus: 'trialing', isTrial: true }
      : currentUserObj
  );
  const isTrialActive = trialState.hasTrial && trialState.isActive && !trialState.isExpired;
  const trialDaysLeft = trialState.daysLeft;
  const formattedUserName = formatTurkishName(
    firebaseUser?.displayName || user?.name || firebaseUser?.email?.split('@')[0] || user?.email?.split('@')[0]
  );
  const userInitial = (formattedUserName.charAt(0) || 'U').toLocaleUpperCase('tr-TR');

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    window.location.href = '/login';
  };

  const isTr = currentLanguage !== 'en';

  const navLinks = loggedIn
    ? [
        { path: '/dashboard', label: t('dashboard', 'Panel'), icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
        { path: '/study', label: t('study') },
        { path: '/morphemes', label: t('morphemes', 'Morfemler') },
        { path: '/games', label: t('games') },
        { path: '/pricing', label: t('pricing', 'Tarifeler') },
        { path: '/progress', label: t('progress') },
      ]
    : [
        { path: '/', label: t('home', 'Ana Sayfa') },
        { path: '/study', label: t('study') },
        { path: '/morphemes', label: t('morphemes', 'Morfemler') },
        { path: '/games', label: t('games') },
        { path: '/pricing', label: t('pricing', 'Tarifeler') },
        { path: '/progress', label: t('progress') },
      ];

  const LanguageSwitcher = () => (
    <div className="flex items-center bg-card border border-border rounded-lg p-1 text-xs font-semibold shadow-sm">
      <button
        onClick={() => setLanguage('tr')}
        className={`px-2.5 py-1 rounded transition-colors ${
          currentLanguage === 'tr'
            ? 'bg-primary text-primary-foreground font-bold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Türkçe"
      >
        TR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded transition-colors ${
          currentLanguage === 'en'
            ? 'bg-primary text-primary-foreground font-bold'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border" data-purpose="main-header">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo — giriş yapmış kullanıcıda /dashboard'a götürür */}
          <Link to={loggedIn ? '/dashboard' : '/'} className="flex items-center gap-2.5 flex-shrink-0 group">
            <img
              src="/logo-mark.png"
              alt="HealthLexMed Logo"
              className="w-9 h-9 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Health<span className="text-primary font-semibold font-serif italic">Lex</span>Med
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-[0.92rem] font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-card border border-border text-foreground shadow-sm rounded-lg font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg'
                }`}
              >
                {link.icon && <span className="opacity-70">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Actions + Language Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />

            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-[12px] cursor-pointer select-none">
                    {isLifetime ? (
                      <div className="lifetime-badge flex items-center gap-1.5 bg-gradient-to-r from-purple-500/15 via-indigo-500/20 to-purple-500/15 dark:from-purple-400/20 dark:to-indigo-500/20 border border-purple-500/40 text-purple-700 dark:text-purple-300 font-extrabold text-[13px] px-3 py-1.5 rounded-[9px] whitespace-nowrap shadow-xs hover:shadow-sm transition-all select-none">
                        <span className="text-purple-500 dark:text-purple-400 font-black text-sm leading-none">👑</span>
                        <span className="tracking-wide">{currentLanguage === 'en' ? 'LIFETIME' : 'ÖMÜR BOYU'}</span>
                      </div>
                    ) : isPro ? (
                      <div className="pro-badge flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 dark:from-amber-400/20 dark:to-yellow-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-extrabold text-[13px] px-3 py-1.5 rounded-[9px] whitespace-nowrap shadow-xs hover:shadow-sm transition-all select-none">
                        <span className="text-amber-500 dark:text-amber-400 font-black text-sm leading-none">★</span>
                        <span className="tracking-wide">PRO</span>
                      </div>
                    ) : isBasic ? (
                      <div className="basic-badge flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 font-extrabold text-[13px] px-3 py-1.5 rounded-[9px] whitespace-nowrap shadow-xs">
                        <span className="tracking-wide">TEMEL</span>
                      </div>
                    ) : isTrialActive ? (
                      trialDaysLeft <= 1 ? (
                        <div className="trial-badge flex items-center gap-2 bg-[#fff4e6] dark:bg-amber-950/40 border border-[#ffe0b8] dark:border-amber-800 text-[#b45309] dark:text-amber-300 font-extrabold text-[13px] px-3 py-1.5 rounded-[9px] whitespace-nowrap shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                          <span>{currentLanguage === 'en' ? 'Trial · Last day' : 'Deneme · Son gün'}</span>
                        </div>
                      ) : (
                        <div className="trial-badge flex items-center gap-2 bg-[#e8f0fe] dark:bg-blue-950/40 border border-[#c7d9fb] dark:border-blue-800 text-[#1d4ed8] dark:text-blue-300 font-extrabold text-[13px] px-3 py-1.5 rounded-[9px] whitespace-nowrap shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
                          <span>{currentLanguage === 'en' ? `Trial · ${trialDaysLeft} days left` : `Deneme · ${trialDaysLeft} gün kaldı`}</span>
                        </div>
                      )
                    ) : null}
                    <div className="avatar w-[36px] h-[36px] rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-[0.95rem] shadow-xs">
                      {userInitial}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer px-4 py-2 text-foreground hover:bg-muted">
                      <User className="w-4 h-4 mr-2 text-muted-foreground" />
                      {t('myProfile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer px-4 py-2 hover:bg-destructive/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="px-6 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors bg-card">
                  {t('login')}
                </Link>
                <Link to="/register" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm">
                  {t('startFree')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button & Language switcher */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {loggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-between">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {user?.name || t('myProfile')}
                      </div>
                      {isLifetime ? (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-700 dark:text-purple-300">
                          👑 {currentLanguage === 'en' ? 'LIFETIME' : 'ÖMÜR BOYU'}
                        </span>
                      ) : isPro ? (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                          ★ PRO
                        </span>
                      ) : isBasic ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300">
                          TEMEL
                        </span>
                      ) : isTrialActive ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                          {currentLanguage === 'en'
                            ? (trialDaysLeft <= 1 ? 'Trial · Last day' : `Trial · ${trialDaysLeft}d`)
                            : (trialDaysLeft <= 1 ? 'Deneme · Son gün' : `Deneme · ${trialDaysLeft} gün`)}
                        </span>
                      ) : null}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 border border-border rounded-lg font-medium text-foreground bg-card hover:bg-muted">
                    {t('login')}
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90">
                    {t('startFree')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};