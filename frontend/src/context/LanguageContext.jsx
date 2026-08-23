import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/i18n/translations';
import { auth, db } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getUser } from '@/utils/storage';

const STORAGE_LANG_KEY = 'healthlex_lang';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_LANG_KEY);
    return saved === 'en' ? 'en' : 'tr';
  });

  // Sync language with Firestore user preferences if logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            if (data?.preferences?.language && (data.preferences.language === 'tr' || data.preferences.language === 'en')) {
              setCurrentLanguageState(data.preferences.language);
              localStorage.setItem(STORAGE_LANG_KEY, data.preferences.language);
            }
          }
        } catch (error) {
          console.error('Error fetching user language preferences from Firestore:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const setLanguage = async (newLang) => {
    if (newLang !== 'tr' && newLang !== 'en') return;
    setCurrentLanguageState(newLang);
    localStorage.setItem(STORAGE_LANG_KEY, newLang);

    // Save to Firestore if logged in
    const currentUser = auth.currentUser || getUser();
    const userId = currentUser?.uid || currentUser?.email;
    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, {
          preferences: {
            language: newLang
          }
        }, { merge: true });
      } catch (error) {
        console.error('Error saving language preference to Firestore:', error);
      }
    }
  };

  const t = (key, fallback) => {
    if (!key) return '';
    const langDict = translations[currentLanguage] || translations.tr;
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    const fallbackDict = translations.tr;
    if (fallbackDict && fallbackDict[key] !== undefined) {
      return fallbackDict[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
