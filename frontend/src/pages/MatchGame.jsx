import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Trophy, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getAllTerms } from '@/data/medicalTerms';
import { saveMatchScore, updateStreak } from '@/utils/storage';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';

export const MatchGame = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get('category');

  const [allTerms, setAllTerms] = useState([]);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  const setupGame = useCallback((termsList) => {
    if (!termsList || termsList.length === 0) return;

    let filtered = termsList;
    if (categoryId && categoryId !== 'all') {
      filtered = termsList.filter(t => t.category === categoryId);
      if (filtered.length === 0) {
        filtered = termsList.filter(t => t.system === categoryId || t.subcategory === categoryId);
      }
    }

    if (filtered.length === 0) {
      filtered = termsList;
    }

    // Select 6 random terms dynamically
    const shuffledTerms = [...filtered].sort(() => Math.random() - 0.5);
    const selectedTerms = shuffledTerms.slice(0, Math.min(6, shuffledTerms.length));

    const gameCards = [];
    selectedTerms.forEach((term, index) => {
      gameCards.push({
        id: `term-${index}`,
        content: term.term, // Latin Term
        pairId: index,
        type: 'term'
      });
      gameCards.push({
        id: `turkish-${index}`,
        content: term.turkishDefinition, // turkishDefinition (Turkish Definition)
        pairId: index,
        type: 'turkish'
      });
    });

    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelected([]);
    setMatched([]);
    setMoves(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setGameComplete(false);
  }, [categoryId]);

  const initializeGame = useCallback(() => {
    setupGame(allTerms);
  }, [setupGame, allTerms]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const querySnapshot = await Promise.race([
          getDocs(collection(db, 'terms')),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        let rawTerms = [];
        querySnapshot.forEach((doc) => {
          rawTerms.push(doc.data());
        });

        if (rawTerms.length === 0) {
          rawTerms = getAllTerms();
        }

        // Normalize Firestore & fallback models
        const normalized = rawTerms.map(t => ({
          id: t.id,
          term: t.term,
          turkishDefinition: t.turkishDefinition || t.definition || '',
          category: t.category || '',
          system: t.system || '',
          subcategory: t.subcategory || ''
        })).filter(t => t.term && t.turkishDefinition);

        setAllTerms(normalized);
        setupGame(normalized);
      } catch (error) {
        console.error('Error fetching terms in MatchGame:', error);
        const localTerms = getAllTerms().map(t => ({
          id: t.id,
          term: t.term,
          turkishDefinition: t.definition || '',
          category: t.category || '',
          system: t.system || '',
          subcategory: t.subcategory || ''
        })).filter(t => t.term && t.turkishDefinition);

        setAllTerms(localTerms);
        setupGame(localTerms);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
    updateStreak();
  }, [categoryId, setupGame]);



  useEffect(() => {
    if (startTime && !gameComplete) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, gameComplete]);

  const handleCardClick = (card) => {
    // Don't allow clicks if two cards are already selected or if card is already matched
    if (selected.length >= 2 || matched.includes(card.pairId)) {
      return;
    }

    // If card is already selected, deselect it (toggle)
    const alreadySelected = selected.find(s => s.id === card.id);
    if (alreadySelected) {
      setSelected(selected.filter(s => s.id !== card.id));
      return;
    }

    const newSelected = [...selected, card];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(moves + 1);

      if (newSelected[0].pairId === newSelected[1].pairId && newSelected[0].type !== newSelected[1].type) {
        // Match found
        setTimeout(() => {
          setMatched([...matched, card.pairId]);
          setSelected([]);

          // Check if game complete
          if (matched.length + 1 === cards.length / 2) {
            setGameComplete(true);
            saveMatchScore(categoryId || 'all', elapsedTime, moves + 1);
            toast.success(`Tebrikler! ${moves + 1} hamle ve ${elapsedTime} saniyede tamamlandı!`);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setSelected([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = cards.length > 0 ? (matched.length / (cards.length / 2)) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Oyun Yükleniyor...</h3>
          <p className="text-muted-foreground">Kelimeler veritabanından çekiliyor...</p>
        </Card>
      </div>
    );
  }

  if (allTerms.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <h3 className="text-xl font-semibold mb-2 text-destructive">Hata</h3>
          <p className="text-muted-foreground mb-4">Eşleştirme oyunu için kelime havuzu bulunamadı.</p>
          <Button asChild className="gradient-primary">
            <Link to="/games">Oyunlara Dön</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/games')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Oyunlara Dön
          </Button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Eşleştirme Oyunu</h1>
              <p className="text-muted-foreground">Terimleri Türkçe karşılıklarıyla eşleştir</p>
            </div>
            <Button variant="outline" size="icon" onClick={initializeGame}>
              <RotateCw className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Süre</div>
                  <div className="text-xl font-bold">{formatTime(elapsedTime)}</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-secondary" />
                <div>
                  <div className="text-xs text-muted-foreground">Hamle</div>
                  <div className="text-xl font-bold">{moves}</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-accent">✓</div>
                <div>
                  <div className="text-xs text-muted-foreground">Eşleşme</div>
                  <div className="text-xl font-bold">{matched.length}/{cards.length / 2}</div>
                </div>
              </div>
            </Card>
          </div>

          <Progress value={progress} className="h-2" />
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card) => {
            const isSelected = selected.find(s => s.id === card.id);
            const isMatched = matched.includes(card.pairId);

            // Check if this is a correct match: two cards selected, same pairId, different types
            const isCorrectMatch = selected.length === 2 && isSelected &&
              selected[0].pairId === selected[1].pairId &&
              selected[0].type !== selected[1].type;

            // Check if this is a wrong match: two cards selected, different pairIds
            const isWrongMatch = selected.length === 2 && isSelected &&
              selected[0].pairId !== selected[1].pairId;

            return (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`h-32 cursor-pointer transition-all transform hover:scale-105 ${isMatched
                  ? 'bg-green-50 border-green-500 border-2 opacity-50 cursor-not-allowed'
                  : isSelected
                    ? isWrongMatch
                      ? 'bg-red-50 border-red-500 border-2'
                      : isCorrectMatch
                        ? 'bg-green-50 border-green-500 border-2 shadow-lg scale-105'
                        : 'bg-primary/10 border-primary shadow-lg scale-105'
                    : 'hover:shadow-lg'
                  }`}
              >
                <CardContent className="h-full flex items-center justify-center p-3">
                  <div className={`text-center ${card.type === 'term' ? 'font-bold' : 'text-secondary'
                    }`}>
                    <div className="text-xs text-muted-foreground mb-1">
                      {card.type === 'term' ? '🌐' : '🇹🇷'}
                    </div>
                    <div className="text-sm sm:text-base leading-tight">
                      {card.content}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Complete Modal */}
        {gameComplete && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-success to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Tebrikler!</h2>
                <p className="text-muted-foreground mb-6">Oyunu başarıyla tamamladın!</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">{formatTime(elapsedTime)}</div>
                    <div className="text-sm text-muted-foreground">Süre</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">{moves}</div>
                    <div className="text-sm text-muted-foreground">Hamle</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={initializeGame} className="flex-1">
                    <RotateCw className="w-4 h-4 mr-2" />
                    Tekrar Oyna
                  </Button>
                  <Button onClick={() => navigate('/games')} className="flex-1 gradient-primary">
                    Oyunları Gör
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};