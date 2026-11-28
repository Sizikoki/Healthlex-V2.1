import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, UserPlus, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useReview } from '@/hooks/useReview';
import { useLanguage } from '@/context/LanguageContext';
import { FREE_REVIEW_LIMIT } from '@/utils/reviewScheduler';

/**
 * Terimi Favorilerim'e ekleyen / çıkaran kalp düğmesi.
 * variant="icon"    → kare simge düğmesi (Study terim kartları)
 * variant="labeled" → yazılı düğme (terim detay sayfası)
 */
export const FavoriteButton = ({ termId, termName = '', variant = 'icon', className = '' }) => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage !== 'en';
  const { isFavorite, toggleFavorite } = useReview();
  const [busy, setBusy] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const active = isFavorite(termId);
  const label = active
    ? (isTr ? 'Favorilerden çıkar' : 'Remove from favorites')
    : (isTr ? 'Favorilere ekle' : 'Add to favorites');

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    const result = await toggleFavorite(termId);
    setBusy(false);

    if (result === 'needs-auth') {
      setAuthOpen(true);
    } else if (result === 'added') {
      toast.success(
        isTr ? 'Favorilere eklendi. Bugünkü tekrarına girdi.' : 'Added to favorites and today’s review.',
        {
          action: {
            label: isTr ? 'Favorilerim' : 'My favorites',
            onClick: () => navigate('/favorilerim'),
          },
        }
      );
    } else if (result === 'removed') {
      toast(isTr ? 'Favorilerden çıkarıldı' : 'Removed from favorites');
    } else if (result === 'limit') {
      toast.error(
        isTr
          ? `Ücretsiz hesapta en fazla ${FREE_REVIEW_LIMIT} favori terim tutabilirsin. Pro ile sınırsız.`
          : `Free accounts can keep up to ${FREE_REVIEW_LIMIT} favorite terms. Unlimited with Pro.`,
        {
          action: {
            label: isTr ? 'Tarifeler' : 'Pricing',
            onClick: () => navigate('/pricing'),
          },
        }
      );
    } else {
      toast.error(isTr ? 'Kaydedilemedi, tekrar dene.' : 'Could not save, please try again.');
    }
  };

  const heart = (
    <Heart
      className={variant === 'icon' ? 'w-4 h-4' : 'w-4 h-4 mr-1.5'}
      strokeWidth={2}
      fill={active ? 'currentColor' : 'none'}
      aria-hidden="true"
    />
  );

  return (
    <>
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={handleClick}
          disabled={busy}
          aria-pressed={active}
          aria-label={termName ? `${termName}: ${label}` : label}
          title={label}
          className={`inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-xl border transition-colors cursor-pointer disabled:opacity-60 ${
            active
              ? 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100 dark:bg-rose-500/15 dark:border-rose-500/30'
              : 'text-muted-foreground border-border/60 hover:text-rose-600 hover:bg-muted'
          } ${className}`}
        >
          {heart}
        </button>
      ) : (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleClick}
          disabled={busy}
          aria-pressed={active}
          className={`flex-1 sm:flex-initial justify-center ${
            active ? 'text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100' : 'border-border'
          } ${className}`}
        >
          {heart}
          {active ? (isTr ? 'Favorilerde' : 'In favorites') : (isTr ? 'Favorilere ekle' : 'Add to favorites')}
        </Button>
      )}

      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-card p-6 rounded-2xl">
          <DialogHeader className="text-center sm:text-center items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Heart className="w-7 h-7" fill="currentColor" aria-hidden="true" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              {isTr ? 'Favorilere eklemek için ücretsiz hesap aç' : 'Create a free account to save favorites'}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {isTr
                ? `Favori terimlerini kaydet; sistem onları unutmaya başlayacağın zamanda sana tekrar getirsin. Ücretsiz hesapta ${FREE_REVIEW_LIMIT} terim.`
                : `Save your favorite terms and get them back right before you would forget them. ${FREE_REVIEW_LIMIT} terms on a free account.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2.5 mt-3">
            <Button
              onClick={() => {
                setAuthOpen(false);
                navigate('/register');
              }}
              className="w-full h-12 text-base font-semibold gradient-primary"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {isTr ? 'Ücretsiz Üye Ol' : 'Sign up free'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setAuthOpen(false);
                navigate('/login');
              }}
              className="w-full h-11 text-sm font-semibold"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {isTr ? 'Zaten hesabım var, giriş yap' : 'I have an account, log in'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FavoriteButton;
