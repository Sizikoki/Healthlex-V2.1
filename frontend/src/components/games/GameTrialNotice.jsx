import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getTrialRemainingText } from '@/utils/gameTrials';
import { useLanguage } from '@/context/LanguageContext';

const clearPendingPlan = () => {
  try {
    sessionStorage.removeItem('healthlex_selected_plan');
  } catch (e) {
    // ignore
  }
};

/**
 * Direct-URL gate screen shown when a guest or registered free user
 * visits /match, /quiz, or /morpheme with 0 remaining trials.
 */
export const GameTrialExhaustedScreen = ({ gameId, mode, onBack }) => {
  const { currentLanguage } = useLanguage();
  const isGuest = mode === 'guest';
  const registerUrl = `/register?from=games-${gameId}`;
  const loginUrl = `/login?from=games-${gameId}`;
  const pricingUrl = `/pricing?from=games-${gameId}`;
  const exhaustedText = isGuest
    ? getTrialRemainingText('guest', 0, currentLanguage)
    : 'Bu haftaki 5 hakkını kullandın. Pazartesi yenilenir.';

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-border">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
            {isGuest ? (
              <UserPlus className="w-7 h-7 text-primary" />
            ) : (
              <Sparkles className="w-7 h-7 text-primary" />
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            {exhaustedText}
          </h2>

          <div className="mt-6 flex flex-col gap-3">
            {isGuest ? (
              <>
                <Button asChild className="w-full gradient-primary shadow-md">
                  <Link to={registerUrl} onClick={clearPendingPlan}>
                    Ücretsiz hesap aç
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <div className="text-sm text-muted-foreground">
                  Zaten hesabın var mı?{' '}
                  <Link
                    to={loginUrl}
                    className="text-primary font-medium hover:underline"
                  >
                    Giriş yap
                  </Link>
                </div>
              </>
            ) : (
              <Button asChild className="w-full gradient-primary shadow-md">
                <Link to={pricingUrl}>
                  Planları gör
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}

            {onBack ? (
              <Button variant="outline" onClick={onBack} className="w-full mt-1">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Oyunlara Dön
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full mt-1">
                <Link to="/games">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Oyunlara Dön
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Finish-screen trial status & action block for MatchGame, QuizGameFable, and MorphemeGameFable.
 * Renders remaining trial line; when remaining === 0, swaps "Play Again" for the upgrade/signup CTA.
 */
export const GameTrialFinishFooter = ({
  gameId,
  mode,
  remaining,
  onPlayAgain,
  onBack,
  playAgainLabel = 'Yeniden Oyna',
  backLabel = 'Oyunlara Dön',
}) => {
  const { currentLanguage } = useLanguage();
  const isGuest = mode === 'guest';
  const isExhausted = remaining <= 0;
  const statusText = getTrialRemainingText(mode, remaining, currentLanguage);
  const registerUrl = `/register?from=games-${gameId}`;
  const loginUrl = `/login?from=games-${gameId}`;
  const pricingUrl = `/pricing?from=games-${gameId}`;

  return (
    <div className="mt-4">
      {statusText && (
        <p
          className={`text-sm mb-4 ${
            isExhausted
              ? 'font-semibold text-foreground'
              : 'text-muted-foreground'
          }`}
        >
          {statusText}
        </p>
      )}

      {isExhausted ? (
        <div className="flex flex-col gap-2.5">
          {isGuest ? (
            <>
              <Button asChild className="w-full min-h-[48px] gradient-primary shadow-md">
                <Link to={registerUrl} onClick={clearPendingPlan}>
                  Ücretsiz hesap aç
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <div className="text-xs text-muted-foreground">
                <Link
                  to={loginUrl}
                  className="text-primary font-medium hover:underline"
                >
                  Giriş yap
                </Link>
              </div>
            </>
          ) : (
            <Button asChild className="w-full min-h-[48px] gradient-primary shadow-md">
              <Link to={pricingUrl}>
                Planları gör
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          )}

          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full min-h-[44px]"
            >
              {backLabel}
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 min-h-[48px] gradient-primary shadow-md"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {playAgainLabel}
          </Button>
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 min-h-[48px]"
            >
              {backLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
