import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import { adaptTermsToMorphemeQuestions } from '@/utils/morphemeAdapter';
import { isLoggedIn, canGuestPlay } from '@/utils/storage';
import { GuestLimitModal } from '@/components/GuestLimitModal';

export const MorphemeGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { currentLanguage, t } = useLanguage();
  const [showLimitModal, setShowLimitModal] = useState(false);

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
