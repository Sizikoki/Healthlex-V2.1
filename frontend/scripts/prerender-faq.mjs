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
        "text": "Temel ve Pro planlarda 3 günlük ücretsiz deneme var; deneme boyunca seçtiğin planın tüm özellikleri açıktır. Denemeyi başlatırken kart bilgisi istenir. 3 gün dolmadan profilinden iptal edersen hiçbir ücret çekilmez. İptal etmezsen deneme sonunda seçtiğin planın yıllık ücreti tahsil edilir ve abonelik her yıl yenilenir."
      }
    },
    {
      "@type": "Question",
      "name": "Hangi içerikler ücretsiz, hangileri Temel ve Pro planlara dahil?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sözlükteki tüm terimler ve 16 kategori, kayıt olmasan da herkese açık. Misafir olarak ilk 24 morfeme ve günde 5 tur Flashcard'a erişebilirsin. Temel plan: ilk 150 morfem, sınırsız Flashcard ve Eşleştirme, ilerleme takibi. Pro plan: 550+ morfemin tamamı, Quiz ve Morfem Yapıcı oyunları. 3 günlük ücretsiz deneme boyunca seçtiğin planın tüm özellikleri açık."
      }
    },
    {
      "@type": "Question",
      "name": "Nasıl kayıt olurum / hesap oluştururum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sağ üstteki 'Kayıt Ol' düğmesinden adın, e-posta adresin ve bir şifreyle ücretsiz hesap açabilirsin. İstersen Google hesabınla da kayıt olabilirsin."
      }
    },
    {
      "@type": "Question",
      "name": "Mobilde/tarayıcıda çalışıyor mu, uygulama indirmem gerekiyor mu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uygulama indirmene gerek yok. HealthLexMed telefon, tablet ve bilgisayardaki tarayıcılarda (Chrome, Safari, Edge) çalışır. İstersen tarayıcı menüsünden 'Ana Ekrana Ekle' diyerek telefonuna kısayol olarak ekleyebilirsin."
      }
    },
    {
      "@type": "Question",
      "name": "Terimler hangi kaynaklardan doğrulanıyor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anatomik terimler, uluslararası anatomi terminolojisi standardı Terminologia Anatomica (TA98 ve güncel sürümü TA2) esas alınarak hazırlanır. Kök, önek ve sonek çözümlemeleri tıbbi terminoloji kaynaklarından derlenir. İçerikler, platformun kurucusu Fizyoterapist Sıddık Çiçek tarafından hazırlanıp kontrol edilir. Bir hata görürsen bize bildirmen, kaynağı herkes için daha doğru yapar."
      }
    },
    {
      "@type": "Question",
      "name": "Fiyatlandırma nasıl, iptal edebilir miyim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Üç plan var: Yıllık Temel, Yıllık Pro ve tek ödemeli Ömür Boyu. Temel ve Pro aboneliklerini profilinden istediğin zaman iptal edebilirsin; cayma bedeli yok. İptal ettiğinde, ödediğin dönemin sonuna kadar erişimin devam eder."
      }
    },
    {
      "@type": "Question",
      "name": "Taleplerime ne kadar sürede yanıt verilir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tüm mesajları help@healthlexmed.com üzerinden okuyup yanıtlıyoruz. Genellikle 1–2 iş günü içinde dönüş yapıyoruz."
      }
    },
    {
      "@type": "Question",
      "name": "Aboneliğimi nasıl iptal edebilir veya yönetebilirim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Giriş yaptıktan sonra Profil sayfandaki abonelik bölümünden aboneliğini iptal edebilir ya da planını değiştirebilirsin. İstersen kayıtlı e-postandan help@healthlexmed.com adresine yazarak da iptal talebini iletebilirsin. Cayma bedeli yok."
      }
    },
    {
      "@type": "Question",
      "name": "Ödeme ve fatura işlemlerim nerede işlenir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ödemeler, uluslararası ödeme kuruluşu Paddle üzerinden alınır. Kart bilgilerin bizim sunucularımızda tutulmaz. Fatura ve ödeme belgelerin kayıtlı e-postana gönderilir."
      }
    },
    {
      "@type": "Question",
      "name": "Bir tıbbi terimde veya açıklamada hata fark edersem ne yapmalıyım?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Terim adını ve gördüğün hatayı İletişim sayfasından ya da help@healthlexmed.com adresinden bize ilet. Her bildirimi kaynaklarla karşılaştırarak inceliyor, doğru bulduğumuz düzeltmeleri yayına alıyoruz. Bildirimin için teşekkürler."
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
