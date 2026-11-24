import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { updateCanonicalUrl } from '@/utils/seo';
import { MAX_BASIC_MORPHEMES } from '@/utils/planAccess';

export const FAQ = () => {
  const { currentLanguage } = useLanguage();
  const isTr = currentLanguage === 'tr';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState({ 0: true, 1: true });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = isTr
      ? 'Sıkça Sorulan Sorular (SSS) | HealthLexMed'
      : 'Frequently Asked Questions (FAQ) | HealthLexMed';
    updateCanonicalUrl('https://www.healthlexmed.com/faq');
  }, [isTr]);

  // Soru-Cevap Veritabanı (10 Soru, TR ve EN)
  const faqList = useMemo(() => {
    return isTr
      ? [
          {
            id: 'trial',
            category: 'pricing',
            q: 'Ücretsiz deneme nasıl çalışıyor, kaç gün sürüyor?',
            a: 'Temel ve Pro planlarda 3 günlük ücretsiz deneme var; deneme boyunca seçtiğin planın tüm özellikleri açıktır. Denemeyi başlatırken kart bilgisi istenir. 3 gün dolmadan profilinden iptal edersen hiçbir ücret çekilmez. İptal etmezsen deneme sonunda seçtiğin planın yıllık ücreti tahsil edilir ve abonelik her yıl yenilenir.'
          },
          {
            id: 'categories',
            category: 'content',
            q: 'Hangi içerikler ücretsiz, hangileri Temel ve Pro planlara dahil?',
            a: `Sözlükteki tüm terimler ve 16 kategori, kayıt olmasan da herkese açık. Misafir olarak ilk 24 morfeme ve günde 5 tur Flashcard'a erişebilirsin. Temel plan: ilk ${MAX_BASIC_MORPHEMES} morfem, sınırsız Flashcard ve Eşleştirme, ilerleme takibi. Pro plan: 550+ morfemin tamamı, Quiz ve Morfem Yapıcı oyunları. 3 günlük ücretsiz deneme boyunca seçtiğin planın tüm özellikleri açık.`
          },
          {
            id: 'register',
            category: 'account',
            q: 'Nasıl kayıt olurum / hesap oluştururum?',
            a: "Sağ üstteki 'Kayıt Ol' düğmesinden adın, e-posta adresin ve bir şifreyle ücretsiz hesap açabilirsin. İstersen Google hesabınla da kayıt olabilirsin."
          },
          {
            id: 'mobile',
            category: 'tech',
            q: 'Mobilde/tarayıcıda çalışıyor mu, uygulama indirmem gerekiyor mu?',
            a: "Uygulama indirmene gerek yok. HealthLexMed telefon, tablet ve bilgisayardaki tarayıcılarda (Chrome, Safari, Edge) çalışır. İstersen tarayıcı menüsünden 'Ana Ekrana Ekle' diyerek telefonuna kısayol olarak ekleyebilirsin."
          },
          {
            id: 'sources',
            category: 'content',
            q: 'Terimler hangi kaynaklardan doğrulanıyor?',
            a: 'Anatomik terimler, uluslararası anatomi terminolojisi standardı Terminologia Anatomica (TA98 ve güncel sürümü TA2) esas alınarak hazırlanır. Kök, önek ve sonek çözümlemeleri tıbbi terminoloji kaynaklarından derlenir. İçerikler, platformun kurucusu Fizyoterapist Sıddık Çiçek tarafından hazırlanıp kontrol edilir. Bir hata görürsen bize bildirmen, kaynağı herkes için daha doğru yapar.'
          },
          {
            id: 'pricing',
            category: 'pricing',
            q: 'Fiyatlandırma nasıl, iptal edebilir miyim?',
            a: 'Üç plan var: Yıllık Temel, Yıllık Pro ve tek ödemeli Ömür Boyu. Temel ve Pro aboneliklerini profilinden istediğin zaman iptal edebilirsin; cayma bedeli yok. İptal ettiğinde, ödediğin dönemin sonuna kadar erişimin devam eder.'
          },
          {
            id: 'response-time',
            category: 'support',
            q: 'Taleplerime ne kadar sürede yanıt verilir?',
            a: 'Tüm mesajları help@healthlexmed.com üzerinden okuyup yanıtlıyoruz. Genellikle 1–2 iş günü içinde dönüş yapıyoruz.'
          },
          {
            id: 'cancel-how',
            category: 'account',
            q: 'Aboneliğimi nasıl iptal edebilir veya yönetebilirim?',
            a: 'Giriş yaptıktan sonra Profil sayfandaki abonelik bölümünden aboneliğini iptal edebilir ya da planını değiştirebilirsin. İstersen kayıtlı e-postandan help@healthlexmed.com adresine yazarak da iptal talebini iletebilirsin. Cayma bedeli yok.'
          },
          {
            id: 'payment-partner',
            category: 'pricing',
            q: 'Ödeme ve fatura işlemlerim nerede işlenir?',
            a: 'Ödemeler, uluslararası ödeme kuruluşu Paddle üzerinden alınır. Kart bilgilerin bizim sunucularımızda tutulmaz. Fatura ve ödeme belgelerin kayıtlı e-postana gönderilir.'
          },
          {
            id: 'term-feedback',
            category: 'support',
            q: 'Bir tıbbi terimde veya açıklamada hata fark edersem ne yapmalıyım?',
            a: 'Terim adını ve gördüğün hatayı İletişim sayfasından ya da help@healthlexmed.com adresinden bize ilet. Her bildirimi kaynaklarla karşılaştırarak inceliyor, doğru bulduğumuz düzeltmeleri yayına alıyoruz. Bildirimin için teşekkürler.'
          }
        ]
      : [
          {
            id: 'trial',
            category: 'pricing',
            q: 'How does the free trial work and how long does it last?',
            a: 'Both Basic and Pro plans include a 3-day free trial; during the trial, all features of your chosen plan are open. Card details are required to start the trial. If you cancel from your profile before the 3 days end, you will not be charged. If you do not cancel, the annual fee for your chosen plan is charged at the end of the trial and the subscription renews each year.'
          },
          {
            id: 'categories',
            category: 'content',
            q: 'Which content is free, and what is included in Basic and Pro plans?',
            a: `All glossary terms and 16 categories are open to everyone, even without an account. As a guest, you can access the first 24 morphemes and 5 Flashcard rounds per day. Basic plan: first ${MAX_BASIC_MORPHEMES} morphemes, unlimited Flashcards and Matching, progress tracking. Pro plan: all 550+ morphemes, Quiz and Morpheme Builder games. During the 3-day free trial, all features of your chosen plan are open.`
          },
          {
            id: 'register',
            category: 'account',
            q: 'How do I register or create an account?',
            a: "You can create a free account from the 'Register' button at the top right using your name, email address, and a password. You can also sign up with your Google account."
          },
          {
            id: 'mobile',
            category: 'tech',
            q: 'Does it work on mobile and browsers, or do I need to download an app?',
            a: "You do not need to download an app. HealthLexMed works in browsers (Chrome, Safari, Edge) on phones, tablets, and computers. You can also add a shortcut to your phone using 'Add to Home Screen' in your browser menu."
          },
          {
            id: 'sources',
            category: 'content',
            q: 'Which sources are used to verify the terms?',
            a: 'Anatomical terms are prepared based on the international anatomical terminology standard Terminologia Anatomica (TA98 and its current edition TA2). Root, prefix, and suffix breakdowns are compiled from medical terminology references. Content is prepared and reviewed by the platform founder, Physiotherapist Sıddık Çiçek. Reporting any error you notice helps make the resource more accurate for everyone.'
          },
          {
            id: 'pricing',
            category: 'pricing',
            q: 'How does pricing work, and can I cancel?',
            a: 'There are three plans: Annual Basic, Annual Pro, and a one-time Lifetime plan. You can cancel your Basic or Pro subscription anytime from your profile with no cancellation fee. After cancelling, your access continues until the end of your paid period.'
          },
          {
            id: 'response-time',
            category: 'support',
            q: 'How long does it take to get a reply?',
            a: 'We read and answer all messages at help@healthlexmed.com. We usually reply within 1–2 business days.'
          },
          {
            id: 'cancel-how',
            category: 'account',
            q: 'How can I cancel or manage my subscription?',
            a: 'After signing in, you can cancel your subscription or change your plan from the subscription section on your Profile page. You can also email help@healthlexmed.com from your registered email address to request cancellation. There is no cancellation fee.'
          },
          {
            id: 'payment-partner',
            category: 'pricing',
            q: 'Where are payments and invoices processed?',
            a: 'Payments are processed through the international payment provider Paddle. Your card details are not stored on our servers. Invoices and payment receipts are sent to your registered email address.'
          },
          {
            id: 'term-feedback',
            category: 'support',
            q: 'What should I do if I notice an error in a medical term or explanation?',
            a: 'Send us the term name and the error you noticed through the Contact page or at help@healthlexmed.com. We check every report against reference sources and publish verified corrections. Thank you for letting us know.'
          }
        ];
  }, [isTr]);

  // SEO & Head Meta Yönetimi
  useEffect(() => {
    window.scrollTo(0, 0);
    const titleText = isTr
      ? 'Sıkça Sorulan Sorular (SSS) | HealthLexMed'
      : 'Frequently Asked Questions (FAQ) | HealthLexMed';
    document.title = titleText;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        isTr
          ? 'HealthLexMed hakkında sıkça sorulan sorular: 3 günlük ücretsiz deneme, üyelik paketleri, mobil kullanım, kaynaklar ve abonelik yönetimi.'
          : 'Frequently asked questions about HealthLexMed: 3-day free trial, membership plans, mobile usage, terminology sources, and subscription management.'
      );
    }
  }, [isTr]);

  // Arama ve Kategori Filtreleme
  const filteredFaqs = useMemo(() => {
    return faqList.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [faqList, selectedCategory, searchQuery]);

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const categories = isTr
    ? [
        { id: 'all', label: 'Tüm Sorular' },
        { id: 'pricing', label: 'Fiyatlandırma & Deneme' },
        { id: 'content', label: 'İçerik & Kaynaklar' },
        { id: 'account', label: 'Hesap & Abonelik' },
        { id: 'tech', label: 'Mobil & Teknik' },
        { id: 'support', label: 'Destek' }
      ]
    : [
        { id: 'all', label: 'All Questions' },
        { id: 'pricing', label: 'Pricing & Trial' },
        { id: 'content', label: 'Content & Sources' },
        { id: 'account', label: 'Account & Plans' },
        { id: 'tech', label: 'Mobile & Tech' },
        { id: 'support', label: 'Support' }
      ];

  // Schema.org FAQPage JSON-LD (Sayfadaki TÜM sorular ve yanıtlarla birebir eşleşir)
  const schemaFaqJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://www.healthlexmed.com/faq#faqpage',
      'name': isTr ? 'HealthLexMed Sıkça Sorulan Sorular (SSS)' : 'HealthLexMed Frequently Asked Questions (FAQ)',
      'description': isTr
        ? 'HealthLexMed tıbbi terminoloji öğrenme platformu hakkında fiyatlandırma, ücretsiz deneme, mobil kullanım ve tıp kaynakları sıkça sorulan sorular.'
        : 'Frequently asked questions about HealthLexMed medical terminology learning platform, pricing, free trial, mobile usage, and medical sources.',
      'url': 'https://www.healthlexmed.com/faq',
      'inLanguage': isTr ? 'tr-TR' : 'en-US',
      'mainEntity': faqList.map((item) => ({
        '@type': 'Question',
        'name': item.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.a
        }
      }))
    };
  }, [faqList, isTr]);

  // Schema.org FAQPage JSON-LD <head> Enjeksiyonu
  useEffect(() => {
    // Sayfa zaten prerender edilmişse veya statik script varsa duplikasyonu önle
    if (document.getElementById('prerendered-faq-schema')) {
      return;
    }
    const scriptId = 'healthlex-faq-schema-jsonld';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaFaqJsonLd);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [schemaFaqJsonLd]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div className="w-full">
        {/* Üst Başlık & Hero Banner */}
        <section className="border-b border-border bg-gradient-to-b from-card to-background py-12 md:py-16">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Link
                to="/"
                className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {isTr ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </Link>
            </div>

            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                {isTr ? 'Bilgi & Yardım Merkezi' : 'Help & Information Center'}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif text-foreground">
                {isTr ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {isTr
                  ? 'HealthLexMed üyelikleri, 3 günlük ücretsiz deneme, içerik kapsamı ve tıp kaynakları hakkında aklına takılan tüm soruların yanıtları.'
                  : 'Answers to all your questions regarding HealthLexMed memberships, the 3-day free trial, medical terminology sources, and mobile access.'}
              </p>

              {/* Canlı Arama Çubuğu */}
              <div className="relative max-w-xl mx-auto pt-2">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isTr
                      ? 'Sorularda veya yanıtlarda ara (örn: deneme, iptal, mobil, kaynak)...'
                      : 'Search questions or answers (e.g. trial, cancel, mobile, source)...'
                  }
                  className="px-4 py-2.5 bg-card/80 border-border text-sm shadow-xs rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Kategori Filtre Butonları */}
        <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Akordeon Soru Listesi (Görünür HTML Metinleri) */}
        <section className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/40 p-8">
              <h3 className="text-base font-bold text-foreground">
                {isTr ? 'Aradığın kriterlere uygun soru bulunamadı' : 'No questions found'}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-4">
                {isTr
                  ? 'Farklı bir arama terimi deneyebilir veya bize doğrudan yazabilirsin.'
                  : 'Try a different search keyword or write to us directly.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                {isTr ? 'Filtreleri Temizle' : 'Clear Filters'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((item, idx) => {
                const isOpen = !!openItems[idx];

                return (
                  <div
                    key={item.id || idx}
                    className="border border-border/90 rounded-xl bg-card overflow-hidden transition-all shadow-xs hover:border-primary/40"
                  >
                    {/* Soru Başlığı (Accordion Button) */}
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-muted/20 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-sm sm:text-base text-foreground font-sans leading-snug">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>

                    {/* Yanıt İçeriği (Görünür HTML Metni) */}
                    {isOpen && (
                      <div className="px-4 pb-5 pt-3 sm:px-5 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 bg-muted/10">
                        <p className="m-0 text-foreground/90 font-normal">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Alt Çağrı & İletişim Kutusu */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {isTr ? 'Başka bir sorun mu var?' : 'Have another question?'}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
                {isTr
                  ? 'Tıbbi terim önerileri, iş birliği ya da teknik destek için bize her zaman yazabilirsin. Genellikle 1–2 iş günü içinde yanıtlıyoruz.'
                  : 'You can write to us anytime for medical term suggestions, collaborations, or technical support. We usually reply within 1–2 business days.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
              <Link to="/contact">
                <Button className="font-semibold">
                  {isTr ? 'Bize Ulaş' : 'Contact Us'}
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="font-semibold">
                  {isTr ? 'Tarifeleri İncele' : 'View Pricing'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
