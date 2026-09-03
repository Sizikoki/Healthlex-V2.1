import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Sparkles, UserPlus, LogIn, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export const GuestLimitModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-primary/20 shadow-2xl p-6 rounded-2xl">
        <DialogHeader className="text-center sm:text-center items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-bounce">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {t('guestLimitTitle', '3 Günlük Ücretsiz Deneme Süreniz Sona Erdi! 🎯')}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 mt-2 leading-relaxed">
            {t('guestLimitDesc', 'Tüm paket içeriklerini ve oyunları keşfetmeniz için sunulan 3 günlük ücretsiz deneme süreniz tamamlandı. Öğrenmeye devam etmek ve ilerlemenizi tüm cihazlarınızda kaydetmek için lütfen ücretsiz kayıt olun.')}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-3 text-sm text-amber-900 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-amber-950">
              {t('guestLimitCardTitle', 'Ücretsiz Üye Olun & Öğrenmeye Devam Edin!')}
            </strong>
            {t('guestLimitCardDesc', 'Kayıt olarak tüm kelime kartlarına ve oyunlara sınırsız erişebilir, ilerlemenizi senkronize edebilirsiniz.')}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          <Button
            onClick={() => {
              onClose();
              navigate('/register');
            }}
            className="w-full h-12 text-base font-semibold gradient-primary shadow-md hover:shadow-lg transition-all"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {t('signUpUnlimited', 'Ücretsiz Üye Ol (Öğrenmeye Devam Et)')}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              onClose();
              navigate('/login');
            }}
            className="w-full h-11 text-sm font-semibold border-gray-300 hover:bg-gray-50"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {t('alreadyHaveAccountLogin', 'Zaten Hesabım Var, Giriş Yap')}
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              onClose();
              navigate('/games');
            }}
            className="w-full text-xs text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            {t('backToGamesPage', 'Oyunlar Sayfasına Dön')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
