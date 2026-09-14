import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('Build index.html not found, skipping prerender-faq.');
  process.exit(0);
}

console.log('🚀 Prerendering /faq/index.html with static Schema.org FAQPage in <head>...');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const faqSchemaJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.healthlexmed.com/faq#faqpage",
  "name": "HealthLexMed Sıkça Sorulan Sorular (SSS)",
  "description": "HealthLexMed tıbbi terminoloji platformu hakkında fiyatlandırma, ücretsiz deneme, mobil kullanım ve tıp kaynakları sıkça sorulan sorular.",
  "url": "https://www.healthlexmed.com/faq",
  "inLanguage": "tr-TR",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ücretsiz deneme nasıl çalışıyor, kaç gün sürüyor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Temel ve Pro üyelik paketlerimizde 3 günlük ₺0 ücretsiz deneme süresi sunulmaktadır. Deneme süreniz boyunca platformun tüm özelliklerini tam kapsamıyla deneyimleyebilirsiniz. 3 gün dolmadan önce dilediğiniz an tek tıkla iptal edebilirsiniz; deneme süresi içinde iptal etmeniz durumunda kartınızdan hiçbir ücret çekilmez."
      }
    },
    {
      "@type": "Question",
      "name": "Hangi içerikler ücretsiz, hangileri Temel ve Pro planlara dahil?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "13 anatomik kategorinin ve tıbbi terimler sözlüğünün tamamı misafirler dahil tüm kullanıcılara açıktır. Misafirler ilk 24 morfeme ve günde 5 tur Flashcard oyununa ücretsiz erişebilir. Temel plan; ilk 100 morfemi, sınırsız Flashcard ve Eşleştirme oyununu ve kişisel ilerleme takibini içerir. Pro planda ise 571+ morfemin tamamı, Quiz ve Morfem Çözümleme oyun modları, akıllı tekrar algoritması ve tüm gelişmiş analizler sınırsız kullanıma açılır. Ayrıca 3 günlük ücretsiz deneme sürecinde tüm Pro özelliklerini sınırsızca deneyimleyebilirsiniz."
      }
    },
    {
      "@type": "Question",
      "name": "Nasıl kayıt olurum / hesap oluştururum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sağ üst menüdeki 'Kayıt Ol' butonuna tıklayarak adınız, e-posta adresiniz ve belirleyeceğiniz şifre ile yalnızca 10 saniyede ücretsiz hesabınızı oluşturabilirsiniz. Dilerseniz Google hesabınızla da tek tıkla şifresiz ve anında kayıt olabilirsiniz."
      }
    },
    {
      "@type": "Question",
      "name": "Mobilde/tarayıcıda çalışıyor mu, uygulama indirmem gerekiyor mu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HealthLexMed modern bir Progressive Web App (PWA) mimarisine sahiptir. App Store veya Google Play'den yer kaplayan bir uygulama indirmenize gerek kalmadan; telefon, tablet ve masaüstü bilgisayarınızdaki tüm modern tarayıcılarda (Chrome, Safari, Edge) tam ekran ve yüksek hızda çalışır. Dilerseniz tarayıcı menüsünden 'Ana Ekrana Ekle' diyerek uygulama gibi anında başlatabilirsiniz."
      }
    },
    {
      "@type": "Question",
      "name": "Terimler hangi kaynaklardan doğrulanıyor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tüm Latince tıp terimleri ve morfolojik kök-ek çözümlemeleri, uluslararası anatomi terminoloji standardı olan Federative Committee on Anatomical Terminology (FCAT) tarafından yayınlanan 'Terminologia Anatomica' referans alınarak ve tıp fakültesi anatomi müfredatlarıyla uyumlu olarak hazırlanmıştır. İçerikler, sağlık profesyonelleri ve fizyoterapistler tarafından klinik doğruluk denetiminden geçirilmektedir."
      }
    },
    {
      "@type": "Question",
      "name": "Fiyatlandırma nasıl, iptal edebilir miyim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HealthLexMed bütçenize göre esnek seçenekler sunar: Yıllık Temel, Yıllık Pro (en avantajlı) ve tek seferlik ödeme içeren Ömür Boyu planları bulunmaktadır. Temel ve Pro aboneliklerinizi profilinizden herhangi bir cayma bedeli veya taahhüt olmaksızın dilediğiniz an tek tıkla iptal edebilirsiniz. İptal ettiğinizde ödemesini yaptığınız dönem sonuna kadar erişiminiz kesintisiz devam eder."
      }
    },
    {
      "@type": "Question",
      "name": "Taleplerime ne kadar sürede yanıt verilir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Destek ekibimiz tüm talepleri önceliklendirerek inceler. Resmi hizmet standardımız (SLA) gereğince tüm kullanıcı sorularına, önerilerine ve teknik destek iletilerine en geç 24-48 saat içinde e-posta yoluyla detaylı dönüş sağlanır."
      }
    },
    {
      "@type": "Question",
      "name": "Aboneliğimi nasıl iptal edebilir veya yönetebilirim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Giriş yaptıktan sonra Profil sayfanızdaki abonelik yönetim panelinden veya doğrudan help@healthlexmed.com adresine kayıtlı e-postanızdan bir ileti göndererek aboneliğinizi anında ve herhangi bir cayma cezası olmaksızın sonlandırabilirsiniz."
      }
    },
    {
      "@type": "Question",
      "name": "Ödeme ve fatura işlemlerim nerede işlenir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HealthLexMed üzerindeki tüm abonelik, kart saklama ve ödeme işlemleri uluslararası Merchant of Record ödeme ortağımız Paddle güvencesiyle 256-bit SSL şifreleme ile yürütülür. Kredi kartı bilgileriniz sunucularımızda asla tutulmaz. Resmi fatura ve ödeme dekontlarınız kayıtlı e-postanıza otomatik olarak iletilir."
      }
    },
    {
      "@type": "Question",
      "name": "Bir tıbbi terimde veya açıklamada hata fark edersem ne yapmalıyım?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tıbbi terminoloji ekibimiz içerikleri sürekli güncellemekte ve doğrulamaktadır. Terim adı, ilgili kategori ve önerinizi İletişim sayfasından veya help@healthlexmed.com adresine ilettiğinizde terminoloji komisyonumuz 24-48 saat içinde inceleyerek düzeltmeyi yayına alır."
      }
    }
  ]
};

