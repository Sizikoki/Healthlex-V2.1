import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Shuffle, Brain, ArrowRight, Sparkles, Puzzle, UserPlus, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isLoggedIn, canGuestPlay, getGuestRemainingPlays, GUEST_DAILY_LIMIT } from '@/utils/storage';
import { GuestLimitModal } from '@/components/GuestLimitModal';
import { useLanguage } from '@/context/LanguageContext';
import MorphemeGameFable from '@/components/games/MorphemeGameFable';

const GAME_CATEGORIES = [
  { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri' },
  { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri' },
  { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri' },
  { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Extremite Kemikleri' },
  { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri' },
  { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Extremite Kemikleri' },
  { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri' },
  { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri' },
  { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri' },
  { id: 'movement_terms', key: 'movementTerms', name: 'Hareket Terimleri' },
];

export const Games = () => {
  const { currentLanguage, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeGame, setActiveGame] = useState(null);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const navigate = useNavigate();

  const userIsLoggedIn = isLoggedIn();
  const remainingPlays = getGuestRemainingPlays();

  const games = [
    {
      id: 'flashcards',
      title: t('flashcards'),
      description: t('flashcardDesc'),
      icon: BookOpen,
      color: 'from-primary to-primary-dark',
      path: '/flashcards'
    },
    {
      id: 'match',
      title: t('matchingGame'),
      description: t('matchDesc'),
      icon: Shuffle,
      color: 'from-secondary to-accent',
      path: '/match'
    },
    {
      id: 'quiz',
      title: t('quizMode'),
      description: t('quizDesc'),
      icon: Brain,
      color: 'from-accent to-success',
      path: '/quiz'
    },
    {
      id: 'morpheme',
      title: t('morphemeBuilder'),
      description: t('morphemeDesc'),
      icon: Puzzle,
      color: 'from-violet-500 to-purple-600',
      path: '/morpheme'
    }
  ];

  const getCategoryParam = () => {
    return selectedCategory === 'all' ? '' : `?category=${selectedCategory}`;
  };

  const handleGamePlayClick = (e, gameId, gamePath) => {
    if (!userIsLoggedIn && !canGuestPlay()) {
      e.preventDefault();
      setIsLimitModalOpen(true);
      return;
    }

    if (gameId === 'morpheme') {
      setActiveGame('morpheme');
    } else {
      navigate(`${gamePath}${getCategoryParam()}`);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active Game Render View */}
        {activeGame === 'morpheme' ? (
          <MorphemeGameFable
            language={currentLanguage}
            onBack={() => setActiveGame(null)}
            t={t}
          />
        ) : (
          <>
            {/* Guest Banner */}
            {!userIsLoggedIn && (
              <div className="mb-8 p-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3 text-amber-900 dark:text-amber-200">
                  <div className="p-2.5 bg-amber-500/20 rounded-xl">
                    <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{t('guestMode')}</h3>
                    <p className="text-sm opacity-90">
                      {t('guestPlaysRemaining')} <strong className="text-amber-700 dark:text-amber-300 font-bold">{remainingPlays} / {GUEST_DAILY_LIMIT}</strong>
                    </p>
                  </div>
                </div>
                <Link to="/register">
                  <Button size="sm" className="gradient-primary whitespace-nowrap shadow-md">
                    <UserPlus className="w-4 h-4 mr-2" />
                    {t('unlimitedPlaySignUp')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t('gamesHeader')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t('gamesSub')}
              </p>

              {/* Category Selector */}
              <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                <span className="text-sm font-medium text-muted-foreground">{t('category')}:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder={t('selectCategoryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allCategories')}</SelectItem>

                    {GAME_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {t(cat.key, cat.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {games.map((game) => {
                const Icon = game.icon;
                return (
                  <Card key={game.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{game.title}</CardTitle>
                      <CardDescription className="text-base">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={(e) => handleGamePlayClick(e, game.id, game.path)}
                        className="w-full gradient-primary group-hover:shadow-lg transition-all"
                      >
                        {t('play')}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Tips Section */}
            <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  {t('gameTips')}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-lg font-semibold mb-2 text-primary">{t('tip1Title')}</div>
                    <p className="text-sm text-muted-foreground">
                      {t('tip1Desc')}
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold mb-2 text-secondary">{t('tip2Title')}</div>
                    <p className="text-sm text-muted-foreground">
                      {t('tip2Desc')}
                    </p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold mb-2 text-accent">{t('tip3Title')}</div>
                    <p className="text-sm text-muted-foreground">
                      {t('tip3Desc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <GuestLimitModal
          isOpen={isLimitModalOpen}
          onClose={() => setIsLimitModalOpen(false)}
        />

      </div>
    </div>
  );
};