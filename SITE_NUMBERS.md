# Healthlex-V2.1 Değişen Sayılar Referans Belgesi (SITE_NUMBERS.md)

Bu belge, sitede elle yazılmış ya da dinamik olarak hesaplanan tüm değişen sayıların (terim, morfem, kategori, plan limitleri, deneme süresi ve fiyatlar) tek bir merkezden takip edilmesini sağlar. Kod tabanında bu sayılardan herhangi biri değiştiğinde, kodları baştan aramak yerine bu belgedeki kontrol listesi ve konum tabloları üzerinden senkronizasyon yapılır.

---

## 📌 Güncelleme Kontrol Listesi

Yeni bir veri yüklendiğinde veya parametre değiştiğinde aşağıdaki bölümleri ve ilişkili dosyaları kontrol edin:

### 1. Yeni Terim Yüklendiğinde (`terms` / `medicalTerms.js` / Firestore)
- [ ] **Bölüm 1 (Terim Sayısı)** konum tablosunu açın.
- [ ] `frontend/src/data/termCount.json` dosyasını güncelleyin (`syncTermBundle.js` veya `updateTermCount.js` otomatik yapar).
- [ ] `frontend/src/data/medicalTerms.js` bundle'ına yeni terimlerin eklendiğini doğrulayın.
- [ ] Sabit metin geçen yerleri yeni kurala (`aşağı yuvarlanmış onluk + "+"`, örn. 947 → `940+`) göre güncelleyin:
  - `frontend/src/data/homeContent.js` (`micro2` ikna metinleri)
  - `frontend/src/pages/Welcome.jsx`
  - `frontend/src/pages/Dashboard.jsx`
  - `frontend/src/pages/TermDetail.jsx`
  - `frontend/public/index.html` (`meta description`, `og:description`, `twitter:description`)
- [ ] Dinamik (kurala aykırı çıktı) basan bileşenleri (`Home.jsx`, `TopInfoBar.jsx`, `homeContent.js`) kontrol edin.
- [ ] Sitemap betiğini çalıştırarak sitemap XML'ini yenileyin (`npm run build:sitemap` / `node frontend/scripts/generate-sitemap.mjs`).

### 2. Yeni Kategori Açıldığında
- [ ] **Bölüm 3 (Kategori Sayısı)** ve **Bölüm 7 (Kategori Erişim Vaatleri)** tablolarını açın.
- [ ] `frontend/src/data/medicalTerms.js` dosyasında yeni alt kategori anahtarını (`medicalTermsData`), `subcategoriesBySystem` ve gerekirse `categories` haritasını güncelleyin.
- [ ] Oyunlarda kategori kısıtı yoktur (12e); erişim yalnızca oyun seviyesinde kontrol edilir (`isGameUnlocked`).
- [ ] `frontend/src/utils/generateProgressPdf.js` içindeki `catList` (kategori listesi) dizisine yeni kategoriyi ekleyin.
- [ ] Sabit "16 kategori" metinlerini yeni kategori sayısına göre güncelleyin:
  - `frontend/public/index.html` (`meta description`)
  - `frontend/src/components/TopInfoBar.jsx` (`16 KATEGORİ`, `16 CATEGORIES`)
  - `frontend/src/pages/Home.jsx` (`<div className="n">16</div>`)
  - `frontend/src/components/HomePricingSection.jsx` & `frontend/src/pages/Pricing.jsx`
  - `frontend/src/pages/FAQ.jsx` & `frontend/scripts/prerender-faq.mjs`
  - `frontend/src/pages/Profile.jsx`
  - `frontend/src/pages/Welcome.jsx`
  - `frontend/src/components/TrialDashboardView.jsx`
  - `frontend/src/pages/MorphemeDetail.jsx`

### 3. Yeni Morfem Eklendiğinde (`morphemesData.js`)
- [ ] **Bölüm 2 (Morfem Sayısı)** tablosunu açın.
- [ ] `frontend/src/data/morphemesData.js` dosyasındaki ilgili diziye (`PREFIXES`, `ROOTS` veya `SUFFIXES`) ekleyin. Dosya başındaki açıklama yorumunu güncelleyin.
- [ ] Pazarlama kuralı "550+ morfem" eşiğini aşan yeni bir tabana geçilmişse veya sabit 571 yazan yerler güncellenecekse şu dosyaları kontrol edin:
  - `frontend/src/components/TopInfoBar.jsx`
  - `frontend/src/components/MorphemeOfTheDay.jsx`
  - `frontend/public/index.html` (`description`, `og:description`, `twitter:description`)
  - `frontend/src/pages/TermDetail.jsx` & `frontend/src/pages/MorphemeDetail.jsx`
  - `frontend/src/pages/Guide/components/RightSidebar.jsx` & `frontend/src/pages/Guide/sections/Section8HowToStudy.jsx`
  - `frontend/src/components/HomePricingSection.jsx` & `frontend/src/pages/Pricing.jsx`
  - `frontend/src/pages/FAQ.jsx` & `frontend/scripts/prerender-faq.mjs`
  - `frontend/src/pages/Profile.jsx` & `frontend/src/pages/Welcome.jsx`
  - `frontend/src/pages/Dashboard.jsx` (istatistik ve kalan morfem hesapları, `/ 571` kod içi tekrarları)
  - `frontend/src/pages/MorphemeExplorer.jsx` (kilit metinleri)

### 4. Fiyat Değiştiğinde
- [ ] **Bölüm 6 (Fiyatlar ve İndirim)** konum tablosunu açın.
- [ ] Paddle Dashboard üzerinde yeni Price ID'leri oluşturun ve Vercel çevre değişkenlerini (`PADDLE_PRICE_BASIC`, `PADDLE_PRICE_PRO`, `REACT_APP_PADDLE_PRICE_LIFETIME` / `PADDLE_PRICE_LIFETIME`) güncelleyin.
- [ ] `frontend/src/services/paddle.js` ve `api/webhook/paddle.js` içindeki fallback ID'leri güncelleyin.
- [ ] Sitedeki tüm sabit fiyat metinlerini (güncel fiyatlar, eski üstü çizili fiyatlar `4.500` / `8.000` ve indirim rozetleri `%55` / `%25`) güncelleyin:
  - `frontend/src/components/HomePricingSection.jsx` & `frontend/src/pages/Pricing.jsx`
  - `frontend/src/components/TopInfoBar.jsx` (indirim oranları)
  - `frontend/src/pages/Auth.jsx` (plan seçim kutuları)
  - `frontend/src/pages/Dashboard.jsx` (yükseltme diyalogları ve plan tutarı)
  - `frontend/src/pages/Welcome.jsx` (fiyat ve indirim özetleri)
  - `frontend/src/utils/storage.js` (`getFormattedPlanPrice` fonksiyonu)

### 5. Plan Limiti veya Süresi Değiştiğinde
- [ ] **Bölüm 4 (Plan Limitleri)** ve **Bölüm 5 (Deneme Süresi)** konum tablolarını açın.
- [ ] Kod sabitlerini güncelleyin:
  - `frontend/src/utils/planAccess.js` (`MAX_GUEST_MORPHEMES`, `MAX_FREE_USER_MORPHEMES`, `MAX_BASIC_MORPHEMES`)
  - `frontend/src/data/morphemesData.js` (`TOTAL_MORPHEMES`)
  - `frontend/src/utils/storage.js` (`MAX_GUEST_DAILY_FLASHCARDS`, `MAX_GUEST_DAILY_RESTARTS`)
- [ ] Kullanıcı metinlerini ve çevirileri güncelleyin:
  - `frontend/src/i18n/translations.js` (`guestFlashcardDailyLimitDesc`, `userFlashcardDailyLimitDesc`, `userFlashcardRestartLimitDesc`)
  - `frontend/src/pages/Flashcards.jsx` & `frontend/src/pages/Games.jsx`
  - `frontend/src/pages/FAQ.jsx` & `frontend/scripts/prerender-faq.mjs`
  - `frontend/src/pages/Dashboard.jsx` & `frontend/src/pages/Welcome.jsx`
  - `frontend/src/pages/MorphemeExplorer.jsx`
  - `frontend/src/components/HomePricingSection.jsx` & `frontend/src/pages/Pricing.jsx`
  - `frontend/public/index.html` (JSON-LD offers açıklama)

---

## 1. Terim Sayısı (Medical Terms Count)

### a) Gerçek Değer ve Kaynağı
- **Bugünkü Gerçek Değer:** **947**
- **Hesaplama Kaynağı:**
  - `frontend/src/data/termCount.json` (`totalTerms: 947`)
  - `frontend/src/data/medicalTerms.js` (`getAllTerms().length = 947`)
  - Canlı Firestore `terms` koleksiyonu sayımı (`termCountService.js`)

### b) Pazarlama Yazım Kuralı
- **Kural:** Gerçek sayının aşağıya yuvarlanmış onluğu + "+"
- **Mevcut Değer İçin Yazım:** **"940+ terim"** / İngilizce: **"940+ terms"**
- **İstisna / Kural Dışı:** Tam sayıyı ("947+", "947") pazarlama metinlerinde doğrudan kullanmayın.

### c) Konum Tablosu

