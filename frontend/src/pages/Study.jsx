import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, BookOpen, Menu, X, Sparkles, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { saveProgress, getTermProgress, isLoggedIn, getUser } from '@/utils/storage';
import { toast } from 'sonner';
import { auth, db } from '@/firebase/config';
import { collection, getDocs, query, where, doc, onSnapshot } from 'firebase/firestore';
import { getAllTerms } from '@/data/medicalTerms';
import { formatMedicalTerm } from '@/utils/format';
import { useLanguage } from '@/context/LanguageContext';
import { getTermMorphemes } from '@/utils/morphemeAdapter';
import { getTermSlug } from '@/utils/termHelper';
import { checkIsPro, getPreviewRole } from '@/utils/planAccess';
import { updateCanonicalUrl } from '@/utils/seo';
import { scoreAndRankTerms, normalizeSearchText } from '@/utils/searchHelper';

// Sabit kategori listesi (Tüm Terimler en başta)
const CATEGORIES = [
  { id: 'all', key: 'allCategories', name: 'Tüm Terimler', nameEn: 'All Terms' },
  { id: 'skull_bones', key: 'skullBones', name: 'Kafatası Kemikleri', system: 'movement', subcategory: 'skull_bones' },
  { id: 'face_bones', key: 'faceBones', name: 'Yüz Kemikleri', system: 'movement', subcategory: 'face_bones' },
  { id: 'trunk_bones', key: 'trunkBones', name: 'Gövde Kemikleri', system: 'movement', subcategory: 'trunk_bones' },
  { id: 'upper_extremity_bones', key: 'upperExtremityBones', name: 'Üst Extremite Kemikleri', system: 'movement', subcategory: 'upper_extremity_bones' },
  { id: 'upper_extremity_joints', key: 'upperExtremityJoints', name: 'Üst Ekstremite Eklemleri', system: 'movement', subcategory: 'upper_extremity_joints' },
  { id: 'lower_extremity_bones', key: 'lowerExtremityBones', name: 'Alt Extremite Kemikleri', system: 'movement', subcategory: 'lower_extremity_bones' },
  { id: 'lower_extremity_joints', key: 'lowerExtremityJoints', name: 'Alt Ekstremite Eklemleri', system: 'movement', subcategory: 'lower_extremity_joints' },
  { id: 'spine_joints', key: 'spineJoints', name: 'Omurga Eklemleri', system: 'movement', subcategory: 'spine_joints' },
  { id: 'head_and_neck_joints', key: 'headAndNeckJoints', name: 'Kafa ve Boyun Eklemleri', system: 'movement', subcategory: 'head_and_neck_joints' },
  { id: 'head_and_neck_muscles', key: 'headAndNeckMuscles', name: 'Baş ve Boyun Kasları', system: 'movement', subcategory: 'head_and_neck_muscles' },
  { id: 'trunk_muscles', key: 'trunkMuscles', name: 'Gövde Kasları', system: 'movement', subcategory: 'trunk_muscles' },
  { id: 'upper_extremity_muscles', key: 'upperExtremityMuscles', name: 'Üst Ekstremite Kasları', system: 'movement', subcategory: 'upper_extremity_muscles' },
  { id: 'muscle_structures', key: 'muscleStructures', name: 'Kas ve Kasla İlişkili Yapılar', system: 'movement', subcategory: 'muscle_structures' },
  { id: 'bone_structures', key: 'boneStructures', name: 'Kemik / İskelet Yapıları', system: 'movement', subcategory: 'bone_structures' },
  { id: 'movement_terms', key: 'movementTerms', name: 'Hareket Terimleri', category: 'movement_terms' },
  { id: 'anatomic_direction', key: 'anatomicDirection', name: 'Anatomik Yön Terimleri', system: 'movement', subcategory: 'anatomic_direction' },
];

