import React from 'react';
import { useNavigate } from 'react-router-dom';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';
import { useLanguage } from '@/context/LanguageContext';

export const MorphemeGame = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <MorphemeGameFable
        language={currentLanguage}
        onBack={() => navigate('/games')}
        t={t}
      />
    </div>
  );
};
