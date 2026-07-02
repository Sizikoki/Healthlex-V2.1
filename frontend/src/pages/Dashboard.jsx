import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStats, getUser, getStreak, getProgress } from '@/utils/storage';
import { getAllTerms } from '@/data/medicalTerms';

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const stats = getStats();
  const streak = getStreak();
  const progress = getProgress();
  const terms = getAllTerms();

  const [inProp, setInProp] = useState(false);
  const [totdFlipped, setTotdFlipped] = useState(false);

  useEffect(() => {
    // Trigger the slide-up reveal animations on mount
    setInProp(true);
  }, []);

  // ----------------------------------------------------
  // Dynamic Category Progress Calculations
  // ----------------------------------------------------
  const catList = [
    { id: 'skull_bones', name: 'Kafatası Kemikleri' },
    { id: 'face_bones', name: 'Yüz Kemikleri' },
    { id: 'trunk_bones', name: 'Gövde Kemikleri' },
    { id: 'upper_extremity_bones', name: 'Üst Ekstremite Kemikleri' },
    { id: 'lower_extremity_bones', name: 'Alt Ekstremite Kemikleri' },
  ];

  const getCategoryProgress = (catId) => {
    const catTerms = terms.filter(t => t.category === catId || t.subcategory === catId);
    if (catTerms.length === 0) return 0;
    const learnedCatTerms = catTerms.filter(t => progress[t.id]?.learned);
    return Math.round((learnedCatTerms.length / catTerms.length) * 100);
  };

  // Find active category to resume (first category that is partially done, or default to first)
  let activeCategory = catList.find(c => {
    const p = getCategoryProgress(c.id);
    return p > 0 && p < 100;
  }) || catList[3]; // Default to Upper Extremity if none are started

  const activeProgress = getCategoryProgress(activeCategory.id);
  const activeCatTerms = terms.filter(t => t.category === activeCategory.id || t.subcategory === activeCategory.id);
  const activeLearnedCount = activeCatTerms.filter(t => progress[t.id]?.learned).length;
  const activeTotalCount = activeCatTerms.length;

  // ----------------------------------------------------
  // Rotating Term of the Day
  // ----------------------------------------------------
  const termsOfTheDay = [
    { term: 'Malleolus', meaning: 'Ayak bileğinin iç ve dış çıkıntıları; tibia ve fibulanın alt uçlarında yer alır.' },
    { term: 'Sustentaculum Tali', meaning: 'Topuk kemiğinin aşık kemiğini destekleyen raf benzeri çıkıntısı.' },
    { term: 'Olecranon', meaning: 'Dirsek ucu çıkıntısı; ulnanın üst ucunda yer alır ve dirseğin arkasını oluşturur.' },
    { term: 'Symphysis Pubica', meaning: 'Çatı kemiklerinin ön ortadaki birleşme yeri; kıkırdak eklem yapısı.' },
    { term: 'Acromion', meaning: 'Kürek kemiğinin omuz başını oluşturan en dış çıkıntısı.' },
    { term: 'Patella', meaning: 'Diz kapağı kemiği; diz eklemini koruyan yassı susamsı kemik.' },
    { term: 'Processus Styloideus', meaning: 'Şakak kemiğinin veya döner kemiğin altındaki kalem benzeri ince çıkıntı.' }
  ];

  const todayIndex = new Date().getDate() % termsOfTheDay.length;
  const todayTerm = termsOfTheDay[todayIndex];

  return (
    <div className="dashboard-theme min-h-screen bg-[var(--paper)]">
      <main className="py-[40px] px-0">
        <div className="wrap">
          
          {/* WELCOME BLOCK */}
          <section className="mb-[52px]">
            <div className={`welcome p-[34px] md:p-[36px] rounded-[18px] transition-all duration-500 transform ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <div>
                <div className="eyebrow text-[#93C5FD] text-[0.72rem] tracking-[0.12em] uppercase font-semibold mb-2">
                  Hoş geldin
                </div>
                <h1 className="font-serif font-semibold text-[1.8rem] md:text-[2.2rem] leading-[1.2] mb-2 tracking-tight">
                  Merhaba, {user?.name || 'Kullanıcı'} 👋
                </h1>
                <p className="text-[#D0E1F9] text-[0.98rem] max-w-[44ch] leading-[1.5]">
                  Bugün {terms.length - stats.learnedTerms > 10 ? 12 : Math.max(3, terms.length - stats.learnedTerms)} terim seni bekliyor. Serini bozma — 5 dakikanı ayır, kaldığın yerden devam et.
                </p>
                <div className="welcome-pills flex gap-[16px] text-[0.82rem] text-[#D0E1F9] mt-6">
                  <span className="flex items-center gap-[6px]">
                    <span className="dot w-[5px] h-[5px] rounded-full bg-white opacity-60"></span>
                    {stats.learnedTerms} terim öğrenildi
                  </span>
                  <span className="flex items-center gap-[6px]">
                    <span className="dot w-[5px] h-[5px] rounded-full bg-white opacity-60"></span>
                    %{stats.averageQuizScore || 0} ortalama başarı
                  </span>
                </div>
              </div>
              <div className="welcome-cta flex flex-col items-end gap-[10px]">
                <button
                  onClick={() => navigate('/study')}
                  className="btn btn-primary bg-[var(--coral)] text-white font-semibold text-[0.94rem] px-[20px] py-[12px] rounded-[9px] hover:bg-[#a83a26] transition-all"
                >
                  Bugünkü Tekrara Başla →
                </button>
                <button
                  onClick={() => document.getElementById('modes')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-ghost-light bg-white/10 text-white border border-white/25 font-semibold text-[0.94rem] px-[20px] py-[12px] rounded-[9px] hover:bg-white/20 transition-all"
                >
                  Oyun Seç
                </button>
              </div>
            </div>
          </section>

          {/* MODE TILES */}
          <section className="mb-[52px]" id="modes">
            <div className={`section-head flex justify-between items-end mb-[20px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h2 className="font-serif font-semibold text-[1.45rem] tracking-tight text-[var(--ink)]">
                Bugün Ne Çalışmak İstersin?
              </h2>
            </div>
            <div className={`tiles grid grid-cols-1 md:grid-cols-3 gap-[18px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {/* Quiz Tile */}
              <div 
                className="tile bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] md:p-[24px] flex flex-col gap-[14px] cursor-pointer hover:border-[var(--teal)] hover:-translate-y-0.5 transition-all"
                onClick={() => navigate('/quiz')}
              >
                <div className="ic ic-teal w-[42px] h-[42px] rounded-[10px] bg-[#E0ECFD] color-[var(--teal-deep)] flex items-center justify-center">
                  <svg className="w-[21px] h-[21px] text-[var(--teal-deep)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.5 9.5a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 1.9-2.4 3.7M12 17h.01" />
                  </svg>
                </div>
                <h3 className="text-[1.02rem] font-bold text-[var(--ink)] m-0">Quiz</h3>
                <p className="text-[0.86rem] text-[var(--muted)] leading-[1.5] m-0">
                  Çoktan seçmeli sorularla bilgini test et, anında geri bildirim al.
                </p>
                <span className="go mt-auto font-semibold text-[0.84rem] text-[var(--teal-deep)] flex items-center gap-[6px]">
                  Başla →
                </span>
              </div>

              {/* Flashcard Tile */}
              <div 
                className="tile bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] md:p-[24px] flex flex-col gap-[14px] cursor-pointer hover:border-[var(--teal)] hover:-translate-y-0.5 transition-all"
                onClick={() => navigate('/flashcards')}
              >
                <div className="ic ic-coral w-[42px] h-[42px] rounded-[10px] bg-[#F7E4DE] color-[var(--coral)] flex items-center justify-center">
                  <svg className="w-[21px] h-[21px] text-[var(--coral)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="2" />
                    <path d="M8 8h8M8 12h8M8 16h5" />
                  </svg>
                </div>
                <h3 className="text-[1.02rem] font-bold text-[var(--ink)] m-0">Flashcard</h3>
                <p className="text-[0.86rem] text-[var(--muted)] leading-[1.5] m-0">
                  Kartları çevir, terimleri ve tanımlarını tekrar ederek pekiştir.
                </p>
                <span className="go mt-auto font-semibold text-[0.84rem] text-[var(--teal-deep)] flex items-center gap-[6px]">
                  Başla →
                </span>
              </div>

              {/* Match Tile */}
              <div 
                className="tile bg-white border border-[var(--line)] rounded-[var(--radius)] p-[26px] md:p-[24px] flex flex-col gap-[14px] cursor-pointer hover:border-[var(--teal)] hover:-translate-y-0.5 transition-all"
                onClick={() => navigate('/match')}
              >
                <div className="ic ic-gold w-[42px] h-[42px] rounded-[10px] bg-[#FBEFE1] color-[var(--gold)] flex items-center justify-center">
                  <svg className="w-[21px] h-[21px] text-[var(--gold)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3v18M18 3v18M3 8l3-3 3 3M21 16l-3 3-3-3" />
                  </svg>
                </div>
                <h3 className="text-[1.02rem] font-bold text-[var(--ink)] m-0">Eşleştirme</h3>
                <p className="text-[0.86rem] text-[var(--muted)] leading-[1.5] m-0">
                  Latince terimleri Türkçe karşılıklarıyla eşleştir, hızını artır.
                </p>
                <span className="go mt-auto font-semibold text-[0.84rem] text-[var(--teal-deep)] flex items-center gap-[6px]">
                  Başla →
                </span>
              </div>
            </div>
          </section>

          {/* TWO COLUMN: TERM OF THE DAY & RESUME */}
          <section className="mb-[52px]">
            <div className="two-col grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              
              {/* Term of Day Flippable Card */}
              <div className={`totd-card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px] flex flex-col items-center text-center transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div className="eyebrow text-[0.72rem] tracking-[0.12em] uppercase font-semibold text-[var(--teal)] mb-[8px]">
                  Bugünün Terimi
                </div>
                <div 
                  className={`flip-card w-[260px] h-[170px] cursor-pointer my-[14px] ${totdFlipped ? 'flipped' : ''}`}
                  onClick={() => setTotdFlipped(!totdFlipped)}
                >
                  <div className="flip-inner relative w-full h-full duration-500 transform-style-3d">
                    {/* Front Face */}
                    <div className="flip-face absolute inset-0 rounded-[12px] border border-[var(--line)] flex flex-col items-center justify-center p-[18px] bg-[var(--paper)] backface-hidden">
                      <div className="lbl font-mono text-[0.68rem] tracking-[0.1em] text-[var(--teal)] uppercase mb-[8px]">
                        Latin Terim
                      </div>
                      <div className="term font-mono text-[1.5rem] font-bold text-[var(--ink)]">
                        {todayTerm.term}
                      </div>
                    </div>
                    {/* Back Face */}
                    <div className="flip-face flip-back absolute inset-0 rounded-[12px] flex flex-col items-center justify-center p-[18px] bg-[var(--teal-deep)] text-white rotate-y-180 backface-hidden">
                      <p className="text-[0.9rem] leading-[1.5] text-[#E0ECFD] m-0">
                        {todayTerm.meaning}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flip-hint text-[0.78rem] text-[var(--muted)]">
                  ↻ çevirmek için dokun
                </div>
              </div>

              {/* Resume Last Category Card */}
              <div className={`resume-card bg-white border border-[var(--line)] rounded-[var(--radius)] p-[28px] flex flex-col justify-between transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <div>
                  <div className="resume-top flex justify-between items-start gap-[14px]">
                    <div>
                      <div className="eyebrow text-[0.72rem] tracking-[0.12em] uppercase font-semibold text-[var(--teal)] mb-[8px]">
                        Devam Et
                      </div>
                      <h3 className="text-[1.06rem] font-bold text-[var(--ink)] m-0 mt-[16px] mb-[6px]">
                        {activeCategory.name}
                      </h3>
                    </div>
                    {/* Conic Gradient dynamic progress ring */}
                    <div 
                      className="ring w-[56px] h-[56px] rounded-full flex-shrink-0 flex items-center justify-center border border-[var(--line)]" 
                      style={{ 
                        background: `conic-gradient(var(--teal) 0% ${activeProgress}%, var(--line) ${activeProgress}% 100%)` 
                      }}
                    >
                      <div className="ring-inner w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center text-[0.72rem] font-bold text-[var(--teal-deep)]">
                        {activeProgress}%
                      </div>
                    </div>
                  </div>
                  <p className="text-[0.88rem] text-[var(--muted)] leading-[1.5] m-0 mt-4 mb-[20px]">
                    Kaldığın yer: {activeLearnedCount} / {activeTotalCount} terim. {activeTotalCount - activeLearnedCount > 0 ? `${activeTotalCount - activeLearnedCount} terim seni bekliyor.` : 'Bu kategoriyi başarıyla tamamladın!'}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/study')}
                  className="btn btn-primary bg-[var(--coral)] text-white font-semibold text-[0.94rem] px-[20px] py-[12px] rounded-[9px] hover:bg-[#a83a26] transition-all self-start"
                >
                  Kaldığın Yerden Devam Et →
                </button>
              </div>

            </div>
          </section>

          {/* PROGRESS LIST */}
          <section className="mb-[52px]">
            <div className={`section-head flex justify-between items-end mb-[20px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <h2 className="font-serif font-semibold text-[1.45rem] tracking-tight text-[var(--ink)]">
                İlerleyen
              </h2>
              <span 
                onClick={() => navigate('/progress')}
                className="see-all text-[0.86rem] font-bold text-[var(--teal-deep)] cursor-pointer"
              >
                Tüm istatistikler →
              </span>
            </div>

            {/* Statistics Quick Strip */}
            <div className={`stats-row grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--line)] border border-[var(--line)] rounded-[14px] overflow-hidden mb-[20px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <div className="stat bg-white p-[24px] md:p-[22px]">
                <div className="num font-serif text-[1.9rem] font-bold text-[var(--teal-deep)]">
                  {stats.learnedTerms}
                </div>
                <div className="lbl text-[0.85rem] text-[var(--muted)] mt-1">
                  Terim öğrenildi
                </div>
              </div>
              <div className="stat bg-white p-[24px] md:p-[22px]">
                <div className="num font-serif text-[1.9rem] font-bold text-[var(--teal-deep)]">
                  %{stats.averageQuizScore || 0}
                </div>
                <div className="lbl text-[0.85rem] text-[var(--muted)] mt-1">
                  Ortalama doğruluk
                </div>
              </div>
              <div className="stat bg-white p-[24px] md:p-[22px]">
                <div className="num font-serif text-[1.9rem] font-bold text-[var(--teal-deep)]">
                  {streak.currentStreak}
                </div>
                <div className="lbl text-[0.85rem] text-[var(--muted)] mt-1">
                  Günlük seri
                </div>
              </div>
            </div>

            {/* Category Rows with Fill Animations */}
            <div className={`cat-list bg-white border border-[var(--line)] rounded-[var(--radius)] p-[8px] md:p-[8px_26px] transition-all duration-500 ${inProp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              {catList.map((cat) => {
                const pct = getCategoryProgress(cat.id);
                return (
                  <div className="cat-row flex items-center gap-[18px] py-[18px] border-b border-[var(--line)] last:border-none" key={cat.id}>
                    <div className="cat-name w-[180px] flex-shrink-0 text-[0.92rem] font-bold text-[var(--ink)]">
                      {cat.name}
                    </div>
                    <div className="cat-bar-track flex-1 h-[8px] rounded-[6px] bg-[var(--paper-dim)] overflow-hidden">
                      <div 
                        className="cat-bar-fill h-full rounded-[6px] bg-[var(--teal)] transition-all duration-1000"
                        style={{ width: inProp ? `${pct}%` : '0%' }}
                      ></div>
                    </div>
                    <div className="cat-pct w-[44px] text-right font-mono text-[0.82rem] text-[var(--muted)] flex-shrink-0">
                      %{pct}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