const TermCard = React.memo(({
  term,
  isLearned,
  isExpanded,
  morphemes,
  onToggleMorphemes,
  categoryBadgeText,
  isTr,
  currentLanguage,
  t,
  onMarkAsLearned,
  onMorphemeClick
}) => {
  return (
    <div
      className="group relative bg-card text-card-foreground rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-border flex flex-col justify-between min-h-[260px]"
    >
      {/* Category Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wide bg-muted text-muted-foreground border border-border/50">
          {categoryBadgeText}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col h-full justify-between">
        <div>
          {/* Title */}
          <div className="mb-2 pr-28 pt-1">
            <Link to={`/study/${getTermSlug(term.term)}`} className="block">
              <h3 className="text-lg font-bold leading-tight text-foreground font-serif tracking-tight hover:text-primary transition-colors cursor-pointer">
                {formatMedicalTerm(term.term)}
              </h3>
            </Link>
          </div>

          {/* EN Label */}
          {(term.english || term.turkish) && (
            <div className="flex items-baseline gap-2 mb-3">
              <span className="shrink-0 px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-bold tracking-wider border border-border/50">
                EN
              </span>
              <span className="text-xs font-medium text-muted-foreground leading-snug">
                {term.english || term.turkish}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-border/60 mb-3" />

          {/* Definition */}
          <p className="text-sm text-foreground/90 leading-relaxed mb-4 line-clamp-3">
            {isTr
              ? (term.turkishDefinition || term.definition)
              : (term.englishDefinition || term.turkishDefinition || term.definition)}
          </p>
        </div>

        {/* Dynamic spacer pushes morphemes & footer cleanly to bottom */}
        <div className="flex-1" />

        {/* İnteraktif Morfem Analizi Rozetleri (Lazy - Tıklanınca Açılır) */}
        {term.roots && (
          <div className="mb-3 pt-2.5 border-t border-border/50">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMorphemes(term);
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer py-0.5 group/btn"
            >
              <span>{isTr ? 'Morfem Yapısı' : 'Word Breakdown'}</span>
              <span className="text-[10px] text-muted-foreground group-hover/btn:text-primary transition-transform">
                {isExpanded ? '▲' : '▼'}
              </span>
            </button>

            {isExpanded && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2 animate-in fade-in duration-150">
                {morphemes && morphemes.length > 0 ? (
                  morphemes.map((part, idx) => {
                    const meaningText = part.meaning?.[currentLanguage] || part.meaning?.tr || '';

                    return (
                      <React.Fragment key={part.id || idx}>
                        {idx > 0 && (
                          <span className="text-[10px] text-muted-foreground/70 font-bold select-none">+</span>
                        )}
                        <button
                          type="button"
                          onClick={() => onMorphemeClick(part)}
                          title={`${part.text} — ${meaningText} (${isTr ? 'Sözlükte keşfetmek için tıkla' : 'Click to explore'})`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/70 bg-muted/60 hover:bg-muted text-foreground hover:border-primary/40 text-xs font-mono font-medium transition-all duration-150 hover:scale-[1.02] active:scale-95 shadow-xs cursor-pointer"
                        >
                          <span className="font-semibold text-foreground">{part.text}</span>
                          {meaningText && (
                            <span
                              title={meaningText}
                              className="text-[10.5px] font-sans font-normal text-muted-foreground max-w-[200px] truncate"
                            >
                              ({meaningText})
                            </span>
                          )}
                        </button>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    {isTr ? 'Morfem çözümlenemedi' : 'No morpheme breakdown'}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Öğrenildi / Öğren Butonu & Detay Linki */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
          <Link
            to={`/study/${getTermSlug(term.term)}`}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-muted border border-border/60 transition-colors inline-flex items-center gap-1 shrink-0"
            title={isTr ? 'Terim detayını ve morfem çözümlemesini gör' : 'View term details'}
          >
            <span>{isTr ? 'Detay' : 'Details'}</span>
            <span>→</span>
          </Link>
          <button
            onClick={() => onMarkAsLearned(term.id)}
            data-term-id={term.id}
            data-learned={isLearned ? 'true' : 'false'}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
              isLearned
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 focus:ring-emerald-400'
                : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 focus:ring-primary'
            }`}
          >
            {isLearned ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{t('learned')}</span>
              </>
            ) : (
              <span>{t('markLearned')}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export const Study = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const isTr = currentLanguage === 'tr';

  const previewRole = getPreviewRole();
  const [isPro, setIsPro] = useState(previewRole === 'pro');

  useEffect(() => {
    updateCanonicalUrl('https://www.healthlexmed.com/study');
  }, []);

  useEffect(() => {
    if (previewRole) return;
    const uid = auth?.currentUser?.uid || getUser()?.uid;
    if (!uid) {
      const localUser = getUser();
      setIsPro(checkIsPro(localUser));
      return;
    }

    try {
      const userDocRef = doc(db, 'users', uid);
      const unsub = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setIsPro(checkIsPro(docSnap.data()));
        } else {
          setIsPro(false);
        }
      }, (err) => {
        console.warn('[Study] Could not check pro status:', err);
      });
      return () => unsub();
    } catch (e) {
      console.warn('[Study] Error checking pro status:', e);
    }
  }, [previewRole]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.some(c => c.id === cat)) return cat;
    return 'skull_bones';
  });
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [searchScope, setSearchScope] = useState('all'); // 'all' | 'category'
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [allTerms, setAllTerms] = useState(() => getAllTerms());
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);
  const [expandedCardIds, setExpandedCardIds] = useState(() => new Set());
  const [morphemesCache, setMorphemesCache] = useState({});

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== undefined && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams, searchQuery]);

  // Kategori veya arama değiştiğinde gösterilen sayıyı ilk 24'e ve açık kartları sıfırla
  useEffect(() => {
    setVisibleCount(24);
    setExpandedCardIds(new Set());
  }, [selectedCategoryId, searchQuery, searchScope]);

  useEffect(() => {
    let isMounted = true;
    const fetchTerms = async () => {
      try {
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const targetSubcat = selectedCategoryId === 'movement_terms' ? 'motus' : selectedCategoryId;
        const termsQuery = selectedCategoryId === 'all'
          ? collection(db, 'terms')
          : query(collection(db, 'terms'), where('subcategory', '==', targetSubcat));

        const querySnapshot = await Promise.race([
          getDocs(termsQuery),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        let rawTerms = [];
        querySnapshot.forEach((doc) => {
          rawTerms.push(doc.data());
        });

        if (rawTerms.length > 0 && isMounted) {
          const normalized = rawTerms.map((termItem) => ({
            id: termItem.id,
            term: termItem.term,
            turkish: termItem.english || termItem.turkish || '',
            turkishShort: termItem.turkishShort || '',
            definition: termItem.turkishDefinition || termItem.definition || '',
            turkishDefinition: termItem.turkishDefinition || termItem.definition || '',
            english: termItem.english || termItem.turkish || '',
            englishDefinition: termItem.englishDefinition || termItem.english || '',
            roots: termItem.roots || '',
            morphemes: termItem.morphemes || '',
            category: termItem.category || '',
            system: termItem.system || '',
            subcategory: termItem.subcategory === 'motus' ? 'movement_terms' : (termItem.subcategory || ''),
            group: termItem.group || '',
          }));

          setAllTerms((prev) => {
            if (selectedCategoryId === 'all') {
              return normalized.sort((a, b) => Number(a.id) - Number(b.id));
            }
            const map = new Map(prev.map((t) => [t.id, t]));
            normalized.forEach((t) => map.set(t.id, t));
            return Array.from(map.values()).sort((a, b) => Number(a.id) - Number(b.id));
          });
        }
      } catch (error) {
        console.warn('Live terms fetch error/timeout, using local fallback:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTerms();

    return () => {
      isMounted = false;
    };
  }, [selectedCategoryId]);

  const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId) || CATEGORIES[1];

  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') {
        counts['all'] = allTerms.length;
      } else {
        counts[cat.id] = allTerms.filter((t) => {
          if (cat.category) return t.category === cat.category;
          if (cat.subcategory) return t.subcategory === cat.subcategory;
          return true;
        }).length;
      }
    });
    return counts;
  }, [allTerms]);

  const categoryTerms = useMemo(() => {
    if (selectedCategoryId === 'all') return allTerms;
    return allTerms.filter(t => {
      if (selectedCategory.category) {
        return t.category === selectedCategory.category;
      }
      if (selectedCategory.subcategory) {
        return t.subcategory === selectedCategory.subcategory;
      }
      return true;
    });
  }, [allTerms, selectedCategoryId, selectedCategory]);

  // Akıllı Arama & Alaka Sıralaması
  const allRankedTerms = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return scoreAndRankTerms(allTerms, searchQuery, selectedCategoryId);
  }, [allTerms, searchQuery, selectedCategoryId]);

  const categoryRankedTerms = useMemo(() => {
    if (!searchQuery.trim()) return [];
    if (selectedCategoryId === 'all') return allRankedTerms;
    return scoreAndRankTerms(categoryTerms, searchQuery, selectedCategoryId);
  }, [categoryTerms, searchQuery, selectedCategoryId, allRankedTerms]);

  const terms = useMemo(() => {
    if (!searchQuery.trim()) {
      return categoryTerms;
    }
    if (searchScope === 'category' && selectedCategoryId !== 'all') {
      return categoryRankedTerms;
    }
    return allRankedTerms;
  }, [searchQuery, searchScope, selectedCategoryId, categoryTerms, categoryRankedTerms, allRankedTerms]);

  const termGroups = useMemo(() => {
    if (searchQuery.trim()) return null;

    const hasAnyGroup = terms.some((t) => Boolean(t.group && t.group.trim()));
    if (!hasAnyGroup) return null;

    const groupsMap = new Map();
    const ungrouped = [];

    terms.forEach((term) => {
      const gName = term.group ? term.group.trim() : '';
      if (gName) {
        if (!groupsMap.has(gName)) {
          groupsMap.set(gName, {
            name: gName,
            minId: Number(term.id) || Infinity,
            terms: [],
          });
        }
        const g = groupsMap.get(gName);
        g.terms.push(term);
        if (Number(term.id) < g.minId) {
          g.minId = Number(term.id);
        }
      } else {
        ungrouped.push(term);
      }
    });

    const sortedGroups = Array.from(groupsMap.values()).sort((a, b) => a.minId - b.minId);

    if (ungrouped.length > 0) {
      sortedGroups.push({
        name: isTr ? 'Diğer Yapılar' : 'Other Structures',
        minId: Infinity,
        terms: ungrouped,
      });
    }

    return sortedGroups;
  }, [terms, searchQuery, isTr]);

  const handleMarkAsLearned = (termId) => {
    try {
      if (termId === undefined || termId === null) {
        console.error('[Study] handleMarkAsLearned: invalid termId provided:', termId);
        return;
      }
      const progress = getTermProgress(termId);
      const newStatus = !progress.learned;
      saveProgress(termId, newStatus);
      if (!isLoggedIn()) {
        toast.info(
          newStatus
            ? (isTr ? 'Terim öğrenildi! (Misafir Modu: İlerlemeniz bu cihazda saklanır)' : 'Term learned! (Guest Mode: Progress saved locally)')
            : (isTr ? 'Öğrenildi işareti kaldırıldı' : 'Unmarked as learned')
        );
      } else {
        toast.success(
          newStatus
            ? (isTr ? 'Terim öğrenildi olarak işaretlendi!' : 'Term marked as learned!')
            : (isTr ? 'Öğrenildi işareti kaldırıldı' : 'Unmarked as learned')
        );
      }
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      console.error('[Study] Unexpected error in handleMarkAsLearned:', err, 'termId:', termId);
      toast.error(isTr ? 'İlerleme kaydedilirken bir hata oluştu.' : 'An error occurred while saving progress.');
    }
  };

  const handleMorphemeClick = (part) => {
    const cleanQuery = part.text.replace(/[-/]/g, '').trim();
    if (cleanQuery) {
      navigate(`/morphemes?search=${encodeURIComponent(cleanQuery)}`);
    }
  };

  const handleToggleMorphemes = useCallback((term) => {
    setExpandedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(term.id)) {
        next.delete(term.id);
      } else {
        next.add(term.id);
      }
      return next;
    });

    setMorphemesCache((prev) => {
      if (prev[term.id]) return prev;
      return { ...prev, [term.id]: getTermMorphemes(term) };
    });
  }, []);

  const getCategoryBadge = useCallback((term) => {
    if (!term) return '';
    const subcat = term.subcategory === 'motus' ? 'movement_terms' : term.subcategory;
    const cat = CATEGORIES.find(c =>
      c.id !== 'all' && (
        (c.subcategory && c.subcategory === subcat) ||
        (c.category && c.category === term.category) ||
        (c.id === subcat)
      )
    );
    if (cat) {
      return t(cat.key, cat.name);
    }
    return t(selectedCategory.key, selectedCategory.name);
  }, [t, selectedCategory]);

  const renderTermCard = (term) => (
    <TermCard
      key={term.id}
      term={term}
      isLearned={getTermProgress(term.id).learned}
      isExpanded={expandedCardIds.has(term.id)}
      morphemes={morphemesCache[term.id]}
      onToggleMorphemes={handleToggleMorphemes}
      categoryBadgeText={getCategoryBadge(term)}
      isTr={isTr}
      currentLanguage={currentLanguage}
      t={t}
      onMarkAsLearned={handleMarkAsLearned}
      onMorphemeClick={handleMorphemeClick}
    />
  );

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sol Kategori Kenar Çubuğu - Masaüstünde (PC) Her Zaman Açık & Sabit */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 xl:w-80 bg-background border-r border-border flex-shrink-0 sticky top-20 h-[calc(100vh-80px)] z-20 shadow-xs">
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-base text-foreground font-serif tracking-tight">
              {t('categories', 'Kategoriler')}
            </h2>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
            {CATEGORIES.length}
          </span>
        </div>

        <div className="p-3 space-y-1.5 overflow-y-auto flex-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const count = categoryCounts[cat.id];

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSearchQuery('');
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                    : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <span className="truncate pr-2 flex items-center gap-1.5">
                  {t(cat.key, cat.name)}
                </span>
                {count !== undefined && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors flex-shrink-0 ${
                      isSelected
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobil Kenar Çubuğu (Drawer / Sheet) - Sadece Mobil Ekranlar İçin */}
      <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <SheetContent side="left" className="w-[280px] p-0 flex flex-col h-full">
          <SheetHeader className="p-4 border-b border-border flex-shrink-0">
            <SheetTitle className="text-left font-semibold">{t('categories')}</SheetTitle>
          </SheetHeader>
          <div className="p-2 space-y-1 overflow-y-auto flex-1">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setSearchQuery('');
                    setMobileDrawerOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategoryId === cat.id
                      ? 'bg-primary text-primary-foreground font-bold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span className="truncate pr-2 flex items-center gap-1.5">
                    {t(cat.key, cat.name)}
                  </span>
                  {count !== undefined && (
                    <span className="text-xs opacity-80">{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="bg-background border-b border-border p-4 flex items-center justify-between gap-4 sticky top-20 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors border border-border text-xs font-semibold text-foreground cursor-pointer"
              aria-label={isTr ? "Kategorileri Göster" : "Show categories"}
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">{t('categories', 'Kategoriler')}</span>
            </button>
            <div>
              <h1 className="text-xl font-bold font-serif text-foreground">
                {searchQuery
                  ? (isTr ? `Arama: "${searchQuery}"` : `Search: "${searchQuery}"`)
                  : t(selectedCategory.key, selectedCategory.name)}
              </h1>
              <p className="text-xs text-muted-foreground">{terms.length} {t('termsCount', isTr ? 'terim' : 'terms')}</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-52 sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={isTr ? "Terim veya tanım ara (örn: Humerus, Atlas)..." : t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 text-sm rounded-xl"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 text-xs rounded-md"
                aria-label={isTr ? "Aramayı Temizle" : "Clear search"}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {/* Arama Durum ve Kapsam Çubuğu */}
          {searchQuery && (
            <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground">
                  {isTr ? `"${searchQuery}" için sonuçlar:` : `Results for "${searchQuery}":`}
                </span>
                {selectedCategoryId !== 'all' && (
                  <div className="inline-flex items-center rounded-lg border border-border p-0.5 bg-muted/60">
                    <button
                      type="button"
                      onClick={() => setSearchScope('all')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        searchScope === 'all'
                          ? 'bg-background text-foreground shadow-xs font-bold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {isTr ? `Tüm Terimler (${allRankedTerms.length})` : `All Terms (${allRankedTerms.length})`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchScope('category')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                        searchScope === 'category'
                          ? 'bg-background text-foreground shadow-xs font-bold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t(selectedCategory.key, selectedCategory.name)} ({categoryRankedTerms.length})
                    </button>
                  </div>
                )}
                {searchScope === 'category' && categoryRankedTerms.length === 0 && allRankedTerms.length > 0 && (
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    {isTr
                      ? `("${t(selectedCategory.key, selectedCategory.name)}" kategorisinde eşleşme yok, tüm kategorilerdeki ${allRankedTerms.length} sonuç listeleniyor)`
                      : `(No matches in this category, showing all ${allRankedTerms.length} terms across all categories)`}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-primary hover:underline font-semibold cursor-pointer"
              >
                {isTr ? 'Aramayı Temizle' : 'Clear Search'}
              </button>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : terms.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl p-8">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-base font-semibold">{t('noTermsFound')}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t('tryAnotherSearch')}</p>
            </div>
          ) : termGroups ? (
            /* Dinamik Gruplu Görünüm */
            <div className="space-y-10">
              {termGroups.map((group) => {
                if (group.terms.length === 0) return null;

                return (
                  <div key={group.name} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold tracking-tight">{group.name}</h2>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {group.terms.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                      {group.terms.map(renderTermCard)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Standart Liste Görünümü */
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                {terms.slice(0, visibleCount).map(renderTermCard)}
              </div>
              {terms.length > visibleCount && (
                <div className="flex flex-col items-center justify-center pt-8 pb-4">
                  <p className="text-xs text-muted-foreground mb-3">
                    {isTr
                      ? `${terms.length} terimden ${Math.min(visibleCount, terms.length)} tanesi gösteriliyor`
                      : `Showing ${Math.min(visibleCount, terms.length)} of ${terms.length} terms`}
                  </p>
                  <Button
                    onClick={() => setVisibleCount((prev) => prev + 24)}
                    variant="outline"
                    size="lg"
                    className="px-8 font-semibold rounded-xl border-primary/30 hover:bg-primary/10 text-primary shadow-xs transition-all cursor-pointer"
                  >
                    {isTr ? 'Daha Fazla Göster (+24)' : 'Show More (+24)'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
