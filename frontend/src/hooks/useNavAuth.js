import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { getUser, isLoggedIn, getUserTrialState, formatTurkishName } from '@/utils/storage';
import { getPreviewRole } from '@/utils/planAccess';

const NavAuthContext = createContext(null);

function useNavAuthInternal() {
  // Rota değişimlerinde localStorage / previewRole durumunu tazelemek için dinlenir
  useLocation();
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

  useEffect(() => {
    if (previewRole) {
      setFirebaseUser({ uid: 'preview-uid', email: 'dr.kaya@healthlexmed.com', displayName: 'Dr. Ahmet Kaya' });
      if (previewRole === 'lifetime') {
        setIsLifetime(true);
        setIsPro(false);
        setIsBasic(false);
        setUserData(null);
      } else if (previewRole === 'pro') {
        setIsLifetime(false);
        setIsPro(true);
        setIsBasic(false);
        setUserData(null);
      } else if (previewRole === 'basic') {
        setIsLifetime(false);
        setIsPro(false);
        setIsBasic(true);
        setUserData(null);
      } else if (previewRole === 'trial') {
        setIsLifetime(false);
        setIsPro(false);
        setIsBasic(false);
        setUserData({ subscriptionStatus: 'trialing', isTrial: true });
      } else {
        setIsLifetime(false);
        setIsPro(false);
        setIsBasic(false);
        setUserData(null);
      }
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setFirebaseUser(usr);
    });
    return () => unsubscribe();
  }, [previewRole]);

  // Pro & Temel Durumu Kontrolü (Tekil Firestore canlı dinleme + localStorage fallback)
  useEffect(() => {
    if (previewRole) return;
    const uid = firebaseUser?.uid || getUser()?.uid;
    if (!uid) {
      const localUser = getUser();
      setUserData(localUser);
      const isLifetimePlan =
        localUser?.isLifetime === true ||
        localUser?.planType === 'lifetime' ||
        (localUser?.plan || '').toLowerCase().includes('lifetime') ||
        (localUser?.plan || '').toLowerCase().includes('ömür');
      const isBasicPlan =
        !isLifetimePlan &&
        (localUser?.isBasic === true || (localUser?.plan || '').toLowerCase().includes('basic'));
      const isProPlan =
        !isLifetimePlan &&
        !isBasicPlan &&
        (localUser?.isPro === true || localUser?.subscriptionStatus === 'active');
      setIsLifetime(isLifetimePlan);
      setIsPro(isProPlan);
      setIsBasic(isBasicPlan);
      return;
    }

    try {
      const userDocRef = doc(db, 'users', uid);
      const unsub = onSnapshot(
        userDocRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            const isLifetimePlan =
              data.isLifetime === true ||
              data.planType === 'lifetime' ||
              (data.plan || '').toLowerCase().includes('lifetime') ||
              (data.plan || '').toLowerCase().includes('ömür');
            const isBasicPlan =
              !isLifetimePlan &&
              (data.isBasic === true ||
                data.subscriptionStatus === 'basic' ||
                (data.plan || '').toLowerCase().includes('basic'));
            const status = (data.subscriptionStatus || '').toLowerCase();
            const isPaidPro =
              !isLifetimePlan &&
              !isBasicPlan &&
              (data.isPro === true || status === 'active' || status === 'pro');
            setIsLifetime(isLifetimePlan);
            setIsPro(isPaidPro);
            setIsBasic(isBasicPlan);
          } else {
            setUserData(null);
            setIsLifetime(false);
            setIsPro(false);
            setIsBasic(false);
          }
        },
        (err) => {
          console.warn('[Navbar] Could not read user pro status:', err);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('[Navbar] Firestore snapshot error:', e);
    }
  }, [firebaseUser, previewRole]);

  const loggedIn = !!firebaseUser || isLoggedIn();
  const user = getUser();
  const currentUserObj = userData || user || firebaseUser;
  const trialState = getUserTrialState(
    previewRole === 'trial'
      ? { ...currentUserObj, subscriptionStatus: 'trialing', isTrial: true }
      : currentUserObj
  );
  const isTrialActive = trialState.hasTrial && trialState.isActive && !trialState.isExpired;
  const trialDaysLeft = trialState.daysLeft;
  const formattedUserName = formatTurkishName(
    firebaseUser?.displayName ||
      user?.name ||
      firebaseUser?.email?.split('@')[0] ||
      user?.email?.split('@')[0]
  );
  const userInitial = (formattedUserName.charAt(0) || 'U').toLocaleUpperCase('tr-TR');
  const isFreeUser = loggedIn && !isPro && !isLifetime && !isTrialActive && !isBasic;

  return {
    loggedIn,
    user,
    firebaseUser,
    userData,
    isPro,
    isBasic,
    isLifetime,
    isTrialActive,
    trialDaysLeft,
    formattedUserName,
    userInitial,
    isFreeUser,
  };
}

export const NavAuthProvider = ({ children }) => {
  const value = useNavAuthInternal();
  return <NavAuthContext.Provider value={value}>{children}</NavAuthContext.Provider>;
};

export const useNavAuth = () => {
  const ctx = useContext(NavAuthContext);
  if (!ctx) {
    throw new Error('useNavAuth must be used within a NavAuthProvider');
  }
  return ctx;
};