const faqJsonLdScript = `\n    <!-- Pre-rendered FAQPage Structured Data for Google Rich Results -->\n    <script type="application/ld+json" id="prerendered-faq-schema">\n    ${JSON.stringify(faqSchemaJson, null, 2)}\n    </script>\n`;

let faqHtml = indexHtml;

// Replace title, description, and canonical URL
faqHtml = faqHtml.replace(
  /<title>.*?<\/title>/i,
  '<title>Sıkça Sorulan Sorular (SSS) | HealthLexMed</title>'
);

faqHtml = faqHtml.replace(
  /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
  '<meta name="description" content="HealthLexMed hakkında sıkça sorulan sorular: 3 günlük ücretsiz deneme, üyelik paketleri, mobil kullanım, kaynaklar ve abonelik yönetimi." />'
);

faqHtml = faqHtml.replace(
  /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
  '<link rel="canonical" href="https://www.healthlexmed.com/faq" />'
);

faqHtml = faqHtml.replace(
  /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:url" content="https://www.healthlexmed.com/faq" />'
);

faqHtml = faqHtml.replace(
  /<meta\s+(name|property)="twitter:url"\s+content=".*?"\s*\/?>/gi,
  '<meta $1="twitter:url" content="https://www.healthlexmed.com/faq" />'
);

// Inject FAQPage JSON-LD right before </head>
faqHtml = faqHtml.replace('</head>', `${faqJsonLdScript}</head>`);

// Write to build/faq.html and build/faq/index.html
const faqDir = path.join(buildDir, 'faq');
if (!fs.existsSync(faqDir)) {
  fs.mkdirSync(faqDir, { recursive: true });
}

fs.writeFileSync(path.join(faqDir, 'index.html'), faqHtml, 'utf8');
fs.writeFileSync(path.join(buildDir, 'faq.html'), faqHtml, 'utf8');

console.log('✅ Generated static /faq/index.html and /faq.html with 10-question FAQPage in <head>');