| Dosya | Aranacak Metin | Tür | Not |
| :--- | :--- | :--- | :--- |
| `frontend/src/data/termCount.json` | `"totalTerms": 947` | dinamik | Baseline senkron terim sayısı kaynağı |
| `frontend/src/data/medicalTerms.js` | `export const getAllTerms = () => {` | dinamik | 947 terim içeren statik bundle ana fonksiyonu |
| `frontend/src/services/termCountService.js` | `const BASELINE_COUNT = typeof termCountConfig?.totalTerms === 'number' ? termCountConfig.totalTerms : 947;` | dinamik | termCount.json okunamadığında devreye giren fallback |
| `frontend/src/pages/Home.jsx` | `const [termCount, setTermCount] = useState(getInitialTermCount);` | dinamik | Ana sayfa terim sayısı durum yöneticisi |
| `frontend/src/pages/Home.jsx` | `<div className="n">{termCount}+</div>` | dinamik (kurala aykırı çıktı) | Ekrana "947+" basar (Kural: 940+) |
| `frontend/src/data/homeContent.js` | `Tıp terimlerinin çoğu anlamlı parçalardan oluşur. Parçaları öğren; <strong className="text-foreground font-bold">{termCount}+</strong>` | dinamik (kurala aykırı çıktı) | Ekrana "947+" basar |
| `frontend/src/data/homeContent.js` | `Most medical terms consist of meaningful parts. Learn the parts; read and understand <strong className="text-foreground font-bold">{termCount}+</strong>` | dinamik (kurala aykırı çıktı) | Ekrana "947+" basar |
| `frontend/src/data/homeContent.js` | `micro2: '✓ 947+ terim ücretsiz',` | sabit metin | Hero mikro ikna metni (TR) |
| `frontend/src/data/homeContent.js` | `micro2: '✓ 947+ terms free',` | sabit metin | Hero mikro ikna metni (EN) |
| `frontend/src/data/homeContent.js` | `<strong className="text-foreground">3 terimi ezberlemeden çözdün!</strong> İçeride {termCount}+ terim ve 550+ morfem seni bekliyor.` | dinamik (terim) / sabit (morfem) | İnteraktif demo bitişi (Morfem: 550+) |
| `frontend/src/data/homeContent.js` | `<strong className="text-foreground">You solved 3 terms without memorizing!</strong> Inside, {termCount}+ terms and 550+ morphemes are waiting for you.` | dinamik (terim) / sabit (morfem) | İnteraktif demo bitişi (Morfem: 550+) |
| `frontend/src/data/homeContent.js` | `step2Desc: (termCount) => \`Her parçanın bir anlamı vardır ve \${termCount}+ terimin içinde tekrar eder.\`` | dinamik (kurala aykırı çıktı) | Metot adımı şablonu (Ekrana "947+" basar) |
| `frontend/src/data/homeContent.js` | `step2Desc: (termCount) => \`Each part has a meaning and repeats across \${termCount}+ terms.\`` | dinamik (kurala aykırı çıktı) | Metot adımı şablonu (Ekrana "947+" basar) |
| `frontend/src/components/TopInfoBar.jsx` | `\`\${count}+ TERİM\`` | dinamik (kurala aykırı çıktı) | Kayan bant: Ekrana "947+ TERİM" basar |
| `frontend/src/components/TopInfoBar.jsx` | `\`\${count}+ TERMS\`` | dinamik (kurala aykırı çıktı) | Kayan bant: Ekrana "947+ TERMS" basar |
| `frontend/src/pages/Welcome.jsx` | `{isTr ? '16 kategori, 940+ detaylı tıbbi terim ve klinik köken.' : '16 categories, 940+ medical terms with origins.'}` | sabit metin | Karşılama sayfası Pro ayrıcalıkları kartı (Kurala uygun: 940+) |
| `frontend/public/index.html` | `<meta name="description" content="Tıp ve sağlık öğrencileri için interaktif tıbbi terminoloji ve anatomi platformu. 940+ terim, 550+ morfem, 16 kategori ve 4 oyun moduyla Latince tıp terimlerini kök mantığıyla kalıcı öğrenin." />` | betik/meta | HTML meta description etiketi (Terim: 940+, Morfem: 550+) |
| `frontend/public/index.html` | `<meta property="og:description" content="940+ tıbbi terim, 550+ morfem ve 4 oyun modu ile tıp terimlerini ezberlemeden, kök mantığıyla kalıcı olarak öğrenin. Flashcard, Eşleştirme, Quiz ve Morfem Çözümleme." />` | betik/meta | OpenGraph açıklama etiketi (Terim: 940+, Morfem: 550+) |
| `frontend/public/index.html` | `<meta name="twitter:description" content="940+ tıbbi terim, 550+ morfem ve 4 oyun modu ile tıp terimlerini ezberlemeden, kök mantığıyla kalıcı olarak öğrenin. Flashcard, Eşleştirme, Quiz ve Morfem Çözümleme." />` | betik/meta | Twitter Card açıklama etiketi (Terim: 940+, Morfem: 550+) |
| `frontend/src/pages/Dashboard.jsx` | `940+ {isTr ? 'Tıbbi Terim' : 'Medical Terms'}` | sabit metin | Öğrenci panosu istatistik kartı başlığı |
| `frontend/src/pages/Dashboard.jsx` | `940+ {isTr ? 'terim' : 'terms'}` | sabit metin | Öğrenci panosu alt istatistik rozeti |
| `frontend/src/pages/TermDetail.jsx` | `? 'HealthLexMed ile 200+ anatomik yapıyı ve 570+ morfemi 4 interaktif oyun modunda pekiştirin. Bilgi Kartları, Eşleştirme, Quiz ve Morfem Çözümleme ile bilginizi kalıcı hale getirin.'` | sabit metin | Terim detay sayfası SEO/alt açıklama metni (TR) |
| `frontend/src/pages/TermDetail.jsx` | `: 'Study 200+ anatomical terms and 570+ morphemes through Flashcards, Matching, Quiz, and Morpheme Breakdown.'}` | sabit metin | Terim detay sayfası SEO/alt açıklama metni (EN) |
| `frontend/src/components/TrialDashboardView.jsx` | `const termsMax = getAllTerms().length || 571;` | kod içi tekrar | Deneme panosu terim ilerleme çubuğu üst sınırı (Yedek: 571) |
| `frontend/scripts/generate-sitemap.mjs` | `const allTerms = getAllTerms();` | dinamik | Sitemap URL üretiminde terim listesini çeken fonksiyon |
| `scripts/migrate_group_skull_bones.js` | `if (totalSnap.size !== 947) {` | betik/meta | Firestore terim grubu migrasyon scripti doğrulama kontrolü |
| `scripts/move_terms_to_correct_categories.js` | `console.log('  - Total terms: 947 (remains unchanged)\n');` | yorum satırı | Kategori taşıma konsol logu |
| `scripts/move_term_734.js` | `console.log('  - Total terms: 947 (unchanged)');` | yorum satırı | Terim 734 taşıma konsol logu |

### d) Güncel Durum Notu
- Gerçek terim sayısı `947` (`termCount.json`, `medicalTerms.js`), pazarlama yazım standardı ise **"940+ terim"** / **"940+ terms"** olarak sabitlenmiştir.

---

## 2. Morfem Sayısı (Morphemes Count)

### a) Gerçek Değer ve Kaynağı
- **Toplam Veri Kayıt Sayısı:** **571 adet**
  - Ön Ekler (`PREFIXES`): 116 adet
  - Kelime Kökleri (`ROOTS`): 318 adet
  - Son Ekler (`SUFFIXES`): 137 adet
  - Toplam: 116 + 318 + 137 = **571 kayıt**.
- **Benzersiz Morfem Metni Sayısı:** **568 adet**
  - Veri setindeki 571 kaydın 3 tanesi aynı metni paylaşan mükerrer kayıtlardır:
    1. `hypo-` (2 adet ön ek: biri "Altında, aşağısında (konum)", diğeri "Yetersiz, eksik, normalin altında (derece)").
    2. `kerat/o` (2 adet kök: biri `integumentary` sisteminde "Kornea, boynuzsu/sert doku", diğeri `special_senses` sisteminde "Kornea, saydam tabaka").
    3. `salping/o` (2 adet kök: biri `genitourinary` sisteminde "Tüp (rahim/fallop tüpleri)", diğeri `special_senses` sisteminde "Tüp (östaki borusu)").
- **Benzersiz Sayfa (Slug) Sayısı:** **553 adet**
  - `frontend/scripts/generate-sitemap.mjs` içindeki `getMorphemeSlug` fonksiyonu noktalama, kesme ve varyantları elediğinde toplam **17 çakışma (18 mükerrer slug)** meydana gelir (`bi`, `ad`, `hypo`, `para`, `super`, `an`, `chlor`, `cyan`, `erythr`, `glauc`, `leuk`, `melan`, `xanth`, `blast`, `kerat`, `ile`, `salping`). Bu nedenle sitemap çıktısında tam **553 tekil morfem URL'si** (`/morphemes/:slug`) üretilir. `MorphemeOfTheDay.jsx` içindeki 553 sayısı da bu sitemap sayımından kaynaklanmıştır.
- **Hangi Sayı Nerede Kullanılmalı?**
  - **Pazarlama Metinleri:** **"550+"** ("550+ morfem" / "550+ morphemes") kullanılmalıdır.
  - **İlerleme / Yüzde Hesaplamaları:** Kod içine sabit bir sayı gömülmemeli; kütüphanenin dinamik benzersiz eleman sayısı (`new Set(...).size` veya veri dizisi uzunluğu) kullanılmalıdır.
  - **Sitemap ve Dinamik Sayfalar:** 553 tekil sayfa URL'si baz alınır.

### b) Pazarlama Yazım Kuralı
- **Kural:** **"550+ morfem"** (Karar verildi) / İngilizce: **"550+ morphemes"**
- **Gerekçe:** Kullanıcıya yönelik pazarlama ve karşılama metinlerinde net ve güven veren yuvarlak sayı kullanımı.

### c) Konum Tablosu

