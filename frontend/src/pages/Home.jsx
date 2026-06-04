import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Trophy, BookOpen, Gamepad2, TrendingUp, Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { isLoggedIn, getStats } from '@/utils/storage';

export const Home = () => {
  const loggedIn = isLoggedIn();
  const stats = loggedIn ? getStats() : null;

  const features = [
    {
      icon: BookOpen,
      title: 'Kapsamlı Kelime Havuzu',
      description: 'Kafatası, yüz, gövde ve üst/alt ekstremite kemiklerini içeren detaylı kemik anatomisi terimleri',
      color: 'primary'
    },
    {
      icon: Gamepad2,
      title: 'Eğlenceli Oyunlar',
      description: 'Flashcard, eşleştirme ve quiz oyunları ile eğlenerek öğren',
      color: 'secondary'
    },
    {
      icon: TrendingUp,
      title: 'İlerleme Takibi',
      description: 'Öğrenme sürecini takip et, günlük seriler oluştur, başarılarını gör',
      color: 'accent'
    },
    {
      icon: Sparkles,
      title: 'Terim Kartları & Tanımlar',
      description: "Kelimelerin Latince, İngilizce karşılıklarını öğren, flashcard'lar ve pratik oyunlarla hafızana kalıcı olarak işle.",
      color: 'success'
    }
  ];

  // Mini Demo State & Data
  const demoQuestions = [
    {
      term: 'Caput Radii',
      options: ['Radius Boynu', 'Radius Başı', 'Radius Pürtüğü'],
      answer: 'Radius Başı',
      description: 'Radius (döner kemik) başı anlamına gelir.'
    },
    {
      term: 'Olecranon',
      options: ['Köprücük Kemiği', 'Dirsek Çıkıntısı', 'Kürek Kemiği'],
      answer: 'Dirsek Çıkıntısı',
      description: 'Ulnanın (dirsek kemiği) üst ucundaki dirsek çıkıntısıdır.'
    },
    {
      term: 'Os Frontale',
      options: ['Alın Kemiği', 'Şakak Kemiği', 'Yanak Kemiği'],
      answer: 'Alın Kemiği',
      description: 'Kafatasının alın bölgesini oluşturan kemiktir.'
    }
  ];

  const [currentDemo, setCurrentDemo] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [demoScore, setDemoScore] = useState(0);
  const [demoFinished, setDemoFinished] = useState(false);

  const handleDemoAnswer = (option) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    if (option === demoQuestions[currentDemo].answer) {
      setDemoScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextDemo = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentDemo < demoQuestions.length - 1) {
      setCurrentDemo(prev => prev + 1);
    } else {
      setDemoFinished(true);
    }
  };

  const resetDemo = () => {
    setCurrentDemo(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setDemoScore(0);
    setDemoFinished(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Tıbbi Terminolojiyi
              <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Eğlenerek Öğren
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
              Tıp, hemşirelik ve diğer sağlık bilimleri öğrencileri için interaktif tıbbi terim öğrenme platformu
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {loggedIn ? (
                <Button asChild size="lg" className="gradient-primary text-lg px-8 shadow-lg hover:shadow-glow transition-all">
                  <Link to="/study">
                    Çalışmaya Başla
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="gradient-primary text-lg px-8 shadow-lg hover:shadow-glow transition-all">
                    <Link to="/register">
                      Ücretsiz Başla
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8">
                    <Link to="/login">Giriş Yap</Link>
                  </Button>
                </>
              )}
            </div>

            {loggedIn && stats && (
              <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{stats.learnedTerms}</div>
                  <div className="text-sm text-muted-foreground">Öğrenilen Terim</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">{stats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Günlük Seri</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{stats.averageQuizScore}%</div>
                  <div className="text-sm text-muted-foreground">Ortalama Puan</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Neden HealthLexMed?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tıbbi terminoloji öğrenmeyi kolay ve eğlenceli hale getiren özellikler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini Demo Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Hemen Şimdi Dene!</h2>
            <p className="text-muted-foreground">Kayıt olmadan platformun nasıl çalıştığını test et.</p>
          </div>

          <Card className="p-8 border border-primary/20 shadow-xl relative backdrop-blur bg-card/85 transition-all">
            {!demoFinished ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm font-medium text-muted-foreground border-b pb-4">
                  <span>Soru {currentDemo + 1} / {demoQuestions.length}</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Skor: {demoScore}</span>
                </div>

                <div className="text-center py-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Latin Terim</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">{demoQuestions[currentDemo].term}</h3>
                </div>

                <div className="grid gap-3">
                  {demoQuestions[currentDemo].options.map((option, idx) => {
                    const isCorrect = option === demoQuestions[currentDemo].answer;
                    const isSelected = option === selectedAnswer;
                    let btnStyle = "border border-border/80 hover:bg-muted/50 hover:border-primary/50 text-left justify-start h-auto py-4 px-6 text-base font-medium transition-all";

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnStyle = "border border-success bg-success/15 hover:bg-success/15 text-success text-left justify-start h-auto py-4 px-6 text-base font-medium flex items-center justify-between";
                      } else if (isSelected) {
                        btnStyle = "border border-destructive bg-destructive/15 hover:bg-destructive/15 text-destructive text-left justify-start h-auto py-4 px-6 text-base font-medium flex items-center justify-between";
                      } else {
                        btnStyle = "opacity-55 border border-border text-left justify-start h-auto py-4 px-6 text-base font-medium";
                      }
                    }

                    return (
                      <Button
                        key={idx}
                        onClick={() => handleDemoAnswer(option)}
                        variant="ghost"
                        className={btnStyle}
                        disabled={selectedAnswer !== null}
                      >
                        <span>{option}</span>
                        {selectedAnswer !== null && isCorrect && <Check className="w-5 h-5 ml-2 shrink-0 text-success" />}
                        {selectedAnswer !== null && isSelected && !isCorrect && <X className="w-5 h-5 ml-2 shrink-0 text-destructive" />}
                      </Button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="p-4 bg-muted/50 border rounded-lg mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="font-semibold text-foreground mb-1">Açıklama:</p>
                    <p className="text-muted-foreground">{demoQuestions[currentDemo].description}</p>
                    <div className="flex justify-end pt-4 border-t mt-4">
                      <Button onClick={handleNextDemo} size="lg" className="gradient-primary">
                        {currentDemo === demoQuestions.length - 1 ? 'Sonucu Gör' : 'Sonraki Soru'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 space-y-6">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
                <div>
                  <h3 className="text-3xl font-extrabold text-foreground mb-2">Tebrikler!</h3>
                  <p className="text-xl text-muted-foreground">
                    Mini demoyu tamamladınız. Doğru sayısı: <span className="font-bold text-primary">{demoScore} / {demoQuestions.length}</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button asChild size="lg" className="gradient-primary text-base">
                    <Link to="/register">
                      Tüm Terimleri Öğren
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button onClick={resetDemo} size="lg" variant="outline" className="text-base">
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Tekrar Dene
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {!loggedIn && (
        <section className="py-16 bg-gradient-to-r from-primary via-secondary to-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Şimdi Başla, Başarıya Ulaş!
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Binlerce sağlık profesyoneli tıbbi terminolojiyi HealthLexMed ile öğreniyor
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 shadow-xl">
                <Link to="/register">
                  Ücretsiz Hesap Oluştur
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};