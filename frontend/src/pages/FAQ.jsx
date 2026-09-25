import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  Search,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Smartphone,
  BookOpen,
  UserPlus,
  Mail,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { updateCanonicalUrl } from '@/utils/seo';

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
            icon: Sparkles,
            q: 'Ücretsiz deneme nasıl çalışıyor, kaç gün sürüyor?',
            a: 'Temel ve Pro üyelik paketlerimizde 3 günlük ₺0 ücretsiz deneme süresi sunulmaktadır. Deneme süreniz boyunca platformun tüm özelliklerini tam kapsamıyla deneyimleyebilirsiniz. 3 gün dolmadan önce dilediğiniz an tek tıkla iptal edebilirsiniz; deneme süresi içinde iptal etmeniz durumunda kartınızdan hiçbir ücret çekilmez.'
          },
          {
            id: 'categories',
            category: 'content',
            icon: BookOpen,
            q: 'Hangi içerikler ücretsiz, hangileri Temel ve Pro planlara dahil?',
            a: '16 anatomik kategorinin ve tıbbi terimler sözlüğünün tamamı misafirler dahil tüm kullanıcılara açıktır. Misafirler ilk 24 morfeme ve günde 5 tur Flashcard oyununa ücretsiz erişebilir. Temel plan; ilk 100 morfemi, sınırsız Flashcard ve Eşleştirme oyununu ve kişisel ilerleme takibini içerir. Pro planda ise 571+ morfemin tamamı, Quiz ve Morfem Çözümleme oyun modları, akıllı tekrar algoritması ve tüm gelişmiş analizler sınırsız kullanıma açılır. Ayrıca 3 günlük ücretsiz deneme sürecinde tüm Pro özelliklerini sınırsızca deneyimleyebilirsiniz.'
          },
          {
            id: 'register',
            category: 'account',
            icon: UserPlus,
            q: 'Nasıl kayıt olurum / hesap oluştururum?',
            a: "Sağ üst menüdeki 'Kayıt Ol' butonuna tıklayarak adınız, e-posta adresiniz ve belirleyeceğiniz şifre ile yalnızca 10 saniyede ücretsiz hesabınızı oluşturabilirsiniz. Dilerseniz Google hesabınızla da tek tıkla şifresiz ve anında kayıt olabilirsiniz."
          },
          {
            id: 'mobile',
            category: 'tech',
            icon: Smartphone,
            q: 'Mobilde/tarayıcıda çalışıyor mu, uygulama indirmem gerekiyor mu?',
            a: "HealthLexMed modern bir Progressive Web App (PWA) mimarisine sahiptir. App Store veya Google Play'den yer kaplayan bir uygulama indirmenize gerek kalmadan; telefon, tablet ve masaüstü bilgisayarınızdaki tüm modern tarayıcılarda (Chrome, Safari, Edge) tam ekran ve yüksek hızda çalışır. Dilerseniz tarayıcı menüsünden 'Ana Ekrana Ekle' diyerek uygulama gibi anında başlatabilirsiniz."
          },
          {
            id: 'sources',
            category: 'content',
            icon: ShieldCheck,
            q: 'Terimler hangi kaynaklardan doğrulanıyor?',
            a: "Tüm Latince tıp terimleri ve morfolojik kök-ek çözümlemeleri, uluslararası anatomi terminoloji standardı olan Federative Committee on Anatomical Terminology (FCAT) tarafından yayınlanan 'Terminologia Anatomica' referans alınarak ve tıp fakültesi anatomi müfredatlarıyla uyumlu olarak hazırlanmıştır. İçerikler, sağlık profesyonelleri ve fizyoterapistler tarafından klinik doğruluk denetiminden geçirilmektedir."
          },
          {
            id: 'pricing',
            category: 'pricing',
            icon: CreditCard,
            q: 'Fiyatlandırma nasıl, iptal edebilir miyim?',
            a: 'HealthLexMed bütçenize göre esnek seçenekler sunar: Yıllık Temel, Yıllık Pro (en avantajlı) ve tek seferlik ödeme içeren Ömür Boyu planları bulunmaktadır. Temel ve Pro aboneliklerinizi profilinizden herhangi bir cayma bedeli veya taahhüt olmaksızın dilediğiniz an tek tıkla iptal edebilirsiniz. İptal ettiğinizde ödemesini yaptığınız dönem sonuna kadar erişiminiz kesintisiz devam eder.'
          },
          {
            id: 'sla',
            category: 'support',
            icon: HelpCircle,
            q: 'Taleplerime ne kadar sürede yanıt verilir?',
            a: 'Destek ekibimiz tüm talepleri önceliklendirerek inceler. Resmi hizmet standardımız (SLA) gereğince tüm kullanıcı sorularına, önerilerine ve teknik destek iletilerine en geç 24-48 saat içinde e-posta yoluyla detaylı dönüş sağlanır.'
          },
          {
            id: 'cancel-how',
            category: 'account',
            icon: CheckCircle2,
            q: 'Aboneliğimi nasıl iptal edebilir veya yönetebilirim?',
            a: 'Giriş yaptıktan sonra Profil sayfanızdaki abonelik yönetim panelinden veya doğrudan help@healthlexmed.com adresine kayıtlı e-postanızdan bir ileti göndererek aboneliğinizi anında ve herhangi bir cayma cezası olmaksızın sonlandırabilirsiniz.'
          },
          {
            id: 'payment-partner',
            category: 'pricing',
            icon: ShieldCheck,
            q: 'Ödeme ve fatura işlemlerim nerede işlenir?',
            a: 'HealthLexMed üzerindeki tüm abonelik, kart saklama ve ödeme işlemleri uluslararası Merchant of Record ödeme ortağımız Paddle güvencesiyle 256-bit SSL şifreleme ile yürütülür. Kredi kartı bilgileriniz sunucularımızda asla tutulmaz. Resmi fatura ve ödeme dekontlarınız kayıtlı e-postanıza otomatik olarak iletilir.'
          },
          {
            id: 'term-feedback',
            category: 'support',
            icon: Mail,
            q: 'Bir tıbbi terimde veya açıklamada hata fark edersem ne yapmalıyım?',
            a: 'Tıbbi terminoloji ekibimiz içerikleri sürekli güncellemekte ve doğrulamaktadır. Terim adı, ilgili kategori ve önerinizi İletişim sayfasından veya help@healthlexmed.com adresine ilettiğinizde terminoloji komisyonumuz 24-48 saat içinde inceleyerek düzeltmeyi yayına alır.'
          }
        ]
      : [
          {
            id: 'trial',
            category: 'pricing',
            icon: Sparkles,
            q: 'How does the free trial work and how long does it last?',
            a: 'We offer a 3-day $0 free trial for both Basic and Pro membership plans. During the trial period, you can explore all features of the selected tier without limitation. You can cancel anytime in 1 click before the 3 days end, and your card will not be charged.'
          },
          {
            id: 'categories',
            category: 'content',
            icon: BookOpen,
            q: 'Which features are free, and what is included in Basic and Pro plans?',
            a: 'All 16 anatomical categories and the complete medical glossary are openly accessible to everyone, including guests. Guests can explore the first 24 morphemes and play up to 5 Flashcard sessions daily. The Basic plan unlocks the top 100 morphemes, unlimited Flashcard and Matching games, and personal progress tracking. The Pro plan provides unrestricted access to all 571+ morphemes, Quiz and Morpheme Builder game modes, smart review spaced repetition, and in-depth analytics. Additionally, the 3-day free trial grants complete, unrestricted access to all Pro features.'
          },
          {
            id: 'register',
            category: 'account',
            icon: UserPlus,
            q: 'How do I register or create an account?',
            a: 'Click the "Register" button in the top navigation. You can create your free account in just 10 seconds using your name, email, and password, or sign in instantly with your Google account.'
          },
          {
            id: 'mobile',
            category: 'tech',
            icon: Smartphone,
            q: 'Does it work on mobile/browsers, do I need to install an app?',
            a: 'HealthLexMed is built on a modern Progressive Web App (PWA) architecture. You do not need to download an app from the App Store or Google Play; it runs smoothly and responsively across all smartphones, tablets, and desktop browsers (Chrome, Safari, Edge). You can also tap "Add to Home Screen" to use it just like a native app.'
          },
          {
            id: 'sources',
            category: 'content',
            icon: ShieldCheck,
            q: 'Which sources are used to verify the medical terms?',
            a: 'All Latin medical terms and morpheme breakdowns are compiled in accordance with "Terminologia Anatomica" (the international standard published by FCAT) and standard medical school anatomy curricula. Content is clinically reviewed and verified by healthcare professionals and physiotherapists.'
          },
          {
            id: 'pricing',
            category: 'pricing',
            icon: CreditCard,
            q: 'How is pricing structured, and can I cancel anytime?',
            a: 'HealthLexMed offers flexible plans: Annual Basic, Annual Pro (most popular), and a one-time Lifetime plan. You can cancel your Basic or Pro subscription anytime directly from your profile with zero cancellation fees or commitments. Your access remains active until the end of your billing cycle.'
          },
          {
            id: 'sla',
            category: 'support',
            icon: HelpCircle,
            q: 'How fast will I receive a response to my inquiry?',
            a: 'Our support team prioritizes and reviews every request. In accordance with our official service standard (SLA), requests are replied with a detailed email within 24-48 hours.'
          },
          {
            id: 'cancel-how',
            category: 'account',
            icon: CheckCircle2,
            q: 'How can I manage or cancel my subscription?',
            a: 'You can cancel anytime from your Profile page under the subscription management section after logging in, or simply email us at help@healthlexmed.com from your registered email address. There are no cancellation penalties.'
          },
          {
            id: 'payment-partner',
            category: 'pricing',
            icon: ShieldCheck,
            q: 'Where are payments and invoices processed?',
            a: 'All subscription and billing processes on HealthLexMed are handled securely through our international Merchant of Record partner, Paddle, with 256-bit SSL encryption. We never store credit card data on our servers. Invoices and receipts are sent automatically to your registered email.'
          },
          {
            id: 'term-feedback',
            category: 'support',
            icon: Mail,
            q: 'What should I do if I notice an issue with a medical term or definition?',
            a: 'Our medical terminology editorial team verifies content continuously. Please send the term name and your suggestion via our Contact page or to help@healthlexmed.com; our panel will review and apply corrections within 24-48 hours.'
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
        { id: 'support', label: 'Destek & SLA' }
      ]
    : [
        { id: 'all', label: 'All Questions' },
        { id: 'pricing', label: 'Pricing & Trial' },
        { id: 'content', label: 'Content & Sources' },
        { id: 'account', label: 'Account & Plans' },
        { id: 'tech', label: 'Mobile & Tech' },
        { id: 'support', label: 'Support & SLA' }
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
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {isTr ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </Link>
            </div>

            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                <HelpCircle className="w-4 h-4" />
                {isTr ? 'Bilgi & Yardım Merkezi' : 'Help & Information Center'}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif text-foreground">
                {isTr ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {isTr
                  ? 'HealthLexMed üyelikleri, 3 günlük ücretsiz deneme, içerik kapsamı ve tıp kaynakları hakkında aklınıza takılan tüm soruların yanıtları.'
                  : 'Answers to all your questions regarding HealthLexMed memberships, the 3-day free trial, medical terminology sources, and mobile access.'}
              </p>

              {/* Canlı Arama Çubuğu */}
              <div className="relative max-w-xl mx-auto pt-2">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isTr
                      ? 'Sorularda veya yanıtlarda ara (örn: deneme, iptal, mobil, kaynak)...'
                      : 'Search questions or answers (e.g. trial, cancel, mobile, source)...'
                  }
                  className="pl-10 pr-4 py-2.5 bg-card/80 border-border text-sm shadow-xs rounded-xl"
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
              <HelpCircle className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
              <h3 className="text-base font-bold text-foreground">
                {isTr ? 'Aradığınız kriterlere uygun soru bulunamadı' : 'No questions found'}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-4">
                {isTr
                  ? 'Farklı bir arama terimi deneyebilir veya destek ekibimizle doğrudan iletişime geçebilirsiniz.'
                  : 'Try a different search keyword or contact our support team directly.'}
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
                const IconComponent = item.icon || HelpCircle;

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
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm sm:text-base text-foreground font-sans leading-snug">
                          {item.q}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>

                    {/* Yanıt İçeriği (Görünür HTML Metni) */}
                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 bg-muted/10">
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
                {isTr ? 'Başka bir sorunuz mu var?' : 'Have another question?'}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
                {isTr
                  ? 'Tıbbi terim önerileri, iş birliği veya teknik destek için bize 7/24 dilediğiniz an ulaşabilirsiniz. En geç 24-48 saat içinde yanıtlıyoruz.'
                  : 'For medical terminology feedback, partnerships, or technical support, feel free to reach out anytime. We respond within 24-48 hours.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link to="/contact">
                <Button className="font-semibold gap-2">
                  <Mail className="w-4 h-4" />
                  {isTr ? 'Bize Ulaşın' : 'Contact Us'}
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="font-semibold gap-2">
                  {isTr ? 'Tarifeleri İncele' : 'View Pricing'}
                  <ArrowRight className="w-4 h-4" />
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
