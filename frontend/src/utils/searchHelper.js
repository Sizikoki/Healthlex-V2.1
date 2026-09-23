/**
 * HealthLexMed — Akıllı Arama & Alaka Düzeyi Sıralama Motoru (searchHelper.js)
 * 
 * Özellikler:
 * 1. Türkçe ve İngilizce locale-aware normalizasyon (İ/i, I/ı, diakritikler, vb.)
 * 2. Sembol ve ayraç toleransı (/ ve - işaretleri; örn: "cardi/o" -> "cardio", "-itis" -> "itis")
 * 3. Çok katmanlı alaka düzeyi puanlaması (Exact Match > StartsWith > Word Match > Substring)
 * 4. Morfemler ve tıbbi terimler için özel ağırlıklandırma
 */

/**
 * Metni harf büyüklüğü ve Türkçe aksanlardan arındırarak standartlaştırır.
 * Boşlukları ve noktalama işaretlerini boşluk karakterine dönüştürür.
 */
export function normalizeSearchText(text) {
  if (!text) return '';
  return text
    .toString()
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Birleştirici aksan işaretlerini temizle
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/[-_/;:,.+()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Metindeki tüm noktalama işaretlerini, tireleri ve boşlukları kaldırarak
 * tek bir kompakt karakter dizisi oluşturur. (örn: "cardi/o" -> "cardio", "-itis" -> "itis")
 */
export function compactSearchText(text) {
  if (!text) return '';
  return normalizeSearchText(text).replace(/[^a-z0-9]/g, '');
}

/**
 * Sorguyu kelimelere ayırarak array döner.
 */
function getTokens(normalizedText) {
  if (!normalizedText) return [];
  return normalizedText.split(/\s+/).filter(Boolean);
}

/**
 * Tıbbi Terimler (Study sayfası) için alaka düzeyi puanlaması ve sıralaması.
 * 
 * Puanlama Ağırlıkları:
 * - Terim adıyla tam birebir eşleşme: 1200
 * - Terim adı kompakt eşleşme (örn: tire/boşluk farkı): 1100
 * - Türkçe/İngilizce başlıkla tam eşleşme: 900
 * - Terim adı sorguyla başlıyor: 700
 * - Terim adı içerisinde bağımsız kelime olarak geçiyor: 550
 * - Türkçe/İngilizce başlık sorguyla başlıyor veya kelime içeriyor: 450
 * - Terim adı dize (substring) olarak içeriyor: 350
 * - Türkçe/İngilizce başlık dize olarak içeriyor: 250
 * - Tanım sorguyla başlıyor veya bağımsız kelime olarak içeriyor: 120
 * - Tanım dize olarak içeriyor: 40
 * - Aktif seçili kategori bonusu: +20 (Eşitlik durumunda öncelik)
 */
export function scoreAndRankTerms(terms, query, selectedCategoryId = 'all') {
  if (!query || !query.trim()) {
    return terms;
  }

  const normQuery = normalizeSearchText(query);
  const compactQuery = compactSearchText(query);
  if (!normQuery && !compactQuery) return terms;

  const queryTokens = getTokens(normQuery);
  const results = [];

  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    const normTerm = normalizeSearchText(t.term);
    const compactTerm = compactSearchText(t.term);

    const normTr = normalizeSearchText(t.turkish || '');
    const compactTr = compactSearchText(t.turkish || '');

    const normEn = normalizeSearchText(t.english || '');
    const compactEn = compactSearchText(t.english || '');

    const normDef = normalizeSearchText(t.turkishDefinition || t.definition || '');
    const normEnDef = normalizeSearchText(t.englishDefinition || '');

    let score = 0;

    // 1. Terim Latin adı ile tam eşleşme
    if (normTerm === normQuery) {
      score += 1200;
    } else if (compactTerm === compactQuery && compactQuery.length > 1) {
      score += 1100;
    }
    // 2. Türkçe veya İngilizce başlıkla tam eşleşme
    else if (normTr === normQuery || normEn === normQuery) {
      score += 900;
    } else if (compactTr === compactQuery || compactEn === compactQuery) {
      score += 850;
    }
    // 3. Terim adı sorguyla başlıyor
    else if (normTerm.startsWith(normQuery)) {
      score += 700;
    }
    // 4. Terim adında tam bir kelime olarak geçiyor
    else if (queryTokens.length === 1 && new RegExp(`(^|\\s)${normQuery}(\\s|$)`).test(normTerm)) {
      score += 550;
    }
    // 5. Başlık sorguyla başlıyor veya kelime içeriyor
    else if (normTr.startsWith(normQuery) || normEn.startsWith(normQuery)) {
      score += 450;
    } else if (
      queryTokens.length === 1 &&
      (new RegExp(`(^|\\s)${normQuery}(\\s|$)`).test(normTr) ||
       new RegExp(`(^|\\s)${normQuery}(\\s|$)`).test(normEn))
    ) {
      score += 400;
    }
    // 6. Terim adı alt dize (substring) içeriyor
    else if (normTerm.includes(normQuery) || (compactTerm.includes(compactQuery) && compactQuery.length >= 3)) {
      score += 350;
    }
    // 7. Başlık alt dize içeriyor
    else if (normTr.includes(normQuery) || normEn.includes(normQuery)) {
      score += 250;
    }
    // 8. Tanım sorgu ile başlıyor veya bağımsız kelime olarak geçiyor
    else if (
      normDef.startsWith(normQuery) ||
      (queryTokens.length === 1 && new RegExp(`(^|\\s)${normQuery}(\\s|$)`).test(normDef)) ||
      (queryTokens.length === 1 && new RegExp(`(^|\\s)${normQuery}(\\s|$)`).test(normEnDef))
    ) {
      score += 120;
    }
    // 9. Tanım dize olarak içeriyor
    else if (normDef.includes(normQuery) || normEnDef.includes(normQuery)) {
      score += 40;
    }

    // Çok kelimeli aramalar için her bir kelimenin varlığını kontrol et
    if (score === 0 && queryTokens.length > 1) {
      const allTokensInTerm = queryTokens.every(token => normTerm.includes(token));
      const allTokensInTitle = queryTokens.every(token => normTr.includes(token) || normEn.includes(token));
      const allTokensInDef = queryTokens.every(token => normDef.includes(token));

      if (allTokensInTerm) {
        score += 500;
      } else if (allTokensInTitle) {
        score += 350;
      } else if (allTokensInDef) {
        score += 90;
      }
    }

    if (score > 0) {
      // Seçili kategorideyse hafif bir öncelik bonusu ver
      if (selectedCategoryId && selectedCategoryId !== 'all') {
        const subcat = t.subcategory === 'motus' ? 'movement_terms' : t.subcategory;
        if (subcat === selectedCategoryId || t.category === selectedCategoryId) {
          score += 20;
        }
      }

      results.push({ item: t, score, originalIndex: i });
    }
  }

  // Puan azalan, puan eşitse ID veya orijinal sıra
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const idA = Number(a.item.id);
    const idB = Number(b.item.id);
    if (!isNaN(idA) && !isNaN(idB)) return idA - idB;
    return a.originalIndex - b.originalIndex;
  });

  return results.map(r => r.item);
}

