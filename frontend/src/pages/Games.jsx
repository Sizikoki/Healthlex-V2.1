import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shuffle, Brain, ArrowRight, Sparkles, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Study sayfasıyla aynı kategori listesi
const GAME_CATEGORIES = [
  { id: 'skull_bones', name: 'Kafatası Kemikleri' },
  { id: 'face_bones', name: 'Yüz Kemikleri' },
  { id: 'trunk_bones', name: 'Gövde Kemikleri' },
  { id: 'upper_extremity_bones', name: 'Üst Extremite Kemikleri' },
  { id: 'upper_extremity_joints', name: 'Üst Ekstremite Eklemleri' },
  { id: 'lower_extremity_bones', name: 'Alt Extremite Kemikleri' },
  { id: 'movement_terms', name: 'Hareket Terimleri' },
];

export const Games = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const games = [
    {
      id: 'flashcards',
      title: 'Flashcard',
      description: 'Terim kartlarını çevirerek öğren. Bildiğin ve bilmediğin terimleri ayır.',
      icon: BookOpen,
      color: 'from-primary to-primary-dark',
      path: '/flashcards'
    },
    {
      id: 'match',
      title: 'Eşleştirme',
      description: 'Terimleri Türkçe karşılıklarıyla eşleştir. Hızlı düşün, rekor kır!',
      icon: Shuffle,
      color: 'from-secondary to-accent',
      path: '/match'
    },
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Çoktan seçmeli sorularla bilgini test et. Kendini sına, ilerlemeyi gör.',
      icon: Brain,
      color: 'from-accent to-success',
      path: '/quiz'
    },
    {
      id: 'morpheme',
      title: 'Morfem Yapıcı',
      description: 'Verilen tanıma göre tıbbi terimi ön ek, kök ve son ek seçerek kendin oluştur!',
      icon: Puzzle,
      color: 'from-violet-500 to-purple-600',
      path: '/morpheme'
    }
  ];

  const getCategoryParam = () => {
    return selectedCategory === 'all' ? '' : `?category=${selectedCategory}`;
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Oyunlar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Farklı oyun modlarıyla tıbbi terminolojiyi kalcı olarak öğren
          </p>

          {/* Category Selector */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <span className="text-sm font-medium text-muted-foreground">Kategori:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Kategori seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>

                {GAME_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Card key={game.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{game.title}</CardTitle>
                  <CardDescription className="text-base">{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`${game.path}${getCategoryParam()}`}>
                    <Button className="w-full gradient-primary group-hover:shadow-lg transition-all">
                      Oyna
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Oyun İpuçları
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-lg font-semibold mb-2 text-primary">🎯 Düzenli Çalış</div>
                <p className="text-sm text-muted-foreground">
                  Her gün en az 10 dakika çalışarak günlük serileri koruyun ve hızlı öğrenin.
                </p>
              </div>
              <div>
                <div className="text-lg font-semibold mb-2 text-secondary">🎮 Çeşitlilik Oluştur</div>
                <p className="text-sm text-muted-foreground">
                  Farklı oyun modlarını kullanarak bilgilerinizi pekiştirin ve monotonluktan kaçının.
                </p>
              </div>
              <div>
                <div className="text-lg font-semibold mb-2 text-accent">📊 İlerlemeni Takip Et</div>
                <p className="text-sm text-muted-foreground">
                  Quiz sonuçlarını ve eşleştirme sürelerini takip ederek gelişimini gör.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};