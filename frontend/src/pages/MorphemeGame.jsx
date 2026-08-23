import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';
import { adaptTermsToMorphemeQuestions } from '@/utils/morphemeAdapter';

export const MorphemeGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { currentLanguage, t } = useLanguage();

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
    </div>
  );
};
