import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import { adaptTermsToMorphemeQuestions } from '@/utils/morphemeAdapter';
import { isLoggedIn, canGuestPlay, getUser } from '@/utils/storage';
import { GuestLimitModal } from '@/components/GuestLimitModal';
import { isGameUnlocked, checkIsPro } from '@/utils/planAccess';
import { auth, db } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { toast } from 'sonner';

export const MorphemeGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { currentLanguage, t } = useLanguage();
  const [showLimitModal, setShowLimitModal] = useState(false);

  const [isPro, setIsPro] = useState(() => {
    try {
      const previewRole = typeof window !== 'undefined'
        ? (new URLSearchParams(window.location.search).get('previewRole') || localStorage.getItem('healthlex_preview_role'))
        : null;
      if (previewRole === 'pro') return true;
      if (previewRole === 'basic') return false;
      const local = getUser();
      return checkIsPro(local);
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const previewRole = typeof window !== 'undefined'
      ? (new URLSearchParams(window.location.search).get('previewRole') || localStorage.getItem('healthlex_preview_role'))
      : null;
    if (previewRole) return;
    const uid = auth?.currentUser?.uid || getUser()?.uid;
    if (!uid) return;
    try {
      const unsub = onSnapshot(doc(db, 'users', uid), (snap) => {
        if (snap.exists()) {
          setIsPro(checkIsPro(snap.data()));
        }
      });
      return () => unsub();
    } catch (e) {
      console.warn('Error checking pro status in MorphemeGame:', e);
    }
  }, []);

  useEffect(() => {
    if (!isGameUnlocked('morpheme', isPro)) {
      toast.info(
        currentLanguage === 'en'
          ? 'Morpheme Builder mode is exclusive to Pro members. Flashcards and Matching games are available in your Basic plan.'
          : 'Morfem Yapıcı oyunu Pro plana özeldir. Flashcard ve Eşleştirme oyunları Temel paketinizde açıktır.'
      );
      navigate('/pricing');
    }
  }, [isPro, currentLanguage, navigate]);

  useEffect(() => {
    if (!isLoggedIn() && !canGuestPlay()) {
      setShowLimitModal(true);
    }
  }, []);

  const categoryTerms = useMemo(() => {
    return category === 'all'
      ? getAllTerms()
      : getTermsByCategory(category);
  }, [category]);

  const adaptedQuestions = useMemo(() => {
    return adaptTermsToMorphemeQuestions(categoryTerms);
  }, [categoryTerms]);

  if (!isGameUnlocked('morpheme', isPro)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <MorphemeGameFable
        terms={adaptedQuestions}
        language={currentLanguage}
        onBack={() => navigate('/games')}
        t={t}
      />
      <GuestLimitModal
        isOpen={showLimitModal}
        onClose={() => {
          setShowLimitModal(false);
          navigate('/games');
        }}
      />
    </div>
  );
};
