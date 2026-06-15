import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, Trophy, RotateCcw, Layers, Puzzle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { saveMorphemeScore } from '@/utils/storage';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getAllTerms } from '@/data/medicalTerms';

// Dynamic question generator from terms list
const generateQuestions = (allTerms) => {
  // Shuffle all terms
  const shuffledTerms = [...allTerms].sort(() => Math.random() - 0.5);

  // Choose up to 10 terms that have roots
  const gameTerms = shuffledTerms.slice(0, Math.min(10, shuffledTerms.length));

  return gameTerms.map(term => {
    const correctRoot = term.roots;

    // Distractors from other terms' roots
    const otherRoots = allTerms
      .map(t => t.roots)
      .filter(r => r !== correctRoot);

    // Pick 3 unique distractors
    const uniqueDistractors = [...new Set(otherRoots)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Shuffle correct answer and distractors
    const options = [correctRoot, ...uniqueDistractors].sort(() => Math.random() - 0.5);

    return {
      term: term.term,
      definition: term.definition,
      parts: [
        { type: 'root', value: correctRoot }
      ],
      options: options
    };
  });
};

const SLOT_META = {
    prefix: { label: 'Ön Ek', color: 'from-violet-500 to-purple-600', border: 'border-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/30', text: 'text-violet-700 dark:text-violet-300', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300' },
    root: { label: 'Kök', color: 'from-sky-500 to-blue-600', border: 'border-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/30', text: 'text-sky-700 dark:text-sky-300', badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300' },
    suffix: { label: 'Son Ek', color: 'from-emerald-500 to-teal-600', border: 'border-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
};

function MorphemeSlot({ type, options, selected, onSelect }) {
    const meta = SLOT_META[type];
    return (
        <div className={`rounded-xl border-2 ${meta.border} ${meta.bg} p-4`}>
            <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${meta.text}`}>{meta.label}</div>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => {
                    const isSelected = selected === opt;
                    return (
                        <button
                            key={opt}
                            onClick={() => onSelect(type, isSelected ? null : opt)}
                            className={`
                px-3 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all duration-200
                ${isSelected
                                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-800 dark:border-gray-300 shadow-md scale-105'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-105'
                                }
              `}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function BuiltTermDisplay({ parts, selections }) {
    if (!parts || parts.length === 0) return null;

    return (
        <div className="flex items-center justify-center flex-wrap gap-1 min-h-[52px]">
            {parts.map((part, i) => {
                const meta = SLOT_META[part.type];
                const val = selections[part.type];
                return (
                    <React.Fragment key={i}>
                        {i > 0 && <span className="text-gray-400 font-light text-2xl">+</span>}
                        <div className={`
              px-4 py-2 rounded-lg border-2 min-w-[80px] text-center font-bold text-base
              ${val
                                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-800 dark:border-gray-300 shadow font-bold'
                                : 'border-dashed border-gray-300 dark:border-gray-600 text-gray-400 bg-gray-50 dark:bg-gray-800/50'
                            }
            `}>
                            {val || <span className="text-xs font-normal">{meta.label}</span>}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export const MorphemeGame = () => {
    const [loading, setLoading] = useState(true);
    const [allTerms, setAllTerms] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selections, setSelections] = useState({});
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [finished, setFinished] = useState(false);
    const [history, setHistory] = useState([]); // { term, correct, wrongAttempts, pts }[]

    // Load game terms from Firestore (fallback to local Terms data)
    useEffect(() => {
        const loadGameData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'terms'));
                let rawTerms = [];
                querySnapshot.forEach((doc) => {
                    rawTerms.push(doc.data());
                });

                if (rawTerms.length === 0) {
                    rawTerms = getAllTerms();
                }

                // Normalize fields (english vs turkish, turkishDefinition vs definition)
                const normalized = rawTerms.map(t => ({
                    id: t.id,
                    term: t.term,
                    definition: t.turkishDefinition || t.definition || '',
                    roots: t.roots || ''
                })).filter(t => t.roots && t.roots.trim() !== '');

                setAllTerms(normalized);
                const generated = generateQuestions(normalized);
                setQuestions(generated);
            } catch (error) {
                console.error('Error loading Morpheme Game data:', error);

                // Fallback to local terms
                const localTerms = getAllTerms();
                const normalized = localTerms.map(t => ({
                    id: t.id,
                    term: t.term,
                    definition: t.definition || '',
                    roots: t.roots || ''
                })).filter(t => t.roots && t.roots.trim() !== '');

                setAllTerms(normalized);
                const generated = generateQuestions(normalized);
                setQuestions(generated);
            } finally {
                setLoading(false);
            }
        };

        loadGameData();
    }, []);

    const currentQ = questions[qIndex];
    const slotOptions = React.useMemo(() => {
        if (!currentQ) return { root: [] };
        return {
            root: currentQ.options
        };
    }, [currentQ]);

    const handleSelect = useCallback((type, value) => {
        if (answered) return;
        setSelections(prev => ({ ...prev, [type]: value }));
    }, [answered]);

    const isAllSelected = () => {
        return currentQ && currentQ.parts.every(p => selections[p.type]);
    };

    const handleCheck = () => {
        if (!isAllSelected()) {
            toast.warning('Lütfen tüm alanları doldurun!');
            return;
        }

        const correct = selections.root?.toLowerCase() === currentQ.parts[0].value.toLowerCase();

        setAnswered(true);
        setIsCorrect(correct);

        if (correct) {
            let pts;
            let toastMsg;
            if (wrongAttempts === 0) {
                pts = 2;
                toastMsg = '🎉 Mükemmel! +2 puan';
            } else if (wrongAttempts === 1) {
                pts = 1;
                toastMsg = '✅ Doğru! +1 puan';
            } else {
                pts = 0;
                toastMsg = '✅ Doğru! (puan yok)';
            }
            if (pts !== 0) setScore(s => s + pts);
            toast.success(toastMsg);
            setHistory(h => [...h, { term: currentQ.term, correct: true, wrongAttempts, pts }]);
        } else {
            const newWrong = wrongAttempts + 1;
            setWrongAttempts(newWrong);
            if (newWrong >= 3) {
                setScore(s => s - 1);
                toast.error(`❌ Yanlış! (${newWrong}. hata) -1 puan kesildi!`, { duration: 4000 });
            } else {
                const errMsg = newWrong === 2
                    ? '❌ Yanlış! Dikkat: bir daha yanlış yaparsan -1 puan kesilir!'
                    : '❌ Yanlış! Tekrar dene.';
                toast.error(errMsg, { duration: 4000 });
            }
            setTimeout(() => {
                setAnswered(false);
                setIsCorrect(false);
            }, 3800);
        }
    };

    const handleNext = () => {
        if (qIndex + 1 >= questions.length) {
            const pct = Math.round((score / (questions.length * 2)) * 100);
            saveMorphemeScore(score, questions.length * 2, pct);
            setFinished(true);
        } else {
            setQIndex(i => i + 1);
            setSelections({});
            setAnswered(false);
            setIsCorrect(false);
            setWrongAttempts(0);
        }
    };

    const handleRestart = () => {
        const generated = generateQuestions(allTerms);
        setQuestions(generated);
        setQIndex(0);
        setSelections({});
        setAnswered(false);
        setIsCorrect(false);
        setScore(0);
        setWrongAttempts(0);
        setFinished(false);
        setHistory([]);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md p-8 text-center shadow-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">Morfem Oyunu Yükleniyor...</h3>
                    <p className="text-muted-foreground">Kelimeler veritabanından çekiliyor...</p>
                </Card>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md p-8 text-center shadow-xl">
                    <h3 className="text-xl font-semibold mb-2 text-destructive">Hata</h3>
                    <p className="text-muted-foreground mb-4">Oyun için kelime havuzu bulunamadı. Lütfen daha sonra tekrar deneyin.</p>
                    <Button asChild className="gradient-primary">
                        <Link to="/games">Oyunlara Dön</Link>
                    </Button>
                </Card>
            </div>
        );
    }

    // Bitiş Ekranı
    if (finished) {
        const pct = Math.round((score / (questions.length * 2)) * 100);
        const correctCount = history.filter(h => h.correct).length;

        return (
            <div className="min-h-screen bg-muted/30 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-2 border-primary/20 shadow-2xl">
                        <CardContent className="p-10 text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Oyun Tamamlandı!</h2>
                            <p className="text-muted-foreground mb-8">Tüm soruları yanıtladın.</p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-primary/10 rounded-xl p-4">
                                    <div className="text-3xl font-bold text-primary">{score}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Toplam Puan</div>
                                </div>
                                <div className="bg-secondary/10 rounded-xl p-4">
                                    <div className="text-3xl font-bold text-secondary">{correctCount}/{questions.length}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Doğru</div>
                                </div>
                                <div className={`rounded-xl p-4 ${pct >= 80 ? 'bg-emerald-100 dark:bg-emerald-950/30' : pct >= 60 ? 'bg-sky-100 dark:bg-sky-950/30' : 'bg-amber-100 dark:bg-amber-950/30'}`}>
                                    <div className={`text-3xl font-bold ${pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-sky-600' : 'text-amber-600'}`}>{pct}%</div>
                                    <div className="text-xs text-muted-foreground mt-1">Başarı</div>
                                </div>
                            </div>

                            {/* history */}
                            <div className="text-left mb-8 max-h-60 overflow-y-auto space-y-2 pr-1">
                                {history.map((h, i) => (
                                    <div key={i} className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm ${h.pts > 0
                                        ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800'
                                        : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800'
                                        }`}>
                                        <span className="font-semibold">{h.term}</span>
                                        <span className={h.pts > 0 ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}>
                                            {h.pts > 0 ? `✓ +${h.pts} puan` : `✗ ${h.pts} puan`}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button onClick={handleRestart} size="lg" className="gradient-primary">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Tekrar Oyna
                                </Button>
                                <Button asChild variant="outline" size="lg">
                                    <Link to="/games">Oyunlara Dön</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const progress = (qIndex / questions.length) * 100;

    return (
        <div className="min-h-screen bg-muted/30 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Button asChild variant="ghost" size="sm">
                        <Link to="/games"><ArrowLeft className="w-4 h-4 mr-1" />Oyunlar</Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card rounded-full border shadow-sm text-sm font-semibold">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span>{score} puan</span>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                            {qIndex + 1} / {questions.length}
                        </div>
                    </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2 mb-8 overflow-hidden">
                    <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <Card className="mb-6 border-2 shadow-xl">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Puzzle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Tanım</span>
                        </div>
                        <CardDescription className="text-base text-foreground font-medium leading-relaxed">
                            {currentQ.definition}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        <div className="rounded-xl bg-muted/50 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5" />
                                    Oluşturulan Terim
                                </div>
                                {Object.keys(selections).length > 0 && !answered && (
                                    <button
                                        onClick={() => setSelections({})}
                                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 hover:border-gray-400 transition-all"
                                        title="Seçimleri temizle"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                        Temizle
                                    </button>
                                )}
                            </div>
                            <BuiltTermDisplay parts={currentQ.parts} selections={selections} />
                        </div>

                        {answered && isCorrect && (
                            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-700 rounded-xl text-emerald-700 dark:text-emerald-300 font-semibold animate-in fade-in">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <span>
                                    Doğru! <span className="font-bold text-emerald-800 dark:text-emerald-200">{currentQ.term}</span> 🎉
                                </span>
                            </div>
                        )}

                        {answered && !isCorrect && (
                            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 font-semibold animate-in fade-in">
                                <XCircle className="w-5 h-5 flex-shrink-0" />
                                <span>Yanlış! Lütfen doğru kökü seçtiğinizden emin olun.</span>
                            </div>
                        )}

                        <div className="space-y-3">
                            <MorphemeSlot
                                type="root"
                                options={slotOptions.root || []}
                                selected={selections.root || null}
                                onSelect={handleSelect}
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            {!answered || !isCorrect ? (
                                <Button
                                    onClick={handleCheck}
                                    disabled={!isAllSelected()}
                                    className="flex-1 gradient-primary font-semibold text-base py-6"
                                >
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    Onayla
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    className="flex-1 gradient-primary font-semibold text-base py-6"
                                >
                                    {qIndex + 1 >= questions.length ? (
                                        <>
                                            <Trophy className="w-5 h-5 mr-2" />
                                            Sonuçları Gör
                                        </>
                                    ) : (
                                        <>
                                            Sonraki Soru
                                            <ChevronRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground">
                    Doğru kök seçeneğini belirleyin. Doğru yanıtta <strong>+2</strong>, tekrar denemede <strong>+1</strong> puan.
                </p>
            </div>
        </div>
    );
};
