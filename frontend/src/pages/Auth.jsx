import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { saveUser, syncProgressFromFirestore } from '@/utils/storage';
import { toast } from 'sonner';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/config';

// Helper function to translate Firebase auth errors to Turkish
const getTurkishErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz bir e-posta adresi girdiniz.';
    case 'auth/user-disabled':
      return 'Bu kullanıcı hesabı engellenmiştir.';
    case 'auth/user-not-found':
      return 'Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı.';
    case 'auth/wrong-password':
      return 'Hatalı şifre girdiniz. Lütfen tekrar deneyin.';
    case 'auth/email-already-in-use':
      return 'Bu e-posta adresi zaten kullanımda.';
    case 'auth/weak-password':
      return 'Şifreniz çok zayıf. Şifre en az 6 karakter olmalıdır.';
    case 'auth/operation-not-allowed':
      return 'Bu giriş yöntemine izin verilmedi.';
    case 'auth/too-many-requests':
      return 'Çok fazla başarısız giriş denemesi yaptınız. Lütfen daha sonra tekrar deneyin.';
    case 'auth/invalid-credential':
      return 'E-posta adresi veya şifre hatalı.';
    default:
      return 'Bir hata oluştu. Lütfen tekrar deneyin.';
  }
};

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to storage to maintain compatibility with existing tracking features
      saveUser({
        uid: user.uid,
        name: user.displayName || email.split('@')[0],
        email: email,
        joinDate: user.metadata.creationTime || new Date().toISOString()
      });

      // Synchronize progress from Firestore immediately on login
      await syncProgressFromFirestore();

      toast.success('Giriş başarılı! Hoş geldiniz.');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      const message = getTurkishErrorMessage(error.code);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-hero">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">HealthLexMed'e Giriş Yap</CardTitle>
          <CardDescription>Hesabınıza erişin ve öğrenmeye devam edin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary shadow-lg" disabled={loading}>
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Hesabın yok mu?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user profile with the displayName in Firebase Auth
      await updateProfile(user, {
        displayName: name
      });

      // Save user to storage to maintain compatibility with existing tracking features
      saveUser({
        uid: user.uid,
        name: name,
        email: email,
        joinDate: user.metadata.creationTime || new Date().toISOString()
      });

      // Synchronize progress from Firestore immediately on registration
      await syncProgressFromFirestore();

      toast.success('Hesap oluşturuldu! Hoş geldiniz.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      const message = getTurkishErrorMessage(error.code);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-hero">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">HealthLexMed'e Kayıt Ol</CardTitle>
          <CardDescription>Ücretsiz hesap oluştur ve öğrenmeye başla</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="En az 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary shadow-lg" disabled={loading}>
              {loading ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Zaten hesabın var mı?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Giriş Yap
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};