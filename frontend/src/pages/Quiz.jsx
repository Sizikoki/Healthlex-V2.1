import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuizGameFable from '@/components/games/QuizGameFable';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms, getTermsByCategory } from '@/data/medicalTerms';

export const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { currentLanguage, t } = useLanguage();

  const categoryTerms = useMemo(() => {
    return category === 'all'
      ? getAllTerms()
      : getTermsByCategory(category);
  }, [category]);

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <QuizGameFable
        terms={categoryTerms}
        categoryId={category}
        language={currentLanguage}
        onBack={() => navigate('/games')}
        t={t}
      />
    </div>
  );
};