/**
 * Morfemler (MorphemeExplorer sayfası) için alaka düzeyi puanlaması ve sıralaması.
 * 
 * Puanlama Ağırlıkları:
 * - Morfem displayTerm / cleanRoot / variants tam birebir eşleşme: 1200
 * - Kompakt eşleşme (örn: "itis" -> "-itis", "cardio" -> "cardi/o"): 1100
 * - Anlam (Türkçe veya İngilizce) birebir tam eşleşme (örn: "kalp" -> "cardi/o"): 850
 * - Morfem adı sorguyla başlıyor: 650
 * - Anlam sorguyla başlıyor veya kelime olarak içeriyor: 500
 * - Morfem adı dize olarak içeriyor: 350
 * - Anlam dize olarak içeriyor: 200
 * - Örnek kelime dize olarak içeriyor: 80
 * - Açıklama / Breakdown dize olarak içeriyor: 30
 */
export function scoreAndRankMorphemes(morphemes, query) {
  if (!query || !query.trim()) {
    return morphemes;
  }

  const normQuery = normalizeSearchText(query);
  const compactQuery = compactSearchText(query);
  if (!normQuery && !compactQuery) return morphemes;

  const queryTokens = getTokens(normQuery);
  const results = [];

  for (let i = 0; i < morphemes.length; i++) {
    const item = morphemes[i];

    const normTerm = normalizeSearchText(item.displayTerm);
    const compactTerm = compactSearchText(item.displayTerm);

    const normClean = normalizeSearchText(item.cleanRoot || '');
    const compactClean = compactSearchText(item.cleanRoot || '');

    const variants = item.variants || [];
    const normVariants = variants.map(v => normalizeSearchText(v));
    const compactVariants = variants.map(v => compactSearchText(v));

    const normTr = normalizeSearchText(item.meaningTr || '');
    const compactTr = compactSearchText(item.meaningTr || '');

    const normEn = normalizeSearchText(item.meaningEn || '');
    const compactEn = compactSearchText(item.meaningEn || '');

    const normEx = normalizeSearchText(item.example || '');
    const normBr = normalizeSearchText(item.breakdown || '');
    const normDesc = normalizeSearchText(item.description || '');

    let score = 0;

    // 1. Morfem gösterim terimi, temiz kökü veya varyantları ile tam eşleşme
    if (
      normTerm === normQuery ||
      normClean === normQuery ||
      normVariants.includes(normQuery)
    ) {
      score += 1200;
    }
    // 2. Kompakt tam eşleşme (tire veya bölü olmadan; örn: "itis" <-> "-itis", "cardio" <-> "cardi/o")
    else if (
      compactTerm === compactQuery ||
      compactClean === compactQuery ||
      compactVariants.includes(compactQuery)
    ) {
      score += 1100;
    }
    // 3. Türkçe veya İngilizce anlam ile tam birebir eşleşme (örn: "kalp" arandığında cardi/o)
    else if (normTr === normQuery || normEn === normQuery) {
      score += 850;
    }
    // 4. Anlam virgülle ayrılmış tam bir madde olarak geçiyor (örn: "uç, uzuv, ekstremite" içinde "ekstremite")
    else if (
      normTr.split(/[,;\/]+/).map(s => s.trim()).includes(normQuery) ||
      normEn.split(/[,;\/]+/).map(s => s.trim()).includes(normQuery)
    ) {
      score += 800;
    }
    // 5. Morfem adı veya temiz kök sorguyla başlıyor
    else if (
      normTerm.startsWith(normQuery) ||
      normClean.startsWith(normQuery) ||
      compactTerm.startsWith(compactQuery) ||
      compactClean.startsWith(compactQuery)
    ) {
      score += 650;
    }
    // 6. Anlam sorguyla başlıyor veya kelime olarak içeriyor
    else if (normTr.startsWith(normQuery) || normEn.startsWith(normQuery)) {
      score += 500;
    } else if (
      queryTokens.length === 1 &&
      (new RegExp(`(^|\\s)${normQuery}(\\s|$)`).test(normTr) ||
       new RegExp(`(^|\\s)${normQuery}(\\s|$)`).test(normEn))
    ) {
      score += 450;
    }
    // 7. Morfem adı dize olarak içeriyor
    else if (normTerm.includes(normQuery) || compactTerm.includes(compactQuery)) {
      score += 350;
    }
    // 8. Anlam dize olarak içeriyor
    else if (normTr.includes(normQuery) || normEn.includes(normQuery)) {
      score += 200;
    }
    // 9. Örnek kelime sorguyu içeriyor
    else if (normEx.includes(normQuery)) {
      score += 80;
    }
    // 10. Çözümleme veya açıklama sorguyu içeriyor
    else if (normBr.includes(normQuery) || normDesc.includes(normQuery)) {
      score += 30;
    }

    if (score > 0) {
      results.push({ item, score, originalIndex: i });
    }
  }

  // Puan azalan, eşitlikte orijinal sıra
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.originalIndex - b.originalIndex;
  });

  return results.map(r => r.item);
}
