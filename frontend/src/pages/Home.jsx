import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, getStats } from '@/utils/storage';

export const Home = () => {
  const loggedIn = isLoggedIn();
  const stats = loggedIn ? getStats() : null;

  // Tab State: 'quiz' | 'flashcard' | 'match'
  const [demoMode, setDemoMode] = useState('quiz');

  // Hero Card State (Flippable for extra interactive flair)
  const [heroCardFlipped, setHeroCardFlipped] = useState(false);

  // ----------------------------------------------------
  // QUIZ STATE & DATA
  // ----------------------------------------------------
  const demoQuestions = [
    {
      term: 'Sustentaculum Tali',
      options: [
        'Diz kapağını koruyan eklem kıkırdağı',
        'Aşık kemiğini destekleyen topuk kemiği çıkıntısı',
        'Kaval kemiğinin alt ucundaki iç çıkıntı'
      ],
      answer: 'Aşık kemiğini destekleyen topuk kemiği çıkıntısı',
      description: 'Sustentaculum tali, calcaneus (topuk kemiği) üzerinde yer alan ve talus (aşık kemiği) gövdesini alttan destekleyen önemli bir raf benzeri kemik çıkıntısıdır.'
    },
    {
      term: 'Olecranon',
      options: ['Köprücük Kemiği', 'Dirsek Çıkıntısı', 'Kürek Kemiği'],
      answer: 'Dirsek Çıkıntısı',
      description: 'Olecranon, ulna (dirsek kemiği) kemiğinin üst ucunda yer alan ve dirsek ekleminin arkasını oluşturan belirgin çıkıntıdır.'
    },
    {
      term: 'Os Frontale',
      options: ['Alın Kemiği', 'Şakak Kemiği', 'Yanak Kemiği'],
      answer: 'Alın Kemiği',
      description: 'Os frontale, kafatasının ön kısmını oluşturan, alın bölgesini ve göz çukurlarının üst tavanını kaplayan yassı kemiktir.'
    }
  ];

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleQuizAnswer = (option) => {
    if (selectedQuizOption !== null) return;
    setSelectedQuizOption(option);
    if (option === demoQuestions[currentQuizIndex].answer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedQuizOption(null);
    if (currentQuizIndex < demoQuestions.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // ----------------------------------------------------
  // FLASHCARD STATE & DATA
  // ----------------------------------------------------
  const demoFlashcards = [
    {
      term: 'Sternum',
      meaning: 'Göğüs Kemiği',
      description: 'Göğüs kafesinin ön ortasında yer alan, kaburgaların birleştiği yassı kemik.'
    },
    {
      term: 'Clavicula',
      meaning: 'Köprücük Kemiği',
      description: 'Boyun ile omuz arasında uzanan, göğüs kafesi ile kürek kemiğini bağlayan yatay kemik.'
    },
    {
      term: 'Patella',
      meaning: 'Diz Kapağı',
      description: 'Diz ekleminin önünde yer alan, uyluk kaslarının tendonunu koruyan susamsı (sesamoid) kemik.'
    }
  ];

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const handleNextFlashcard = () => {
    setFlashcardFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev + 1) % demoFlashcards.length);
  };

  const handlePrevFlashcard = () => {
    setFlashcardFlipped(false);
    setCurrentFlashcardIndex((prev) => (prev - 1 + demoFlashcards.length) % demoFlashcards.length);
  };

  // ----------------------------------------------------
  // MATCHING STATE & DATA
  // ----------------------------------------------------
  const initialTerms = [
    { id: 1, text: 'Sustentaculum Tali' },
    { id: 2, text: 'Sternum' },
    { id: 3, text: 'Os Frontale' }
  ];

  const initialMeanings = [
    { id: 2, text: 'Göğüs Kemiği' },
    { id: 1, text: 'Aşık kemiğini destekleyen çıkıntı' },
    { id: 3, text: 'Alın Kemiği' }
  ];

  const [selectedTermId, setSelectedTermId] = useState(null);
  const [selectedMeaningId, setSelectedMeaningId] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [matchError, setMatchError] = useState(false);

  const handleTermClick = (id) => {
    if (matchedIds.includes(id) || matchError) return;
    setSelectedTermId(id);

    if (selectedMeaningId !== null) {
      if (id === selectedMeaningId) {
        setMatchedIds((prev) => [...prev, id]);
        setSelectedTermId(null);
        setSelectedMeaningId(null);
      } else {
        setMatchError(true);
        setTimeout(() => {
          setSelectedTermId(null);
          setSelectedMeaningId(null);
          setMatchError(false);
        }, 800);
      }
    }
  };

  const handleMeaningClick = (id) => {
    if (matchedIds.includes(id) || matchError) return;
    setSelectedMeaningId(id);

    if (selectedTermId !== null) {
      if (id === selectedTermId) {
        setMatchedIds((prev) => [...prev, id]);
        setSelectedTermId(null);
        setSelectedMeaningId(null);
      } else {
        setMatchError(true);
        setTimeout(() => {
          setSelectedTermId(null);
          setSelectedMeaningId(null);
          setMatchError(false);
        }, 800);
      }
    }
  };

  const resetMatchGame = () => {
    setSelectedTermId(null);
    setSelectedMeaningId(null);
    setMatchedIds([]);
    setMatchError(false);
  };

  return (
    <main className="font-sans text-gray-800 bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="hero-gradient pt-16 pb-24 overflow-hidden" data-purpose="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          {/* Content Column */}
          <div className="lg:w-1/2 z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[1px] w-8 bg-medical-accent"></div>
              <span className="uppercase tracking-widest text-xs font-bold text-medical-accent">Sınava Hazırlananlar İçin</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-medical-dark leading-[1.1] mb-8">
              Tıbbi Terimleri <br />
              <span className="italic font-serif-italic font-normal">Ezberlemeden,</span> Kalıcı <br />
              Öğren
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
              Kök, önek ve sonekleri oyunlaştırılmış kartlarla pekiştir. Sınav öncesi hızlı tekrar için tasarlandı — kayıt olmadan hemen dene.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {loggedIn ? (
                <Link
                  to="/study"
                  className="px-8 py-4 bg-medical-dark text-white rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
                >
                  Çalışmaya Başla
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="px-8 py-4 bg-medical-dark text-white rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
                >
                  Ücretsiz Başla
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </Link>
              )}
              <a
                href="#demo"
                className="text-medical-dark font-semibold border-b-2 border-medical-dark pb-0.5 flex items-center gap-1 hover:text-medical-accent hover:border-medical-accent transition-all"
              >
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                Kayıt olmadan dene
              </a>
            </div>

            {/* Conditionally Render Stats or General Badges */}
            {loggedIn && stats ? (
              <div className="mt-12 flex gap-8 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-accent"></div>
                  <span><strong className="text-medical-dark">{stats.learnedTerms || 0}</strong> Öğrenilen Terim</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-accent"></div>
                  <span><strong className="text-medical-dark">{stats.currentStreak || 0} Günlük</strong> Seri</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-accent"></div>
                  <span><strong className="text-medical-dark">%{stats.averageQuizScore || 0}</strong> Ortalama Başarı</span>
                </div>
              </div>
            ) : (
              <div className="mt-12 flex flex-wrap gap-8 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-dark"></div>
                  500+ tıbbi terim
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-dark"></div>
                  3 oyun modu
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-dark"></div>
                  Günlük tekrar sistemi
                </div>
              </div>
            )}
          </div>

          {/* Graphic Column (Simulated Flippable Flashcards) */}
          <div className="lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-md float-anim cursor-pointer perspective-1000 aspect-[4/3]"
              onClick={() => setHeroCardFlipped(!heroCardFlipped)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  heroCardFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col p-8 backface-hidden">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                    <div className="bg-medical-accent w-6 h-4 rounded-sm shadow-sm"></div>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-gray-400 mb-2">LATİN TERİM</span>
                  <h3 className="text-4xl font-bold text-medical-dark mb-6">Sternum</h3>
                  <p className="text-gray-500 leading-relaxed mb-auto">
                    Göğüs kemiği; kaburgaların birleştiği orta hat.
                  </p>
                  <span className="text-xs text-gray-400 self-end italic">Çevirmek için tıkla</span>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full bg-medical-light border border-gray-100 rounded-2xl shadow-2xl flex flex-col p-8 rotate-y-180 backface-hidden">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-3 h-3 rounded-full border border-gray-300"></div>
                    <div className="bg-medical-dark w-6 h-4 rounded-sm shadow-sm"></div>
                  </div>
                  <span className="text-xs font-bold tracking-widest text-medical-accent mb-2">TÜRKÇE ANLAMI</span>
                  <h3 className="text-4xl font-bold text-medical-dark mb-6">Göğüs Kemiği</h3>
                  <p className="text-gray-600 leading-relaxed mb-auto">
                    Ön tarafta kaburgaların birleştiği yassı kemik. Kalp ve büyük damarları korur.
                  </p>
                  <span className="text-xs text-gray-400 self-end italic">Çevirmek için tıkla</span>
                </div>
              </div>

              {/* Stack effect background cards (decorations) */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-white border border-gray-100 rounded-2xl shadow-xl transform rotate-[-6deg] opacity-20 -z-30 pointer-events-none"></div>
              <div className="absolute -top-2 -left-2 w-full h-full bg-white border border-gray-100 rounded-2xl shadow-xl transform rotate-[-3deg] opacity-40 -z-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SECTION */}
      <section className="py-24 bg-white border-t border-gray-100" id="demo" data-purpose="interactive-quiz">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[1px] w-8 bg-medical-accent"></div>
                <span className="uppercase tracking-widest text-xs font-bold text-medical-accent">Kayıt Olmadan Dene</span>
              </div>
              <h2 className="text-4xl font-bold text-medical-dark leading-tight">
                Anlatmak yerine <span className="italic font-serif-italic font-normal text-medical-dark">gösteriyoruz</span>
              </h2>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200">
              <button
                onClick={() => setDemoMode('quiz')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  demoMode === 'quiz' ? 'bg-white shadow-sm text-medical-dark' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Quiz
              </button>
              <button
                onClick={() => setDemoMode('flashcard')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  demoMode === 'flashcard' ? 'bg-white shadow-sm text-medical-dark' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Flashcard
              </button>
              <button
                onClick={() => setDemoMode('match')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  demoMode === 'match' ? 'bg-white shadow-sm text-medical-dark' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Eşleştirme
              </button>
            </div>
          </div>

          {/* MAIN DEMO CONTAINER */}
          <div className="bg-medical-light/50 border border-gray-200 rounded-[2.5rem] p-8 md:p-16 max-w-5xl mx-auto min-h-[450px] flex flex-col justify-center shadow-sm">
            {/* 1. QUIZ MODE */}
            {demoMode === 'quiz' && (
              <div className="w-full">
                {!quizFinished ? (
                  <div className="text-center w-full">
                    <div className="flex justify-between items-center mb-10">
                      <span className="text-gray-500 font-medium">Soru {currentQuizIndex + 1} / 3</span>
                      <div className="px-4 py-1.5 bg-white rounded-full border border-gray-200 text-sm font-semibold text-medical-dark">
                        Skor: {quizScore}
                      </div>
                    </div>
                    <div className="mb-12">
                      <span className="text-xs font-bold tracking-[0.2em] text-medical-accent uppercase block mb-4">LATİN TERİM</span>
                      <h3 className="text-4xl md:text-5xl font-bold text-medical-dark tracking-tight">
                        {demoQuestions[currentQuizIndex].term}
                      </h3>
                    </div>

                    {/* Quiz Options */}
                    <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
                      {demoQuestions[currentQuizIndex].options.map((option, idx) => {
                        const isCorrect = option === demoQuestions[currentQuizIndex].answer;
                        const isSelected = option === selectedQuizOption;
                        let btnClass =
                          'w-full py-5 bg-white border border-gray-200 rounded-xl text-lg font-medium text-medical-dark hover:border-medical-dark hover:shadow-md transition-all text-center px-6';

                        if (selectedQuizOption !== null) {
                          if (isCorrect) {
                            btnClass =
                              'w-full py-5 border border-emerald-500 bg-emerald-50 text-emerald-700 rounded-xl text-lg font-medium transition-all text-center px-6 relative';
                          } else if (isSelected) {
                            btnClass =
                              'w-full py-5 border border-rose-500 bg-rose-50 text-rose-700 rounded-xl text-lg font-medium transition-all text-center px-6 relative';
                          } else {
                            btnClass =
                              'w-full py-5 bg-white border border-gray-200 rounded-xl text-lg font-medium text-medical-dark opacity-50 rounded-xl text-center px-6 pointer-events-none';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleQuizAnswer(option)}
                            disabled={selectedQuizOption !== null}
                            className={btnClass}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* Quiz Explanation & Next Button */}
                    {selectedQuizOption !== null && (
                      <div className="mt-8 max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-2xl text-left animate-fadeIn">
                        <h4 className="font-bold text-medical-dark mb-2">
                          {selectedQuizOption === demoQuestions[currentQuizIndex].answer ? '✓ Doğru Cevap!' : '✗ Yanlış Cevap'}
                        </h4>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                          {demoQuestions[currentQuizIndex].description}
                        </p>
                        <button
                          onClick={handleNextQuiz}
                          className="w-full py-3 bg-medical-dark text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                          {currentQuizIndex === demoQuestions.length - 1 ? 'Sonuçları Gör' : 'Sonraki Soru →'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-medical-accent/15 rounded-full flex items-center justify-center mx-auto mb-6 text-medical-accent">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-medical-dark mb-4">Quiz Tamamlandı!</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Harika bir deneme! Toplam 3 sorudan <strong className="text-medical-accent">{quizScore} tanesini</strong> doğru cevapladın.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-sm mx-auto">
                      <button
                        onClick={resetQuiz}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                      >
                        Yeniden Dene
                      </button>
                      <Link
                        to="/register"
                        className="px-6 py-3 bg-medical-dark text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center animate-pulse"
                      >
                        Ücretsiz Kaydol
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. FLASHCARD MODE */}
            {demoMode === 'flashcard' && (
              <div className="w-full text-center flex flex-col items-center">
                <div className="flex justify-between items-center w-full mb-10 max-w-md">
                  <span className="text-gray-500 font-medium">Örnek {currentFlashcardIndex + 1} / 3</span>
                  <span className="text-xs text-gray-400 italic">Kartın üzerine tıklayarak çevirebilirsin.</span>
                </div>

                {/* 3D Flippable Card */}
                <div
                  className="w-full max-w-md aspect-[4/3] cursor-pointer perspective-1000 mb-8"
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                      flashcardFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* CARD FRONT */}
                    <div className="absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-3xl shadow-md p-8 flex flex-col justify-center items-center backface-hidden">
                      <span className="text-xs font-bold tracking-[0.2em] text-medical-accent uppercase mb-4">LATİN TERİM</span>
                      <h3 className="text-4xl font-extrabold text-medical-dark tracking-tight mb-2">
                        {demoFlashcards[currentFlashcardIndex].term}
                      </h3>
                      <p className="text-xs text-gray-400 mt-8">Anlamını görmek için tıkla</p>
                    </div>

                    {/* CARD BACK */}
                    <div className="absolute inset-0 w-full h-full bg-medical-light border border-gray-200 rounded-3xl shadow-md p-8 flex flex-col justify-center items-center rotate-y-180 backface-hidden">
                      <span className="text-xs font-bold tracking-[0.2em] text-medical-accent uppercase mb-4">TÜRKÇE ANLAMI</span>
                      <h3 className="text-3xl font-extrabold text-medical-dark tracking-tight mb-4 text-center">
                        {demoFlashcards[currentFlashcardIndex].meaning}
                      </h3>
                      <p className="text-gray-600 text-sm text-center leading-relaxed">
                        {demoFlashcards[currentFlashcardIndex].description}
                      </p>
                      <p className="text-xs text-gray-400 mt-6">Terimi görmek için tıkla</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handlePrevFlashcard}
                    className="p-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </button>
                  <button
                    onClick={handleNextFlashcard}
                    className="p-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* 3. MATCHING MODE */}
            {demoMode === 'match' && (
              <div className="w-full">
                {matchedIds.length < 3 ? (
                  <div className="text-center w-full">
                    <div className="flex justify-between items-center mb-10">
                      <span className="text-gray-500 font-medium">Terimler ve Anlamlarını Eşleştir</span>
                      <button
                        onClick={resetMatchGame}
                        className="text-xs font-semibold text-medical-dark underline hover:text-medical-accent"
                      >
                        Sıfırla
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                      {/* Left Column: Latin Terms */}
                      <div className="space-y-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block text-left mb-2">
                          TIBBİ TERİM
                        </span>
                        {initialTerms.map((term) => {
                          const isMatched = matchedIds.includes(term.id);
                          const isSelected = selectedTermId === term.id;
                          let boxClass =
                            'w-full py-4 px-6 border text-left rounded-xl font-medium transition-all duration-200 ';

                          if (isMatched) {
                            boxClass +=
                              'bg-emerald-50 border-emerald-500 text-emerald-700 opacity-60 pointer-events-none cursor-default';
                          } else if (isSelected) {
                            boxClass += matchError
                              ? 'bg-rose-50 border-rose-500 text-rose-700'
                              : 'bg-medical-accent/5 border-medical-accent text-medical-accent';
                          } else {
                            boxClass += 'bg-white border-gray-200 text-medical-dark hover:border-medical-dark shadow-sm';
                          }

                          return (
                            <button
                              key={term.id}
                              onClick={() => handleTermClick(term.id)}
                              className={boxClass}
                              disabled={isMatched}
                            >
                              <div className="flex justify-between items-center">
                                <span>{term.text}</span>
                                {isMatched && <span className="text-emerald-600 text-xs">✓ Eşleşti</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Right Column: Turkish Meanings */}
                      <div className="space-y-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block text-left mb-2">
                          AÇIKLAMA / ANLAMI
                        </span>
                        {initialMeanings.map((meaning) => {
                          const isMatched = matchedIds.includes(meaning.id);
                          const isSelected = selectedMeaningId === meaning.id;
                          let boxClass =
                            'w-full py-4 px-6 border text-left rounded-xl font-medium transition-all duration-200 ';

                          if (isMatched) {
                            boxClass +=
                              'bg-emerald-50 border-emerald-500 text-emerald-700 opacity-60 pointer-events-none cursor-default';
                          } else if (isSelected) {
                            boxClass += matchError
                              ? 'bg-rose-50 border-rose-500 text-rose-700'
                              : 'bg-medical-accent/5 border-medical-accent text-medical-accent';
                          } else {
                            boxClass += 'bg-white border-gray-200 text-medical-dark hover:border-medical-dark shadow-sm';
                          }

                          return (
                            <button
                              key={meaning.id}
                              onClick={() => handleMeaningClick(meaning.id)}
                              className={boxClass}
                              disabled={isMatched}
                            >
                              <div className="flex justify-between items-center">
                                <span>{meaning.text}</span>
                                {isMatched && <span className="text-emerald-600 text-xs">✓ Eşleşti</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-medical-accent/15 rounded-full flex items-center justify-center mx-auto mb-6 text-medical-accent animate-bounce">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-medical-dark mb-4">Tüm Terimler Eşleşti!</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Harika iş çıkardın! Hepsini mükemmel bir şekilde birbirine bağladın.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-sm mx-auto">
                      <button
                        onClick={resetMatchGame}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
                      >
                        Yeniden Oyna
                      </button>
                      <Link
                        to="/register"
                        className="px-6 py-3 bg-medical-dark text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
                      >
                        Ücretsiz Kaydol
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY SECTION (FEATURES) */}
      <section className="py-24 bg-white" data-purpose="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] w-8 bg-medical-dark"></div>
              <span className="uppercase tracking-widest text-xs font-bold text-medical-dark">Neden HealthLexMed</span>
            </div>
            <h2 className="text-4xl font-bold text-medical-dark leading-tight mb-4">
              Ezber değil, <span className="italic font-serif-italic font-normal text-medical-dark">tekrar</span> ve{' '}
              <span className="italic font-serif-italic font-normal text-medical-accent">oyun</span>
            </h2>
            <p className="text-gray-500 max-w-xl">
              Tıbbi terminoloji öğrenmeyi kolay ve sınav gününe hazırlayıcı hale getiren dört özellik.
            </p>
          </div>

          {/* Unified Light Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 card-shadow flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-medical-accent/10 rounded-xl flex items-center justify-center mb-10">
                <svg className="w-6 h-6 text-medical-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-medical-dark mb-4">Eğlenceli Oyunlar</h3>
              <p className="text-gray-500 leading-relaxed">
                Flashcard, eşleştirme ve quiz ile ezberlemeden, oynayarak pekiştir.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 card-shadow flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-medical-accent/10 rounded-xl flex items-center justify-center mb-10">
                <svg className="w-6 h-6 text-medical-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-medical-dark mb-4">Terim Kartları &amp; Tanımlar</h3>
              <p className="text-gray-500 leading-relaxed">
                Her terimin Latince kökünü, telaffuzunu ve Türkçe karşılığını tek kartta gör.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 card-shadow flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-medical-accent/10 rounded-xl flex items-center justify-center mb-10">
                <svg className="w-6 h-6 text-medical-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-medical-dark mb-4">Kapsamlı Kelime Havuzu</h3>
              <p className="text-gray-500 leading-relaxed">
                Kafatasından ayak bileğine, sınavda karşına çıkacak tüm kemik terimleri burada.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 card-shadow flex flex-col h-full hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-medical-accent/10 rounded-xl flex items-center justify-center mb-10">
                <svg className="w-6 h-6 text-medical-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-medical-dark mb-4">İlerleme Takibi</h3>
              <p className="text-gray-500 leading-relaxed">
                Günlük seri oluştur, hangi bölgede zayıf olduğunu gör, ona göre çalış.
              </p>
            </div>
          </div>

          {/* Statistics Strip */}
          <div className="mt-20 border border-gray-100 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3">
            <div className="p-12 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
              <div className="text-5xl font-bold text-medical-dark mb-2">500+</div>
              <div className="text-gray-500">Kayıtlı tıbbi terim</div>
            </div>
            <div className="p-12 border-b md:border-b-0 md:border-r border-gray-100 bg-white">
              <div className="text-5xl font-bold text-medical-dark mb-2">3</div>
              <div className="text-gray-500 leading-snug">Oyun modu — quiz, flashcard, eşleştirme</div>
            </div>
            <div className="p-12 bg-white">
              <div className="text-5xl font-bold text-medical-dark mb-2">0₺</div>
              <div className="text-gray-500">Denemek için gereken ücret</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="py-24 bg-medical-dark" data-purpose="footer-cta">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-12">
            <div className="w-16 h-16 rounded-full bg-medical-accent/15 flex items-center justify-center border border-medical-accent/25">
              <svg className="w-8 h-8 text-medical-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Şimdi Başla, Sınava Hazır Ol</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            Kayıt bir dakikadan az sürer. İlk terim kartını hemen açabilirsin.
          </p>
          {loggedIn ? (
            <Link
              to="/study"
              className="px-12 py-5 bg-medical-accent text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto w-fit shadow-md"
            >
              Çalisma Başla
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-12 py-5 bg-medical-accent text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto w-fit shadow-md"
            >
              Ücretsiz Başla
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </Link>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-medical-light py-10" data-purpose="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-medical-dark tracking-tight">HealthLexMed</span>
          </div>
          <div className="text-sm text-gray-500">© 2026 HealthLexMed · Tıbbi terminoloji öğrenme platformu</div>
        </div>
      </footer>
    </main>
  );
};