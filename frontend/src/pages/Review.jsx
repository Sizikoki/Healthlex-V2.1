import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Check, RotateCcw, Heart, ArrowRight } from 'lucide-react';
import { useReview } from '@/hooks/useReview';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms } from '@/data/medicalTerms';
import { parseRootsToMorphemes } from '@/utils/termHelper';
import { formatDueLabel, SAME_SESSION_WINDOW_MS } from '@/utils/reviewScheduler';

let termMapCache = null;
const getTermMap = () => {
  if (!termMapCache) {
    termMapCache = new Map(getAllTerms().map((t) => [String(t.id), t]));
  }
  return termMapCache;
};

export const Review = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const { loaded, dueTodayIds, answerCard, nextDueIso, count } = useReview();

  // Oturum kuyruğu: sayfa açıldığında bugün vadesi gelen terimlerle bir kez kurulur
  const [queue, setQueue] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reviewedIds, setReviewedIds] = useState(() => new Set());
  const [knownCount, setKnownCount] = useState(0);
  const sessionSize = useRef(0);

  useEffect(() => {
    document.title = isTr ? 'Tekrar | HealthLexMed' : 'Review | HealthLexMed';
  }, [isTr]);

  useEffect(() => {
    if (!loaded || queue !== null) return;
    const map = getTermMap();
    const ids = dueTodayIds.filter((id) => map.has(id));
    sessionSize.current = ids.length;
    setQueue(ids);
  }, [loaded, queue, dueTodayIds]);

  const currentId = queue && queue.length > 0 ? queue[0] : null;
  const term = currentId ? getTermMap().get(currentId) : null;
  const morphemes = useMemo(() => (term?.roots ? parseRootsToMorphemes(term.roots) : []), [term]);

  const handleAnswer = async (known) => {
    if (!currentId || saving) return;
    setSaving(true);
    const next = await answerCard(currentId, known);
    setSaving(false);
    setRevealed(false);
    setReviewedIds((prev) => new Set(prev).add(currentId));
    if (known) setKnownCount((n) => n + 1);

    setQueue((prev) => {
      const rest = prev.slice(1);
      // Algoritma kartı kısa süre içinde (dakikalar) yeniden istiyorsa aynı oturumda tekrar göster
      if (next?.due && new Date(next.due).getTime() - Date.now() <= SAME_SESSION_WINDOW_MS) {
        return [...rest, currentId];
      }
      // Kayıt başarısız olduysa kart sırada kalmaz; vadesi değişmediği için Panel'de görünmeye devam eder
      return rest;
    });
  };

  if (!loaded || queue === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const shell = (children) => (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f7fb] dark:bg-background py-6 sm:py-10 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-xl flex flex-col gap-5">{children}</div>
    </div>
  );

  // Oturum bitti ya da bugün tekrar yok
  if (!term) {
    const didSession = reviewedIds.size > 0;
    return shell(
      <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[18px] p-7 sm:p-8 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-[#0f766e]/10 text-[#0f766e] flex items-center justify-center">
          <Check className="w-7 h-7" aria-hidden="true" />
        </div>
        <h1 className="font-['Lora',Georgia,serif] font-semibold text-[24px] text-[#0f1b33] dark:text-foreground">
          {didSession
            ? (isTr ? 'Bugünlük tekrar bitti' : 'Today’s review is done')
            : (isTr ? 'Bugün tekrar edilecek terim yok' : 'Nothing to review today')}
        </h1>
        {didSession && (
          <p className="text-[14px] text-[#3c4858] dark:text-foreground/90">
            {isTr
              ? `${reviewedIds.size} terim tekrar ettin · ${knownCount} kez "Biliyorum" dedin.`
              : `You reviewed ${reviewedIds.size} terms · answered "I know" ${knownCount} times.`}
          </p>
        )}
        {count === 0 ? (
          <p className="text-[13px] text-[#6b7a90] dark:text-muted-foreground max-w-sm">
            {isTr
              ? 'Tekrar listen boş. Terim kartlarındaki kalbe dokunarak favori ekle; eklediğin terimler aynı gün tekrarına girer.'
              : 'Your review list is empty. Tap the heart on a term card to add favorites.'}
          </p>
        ) : nextDueIso ? (
          <p className="text-[13px] text-[#6b7a90] dark:text-muted-foreground">
            {isTr ? 'Sıradaki tekrar: ' : 'Next review: '}
            <strong className="text-[#0f1b33] dark:text-foreground">{formatDueLabel(nextDueIso, isTr)}</strong>
          </p>
        ) : null}
        <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto mt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center justify-center gap-1.5 bg-[#0f766e] hover:bg-[#0b5f5c] text-white font-bold text-[14px] py-3 px-5 rounded-[12px] cursor-pointer"
          >
            {isTr ? 'Panelime dön' : 'Back to dashboard'}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <Link
            to={count === 0 ? '/study' : '/favorilerim'}
            className="inline-flex items-center justify-center gap-1.5 border border-[#d5dbe7] dark:border-border text-[#0f1b33] dark:text-foreground font-bold text-[14px] py-3 px-5 rounded-[12px] hover:bg-muted"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            {count === 0 ? (isTr ? 'Terimlere git' : 'Browse terms') : (isTr ? 'Favorilerim' : 'My favorites')}
          </Link>
        </div>
      </div>
    );
  }

  const remainingUnique = new Set(queue).size;
  const progressDone = Math.max(0, sessionSize.current - remainingUnique);

  return shell(
    <>
      {/* Üst çubuk: çıkış + ilerleme */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={isTr ? 'Tekrardan çık' : 'Exit review'}
          className="w-10 h-10 rounded-xl border border-[#d5dbe7] dark:border-border flex items-center justify-center text-[#6b7a90] hover:bg-muted cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
        <div className="flex-1 h-2 rounded-full bg-[#e5e9f2] dark:bg-muted overflow-hidden">
          <div
            className="h-full bg-[#0f766e] transition-all duration-300"
            style={{ width: `${sessionSize.current ? (progressDone / sessionSize.current) * 100 : 0}%` }}
          />
        </div>
        <span className="text-[12px] font-bold text-[#6b7a90] tabular-nums">
          {progressDone} / {sessionSize.current}
        </span>
      </div>

      {/* Kart */}
      <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[18px] p-6 sm:p-8 min-h-[300px] flex flex-col gap-4 shadow-xs">
        <span className="font-extrabold text-[11px] tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
          {isTr ? 'BU TERİMİ HATIRLIYOR MUSUN?' : 'DO YOU REMEMBER THIS TERM?'}
        </span>
        <h1 lang="la" className="font-['Lora',Georgia,serif] font-semibold text-[28px] sm:text-[32px] leading-tight text-[#0f1b33] dark:text-foreground break-words">
          {term.term}
        </h1>

        {revealed ? (
          <div className="flex flex-col gap-3 pt-3 border-t border-[#eef1f6] dark:border-border/60 animate-in fade-in duration-150">
            {term.english && (
              <span className="text-[13px] text-[#6b7a90] dark:text-muted-foreground">
                <span className="font-bold mr-1.5">EN</span>
                {term.english}
              </span>
            )}
            <p className="text-[15px] leading-relaxed text-[#3c4858] dark:text-foreground/90">
              {isTr
                ? (term.turkishDefinition || term.turkishShort || '')
                : (term.englishDefinition || term.turkishDefinition || '')}
            </p>
            {morphemes.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {morphemes.map((part, idx) => (
                  <React.Fragment key={part.id || idx}>
                    {idx > 0 && <span className="text-[10px] text-muted-foreground font-bold">+</span>}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/70 bg-muted/60 text-xs font-mono">
                      <span className="font-semibold">{part.root || part.text || ''}</span>
                      {part.meaning && (
                        <span className="font-sans text-muted-foreground">({part.meaning})</span>
                      )}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-end">
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="w-full inline-flex items-center justify-center gap-2 border border-[#d5dbe7] dark:border-border text-[#0f1b33] dark:text-foreground font-bold text-[15px] py-3.5 rounded-[12px] hover:bg-muted cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              {isTr ? 'Anlamını göster' : 'Show meaning'}
            </button>
          </div>
        )}
      </div>

      {/* Cevap düğmeleri */}
      {revealed && (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleAnswer(false)}
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-card border-2 border-rose-200 text-rose-700 font-bold text-[15px] py-3.5 rounded-[12px] hover:bg-rose-50 disabled:opacity-60 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            {isTr ? 'Bilmiyorum' : 'I don’t know'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleAnswer(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#0f766e] hover:bg-[#0b5f5c] text-white font-bold text-[15px] py-3.5 rounded-[12px] disabled:opacity-60 cursor-pointer"
          >
            <Check className="w-4 h-4" aria-hidden="true" />
            {isTr ? 'Biliyorum' : 'I know'}
          </button>
        </div>
      )}
    </>
  );
};

export default Review;
