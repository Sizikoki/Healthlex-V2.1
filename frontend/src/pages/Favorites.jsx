import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, RotateCcw, BookOpen, ArrowRight } from 'lucide-react';
import { useReview } from '@/hooks/useReview';
import { useLanguage } from '@/context/LanguageContext';
import { getAllTerms } from '@/data/medicalTerms';
import { getTermSlug } from '@/utils/termHelper';
import { formatDueLabel, FREE_REVIEW_LIMIT } from '@/utils/reviewScheduler';
import { FavoriteButton } from '@/components/FavoriteButton';

let termMapCache = null;
const getTermMap = () => {
  if (!termMapCache) {
    termMapCache = new Map(getAllTerms().map((t) => [String(t.id), t]));
  }
  return termMapCache;
};

export const Favorites = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const { loaded, cards, count, isPaid, dueTodayCount } = useReview();

  useEffect(() => {
    document.title = isTr ? 'Favorilerim | HealthLexMed' : 'My Favorites | HealthLexMed';
  }, [isTr]);

  const items = useMemo(() => {
    const map = getTermMap();
    return Object.keys(cards)
      .map((id) => ({ id, card: cards[id], term: map.get(id) }))
      .filter((x) => x.term)
      .sort((a, b) => (b.card?.addedAt || '').localeCompare(a.card?.addedAt || ''));
  }, [cards]);

  const overLimit = !isPaid && count > FREE_REVIEW_LIMIT;

  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f5f7fb] dark:bg-background py-8 sm:py-11 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Başlık */}
        <div className="flex flex-col gap-2">
          <span className="font-extrabold text-[12px] tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
            {isTr ? 'ÇALIŞ · FAVORİLERİM' : 'STUDY · MY FAVORITES'}
          </span>
          <h1 className="font-['Lora',Georgia,serif] font-semibold text-[28px] sm:text-[32px] leading-tight text-[#0f1b33] dark:text-foreground">
            {isTr ? 'Favorilerim' : 'My Favorites'}
          </h1>
          <p className="text-[14px] text-[#6b7a90] dark:text-muted-foreground leading-relaxed">
            {isTr
              ? 'Favoriye eklediğin terimler aralıklı tekrar sistemine girer: her terim, unutmaya başlayacağın zamana göre sana yeniden gelir.'
              : 'Your favorite terms enter spaced repetition: each comes back right before you would forget it.'}
          </p>
        </div>

        {/* Özet + Tekrar düğmesi */}
        <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[16px] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-extrabold text-[11px] tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
              {isTr ? 'BUGÜN TEKRAR EDİLECEK' : 'DUE TODAY'}
            </span>
            <span className="font-extrabold text-[28px] leading-none text-[#0f1b33] dark:text-foreground">
              {dueTodayCount} <span className="text-[14px] font-semibold text-[#6b7a90]">{isTr ? 'terim' : 'terms'}</span>
            </span>
            <span className="text-[12px] text-[#6b7a90] dark:text-muted-foreground">
              {isPaid
                ? (isTr ? `Toplam ${count} favori terim` : `${count} favorite terms in total`)
                : (isTr
                    ? `${count} / ${FREE_REVIEW_LIMIT} favori · Pro ile sınırsız`
                    : `${count} / ${FREE_REVIEW_LIMIT} favorites · Unlimited with Pro`)}
            </span>
          </div>
          <button
            type="button"
            disabled={dueTodayCount === 0}
            onClick={() => navigate('/tekrar')}
            className="inline-flex items-center justify-center gap-2 bg-[#0f766e] hover:bg-[#0b5f5c] disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white font-bold text-[15px] py-3 px-5 rounded-[12px] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            {isTr ? `Tekrara başla (${dueTodayCount})` : `Start review (${dueTodayCount})`}
          </button>
        </div>

        {overLimit && (
          <div className="rounded-[12px] border border-amber-200 bg-amber-50 text-amber-900 text-[13px] leading-relaxed p-4">
            {isTr
              ? `Ücretsiz hesapta en fazla ${FREE_REVIEW_LIMIT} favori tutulabiliyor. Mevcut ${count} terimini tekrar etmeye devam edebilirsin; ${FREE_REVIEW_LIMIT}'nin altına inene kadar yeni favori ekleyemezsin.`
              : `Free accounts can keep up to ${FREE_REVIEW_LIMIT} favorites. You can keep reviewing your ${count} terms, but can’t add new ones until you are below ${FREE_REVIEW_LIMIT}.`}
          </div>
        )}

        {/* Liste */}
        {items.length === 0 ? (
          <div className="bg-white dark:bg-card border border-dashed border-[#d5dbe7] dark:border-border rounded-[16px] p-8 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="font-semibold text-[15px] text-[#0f1b33] dark:text-foreground">
              {isTr ? 'Henüz favori terimin yok' : 'No favorite terms yet'}
            </p>
            <p className="text-[13px] text-[#6b7a90] dark:text-muted-foreground max-w-sm">
              {isTr
                ? 'Terim kartlarındaki kalbe dokunarak çalışmak istediğin terimleri buraya ekle.'
                : 'Tap the heart on any term card to add it here.'}
            </p>
            <Link
              to="/study"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#2563eb] hover:underline"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              {isTr ? 'Terimlere git' : 'Browse terms'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {items.map(({ id, card, term }) => {
              const due = formatDueLabel(card?.due, isTr);
              const isToday = due === (isTr ? 'Bugün' : 'Today');
              return (
                <li
                  key={id}
                  className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[14px] px-4 py-3.5 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/study/${getTermSlug(term.term)}`}
                      className="block font-['Lora',Georgia,serif] font-semibold text-[16px] text-[#0f1b33] dark:text-foreground hover:text-primary truncate"
                    >
                      {term.term}
                    </Link>
                    <span className="block text-[13px] text-[#6b7a90] dark:text-muted-foreground truncate">
                      {isTr ? (term.turkishShort || term.turkishDefinition || '') : (term.english || '')}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 text-[11px] font-bold px-2 py-1 rounded-md ${
                      isToday
                        ? 'bg-[#0f766e]/10 text-[#0f766e]'
                        : 'bg-muted text-muted-foreground'
                    }`}
                    title={isTr ? 'Sıradaki tekrar' : 'Next review'}
                  >
                    {due}
                  </span>
                  <FavoriteButton termId={term.id} termName={term.term} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;
