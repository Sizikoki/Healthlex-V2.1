import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, RotateCcw } from 'lucide-react';
import { useReview } from '@/hooks/useReview';
import { formatDueLabel, FREE_REVIEW_LIMIT } from '@/utils/reviewScheduler';

/**
 * Panelim'deki "Bugün tekrar edilecek" kartı (ücretsiz kullanıcı paneli).
 * Pro / Ömür Boyu panelinde aynı veri koyu "BUGÜNKÜ TEKRAR" kartında gösterilir.
 */
export const ReviewDueCard = ({ isTr = true }) => {
  const { loaded, count, dueTodayCount, nextDueIso, isPaid } = useReview();
  if (!loaded) return null;

  const hasCards = count > 0;
  const title = !hasCards
    ? (isTr ? 'Favori terimlerini aralıklı tekrarla çalış' : 'Review your favorite terms with spaced repetition')
    : dueTodayCount > 0
      ? (isTr ? `Bugün ${dueTodayCount} terim seni bekliyor` : `${dueTodayCount} terms are due today`)
      : (isTr ? 'Bugünlük tekrarın tamam' : 'You’re done for today');

  const sub = !hasCards
    ? (isTr
        ? 'Terim kartlarındaki kalbe dokun; eklediğin terimler unutmaya başlayacağın zamanda sana geri gelsin.'
        : 'Tap the heart on term cards; terms come back right before you would forget them.')
    : dueTodayCount > 0
      ? (isTr ? 'Birkaç dakika sürer.' : 'Takes a few minutes.')
      : (isTr
          ? `Sıradaki tekrar: ${formatDueLabel(nextDueIso, true)}`
          : `Next review: ${formatDueLabel(nextDueIso, false)}`);

  const ctaTo = !hasCards ? '/study' : dueTodayCount > 0 ? '/tekrar' : '/favorilerim';
  const ctaText = !hasCards
    ? (isTr ? 'Terimlere git →' : 'Browse terms →')
    : dueTodayCount > 0
      ? (isTr ? 'Tekrara başla →' : 'Start review →')
      : (isTr ? 'Favorilerim →' : 'My favorites →');

  return (
    <div className="bg-white dark:bg-card border border-[#e5e9f2] dark:border-border rounded-[16px] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left shadow-xs">
      <div className="flex items-start gap-4 min-w-0">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#0f766e]/10 text-[#0f766e] flex items-center justify-center">
          {hasCards ? <RotateCcw className="w-5 h-5" aria-hidden="true" /> : <Heart className="w-5 h-5" aria-hidden="true" />}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-extrabold text-[11px] leading-none tracking-[0.14em] text-[#6b7a90] dark:text-muted-foreground uppercase">
            {isTr ? 'BUGÜN TEKRAR EDİLECEK' : 'DUE TODAY'}
            {!isPaid && hasCards && (
              <span className="ml-2 normal-case tracking-normal font-semibold">
                · {count} / {FREE_REVIEW_LIMIT} {isTr ? 'favori' : 'favorites'}
              </span>
            )}
          </span>
          <span className="font-semibold text-[17px] leading-snug text-[#0f1b33] dark:text-foreground">{title}</span>
          <span className="text-[13px] text-[#6b7a90] dark:text-muted-foreground">{sub}</span>
        </div>
      </div>
      <Link
        to={ctaTo}
        className="shrink-0 text-center bg-[#0f766e] hover:bg-[#0b5f5c] text-white font-bold text-[14px] py-3 px-5 rounded-[12px] transition-colors"
      >
        {ctaText}
      </Link>
    </div>
  );
};

export default ReviewDueCard;
