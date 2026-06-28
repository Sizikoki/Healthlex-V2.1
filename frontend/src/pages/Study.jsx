import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { saveProgress, getTermProgress } from '@/utils/storage';
import { toast } from 'sonner';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getAllTerms } from '@/data/medicalTerms';

// Sabit kategori listesi
const CATEGORIES = [
  { id: 'skull_bones', name: 'Kafatası Kemikleri', system: 'movement', subcategory: 'skull_bones' },
  { id: 'face_bones', name: 'Yüz Kemikleri', system: 'movement', subcategory: 'face_bones' },
  { id: 'trunk_bones', name: 'Gövde Kemikleri', system: 'movement', subcategory: 'trunk_bones' },
  { id: 'upper_extremity_bones', name: 'Üst Extremite Kemikleri', system: 'movement', subcategory: 'upper_extremity_bones' },
  { id: 'lower_extremity_bones', name: 'Alt Extremite Kemikleri', system: 'movement', subcategory: 'lower_extremity_bones' },
  { id: 'movement_terms', name: 'Hareket Terimleri', category: 'movement_terms' },
];

const UPPER_EXTREMITY_GROUPS = [
  { name: 'Scapula', ids: [83, 351, 352, 391, 392, 393, 394, 395, 396, 397, 398] },
  { name: 'Clavicula', ids: [84, 375, 376, 377, 378, 379, 380, 381, 382] },
  { name: 'Humerus', ids: [85, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374] },
  { name: 'Radius', ids: [86, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314] },
  { name: 'Ulna', ids: [87, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327] },
  { name: 'Ossa Manus', ids: [88, 89, 90, 328, 329, 330, 331, 332] }
];

export const Study = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [allTerms, setAllTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mobil ekranlarda varsayılan olarak kapalı olsun
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const querySnapshot = await Promise.race([
          getDocs(collection(db, 'terms')),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        let rawTerms = [];
        querySnapshot.forEach((doc) => {
          rawTerms.push(doc.data());
        });

        if (rawTerms.length === 0) {
          rawTerms = getAllTerms();
        }

        const normalized = rawTerms.map(t => ({
          id: t.id,
          term: t.term,
          turkish: t.english || t.turkish || '',
          definition: t.turkishDefinition || t.definition || '',
          roots: t.roots || '',
          category: t.category || '',
          system: t.system || '',
          subcategory: t.subcategory || ''
        }));

        setAllTerms(normalized);
      } catch (error) {
        console.error('Error fetching terms in Study:', error);
        // Fallback to local terms
        const localTerms = getAllTerms().map(t => ({
          id: t.id,
          term: t.term,
          turkish: t.turkish || '',
          definition: t.definition || '',
          roots: t.roots || '',
          category: t.category || '',
          system: t.system || '',
          subcategory: t.subcategory || ''
        }));
        setAllTerms(localTerms);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId) || CATEGORIES[0];

  const filteredTerms = allTerms.filter((t) => {
    if (selectedCategory.category) {
      return t.category === selectedCategory.category;
    }
    return t.system === selectedCategory.system && t.subcategory === selectedCategory.subcategory;
  });

  const terms = searchQuery
    ? filteredTerms.filter(
        (t) =>
          t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.turkish.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.definition.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredTerms;

  const handleMarkAsLearned = (termId) => {
    const progress = getTermProgress(termId);
    const newStatus = !progress.learned;
    saveProgress(termId, newStatus);
    toast.success(newStatus ? 'Terim öğrenildi olarak işaretlendi!' : 'Öğrenildi işareti kaldırıldı');
    setRefreshTrigger(prev => prev + 1);
  };

  const renderTermCard = (term) => {
    const progress = getTermProgress(term.id);
    return (
      <div
        key={`${term.id}-${refreshTrigger}`}
        className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col min-h-[220px]"
      >
        {/* Badge */}
        <div className="absolute top-0 right-2 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide bg-slate-100 text-slate-600">
            {selectedCategory.name}
          </span>
        </div>

        {/* Card body */}
        <div className="p-5 flex flex-col h-full">

          {/* Title */}
          <div className="mb-3 pr-28 pt-1">
            <h3 className="text-lg font-bold leading-tight text-slate-900">
              {term.term}
            </h3>
          </div>

          {/* EN + Turkish */}
          <div className="mt-2 space-y-2 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-bold text-slate-400 w-5 shrink-0">EN</span>
              <span className="text-sm font-medium text-slate-500">{term.turkish}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />

          {/* Definition */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-5 min-h-[2.5rem]">
            {term.definition}
          </p>

          {/* Button */}
          <div className="flex items-center justify-center mt-auto">
            <button
              onClick={() => handleMarkAsLearned(term.id)}
              data-term-id={term.id}
              data-learned={progress.learned ? "true" : "false"}
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${progress.learned
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 focus:ring-emerald-400'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-400'
                }`}
            >
              {progress.learned ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  <span>Öğrenildi</span>
                </>
              ) : (
                <span>Öğrendim</span>
              )}
            </button>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Sidebar - Desktop only */}
      <div className={`hidden md:block ${sidebarOpen ? 'w-64' : 'w-0'} bg-background border-r border-border flex-shrink-0 overflow-y-auto transition-all duration-300 ${!sidebarOpen && 'border-r-0'}`}>
        <div className={`${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Kategoriler</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menüyü kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-2 space-y-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategoryId(cat.id); setSearchQuery(''); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategoryId === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Drawer Overlay */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0 flex flex-col h-full">
          <SheetHeader className="p-4 border-b border-border flex-shrink-0">
            <SheetTitle className="text-left font-semibold">Kategoriler</SheetTitle>
          </SheetHeader>
          <div className="p-2 space-y-1 overflow-y-auto flex-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSearchQuery('');
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategoryId === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Sticky top bar — Mobile header (always visible to trigger drawer) */}
        <div className="sticky top-0 z-20 flex items-center h-12 px-4 bg-background/90 backdrop-blur border-b border-border flex-shrink-0 md:hidden justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2 border border-border bg-card shadow-sm"
            aria-label="Menüyü aç"
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-semibold">Kategoriler</span>
          </button>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {selectedCategory.name}
          </div>
        </div>

        {/* Sticky top bar — Desktop header (only visible when desktop sidebar is closed) */}
        {!sidebarOpen && (
          <div className="sticky top-0 z-20 hidden md:flex items-center h-12 px-2 bg-background/90 backdrop-blur border-b border-border flex-shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Menüyü aç"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-8 w-full">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-4">
              <h1 className="text-3xl font-bold">Tıbbi Terimler</h1>
              <p className="text-muted-foreground mt-1">{selectedCategory.name}</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Terim, anlam veya tanım ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Section title + count */}
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
            <Badge variant="secondary" className="text-sm">{terms.length} terim</Badge>
          </div>

          {/* Terms */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground text-sm">Terimler yükleniyor...</p>
            </div>
          ) : terms.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Terim bulunamadı</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Arama kriterlerinizi değiştirmeyi deneyin' : 'Bu kategoride henüz terim bulunmuyor'}
              </p>
            </Card>
          ) : selectedCategoryId === 'upper_extremity_bones' ? (
            <div className="space-y-12">
              {UPPER_EXTREMITY_GROUPS.map((group) => {
                const groupTerms = terms.filter(t => group.ids.includes(t.id));
                if (groupTerms.length === 0) return null;
                return (
                  <div key={group.name} className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                      <h3 className="text-2xl font-bold text-foreground">{group.name}</h3>
                      <Badge variant="secondary" className="text-sm">{groupTerms.length} terim</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {groupTerms.map(renderTermCard)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {terms.map(renderTermCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
