import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Award, LogOut, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUser, getStats, logout } from '@/utils/storage';
import { toast } from 'sonner';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

export const Profile = () => {
  const navigate = useNavigate();
  const user = getUser();
  const stats = getStats();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    toast.success('Çıkış yapıldı');
    navigate('/login');
  };


  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-2">{user?.name || 'Kullanıcı'}</h1>
                <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Üyelik: {formatDate(user?.joinDate)}</span>
                  </div>
                </div>
              </div>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Öğrenme İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Öğrenilen Terim</span>
                <span className="text-2xl font-bold text-primary">{stats.learnedTerms}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Toplam Gözden Geçirme</span>
                <span className="text-2xl font-bold text-secondary">{stats.totalReviews}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Günlük Seri</span>
                <span className="text-2xl font-bold text-accent">{stats.currentStreak}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-success" />
                Oyun Performansı
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ortalama Quiz Puanı</span>
                <span className="text-2xl font-bold text-success">{stats.averageQuizScore}%</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tamamlanan Quiz</span>
                <span className="text-2xl font-bold text-primary">{stats.quizzesTaken}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Eşleştirme Oyunları</span>
                <span className="text-2xl font-bold text-secondary">{stats.matchGamesPlayed}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Başarılar</CardTitle>
            <CardDescription>Kilidi açılan ödülleriniz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.learnedTerms >= 1 && (
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl mb-2">🎖️</div>
                  <div className="text-xs font-medium">İlk Adım</div>
                </div>
              )}
              {stats.learnedTerms >= 10 && (
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-xs font-medium">Hızlı Başlangıç</div>
                </div>
              )}
              {stats.quizzesTaken >= 5 && (
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-xs font-medium">Quiz Ustası</div>
                </div>
              )}
              {stats.currentStreak >= 7 && (
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-xs font-medium">Ateşli</div>
                </div>
              )}
            </div>
            {stats.learnedTerms < 1 && (
              <div className="text-center py-8 text-muted-foreground">
                Henüz bir başarı kazanmadın. Öğrenmeye başla!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate('/study')} className="flex-1 gradient-primary">
            Çalışmaya Devam Et
          </Button>
          <Button onClick={() => navigate('/progress')} variant="outline" className="flex-1">
            İlerlemeni Gör
          </Button>
        </div>
      </div>
    </div>
  );
};