| Dosya | Aranacak Metin | Tür | Not |
| :--- | :--- | :--- | :--- |
| `frontend/src/data/morphemesData.js` | `// 1. ÖN EKLER (PREFIXES - 116 Adet)` | yorum satırı | Ön ekler bölüm başlığı yorumu |
| `frontend/src/data/morphemesData.js` | `*  Kelime Kökleri / Birleştirme Formları (Combining Forms / Roots - 318 adet),` | yorum satırı | Kökler bölüm başlığı yorumu |
| `frontend/src/data/morphemesData.js` | `*  Son Ekler (Suffixes - 137 adet).` | yorum satırı | Başlık yorumu (116+318+137 = 571) |
| `frontend/src/data/morphemesData.js` | `export const TOTAL_MORPHEMES = PREFIXES.length + ROOTS.length + SUFFIXES.length;` | kod sabiti | Dinamik toplam morfem sabiti (`571`) |
| `frontend/src/utils/morphemeHelper.js` | `* Returns a standardized array of all 559 morphemes with slugs and variants.` | yorum satırı | JSDoc yorumu (559 = eski toplam 116+318+125) |
| `frontend/src/utils/termHelper.js` | `// Check if this root exists in our 571 morphemes` | yorum satırı | Morfem eşleme açıklama yorumu |
| `frontend/src/utils/planAccess.js` | `* - Pro/Ömür Boyu: tüm morfemler (571+) açık` | yorum satırı | Plan erişim kontrolü JSDoc yorumu |
| `frontend/src/pages/Home.jsx` | `<div className="n">550+</div>` | sabit metin | Sayılarla HealthLexMed morfem sayısı (Kurala uygun: 550+) |
| `frontend/src/data/homeContent.js` | `logicClose: () => \`550+ morfemi öğrendiğinde, daha önce hiç görmediğin...\`` | sabit metin | Yöntem bölümü kapanışı (TR, Kurala uygun: 550+) |
| `frontend/src/data/homeContent.js` | `logicClose: () => \`When you learn 550+ morphemes, you can easily read...\`` | sabit metin | Yöntem bölümü kapanışı (EN, Kurala uygun: 550+) |
| `frontend/src/data/homeContent.js` | `text: \`16 kategorinin tamamı + \${totalMorphemes}'den fazla morfem kütüphanesi\`` | dinamik (kurala aykırı çıktı) | Ekrana "571'den fazla" basar |
| `frontend/src/data/homeContent.js` | `text: \`All 16 categories + over \${totalMorphemes} morpheme library\`` | dinamik (kurala aykırı çıktı) | Ekrana "over 571" basar |
| `frontend/src/components/TopInfoBar.jsx` | `'550+ MORFEM',` | sabit metin | Kayan üst duyuru bandı (TR) |
| `frontend/src/components/TopInfoBar.jsx` | `'550+ MORPHEMES',` | sabit metin | Kayan üst duyuru bandı (EN) |
| `frontend/src/components/MorphemeOfTheDay.jsx` | `cta: '550+ morfemin tamamı'` | sabit metin | Günün morfemi CTA buton metni (TR) |
| `frontend/src/components/MorphemeOfTheDay.jsx` | `cta: 'Explore all 550+ morphemes'` | sabit metin | Günün morfemi CTA buton metni (EN) |
| `frontend/public/index.html` | `<meta name="description" content="Tıp ve sağlık öğrencileri için interaktif tıbbi terminoloji ve anatomi platformu. 940+ terim, 550+ morfem, 16 kategori ve 4 oyun moduyla Latince tıp terimlerini kök mantığıyla kalıcı öğrenin." />` | betik/meta | HTML meta description etiketi (550+) |
| `frontend/public/index.html` | `<meta property="og:description" content="940+ tıbbi terim, 550+ morfem ve 4 oyun modu ile tıp terimlerini ezberlemeden, kök mantığıyla kalıcı olarak öğrenin. Flashcard, Eşleştirme, Quiz ve Morfem Çözümleme." />` | betik/meta | OpenGraph açıklama etiketi (550+) |
| `frontend/public/index.html` | `<meta name="twitter:description" content="940+ tıbbi terim, 550+ morfem ve 4 oyun modu ile tıp terimlerini ezberlemeden, kök mantığıyla kalıcı olarak öğrenin. Flashcard, Eşleştirme, Quiz ve Morfem Çözümleme." />` | betik/meta | Twitter Card açıklama etiketi (550+) |
| `frontend/src/pages/TermDetail.jsx` | `? 'HealthLexMed ile 200+ anatomik yapıyı ve 570+ morfemi 4 interaktif oyun modunda pekiştirin. Bilgi Kartları, Eşleştirme, Quiz ve Morfem Çözümleme ile bilginizi kalıcı hale getirin.'` | sabit metin | Terim detay alt açıklama (TR) |
| `frontend/src/pages/TermDetail.jsx` | `: 'Study 200+ anatomical terms and 570+ morphemes through Flashcards, Matching, Quiz, and Morpheme Breakdown.'}` | sabit metin | Terim detay alt açıklama (EN) |
| `frontend/src/pages/MorphemeDetail.jsx` | `? '570+ morfem ve 16 kategori ile anatomiyi 4 interaktif oyun modunda test edin. Flashcard, Eşleştirme, Quiz ve Morfem Çözümleme ile bilginizi kalıcı hale getirin.'` | sabit metin | Morfem detay alt açıklama (TR) |
| `frontend/src/pages/MorphemeDetail.jsx` | `: 'Master Latin medical terminology through 570+ morphemes, 16 categories and 4 game modes. Flashcards, Matching, Quiz, and Morpheme Breakdown.'}` | sabit metin | Morfem detay alt açıklama (EN) |
| `frontend/src/pages/Guide/components/RightSidebar.jsx` | `570&apos;ten fazla ön ek, kök ve son eki örnek çözümlemeleriyle keşfet.` | sabit metin | Rehber yan çubuk Morfem Atlası tanıtım kutusu |
| `frontend/src/pages/Guide/sections/Section8HowToStudy.jsx` | `desc: "570'ten fazla ön ek, kök ve son ek, örnek çözümlemeleriyle.",` | sabit metin | Rehber Bölüm 8 Morfem Atlası çalışma tavsiyesi |
| `frontend/src/components/HomePricingSection.jsx` | `['–', 'Tüm 550+ morfem havuzu (Pro ve üzeri)']` | sabit metin | Ana sayfa fiyatlandırma tablosu Temel plan satırı (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 kategori · 550+ morfem'],` | sabit metin | Ana sayfa fiyatlandırma tablosu Pro plan satırı (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 kategori · 550+ morfem'],` | sabit metin | Ana sayfa fiyatlandırma tablosu Ömür Boyu plan satırı (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `['–', 'Full 550+ morpheme library (Pro & above)']` | sabit metin | Ana sayfa fiyatlandırma tablosu Temel plan satırı (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 categories · 550+ morphemes'],` | sabit metin | Ana sayfa fiyatlandırma tablosu Pro plan satırı (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 categories · 550+ morphemes'],` | sabit metin | Ana sayfa fiyatlandırma tablosu Ömür Boyu plan satırı (EN) |
| `frontend/src/pages/Pricing.jsx` | `['–', 'Tüm 550+ morfem havuzu (Pro ve üzeri)']` | sabit metin | Fiyatlandırma sayfası tablosu Temel plan satırı (TR) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 kategori · 550+ morfem'],` | sabit metin | Fiyatlandırma sayfası tablosu Pro plan satırı (TR) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 kategori · 550+ morfem'],` | sabit metin | Fiyatlandırma sayfası tablosu Ömür Boyu plan satırı (TR) |
| `frontend/src/pages/Pricing.jsx` | `['Morfem kütüphanesi', '150 morfem', '550+ (Tümü)', '550+ (Tümü)'],` | sabit metin | Fiyatlandırma detaylı karşılaştırma tablosu satırı (TR) |
| `frontend/src/pages/Pricing.jsx` | `['–', 'Full 550+ morpheme library (Pro & above)']` | sabit metin | Fiyatlandırma sayfası tablosu Temel plan satırı (EN) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 categories · 550+ morphemes'],` | sabit metin | Fiyatlandırma sayfası tablosu Pro plan satırı (EN) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 categories · 550+ morphemes'],` | sabit metin | Fiyatlandırma sayfası tablosu Ömür Boyu plan satırı (EN) |
| `frontend/src/pages/Pricing.jsx` | `['Morpheme library', '150 morphemes', '550+ (All)', '550+ (All)'],` | sabit metin | Fiyatlandırma detaylı karşılaştırma tablosu satırı (EN) |
| `frontend/src/pages/FAQ.jsx` | `Pro planda ise 571+ morfemin tamamı, Quiz ve Morfem Çözümleme oyun modları...` | sabit metin | SSS cevabı 2 (TR) |
| `frontend/src/pages/FAQ.jsx` | `The Pro plan provides unrestricted access to all 571+ morphemes, Quiz and Morpheme Builder...` | sabit metin | SSS cevabı 2 (EN) |
| `frontend/scripts/prerender-faq.mjs` | `Pro planda ise 571+ morfemin tamamı, Quiz ve Morfem Çözümleme oyun modları...` | betik/meta | Prerender FAQ statik HTML metni (TR) |
| `frontend/src/pages/Profile.jsx` | `Tüm 16 kategori, 571+ morfem ve 4 oyun modunun tamamına sınırsız erişebilirsiniz.` | sabit metin | Profil deneme bannerı metni (TR) |
| `frontend/src/pages/Profile.jsx` | `Full access to all 16 categories, 571+ morphemes, and 4 game modes.` | sabit metin | Profil deneme bannerı metni (EN) |
| `frontend/src/pages/Profile.jsx` | `16 kategorinin tamamı, 571+ morfem ve 4 oyun moduna sınırsız erişebilirsiniz.` | sabit metin | Profil deneme durumu bildirim metni (TR) |
| `frontend/src/pages/Profile.jsx` | `Tüm 571+ morfem ve Quiz için Pro'ya geçebilirsiniz.` | sabit metin | Profil Temel plan yükseltme uyarısı (TR) |
| `frontend/src/pages/Profile.jsx` | `Upgrade to Pro for all 571+ morphemes and Quiz.` | sabit metin | Profil Temel plan yükseltme uyarısı (EN) |
| `frontend/src/pages/Profile.jsx` | `571 morfem kütüphanesi, 4 oyun modu ve seviye sisteminin tamamına sınırsız erişmek için Pro'ya geçin.` | sabit metin | Profil süresi bitmiş deneme yükseltme metni (TR) |
| `frontend/src/pages/Profile.jsx` | `Upgrade to Pro to unlock 571 morphemes, 4 game modes, and unlimited tracking.` | sabit metin | Profil süresi bitmiş deneme yükseltme metni (EN) |
| `frontend/src/pages/Dashboard.jsx` | `unit: isTr ? '/ 571 açık' : '/ 571 open',` | sabit metin | Pano misafir morfem kutusu birimi |
| `frontend/src/pages/Dashboard.jsx` | `<span>{isTr ? '24 / 571 açık' : '24 / 571 open'}</span>` | sabit metin | Pano misafir ilerleme çubuğu etiketi |
| `frontend/src/pages/Dashboard.jsx` | `<span>{isTr ? '150 / 571 açık' : '150 / 571 open'}</span>` | sabit metin | Pano Temel plan ilerleme çubuğu etiketi |
| `frontend/src/pages/Dashboard.jsx` | `? 'Temel planda 150 morfem sınırsız açıktır. Kalan 421 morfem için Pro’ya geçebilirsiniz.'` | sabit metin | Pano Temel plan açıklama metni (421 = 571-150) |
| `frontend/src/pages/Dashboard.jsx` | `: '150 morphemes are unlocked in Basic plan. Upgrade to Pro for the remaining 421.'` | sabit metin | Pano Temel plan açıklama metni (EN) |
| `frontend/src/pages/Dashboard.jsx` | `const morphemePct = Math.round((learnedMorphemes / 571) * 100);` | kod içi tekrar | Pano öğrenilen morfem yüzdesi formülü (sabit bölen 571) |
| `frontend/src/pages/Dashboard.jsx` | `571 {isTr ? 'Morfem Kütüphanesi' : 'Morphemes'}` | sabit metin | Pano morfem kütüphanesi kart başlığı |
| `frontend/src/pages/Dashboard.jsx` | `{learnedMorphemes} / 571` | kod içi tekrar | Pano öğrenilen morfem kesir göstergesi (sabit payda 571) |
| `frontend/src/pages/Dashboard.jsx` | `? \`571 morfemden \${learnedMorphemes} tanesini öğrendiniz (%\${morphemePct})...\`` | kod içi tekrar | Pano öğrenme seviyesi şablonu (sabit 571 metin içinde) |
| `frontend/src/pages/Dashboard.jsx` | `: \`You have learned \${learnedMorphemes} out of 571 morphemes (\${morphemePct}%)...\`` | kod içi tekrar | Pano öğrenme seviyesi şablonu (sabit 571 metin içinde) |
| `frontend/src/pages/Dashboard.jsx` | `? '571 morfemin tamamı hesabına tanımlı. Morfem Atlası’nda "Öğrendim" butonuna basarak...'` | sabit metin | Pano Pro plan tebrik mesajı (TR) |
| `frontend/src/pages/Dashboard.jsx` | `: 'All 571 morphemes are unlocked. Visit Morpheme Atlas and click "Mark Learned"...'` | sabit metin | Pano Pro plan tebrik mesajı (EN) |
| `frontend/src/pages/Dashboard.jsx` | `571 {isTr ? 'morfem' : 'morphemes'}` | sabit metin | Pano alt özet rozeti |
| `frontend/src/pages/Welcome.jsx` | `Kütüphanenin tamamını, tüm 571+ morfemi ve 4 oyun modunun hepsini sınırsızca kullanabilirsin.` | sabit metin | Karşılama sayfası Pro üyelik tebrik metni (TR) |
| `frontend/src/pages/Welcome.jsx` | `Enjoy full unrestricted access to all terms, 571+ morphemes, and 4 game modes.` | sabit metin | Karşılama sayfası Pro üyelik tebrik metni (EN) |
| `frontend/src/pages/Welcome.jsx` | `v: '571+',` | sabit metin | Karşılama sayfası Pro istatistik kutusu değeri |
| `frontend/src/pages/Welcome.jsx` | `: 'All 571+ prefixes, roots, and suffixes completely unlocked.'` | sabit metin | Karşılama sayfası Pro açıklama metni |
| `frontend/src/pages/Welcome.jsx` | `unit: isTr ? '/ 571+ morfem' : '/ 571+ morphemes',` | sabit metin | Karşılama sayfası morfem birim metni |
| `frontend/src/pages/Welcome.jsx` | `mobileUnit: isTr ? '/ 571+ açık' : '/ 571+ open',` | sabit metin | Karşılama sayfası mobil birim metni |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Morfem listesi', ..., limit: '571+ morfem açık', ..., pro: '571+ morfem' },` | sabit metin | Karşılama tablosu Pro satırı (TR) |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Morpheme list', ..., limit: '571+ morphemes open', ..., pro: '571+ morphemes' },` | sabit metin | Karşılama tablosu Pro satırı (EN) |
| `frontend/src/pages/Welcome.jsx` | `16 kategori, 571+ morfem ve 4 oyun modunun tamamına sınırsız erişebilirsin.` | sabit metin | Karşılama sayfası Pro özellik listesi başlığı (TR) |
| `frontend/src/pages/Welcome.jsx` | `Enjoy unlimited access to all 16 categories, 571+ morphemes, and 4 game modes.` | sabit metin | Karşılama sayfası Pro özellik listesi başlığı (EN) |
| `frontend/src/pages/Welcome.jsx` | `16 kategori, 571+ morfem ve 4 oyun modu sınırsız kullanımına hazır.` | sabit metin | Karşılama sayfası Pro hazır mesajı (TR) |
| `frontend/src/pages/Welcome.jsx` | `571+ morfem, Quiz ve Morfem Yapıcı için dilediğin zaman Pro plana geçebilirsin.` | sabit metin | Karşılama sayfası Temel plan yükseltme önerisi (TR) |
| `frontend/src/pages/Welcome.jsx` | `Upgrade to Pro anytime to unlock all 571+ morphemes and advanced games.` | sabit metin | Karşılama sayfası Temel plan yükseltme önerisi (EN) |
| `frontend/src/pages/Welcome.jsx` | `{isTr ? '571 ön ek, kök ve son ek analizi ve türetim mantığı.' : '571 prefixes, roots and suffixes with logic.'}` | sabit metin | Karşılama sayfası özellik kartı alt metni |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Temel Paket: İlk 150 morfem açık. 571+ morfemin tamamı için Pro’ya geçin.` | sabit metin | Morfem Atlası kilitli içerik bannerı (TR) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Basic Plan: First 150 morphemes unlocked. Upgrade to Pro for all 571+.` | sabit metin | Morfem Atlası kilitli içerik bannerı (EN) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Misafir Modu: İlk 24 morfem açık. 150 morfem için Temel plana, 571+ morfemin tamamı için Pro’ya geçin.` | sabit metin | Morfem Atlası misafir bannerı (TR) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Guest Mode: First 24 morphemes unlocked. Upgrade to Basic for 150 or Pro for all 571+.` | sabit metin | Morfem Atlası misafir bannerı (EN) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `İlk 24 morfem misafirlere açıktır. 150 morfem için Temel plana, 571 morfemin tamamına erişmek için Pro ve üzeri planlara geçin.` | sabit metin | Morfem kartı kilit modalı misafir açıklaması |
| `frontend/src/pages/MorphemeExplorer.jsx` | `İlk 150 morfem Temel planda açıktır. 571 morfemin tamamına erişmek için Pro ve üzeri planlara geçin.` | sabit metin | Morfem kartı kilit modalı Temel plan açıklaması |

### d) Morfem Sayısı Senkronizasyon Notu
- Toplam morfem sayısı `frontend/src/data/morphemesData.js` içindeki `TOTAL_MORPHEMES` (`PREFIXES.length + ROOTS.length + SUFFIXES.length` = `116 + 318 + 137 = 571`) üzerinden dinamik okunur; `Dashboard.jsx` dağılım kartı da `PREFIXES.length`, `ROOTS.length`, `SUFFIXES.length` kullanır (12e).
- Pazarlama metinlerinde **"550+ morfem"** / **"550+ morphemes"** standardı kullanılır.

---

## 3. Kategori Sayısı (16 Kategori)

### a) Gerçek Değer ve Kaynağı
- **Bugünkü Gerçek Değer:** **16**
- **Hesaplama Kaynağı:**
  - `frontend/src/data/medicalTerms.js` içindeki `medicalTermsData` nesnesinin 16 alt kategori dizisi:
    1. `skull_bones` (Kafatası Kemikleri)
    2. `trunk_bones` (Gövde Kemikleri)
    3. `face_bones` (Yüz Kemikleri)
    4. `upper_extremity_bones` (Üst Ekstremite Kemikleri)
    5. `upper_extremity_joints` (Üst Ekstremite Eklemleri)
    6. `lower_extremity_bones` (Alt Ekstremite Kemikleri)
    7. `lower_extremity_joints` (Alt Ekstremite Eklemleri)
    8. `spine_joints` (Omurga Eklemleri)
    9. `head_and_neck_joints` (Kafa ve Boyun Eklemleri)
    10. `head_and_neck_muscles` (Baş ve Boyun Kasları)
    11. `trunk_muscles` (Gövde Kasları)
    12. `upper_extremity_muscles` (Üst Ekstremite Kasları)
    13. `muscle_structures` (Kas ve Kasla İlişkili Yapılar)
    14. `bone_structures` (Kemik / İskelet Yapıları)
    15. `movement_terms` (Hareket Terimleri)
    16. `anatomic_direction` (Anatomik Yön Terimleri)
  - `frontend/src/utils/generateProgressPdf.js` içindeki `catList` dizisi (16 kategori)

### b) Pazarlama Yazım Kuralı
- **Kural:** Tam sayı: **"16 kategori"** / İngilizce: **"16 categories"**

### c) Konum Tablosu

| Dosya | Aranacak Metin | Tür | Not |
| :--- | :--- | :--- | :--- |
| `frontend/src/data/medicalTerms.js` | `export const medicalTermsData = {` | dinamik | 16 alt kategori array'ini barındıran veri kökü |
| `frontend/src/utils/generateProgressPdf.js` | `// 16 Kategori Listesi` | yorum satırı | PDF rapor oluşturucu kategori listesi başlığı |
| `frontend/src/utils/generateProgressPdf.js` | `const catList = [` | dinamik / sabit | 16 kategorinin id ve adlarını içeren liste |
| `frontend/src/utils/generateProgressPdf.js` | `${isTr ? '16 Anatomik Kategoride İlerleme Dağılımı' : 'Progress Across 16 Anatomical Categories'}` | sabit metin | PDF raporu tablo başlığı |
| `frontend/public/index.html` | `<meta name="description" content="Tıp ve sağlık öğrencileri için interaktif tıbbi terminoloji ve anatomi platformu. 940+ terim, 550+ morfem, 16 kategori ve 4 oyun moduyla Latince tıp terimlerini kök mantığıyla kalıcı öğrenin." />` | betik/meta | HTML meta description etiketi |
| `frontend/src/components/TopInfoBar.jsx` | `'16 KATEGORİ',` | sabit metin | Kayan üst duyuru bandı (TR) |
| `frontend/src/components/TopInfoBar.jsx` | `'16 CATEGORIES',` | sabit metin | Kayan üst duyuru bandı (EN) |
| `frontend/src/pages/Home.jsx` | `<div className="n">16</div>` | sabit metin | Ana sayfa istatistik sayacı kutusu |
| `frontend/src/data/homeContent.js` | `text: \`16 kategorinin tamamı + \${totalMorphemes}'den fazla morfem kütüphanesi\`` | dinamik metin | Ana sayfa özellik maddesi (TR) |
| `frontend/src/data/homeContent.js` | `text: \`All 16 categories + over \${totalMorphemes} morpheme library\`` | dinamik metin | Ana sayfa özellik maddesi (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `tag: '16 kategori sözlüğü, 150 morfem, sınırsız Flashcard & Eşleştirme.',` | sabit metin | Temel plan kartı rozet metni (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 kategori · 571+ morfem'],` | sabit metin | Pro ve Ömür Boyu plan kartı özellikleri (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `tag: '16 categories glossary, 150 morphemes, unlimited Flashcards & Matching.',` | sabit metin | Temel plan kartı rozet metni (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 categories · 571+ morphemes'],` | sabit metin | Pro ve Ömür Boyu plan kartı özellikleri (EN) |
| `frontend/src/pages/Pricing.jsx` | `tag: '16 kategori sözlüğü, 150 morfem, sınırsız Flashcard & Eşleştirme.',` | sabit metin | Temel plan kartı rozet metni (TR) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 anatomik kategori · 150 morfem'],` | sabit metin | Temel plan kartı madde 1 (TR) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 kategori · 571+ morfem'],` | sabit metin | Pro ve Ömür Boyu plan kartı maddesi (TR) |
| `frontend/src/pages/Pricing.jsx` | `['Çalışma / Sözlük terimleri', '16 Kategori (Tümü açık)', '16 Kategori (Tümü açık)', '16 Kategori (Tümü açık)'],` | sabit metin | Plan karşılaştırma tablosu satırı (TR) |
| `frontend/src/pages/Pricing.jsx` | `tag: '16 categories glossary, 150 morphemes, unlimited Flashcards & Matching.',` | sabit metin | Temel plan kartı rozet metni (EN) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 anatomical categories · 150 morphemes'],` | sabit metin | Temel plan kartı madde 1 (EN) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 categories · 571+ morphemes'],` | sabit metin | Pro ve Ömür Boyu plan kartı maddesi (EN) |
| `frontend/src/pages/Pricing.jsx` | `['Study / Glossary terms', 'All 16 Categories Unlocked', 'All 16 Categories Unlocked', 'All 16 Categories Unlocked'],` | sabit metin | Plan karşılaştırma tablosu satırı (EN) |
| `frontend/src/pages/FAQ.jsx` | `16 anatomik kategorinin ve tıbbi terimler sözlüğünün tamamı misafirler dahil tüm kullanıcılara açıktır.` | sabit metin | SSS cevabı 2 (TR) |
| `frontend/src/pages/FAQ.jsx` | `All 16 anatomical categories and the complete medical glossary are openly accessible to everyone, including guests.` | sabit metin | SSS cevabı 2 (EN) |
| `frontend/scripts/prerender-faq.mjs` | `"text": "16 anatomik kategorinin ve tıbbi terimler sözlüğünün tamamı misafirler dahil tüm kullanıcılara açıktır.` | betik/meta | Prerender FAQ statik HTML metni (TR) |
| `frontend/src/pages/Profile.jsx` | `Tüm 16 kategori, 571+ morfem ve 4 oyun modunun tamamına sınırsız erişebilirsiniz.` | sabit metin | Profil deneme bannerı (TR) |
| `frontend/src/pages/Profile.jsx` | `Full access to all 16 categories, 571+ morphemes, and 4 game modes.` | sabit metin | Profil deneme bannerı (EN) |
| `frontend/src/pages/Profile.jsx` | `16 kategorinin tamamı, 571+ morfem ve 4 oyun moduna sınırsız erişebilirsiniz.` | sabit metin | Profil deneme durumu bildirim metni (TR) |
| `frontend/src/pages/Profile.jsx` | `Temel plandasınız: 16 kategori sözlüğü, 150 morfem ve sınırsız Flashcard & Eşleştirme açık.` | sabit metin | Profil Temel plan açıklaması (TR) |
| `frontend/src/pages/Profile.jsx` | `You are on the Basic plan: 16 categories glossary, 150 morphemes, and unlimited Flashcards & Matching unlocked.` | sabit metin | Profil Temel plan açıklaması (EN) |
| `frontend/src/pages/Profile.jsx` | `? '16 kategori, öğrenilen terimler, rozetler ve çalışma istatistiklerinizi içeren resmi PDF raporu.'` | sabit metin | Profil PDF indirme kartı açıklaması (TR) |
| `frontend/src/pages/Profile.jsx` | `: 'Official PDF report containing 16 categories, learned terms, badges, and study stats.'}` | sabit metin | Profil PDF indirme kartı açıklaması (EN) |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Kategoriler', desc: '16 tıp kategorisi', type: 'open', limit: '16 kategori, sınırsız gezinme', sub: 'Tüm kategoriler açık', pro: 'Sınırsız' },` | sabit metin | Karşılama sayfası plan tablosu (TR) |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Categories', desc: '16 medical categories', type: 'open', limit: '16 categories, unlimited browsing', sub: 'All categories unlocked', pro: 'Unlimited' },` | sabit metin | Karşılama sayfası plan tablosu (EN) |
| `frontend/src/pages/Welcome.jsx` | `? '16 kategori, 571+ morfem ve 4 oyun modunun tamamına sınırsız erişebilirsin.'` | sabit metin | Karşılama sayfası Pro aktivasyon metni (TR) |
| `frontend/src/pages/Welcome.jsx` | `: 'Enjoy unlimited access to all 16 categories, 571+ morphemes, and 4 game modes.',` | sabit metin | Karşılama sayfası Pro aktivasyon metni (EN) |
| `frontend/src/pages/Welcome.jsx` | `? '16 kategori, 571+ morfem ve 4 oyun modu sınırsız kullanımına hazır.'` | sabit metin | Karşılama sayfası Pro aktivasyon metni 2 (TR) |
| `frontend/src/pages/Welcome.jsx` | `{isTr ? '16 kategori, 940+ detaylı tıbbi terim ve klinik köken.' : '16 categories, 940+ medical terms with origins.'}` | sabit metin | Karşılama sayfası Pro ayrıcalık kartı alt metni |
| `frontend/src/components/TrialDashboardView.jsx` | `proLockCategories: '16 kategoride ilerleme takibi Temel plan ve üzeri planlarda açılır.',` | sabit metin | Deneme panosu kilitli kategori bildirimi (TR) |
| `frontend/src/components/TrialDashboardView.jsx` | `proLockCategories: 'Progress tracking across 16 categories unlocks with Basic plan and above.',` | sabit metin | Deneme panosu kilitli kategori bildirimi (EN) |
| `frontend/src/pages/MorphemeDetail.jsx` | `? '570+ morfem ve 16 kategori ile anatomiyi 4 interaktif oyun modunda test edin. Flashcard, Eşleştirme, Quiz ve Morfem Çözümleme ile bilginizi kalıcı hale getirin.'` | sabit metin | Morfem detay alt açıklama (TR) |
| `frontend/src/pages/MorphemeDetail.jsx` | `: 'Master Latin medical terminology through 570+ morphemes, 16 categories and 4 game modes. Flashcards, Matching, Quiz, and Morpheme Breakdown.'}` | sabit metin | Morfem detay alt açıklama (EN) |

### d) Kategori Sayısı Senkronizasyon Notu
- Kategori sayısı (`16`) mevcut veritabanı yapısıyla tutarlıdır.
- 12e kararıyla oyunlarda kategori kısıtı tamamen kaldırılmıştır; misafir ve ücretsiz kullanıcılar dahil herkes her oyunda 16 kategorinin tamamını seçebilir (erişim yalnızca oyun seviyesinde kontrol edilir).

---

## 4. Plan Limitleri (Misafir, Ücretsiz, Temel, Flashcard Kotası, Yeniden Başlatma)

### a) Gerçek Değerler ve Kaynakları
- **Misafir Morfem Kotası:** **24** morfem. Kaynak: `frontend/src/utils/planAccess.js` (`export const MAX_GUEST_MORPHEMES = 24;`).
- **Kayıtlı Ücretsiz Kullanıcı Morfem Kotası:** **50** morfem. Kaynak: `frontend/src/utils/planAccess.js` (`export const MAX_FREE_USER_MORPHEMES = 50;`).
- **Temel Plan Morfem Kotası:** **150** morfem. Kaynak: `frontend/src/utils/planAccess.js` (`export const MAX_BASIC_MORPHEMES = 150;`).
- **Pro & Ömür Boyu Morfem Kotası:** Tümü (**571** = `116 + 318 + 137`). Kaynak: `frontend/src/data/morphemesData.js` (`TOTAL_MORPHEMES`).
- **Günlük Flashcard Hakkı (Misafir):** **5** oturum; **Kayıtlı Ücretsiz ve Üstü:** **Sınırsız**. Kaynak: `frontend/src/utils/storage.js` (`export const MAX_GUEST_DAILY_FLASHCARDS = 5;`, 8 Kasım kararı / Adım 13).
- **Günlük Yeniden Başlatma Hakkı (Misafir):** **10** oturum. Kaynak: `frontend/src/utils/storage.js` (`export const MAX_GUEST_DAILY_RESTARTS = 10;`).
- **Misafir Oyun Deneme Hakkı (Eşleştirme, Quiz, Morfem Yapıcı):** Her oyundan toplam **2** deneme (yenilenmez). Kaynak: `frontend/src/utils/gameTrials.js` (`export const GUEST_TRIAL_LIMIT = 2;`, 19 Kasım kararı).
- **Kayıtlı Ücretsiz Haftalık Oyun Hakkı (Eşleştirme, Quiz, Morfem Yapıcı):** Her oyundan haftada **5** hak (Pazartesi 00:00 yerel saatte yenilenir). Kaynak: `frontend/src/utils/gameTrials.js` (`export const FREE_WEEKLY_TRIAL_LIMIT = 5;`, 19 Kasım kararı).

### b) Pazarlama Yazım Kuralı
- **Misafir Morfem:** "İlk 24 morfem açık" / İngilizce: "First 24 morphemes open"
- **Kayıtlı Ücretsiz Morfem:** "İlk 50 morfem açık" / İngilizce: "First 50 morphemes open"
- **Temel Plan Morfem:** "İlk 150 morfem açık" / İngilizce: "Top 150 morphemes open"
- **Pro / Ömür Boyu Morfem:** "550+ morfem (Tümü)" / İngilizce: "550+ morphemes (All)"
- **Günlük Flashcard Hakkı:** "5" (8 Kasım kararı).
- **Yeniden Başlatma Hakkı:** "10" kez yeniden başlatma.
- **Misafir Oyun Denemesi (Eşleştirme/Quiz/Morfem Yapıcı):** "Toplam 2 deneme hakkı" / "2 deneme hakkın var" / İngilizce: "2 free tries total"
- **Kayıtlı Ücretsiz Haftalık Oyun Hakkı:** "Haftada 5 hak · Pazartesi yenilenir" / İngilizce: "5 plays/week · Resets Monday"
- **Pro / Ömür Boyu Oyun Hakkı:** "Pro: sınırsız" / İngilizce: "Pro: unlimited"

### c) Konum Tablosu

| Dosya | Aranacak Metin | Tür | Not |
| :--- | :--- | :--- | :--- |
| `frontend/src/utils/planAccess.js` | `export const MAX_GUEST_MORPHEMES = 24;` | kod sabiti | Misafirlerin Morfem Atlası'nda görebileceği açık morfem limiti |
| `frontend/src/utils/planAccess.js` | `export const MAX_FREE_USER_MORPHEMES = 50;` | kod sabiti | Kayıtlı ücretsiz kullanıcıların Morfem Atlası'nda görebileceği açık morfem limiti |
| `frontend/src/utils/planAccess.js` | `export const MAX_BASIC_MORPHEMES = 150;` | kod sabiti | Temel plan abonelerinin Morfem Atlası'nda görebileceği açık morfem limiti |
| `frontend/src/data/morphemesData.js` | `export const TOTAL_MORPHEMES = PREFIXES.length + ROOTS.length + SUFFIXES.length;` | kod sabiti | Pro & Ömür Boyu tüm morfem toplamı (`571`) |
| `frontend/src/utils/storage.js` | `export const MAX_GUEST_DAILY_FLASHCARDS = 5;` | kod sabiti | Misafir günlük Flashcard oturum limiti (8 Kasım kararı) |
| `frontend/src/utils/storage.js` | `export const MAX_GUEST_DAILY_RESTARTS = 10;` | kod sabiti | Misafir günlük oturum yeniden başlatma limiti |
| `frontend/src/utils/gameTrials.js` | `export const GUEST_TRIAL_LIMIT = 2;` | kod sabiti | Misafir Eşleştirme/Quiz/Morfem Yapıcı toplam deneme limiti |
| `frontend/src/utils/gameTrials.js` | `export const FREE_WEEKLY_TRIAL_LIMIT = 5;` | kod sabiti | Ücretsiz kayıtlı kullanıcı haftalık oyun limiti (Pazartesi yenilenir) |
| `frontend/src/utils/gameTrials.js` | `Bu hafta ${remaining}/${FREE_WEEKLY_TRIAL_LIMIT} hakkın kaldı · Pazartesi yenilenir · Pro: sınırsız` | dinamik metin | Oyunlar kart altı ve tur sonu kalan haftalık hak metni (TR/EN) |
| `frontend/src/utils/gameTrials.js` | `Bu haftaki 5 hakkını kullandın · Pazartesi yenilenir · Pro: sınırsız` | sabit metin | Haftalık 5 hak bitiş metni (TR/EN) |
| `frontend/src/i18n/translations.js` | `guestFlashcardDailyLimitDesc: "Misafir olarak günde en fazla 5 kelime kartı çalışması yapabilirsin..."` | sabit metin | Flashcard günlük limit modalı açıklaması (TR/EN) |
| `frontend/src/i18n/translations.js` | `guestFlashcardRestartLimitDesc: "Misafir olarak günde en fazla 10 kez yeniden başlatabilirsin..."` | sabit metin | Flashcard günlük yeniden başlatma limiti açıklaması (TR/EN) |
| `frontend/src/i18n/translations.js` | `guestMatchLockedDesc`, `guestMatchCardTitle`, `guestMatchCardDesc`, `registerToPlay`, `matchExclusiveToBasic`, `guestLimitCardDesc`, `guestProgressNotice` | sabit metin | Misafir 2 deneme ve ücretsiz hesap haftada 5 hak çeviri metinleri (TR/EN) |
| `frontend/src/components/GuestLimitModal.jsx` | `Misafir olarak günde en fazla 5 kelime kartı...` / `diğer oyunlarda haftada 5’er hak...` | sabit metin fallback | Misafir limit modalı fallback açıklamaları |
| `frontend/src/pages/Welcome.jsx` | `Ücretsiz hesapta Flashcard sınırsız; diğer 3 oyunda haftada 5’er hak · Pazartesi yenilenir.` / `diğer 3 oyunda toplam 2’şer deneme hakkın var.` | sabit metin | Karşılama sayfası Flashcard kota kartı, modül kartları ve karşılaştırma tablosu oyun satırları (TR/EN) |
| `frontend/src/pages/Dashboard.jsx` | `plan: 'Haftada 5 hak · Pazartesi yenilenir'`, `enPlan: '5 plays/week · Resets Monday'` | sabit metin | Ücretsiz kullanıcı panosu Eşleştirme/Quiz/Morfem Yapıcı kart alt metinleri |
| `frontend/src/pages/Games.jsx` | `guestMatchLockedDesc`, `guestFlashcardDailyLimitDesc`, `guestMatchCardTitle`, `guestMatchCardDesc`, `guestLimitCardDesc` | sabit metin fallback | Oyunlar sayfası GuestLimitModal fallback metinleri |
| `frontend/src/pages/Profile.jsx` | `Ücretsiz hesaptasın: Flashcard sınırsız, Eşleştirme, Quiz ve Morfem Yapıcı’da haftada 5’er hak (Pazartesi yenilenir)...` | sabit metin | Profil sayfası ücretsiz hesap durum açıklaması (TR/EN) |
| `frontend/src/pages/FAQ.jsx` & `frontend/scripts/prerender-faq.mjs` | `...toplam 2 deneme hakkına... haftada 5 hak (Pazartesi yenilenir)...` | sabit metin / betik | SSS cevabı 2 misafir (2 deneme) ve ücretsiz hesap (haftada 5 hak) açıklaması (TR/EN) |
| `frontend/src/pages/Dashboard.jsx` | `const remainingPlays = flashcardInfo?.playsRemaining ?? 5;` | kod içi tekrar | Pano günlük kalan oyun hakkı fallback değeri (`MAX_GUEST_DAILY_FLASHCARDS` yerine sabit 5) |
| `frontend/src/pages/Dashboard.jsx` | `const totalPlays = flashcardInfo?.maxPlays ?? 5;` | kod içi tekrar | Pano günlük toplam oyun hakkı fallback değeri (`MAX_GUEST_DAILY_FLASHCARDS` yerine sabit 5) |
| `frontend/src/pages/Dashboard.jsx` | `<span>{isTr ? '24 / 571 açık' : '24 / 571 open'}</span>` | sabit metin | Pano misafir morfem ilerleme çubuğu etiketi |
| `frontend/src/pages/Dashboard.jsx` | `v: '24',` | sabit metin | Pano misafir morfem kartı açık sayısı |
| `frontend/src/pages/Dashboard.jsx` | `<span>{isTr ? '150 / 571 açık' : '150 / 571 open'}</span>` | sabit metin | Pano Temel plan morfem ilerleme çubuğu etiketi |
| `frontend/src/pages/Dashboard.jsx` | `{ label: isTr ? 'MORFEM' : 'MORPHEMES', v: '150', unit: isTr ? 'açık' : 'unlocked' }` | sabit metin | Pano Temel plan üst istatistik kutusu |
| `frontend/src/pages/Dashboard.jsx` | `? 'Temel planda 150 morfem sınırsız açıktır. Kalan 421 morfem için Pro’ya geçebilirsiniz.'` | sabit metin | Pano Temel plan açıklama metni |
| `frontend/src/pages/Dashboard.jsx` | `: '150 morphemes are unlocked in Basic plan. Upgrade to Pro for the remaining 421.'` | sabit metin | Pano Temel plan açıklama metni (EN) |
| `frontend/src/pages/Flashcards.jsx` | `const initialGuestInfo = (planReady && isLimited) ? getFlashcardGuestDailyInfo() : { canPlay: true, remaining: MAX_GUEST_DAILY_FLASHCARDS };` | dinamik | Flashcard oyunu başlangıç kota bilgisi |
| `frontend/src/pages/Flashcards.jsx` | `? \`\${guestPlayInfo.remaining} of \${MAX_GUEST_DAILY_FLASHCARDS} daily plays left\`` | dinamik metin | Kalan hak göstergesi (EN) |
| `frontend/src/pages/Flashcards.jsx` | `: \`Günlük \${guestPlayInfo.remaining}/\${MAX_GUEST_DAILY_FLASHCARDS} oynama hakkı\`` | dinamik metin | Kalan hak göstergesi (TR) |
| `frontend/src/pages/Flashcards.jsx` | `? t('userFlashcardRestartLimitDesc', \`Günlük en fazla \${MAX_GUEST_DAILY_RESTARTS} kez yeniden başlatabilirsiniz. Sınırsız pratik yapmak için lütfen planınızı yükseltin.\`)` | dinamik metin | Yeniden başlatma limit uyarısı |
| `frontend/src/pages/Games.jsx` | `? t('userFlashcardDailyLimitDesc', 'Günlük en fazla 5 kelime kartı çalışması hakkınız doldu. Sınırsız pratik yapmak ve tüm içeriklere erişmek için lütfen planınızı yükseltin.')` | sabit metin fallback | Oyunlar sayfası Flashcard kilit açıklaması (TR) |
| `frontend/src/pages/Games.jsx` | `: t('guestFlashcardDailyLimitDesc', 'Misafir kullanıcılar günde en fazla 5 kelime kartı çalışması yapabilir. Sınırsız pratik yapmak için lütfen planınızı yükseltin.')` | sabit metin fallback | Oyunlar sayfası Flashcard kilit açıklaması (TR misafir) |
| `frontend/src/pages/FAQ.jsx` | `Misafirler ilk 24 morfeme ve günde 5 tur Flashcard oyununa ücretsiz erişebilir. Temel plan; ilk 150 morfemi...` | sabit metin | SSS cevabı 2 (TR) |
| `frontend/src/pages/FAQ.jsx` | `Guests can explore the first 24 morphemes and play up to 5 Flashcard sessions daily. The Basic plan unlocks the top 150 morphemes...` | sabit metin | SSS cevabı 2 (EN) |
| `frontend/scripts/prerender-faq.mjs` | `Misafirler ilk 24 morfeme ve günde 5 tur Flashcard oyununa ücretsiz erişebilir. Temel plan; ilk 150 morfemi...` | betik/meta | Prerender FAQ statik HTML metni (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `tag: '16 kategori sözlüğü, 150 morfem, sınırsız Flashcard & Eşleştirme.',` | sabit metin | Temel plan etiketi (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 anatomik kategori · 150 morfem'],` | sabit metin | Temel plan maddesi (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `tag: '16 categories glossary, 150 morphemes, unlimited Flashcards & Matching.',` | sabit metin | Temel plan etiketi (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `['✓', '16 anatomical categories · 150 morphemes'],` | sabit metin | Temel plan maddesi (EN) |
| `frontend/src/pages/Pricing.jsx` | `tag: '16 kategori sözlüğü, 150 morfem, sınırsız Flashcard & Eşleştirme.',` | sabit metin | Fiyatlandırma Temel plan etiketi (TR) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 anatomik kategori · 150 morfem'],` | sabit metin | Fiyatlandırma Temel plan maddesi (TR) |
| `frontend/src/pages/Pricing.jsx` | `['Morfem kütüphanesi', '150 morfem', '571+ (Tümü)', '571+ (Tümü)'],` | sabit metin | Karşılaştırma tablosu morfem satırı (TR) |
| `frontend/src/pages/Pricing.jsx` | `tag: '16 categories glossary, 150 morphemes, unlimited Flashcards & Matching.',` | sabit metin | Fiyatlandırma Temel plan etiketi (EN) |
| `frontend/src/pages/Pricing.jsx` | `['✓', '16 anatomical categories · 150 morphemes'],` | sabit metin | Fiyatlandırma Temel plan maddesi (EN) |
| `frontend/src/pages/Pricing.jsx` | `['Morpheme library', '150 morphemes', '571+ (All)', '571+ (All)'],` | sabit metin | Karşılaştırma tablosu morfem satırı (EN) |
| `frontend/src/pages/Profile.jsx` | `Temel plandasınız: 16 kategori sözlüğü, 150 morfem ve sınırsız Flashcard & Eşleştirme açık.` | sabit metin | Profil Temel plan durumu (TR) |
| `frontend/src/pages/Profile.jsx` | `You are on the Basic plan: 16 categories glossary, 150 morphemes, and unlimited Flashcards & Matching unlocked.` | sabit metin | Profil Temel plan durumu (EN) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Temel Paket: İlk 150 morfem açık. 571+ morfemin tamamı için Pro’ya geçin.` | sabit metin | Morfem Atlası Temel plan kilit uyarısı (TR) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Basic Plan: First 150 morphemes unlocked. Upgrade to Pro for all 571+.` | sabit metin | Morfem Atlası Temel plan kilit uyarısı (EN) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Misafir Modu: İlk 24 morfem açık. 150 morfem için Temel plana, 571+ morfemin tamamı için Pro’ya geçin.` | sabit metin | Morfem Atlası Misafir kilit uyarısı (TR) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `Guest Mode: First 24 morphemes unlocked. Upgrade to Basic for 150 or Pro for all 571+.` | sabit metin | Morfem Atlası Misafir kilit uyarısı (EN) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `İlk 24 morfem misafirlere açıktır. 150 morfem için Temel plana, 571 morfemin tamamına erişmek için Pro ve üzeri planlara geçin.` | sabit metin | Morfem kart kilidi modalı (Misafir) |
| `frontend/src/pages/MorphemeExplorer.jsx` | `İlk 150 morfem Temel planda açıktır. 571 morfemin tamamına erişmek için Pro ve üzeri planlara geçin.` | sabit metin | Morfem kart kilidi modalı (Temel) |
| `frontend/src/pages/Welcome.jsx` | `100 temel morfem ve sınırsız Flashcard & Eşleştirme oyunları kullanımına hazır.` | sabit metin | Karşılama sayfası Temel plan aktivasyon metni |
| `frontend/src/pages/Welcome.jsx` | `En çok kullanılan ilk 150 morfem açık. İleri seviye morfemler Pro gerektirir.` | sabit metin | Karşılama sayfası Temel morfem kartı |
| `frontend/src/pages/Welcome.jsx` | `İlk 24 morfem açık; gerisinde ad görünür, anlam ve detay bulanık.` | sabit metin | Karşılama sayfası Misafir morfem kartı |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Morfem listesi', ..., limit: 'İlk 150 morfem açık', sub: 'İleri düzey için Pro gerekir', pro: '571+ morfem' },` | sabit metin | Karşılama tablosu satırı (TR) |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Morfem listesi', ..., limit: 'İlk 24 morfem açık', sub: 'Gerisi kilitli: ad görünür, anlam bulanık', pro: '571+ morfem' },` | sabit metin | Karşılama tablosu satırı (TR) |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Morpheme list', ..., limit: 'Top 150 morphemes open', sub: 'Advanced morphemes require Pro', pro: '571+ morphemes' },` | sabit metin | Karşılama tablosu satırı (EN) |
| `frontend/src/pages/Welcome.jsx` | `{ name: 'Morpheme list', ..., limit: 'First 24 morphemes open', sub: 'Rest locked: name visible, meaning blurred', pro: '571+ morphemes' },` | sabit metin | Karşılama tablosu satırı (EN) |

### d) Plan Limitlerinde Şu An Yanlış / Eski Olanlar
1. **`frontend/src/pages/Dashboard.jsx`**: `const remainingPlays = flashcardInfo?.playsRemaining ?? 5;` ve `const totalPlays = flashcardInfo?.maxPlays ?? 5;` — **KOD İÇİ TEKRAR** (`MAX_GUEST_DAILY_FLASHCARDS` sabiti yerine `5` sayısı kod içine tekrar yazılmıştır).
2. **`frontend/src/i18n/translations.js` [L233, L621] ve `frontend/src/pages/Progress.jsx` [L90]**: "Son 10 flashcard oturumu" ifadesi günlük kota değil, oturum geçmişi limitidir; kota ile karıştırılmamalıdır.

---

## 5. Deneme Süresi (Trial Duration - 3 Gün)

### a) Gerçek Değer ve Kaynağı
- **Bugünkü Gerçek Değer:** **3 gün** (72 saat) — Yalnızca kayıtlı kullanıcının Paddle abonelik denemesi (`subscriptionStatus: 'trialing'`, `trialStartDate`/`trialEndDate`, `pro_trial`) için geçerlidir.
- **Misafir Yerel Deneme:** **YOK** (12f kararıyla `medterm_guest_trial_start` ve `GUEST_TRIAL_DAYS`/`GUEST_TRIAL_MS` kaldırıldı; misafir yalnızca günlük 5 Flashcard, ilk 24 morfem ve oyun seviyesi kurallarıyla sınırlandırılır).
- **Hesaplama Kaynağı:**
  - `frontend/src/utils/planAccess.js` & `frontend/src/utils/storage.js` (`getUserTrialState`, kayıtlı kullanıcı Paddle deneme hesabı)
  - Paddle Subscription Trial ayarları (3 günlük ₺0 deneme)

### b) Pazarlama Yazım Kuralı
- **Kural:** Tam sayı: **"3 gün ücretsiz dene"** / **"3 günlük ücretsiz deneme"**
- **İngilizce:** **"3-day free trial"** / **"Try 3 days free"**

### c) Konum Tablosu

| Dosya | Aranacak Metin | Tür | Not |
| :--- | :--- | :--- | :--- |
| `frontend/src/utils/storage.js` | `export const getUserTrialState = (currentUser) => {` | dinamik | Kayıtlı kullanıcı Paddle 3 günlük deneme durumu hesaplayıcısı (misafir için `hasTrial: false`) |
| `frontend/src/pages/Dashboard.jsx` | `trialEndObj = new Date(created.getTime() + 3 * 24 * 60 * 60 * 1000);` | kod içi tekrar | Pano kayıtlı kullanıcı deneme bitişi hesabı |
| `frontend/src/pages/Dashboard.jsx` | `trialEndObj = new Date(startMs + 3 * 24 * 60 * 60 * 1000);` | kod içi tekrar | Pano kayıtlı kullanıcı deneme bitişi hesabı |
| `frontend/public/index.html` | `"description": "3 Günlük Ücretsiz Deneme"` | betik/meta | JSON-LD Structured Data Schema `offers.description` alanı |
| `frontend/src/components/TopInfoBar.jsx` | `'3 GÜN ÜCRETSİZ DENE · DİLEDİĞİN AN İPTAL ET'` | sabit metin | Kayan üst duyuru bandı (TR) |
| `frontend/src/components/TopInfoBar.jsx` | `'TRY 3 DAYS FREE · CANCEL ANYTIME'` | sabit metin | Kayan üst duyuru bandı (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `sub: 'Abonelik planlarında 3 gün ₺0 deneme süresi. Dilediğin an iptal et.',` | sabit metin | Ana sayfa fiyatlandırma alt başlığı (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺790/yıl (₺66/ay)',` | sabit metin | Temel plan taksit/deneme notu (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `cta: '3 Gün Ücretsiz Dene',` | sabit metin | Temel ve Pro plan CTA buton metni (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺2.000/yıl (₺167/ay)',` | sabit metin | Pro plan taksit/deneme notu (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `sub: '3-day $0 trial on subscription plans. Cancel anytime in 1 click.',` | sabit metin | Ana sayfa fiyatlandırma alt başlığı (EN - Para birimi tutarsızlığı: $0) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 days free · Then ₺790/yr (₺66/mo)',` | sabit metin | Temel plan taksit/deneme notu (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `cta: 'Start 3-Day Free Trial',` | sabit metin | Temel ve Pro plan CTA buton metni (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 days free · Then ₺2,000/yr (₺167/mo)',` | sabit metin | Pro plan taksit/deneme notu (EN) |
| `frontend/src/pages/Pricing.jsx` | `sub: 'Abonelik planlarında 3 gün ₺0 deneme süresi. Dilediğin an tek tıkla iptal et.',` | sabit metin | Fiyatlandırma sayfası alt başlığı (TR) |
| `frontend/src/pages/Pricing.jsx` | `subVisitor: 'Abonelik planlarında 3 gün ₺0 deneme. Dilediğin an tek tıkla iptal et, 3 gün sonra yıllık faturalandırılır.',` | sabit metin | Ziyaretçi fiyatlandırma alt başlığı (TR) |
| `frontend/src/pages/Pricing.jsx` | `startTrial: '3 gün ücretsiz dene',` | sabit metin | Deneme başlatma buton metni (TR) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺790/yıl (₺66/ay)',` | sabit metin | Temel plan taksit/deneme notu (TR) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺2.000/yıl (₺167/ay)',` | sabit metin | Pro plan taksit/deneme notu (TR) |
| `frontend/src/pages/Pricing.jsx` | `['3 Gün Ücretsiz Deneme (₺0)', '✓', '✓', '– (Doğrudan Satın Alma)']` | sabit metin | Karşılaştırma tablosu deneme satırı (TR) |
| `frontend/src/pages/Pricing.jsx` | `trialUpper: '3-DAY TRIAL',` | sabit metin | Deneme rozeti (EN) |
| `frontend/src/pages/Pricing.jsx` | `sub: '3-day $0 trial on subscription plans. Cancel anytime in one click.',` | sabit metin | Fiyatlandırma alt başlığı (EN - Para birimi tutarsızlığı: $0) |
| `frontend/src/pages/Pricing.jsx` | `subVisitor: '3-day $0 trial on subscription plans. Cancel anytime in 1 click, billed annually after 3 days.',` | sabit metin | Ziyaretçi alt başlığı (EN - Para birimi tutarsızlığı: $0) |
| `frontend/src/pages/Pricing.jsx` | `trialNote: '$0 billed today · Cancel anytime in 1 click',` | sabit metin | Kart deneme notu (EN - Para birimi tutarsızlığı: $0) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 days free · Then ₺790/yr (₺66/mo)',` | sabit metin | Temel plan taksit/deneme notu (EN) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 days free · Then ₺2,000/yr (₺167/mo)',` | sabit metin | Pro plan taksit/deneme notu (EN) |
| `frontend/src/pages/Pricing.jsx` | `['3-Day Free Trial ($0)', '✓', '✓', '– (Direct Purchase)']` | sabit metin | Karşılaştırma tablosu (EN - Para birimi tutarsızlığı: $0) |
| `frontend/src/pages/Auth.jsx` | `? 'Seçilen plan: Pro · 3 Gün Ücretsiz Dene (Sonra ₺2.000/yıl)'` | sabit metin | Kayıt/Giriş ekranı Pro plan seçimi (TR) |
| `frontend/src/pages/Auth.jsx` | `: 'Selected plan: Pro · 3-Day Free Trial (Then ₺2,000/yr)'}` | sabit metin | Kayıt/Giriş ekranı Pro plan seçimi (EN) |
| `frontend/src/pages/Auth.jsx` | `? 'Seçilen plan: Temel · 3 Gün Ücretsiz Dene (Sonra ₺790/yıl)'` | sabit metin | Kayıt/Giriş ekranı Temel plan seçimi (TR) |
| `frontend/src/pages/Auth.jsx` | `: 'Selected plan: Basic · 3-Day Free Trial (Then ₺790/yr)'}` | sabit metin | Kayıt/Giriş ekranı Temel plan seçimi (EN) |
| `frontend/src/pages/Profile.jsx` | `? '3 günlük ücretsiz deneme sürecindesiniz. Tüm 16 kategori, 571+ morfem ve 4 oyun modunun tamamına sınırsız erişebilirsiniz.'` | sabit metin | Profil deneme bildirim bannerı (TR) |
| `frontend/src/pages/Profile.jsx` | `: 'You are on a 3-day free trial. Full access to all 16 categories, 571+ morphemes, and 4 game modes.'` | sabit metin | Profil deneme bildirim bannerı (EN) |
| `frontend/src/pages/FAQ.jsx` | `Temel ve Pro üyelik paketlerimizde 3 günlük ₺0 ücretsiz deneme süresi sunulmaktadır... 3 gün dolmadan önce dilediğiniz an tek tıkla iptal edebilirsiniz...` | sabit metin | SSS deneme sorusu cevabı (TR) |
| `frontend/src/pages/FAQ.jsx` | `We offer a 3-day $0 free trial for both Basic and Pro membership plans... You can cancel anytime in 1 click before the 3 days end...` | sabit metin | SSS deneme sorusu cevabı (EN - Para birimi tutarsızlığı: $0) |
| `frontend/src/pages/FAQ.jsx` | `Ayrıca 3 günlük ücretsiz deneme sürecinde tüm Pro özelliklerini sınırsızca deneyimleyebilirsiniz.` | sabit metin | SSS paket kapsamı cevabı (TR) |
| `frontend/src/pages/FAQ.jsx` | `Additionally, the 3-day free trial grants complete, unrestricted access to all Pro features.` | sabit metin | SSS paket kapsamı cevabı (EN) |
| `frontend/scripts/prerender-faq.mjs` | `"text": "Temel ve Pro üyelik paketlerimizde 3 günlük ₺0 ücretsiz deneme süresi sunulmaktadır.` | betik/meta | Prerender FAQ statik HTML metni (TR) |
| `frontend/src/i18n/translations.js` | `guestPlaysRemaining: "3 Günlük Ücretsiz Deneme:",` | sabit metin | Misafir deneme kalan hak başlığı (TR) |
| `frontend/src/i18n/translations.js` | `guestPlaysRemaining: "3-Day Free Trial:",` | sabit metin | Misafir deneme kalan hak başlığı (EN) |
| `frontend/src/i18n/translations.js` | `guestLimitTitle: "3 Günlük Ücretsiz Deneme Süreniz Sona Erdi! 🎯",` | sabit metin | Deneme bitti modal başlığı (TR) |
| `frontend/src/i18n/translations.js` | `guestLimitTitle: "Your 3-Day Free Trial Has Ended! 🎯",` | sabit metin | Deneme bitti modal başlığı (EN) |

### d) Deneme Süresinde Şu An Yanlış / Eski Olanlar & Para Birimi Tutarsızlığı
1. **İngilizce Metinlerde "$0 trial" Para Birimi Tutarsızlığı:**
   - Türkçe arayüzde deneme bedeli `₺0` veya `0 TL` olarak ifade edilirken, İngilizce arayüz metinlerinde dolar (`$`) sembolü kullanılmıştır:
     - `frontend/src/pages/Pricing.jsx` [L122]: `sub: '3-day $0 trial on subscription plans. Cancel anytime in one click.',`
     - `frontend/src/pages/Pricing.jsx` [L124]: `subVisitor: '3-day $0 trial on subscription plans. Cancel anytime in 1 click, billed annually after 3 days.',`
     - `frontend/src/pages/Pricing.jsx` [L125]: `trialNote: '$0 billed today · Cancel anytime in 1 click',`
     - `frontend/src/pages/Pricing.jsx` [L202]: `['3-Day Free Trial ($0)', '✓', '✓', '– (Direct Purchase)']`
     - `frontend/src/components/HomePricingSection.jsx` [L87]: `sub: '3-day $0 trial on subscription plans. Cancel anytime in 1 click.',`
     - `frontend/src/pages/FAQ.jsx` [L120]: `We offer a 3-day $0 free trial for both Basic and Pro membership plans...`
   - Healthlex'in tüm fiyatlandırması Türk Lirası (`₺`) üzerinden olduğundan, `$0` yerine `₺0` kullanılmalıdır.
2. **`planAccess.js` ve `Dashboard.jsx` Kod İçi Tekrarları:**
   - `frontend/src/utils/planAccess.js` [L21] ve `frontend/src/pages/Dashboard.jsx` [L173, L184]: `3 * 24 * 60 * 60 * 1000` formülü doğrudan yazılmıştır; `storage.js` içindeki `GUEST_TRIAL_MS` sabiti kullanılmalıdır.

---

## 6. Fiyatlar ve İndirim Rozetleri (Prices & Discounts)

### a) Gerçek Değer ve Kaynağı
- **Temel Plan (Yıllık):** **₺790/yıl** (aylık ₺66/ay).
  - Kaynak: Paddle paneli (`PADDLE_PRICE_BASIC = pri_01m2c1yyzta4wwxdwf6h5mbyh7`).
- **Pro Plan Güncel Fiyat (Yıllık Lansman İndirimi):** **₺2.000/yıl** (aylık ₺167/ay).
  - Kaynak: Paddle paneli (`PADDLE_PRICE_PRO = pri_01m1hbkgmff67g3mght6w6bj2q`).
- **Pro Plan Eski / Üstü Çizili Fiyat:** **₺4.500/yıl** (Canlıda üstü çizili olarak gösterilir).
- **Ömür Boyu Plan Güncel Fiyat (Tek Seferlik Ödeme):** **₺5.990** (tek seferlik ödeme).
  - Kaynak: Paddle paneli (`PADDLE_PRICE_LIFETIME`).
- **Ömür Boyu Plan Eski / Üstü Çizili Fiyat:** **₺8.000** (Canlıda üstü çizili olarak gösterilir).
- **Eski Fiyat Gösterim Mekanizması:**
  - `HomePricingSection.jsx` [L292] ve `Pricing.jsx` [L595, L777] içinde kartların `plan.old` alanı okunarak Tailwind CSS `line-through` sınıfı (`text-muted-foreground line-through text-sm`) ile ekranda üstü çizili basılır.
- **İndirim Rozetleri ve Eski Fiyat İlişkisi:**
  - Eski fiyat (`old`) ve yüzde indirim (`%55`, `%25`) ifadeleri `HomePricingSection.jsx` ve `Pricing.jsx` üzerinden kaldırılmıştır; ekranda üstü çizili eski fiyat ve indirim yüzdesi gösterilmez.
  - Pro ve Ömür Boyu kartlarında rozet metni olarak Türkçe `"Lansman fiyatı"`, İngilizce `"Launch price"` kullanılır.
  - **Rozet Metinleri Durumu:** `HomePricingSection.jsx` ve `Pricing.jsx` bileşenlerinde string literal (sabit metin) olarak tanımlıdır.
- **Ömür Boyu Paddle Price ID Bilgisi:**
  - Çevre değişkeni: `process.env.REACT_APP_PADDLE_PRICE_LIFETIME` (frontend) veya `process.env.PADDLE_PRICE_LIFETIME` (backend).
  - Koddaki fallback: `frontend/src/services/paddle.js` [L11] içindeki `PADDLE_PRICE_ID = 'pri_01m1hbkgmff67g3mght6w6bj2q'` değeri Pro plan ID'si ile aynı fallback olarak tanımlanmıştır.
- **5.000 / 5000 Sayısı Hakkında Açıklama:**
  - Kod tabanında 5.000 TL şeklinde bir fiyat **bulunmamaktadır**.
  - 5000 sayısı yalnızca dahili ürün dokümanlarında (`.cursor/plans/healthlexmed_dna_report_a582584e.plan.md`) hedeflenen terim sayısı olarak ve kod içi zaman aşımı sabitlerinde (`FEEDBACK_DELAY_MS = 5000;`, `duration: 5000`) geçmektedir. Canlı sitedeki tek seferlik Ömür Boyu plan fiyatı **₺5.990**'dır.

- **Pazarlama Yazım Kuralı:**
  - Para birimi simgesi: `₺` (başa gelir).
  - Binlik basamak ayracı:
    - Türkçe metinlerde nokta (`.`): `₺790`, `₺2.000/yıl`, `₺5.990`.
    - İngilizce metinlerde virgül (`,`): `₺790`, `₺2,000/yr`, `₺5,990`.
  - Aylık kırılım formatı:
    - Türkçe: `(₺66/ay)` ve `(₺167/ay)`.
    - İngilizce: `(₺66/mo)` ve `(₺167/mo)`.
  - Lansman rozetleri (eski fiyat ve yüzde indirim gösterilmez):
    - Türkçe: `Lansman fiyatı`.
    - İngilizce: `Launch price`.

### c) Konum Tablosu

| Dosya | Aranacak Metin | Tür | Not |
| :--- | :--- | :--- | :--- |
| `frontend/src/services/paddle.js` | `'pri_01m1hbkgmff67g3mght6w6bj2q'` | kod sabiti / env fallback | Paddle Pro plan fiyat ID'si (₺2.000/yıl) |
| `frontend/src/services/paddle.js` | `'pri_01m2c1yyzta4wwxdwf6h5mbyh7'` | kod sabiti / env fallback | Paddle Temel plan fiyat ID'si (₺790/yıl) |
| `frontend/src/services/paddle.js` | `const PADDLE_PRICE_ID = 'pri_01m1hbkgmff67g3mght6w6bj2q';` | kod sabiti / fallback | Ömür Boyu plan fallback ID'si (Pro ile paylaşımlı fallback) |
| `api/webhook/paddle.js` | `const basicPriceId = (process.env.PADDLE_PRICE_BASIC || 'pri_01m2c1yyzta4wwxdwf6h5mbyh7').toLowerCase();` | kod sabiti / env | Paddle webhook Temel plan doğrulama ID'si |
| `frontend/src/components/HomePricingSection.jsx` | `yrp: '₺790',` | sabit metin | Temel plan yıllık tutarı (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺790/yıl (₺66/ay)',` | sabit metin | Temel plan aylık kırılım notu (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `badge: 'Lansman fiyatı',` | sabit metin | Pro plan lansman rozeti (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `yrp: '₺2.000',` | sabit metin | Pro plan yıllık tutarı (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺2.000/yıl (₺167/ay)',` | sabit metin | Pro plan aylık kırılım notu (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `badge: 'Lansman fiyatı',` | sabit metin | Ömür Boyu plan lansman rozeti (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `once: '₺5.990',` | sabit metin | Ömür Boyu tek seferlik tutar (TR) |
| `frontend/src/components/HomePricingSection.jsx` | `yrp: '₺790',` | sabit metin | Temel plan yıllık tutarı (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 days free · Then ₺790/yr (₺66/mo)',` | sabit metin | Temel plan aylık kırılım notu (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `badge: 'Launch price',` | sabit metin | Pro plan lansman rozeti (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `yrp: '₺2,000',` | sabit metin | Pro plan yıllık tutarı (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `noteYr: '3 days free · Then ₺2,000/yr (₺167/mo)',` | sabit metin | Pro plan aylık kırılım notu (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `badge: 'Launch price',` | sabit metin | Ömür Boyu plan lansman rozeti (EN) |
| `frontend/src/components/HomePricingSection.jsx` | `once: '₺5,990',` | sabit metin | Ömür Boyu tek seferlik tutar (EN) |
| `frontend/src/pages/Pricing.jsx` | `yrp: '₺790',` | sabit metin | Temel plan yıllık tutarı (TR) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺790/yıl (₺66/ay)',` | sabit metin | Temel plan aylık kırılım notu (TR) |
| `frontend/src/pages/Pricing.jsx` | `badge: 'Lansman fiyatı',` | sabit metin | Pro plan lansman rozeti (TR) |
| `frontend/src/pages/Pricing.jsx` | `yrp: '₺2.000',` | sabit metin | Pro plan yıllık tutarı (TR) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 gün ücretsiz · Sonra ₺2.000/yıl (₺167/ay)',` | sabit metin | Pro plan aylık kırılım notu (TR) |
| `frontend/src/pages/Pricing.jsx` | `badge: 'Lansman fiyatı',` | sabit metin | Ömür Boyu plan lansman rozeti (TR) |
| `frontend/src/pages/Pricing.jsx` | `once: '₺5.990',` | sabit metin | Ömür Boyu tek seferlik tutar (TR) |
| `frontend/src/pages/Pricing.jsx` | `yrp: '₺790',` | sabit metin | Temel plan yıllık tutarı (EN) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 days free · Then ₺790/yr (₺66/mo)',` | sabit metin | Temel plan aylık kırılım notu (EN) |
| `frontend/src/pages/Pricing.jsx` | `badge: 'Launch price',` | sabit metin | Pro plan lansman rozeti (EN) |
| `frontend/src/pages/Pricing.jsx` | `yrp: '₺2,000',` | sabit metin | Pro plan yıllık tutarı (EN) |
| `frontend/src/pages/Pricing.jsx` | `noteYr: '3 days free · Then ₺2,000/yr (₺167/mo)',` | sabit metin | Pro plan aylık kırılım notu (EN) |
| `frontend/src/pages/Pricing.jsx` | `badge: 'Launch price',` | sabit metin | Ömür Boyu plan lansman rozeti (EN) |
| `frontend/src/pages/Pricing.jsx` | `once: '₺5,990',` | sabit metin | Ömür Boyu tek seferlik tutar (EN) |
| `frontend/src/components/TopInfoBar.jsx` | `'LANSMAN FİYATLARI GEÇERLİ'` | sabit metin | Kayan üst duyuru bandı lansman metni (TR) |
| `frontend/src/components/TopInfoBar.jsx` | `'LAUNCH PRICES AVAILABLE'` | sabit metin | Kayan üst duyuru bandı lansman metni (EN) |
| `frontend/src/pages/Auth.jsx` | `? 'Seçilen plan: Ömür Boyu · ₺5.990 tek ödeme'` | sabit metin | Kayıt/Giriş ekranı Ömür Boyu plan seçimi (TR) |
| `frontend/src/pages/Auth.jsx` | `: 'Selected plan: Lifetime · ₺5,990 one-time'}` | sabit metin | Kayıt/Giriş ekranı Ömür Boyu plan seçimi (EN) |
| `frontend/src/pages/Auth.jsx` | `? 'Seçilen plan: Pro · 3 Gün Ücretsiz Dene (Sonra ₺2.000/yıl)'` | sabit metin | Kayıt/Giriş ekranı Pro plan seçimi (TR) |
| `frontend/src/pages/Auth.jsx` | `: 'Selected plan: Pro · 3-Day Free Trial (Then ₺2,000/yr)'}` | sabit metin | Kayıt/Giriş ekranı Pro plan seçimi (EN) |
| `frontend/src/pages/Auth.jsx` | `? 'Seçilen plan: Temel · 3 Gün Ücretsiz Dene (Sonra ₺790/yıl)'` | sabit metin | Kayıt/Giriş ekranı Temel plan seçimi (TR) |
| `frontend/src/pages/Auth.jsx` | `: 'Selected plan: Basic · 3-Day Free Trial (Then ₺790/yr)'}` | sabit metin | Kayıt/Giriş ekranı Temel plan seçimi (EN) |
| `frontend/src/pages/Dashboard.jsx` | `? 'Temel ₺790/yıl · Pro lansman fiyatı ₺2.000/yıl · Ömür Boyu ₺5.990 tek ödeme'` | sabit metin | Pano yükseltme bildirim bannerı (TR) |
| `frontend/src/pages/Dashboard.jsx` | `: 'Basic ₺790/yr · Pro launch price ₺2,000/yr · Lifetime ₺5,990 one-time'}` | sabit metin | Pano yükseltme bildirim bannerı (EN) |
| `frontend/src/pages/Dashboard.jsx` | `amount: isTr ? '₺790/yıl' : '₺790/yr'` | sabit metin | Pano abonelik detay kartı Temel tutarı |
| `frontend/src/pages/Dashboard.jsx` | `? 'Pro ₺2.000/yıl · Ömür Boyu ₺5.990 tek ödeme'` | sabit metin | Pano Pro plan yükseltme diyaloğu (TR) |
| `frontend/src/pages/Dashboard.jsx` | `: 'Pro ₺2,000/yr · Lifetime ₺5,990 one-time'}` | sabit metin | Pano Pro plan yükseltme diyaloğu (EN) |
| `frontend/src/pages/Welcome.jsx` | `? 'Temel ₺790/yıl · Pro lansman fiyatı ₺2.000/yıl · Ömür Boyu ₺5.990 tek ödeme'` | sabit metin | Karşılama sayfası fiyat özeti (TR) |
| `frontend/src/pages/Welcome.jsx` | `: 'Basic ₺790/yr · Pro launch price ₺2,000/yr · Lifetime ₺5,990 one-time'` | sabit metin | Karşılama sayfası fiyat özeti (EN) |
| `frontend/src/pages/Welcome.jsx` | `? 'Temel ₺790/yıl · Pro ₺2.000/yıl · Ömür Boyu ₺5.990'` | sabit metin | Karşılama sayfası fiyat özeti 2 (TR) |
| `frontend/src/pages/Welcome.jsx` | `: 'Basic ₺790/yr · Pro ₺2,000/yr · Lifetime ₺5,990'` | sabit metin | Karşılama sayfası fiyat özeti 2 (EN) |
| `frontend/src/utils/storage.js` | `return isTr ? '₺790/yıl' : '₺790/yr';` | sabit metin | Kullanıcı verisinden Temel plan fiyatını döndüren fonksiyon |
| `frontend/src/utils/storage.js` | `return isTr ? '₺2.000/yıl' : '₺2,000/yr';` | sabit metin | Kullanıcı verisinden Pro plan fiyatını döndüren fonksiyon |

### d) Fiyatlarda Şu An Yanlış / Eski Olanlar
- Sitedeki güncel fiyatlar (Temel: ₺790, Pro: ₺2.000, Ömür Boyu: ₺5.990) ve lansman rozetleri (`Lansman fiyatı` / `Launch price`) kendi içinde tutarlıdır; eski fiyat ve yüzde indirim ifadeleri kaldırılmıştır.

---

## 7. Kategori Erişim Vaatleri ve Kilit Durumları

Kullanıcıya kategorilerin açık veya kilitli olduğuna dair sitede verilen tüm vaatler ve koddaki fiili uygulama aşağıda özetlenmiştir.

### a) Kullanıcıya Sunulan Vaatler ve Metinler

1. **`frontend/src/pages/Pricing.jsx` (Plan Karşılaştırma Tablosu):**
   - TR: `['Çalışma / Sözlük terimleri', '16 Kategori (Tümü açık)', '16 Kategori (Tümü açık)', '16 Kategori (Tümü açık)']`
   - EN: `['Study / Glossary terms', 'All 16 Categories Unlocked', 'All 16 Categories Unlocked', 'All 16 Categories Unlocked']`
   - Vaat: Misafir, Temel ve Pro dahil tüm kullanıcılara 16 kategorinin sözlük düzeyinde açık olduğu belirtilir.
2. **`frontend/src/pages/FAQ.jsx` ve `frontend/scripts/prerender-faq.mjs` (SSS Cevabı 2):**
   - TR: `16 anatomik kategorinin ve tıbbi terimler sözlüğünün tamamı misafirler dahil tüm kullanıcılara açıktır.`
   - EN: `All 16 anatomical categories and the complete medical glossary are openly accessible to everyone, including guests.`
   - Vaat: Tıbbi terimler sözlüğü ve 16 kategorinin tamamının misafirler dahil herkese açık olduğu vurgulanır.
3. **`frontend/src/pages/Welcome.jsx` (Karşılama Sayfası Özellik Tablosu):**
   - TR: `{ name: 'Kategoriler', desc: '16 tıp kategorisi', type: 'open', limit: '16 kategori, sınırsız gezinme', sub: 'Tüm kategoriler açık', pro: 'Sınırsız' }`
   - EN: `{ name: 'Categories', desc: '16 medical categories', type: 'open', limit: '16 categories, unlimited browsing', sub: 'All categories unlocked', pro: 'Unlimited' }`
   - Vaat: 16 kategoride sınırsız gezinme hakkı vadedilir.
4. **`frontend/src/pages/Profile.jsx`:**
   - TR: `Temel plandasınız: 16 kategori sözlüğü, 150 morfem ve sınırsız Flashcard & Eşleştirme açık.`
   - EN: `You are on the Basic plan: 16 categories glossary, 150 morphemes, and unlimited Flashcards & Matching unlocked.`
   - Vaat: Temel planda "16 kategori sözlüğü"nün ve oyunların açık olduğu söylenir.
5. **`frontend/src/components/TrialDashboardView.jsx`:**
   - TR: `proLockCategories: '16 kategoride ilerleme takibi Temel plan ve üzeri planlarda açılır.'`
   - EN: `proLockCategories: 'Progress tracking across 16 categories unlocks with Basic plan and above.'`
   - Vaat: Kategori ilerleme takibinin Temel ve üzeri planlarda açıldığı belirtilir.
6. **`frontend/src/pages/Games.jsx` ve `frontend/src/i18n/translations.js` (`upgradePlanCardDesc`):**
   - TR: `Tüm oyun modlarına ve kategorilere sınırsız erişim için planınızı yükseltin.`
   - EN: `Upgrade your plan for unlimited access to all game modes and categories.`

### b) Kod İçi Fiili Durum (12e Güncel)
- **Sözlük Düzeyinde (`frontend/src/pages/Study.jsx`):** 16 anatomik kategorinin tamamı misafirler dahil herkese açıktır; kilit uygulanmaz.
- **Oyunlar Düzeyinde (`frontend/src/pages/Flashcards.jsx`, `frontend/src/pages/MatchGame.jsx`, `frontend/src/pages/Quiz.jsx`, `frontend/src/pages/MorphemeGame.jsx`):**
  - 12e kararıyla oyunlarda kategori kısıtlaması tamamen kaldırılmıştır (`UNLOCKED_CATEGORY_IDS` ve `isCategoryUnlocked` silinmiştir). Misafir ve ücretsiz kullanıcılar dahil herkes her oyunda 16 kategorinin tamamını seçebilir.
  - Erişim yalnızca **oyun seviyesinde** kontrol edilir (`getGameTrialState` — `frontend/src/utils/gameTrials.js` ve `getFlashcardGuestDailyInfo` — `frontend/src/utils/storage.js`):
    - **Flashcard:** Misafir günde 5 hak (`MAX_GUEST_DAILY_FLASHCARDS`, her gün yenilenir + günde 10 yeniden başlatma `MAX_GUEST_DAILY_RESTARTS`), kayıtlı ücretsiz ve üstü sınırsız.
    - **Eşleştirme:** Misafir toplam 2 deneme (`GUEST_TRIAL_LIMIT`), kayıtlı ücretsiz haftada 5 hak (`FREE_WEEKLY_TRIAL_LIMIT`, Pazartesi yenilenir), Temel, Pro (3 günlük deneme dahil) ve Ömür Boyu sınırsız.
    - **Quiz ve Morfem Yapıcı:** Misafir her oyundan toplam 2 deneme (`GUEST_TRIAL_LIMIT`), kayıtlı ücretsiz her oyundan haftada 5 hak (`FREE_WEEKLY_TRIAL_LIMIT`, Pazartesi yenilenir), Temel planda kapalı (`paid_locked`), Pro (3 günlük deneme dahil) ve Ömür Boyu sınırsız.

---

## 8. Ek Doğrulamalar ve Kontrol Kayıtları

Belge bütünlüğü kapsamında incelenen diğer yapay zeka ve derleme noktaları:

1. **`frontend/public/index.html` JSON-LD Yapısal Verileri:**
   - Kontrol edildi: JSON-LD içerisinde `"offers": { "@type": "Offer", "price": "0", "priceCurrency": "TRY", "description": "3 Günlük Ücretsiz Deneme" }` yer almaktadır. Kayıtlı kullanıcı Paddle 3 günlük deneme ve `TRY` para birimiyle tutarlıdır.
2. **FAQ Dışındaki Prerender / Sitemap Betikleri:**
   - `frontend/scripts/prerender-rehber.mjs` ve `frontend/scripts/generate-sitemap.mjs` kontrol edildi.
   - Bu betiklerde sabitlenmiş pazarlama sayıları (940+, 550+ vb.) bulunmamaktadır; veri kaynaklarından (`getAllTerms()`, `morphemesData.js`) dinamik URL ve içerik üretmektedir.
3. **TermDetail ve MorphemeDetail Meta / Description Üreticileri:**
   - `frontend/src/utils/termHelper.js` içindeki `buildTermMetaDescription` fonksiyonu terimin Latincesi, Türkçe anlamı ve klinik kökenine göre dinamik açıklama üretir; sabit sayı içermez.
   - `frontend/src/pages/MorphemeDetail.jsx` `useEffect` hook'u altında morfemin kendi verisine göre `document.title` ve meta etiketlerini dinamik set eder; sabit sayı içermez.
