import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const buildDir = path.join(projectRoot, 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.log('Build index.html not found, skipping prerender-rehber.');
  process.exit(0);
}

console.log('🚀 Prerendering /rehber/index.html and /rehber.html with Schema.org Article & Breadcrumbs...');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const guideSchemaJson = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.healthlexmed.com/rehber#article",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.healthlexmed.com/#website",
        "name": "HealthLexMed",
        "url": "https://www.healthlexmed.com/"
      },
      "headline": "Tıbbi Terminoloji Rehberi",
      "description": "Tıbbi terimleri ezberlemeden, parçalayarak öğren: ön ek, kök ve son ek çözümlemesi, Latince okunuş kuralları, çoğul kuralları ve çalışma yöntemleri.",
      "inLanguage": "tr",
      "mainEntityOfPage": "https://www.healthlexmed.com/rehber",
      "url": "https://www.healthlexmed.com/rehber",
      "publisher": {
        "@type": "Organization",
        "name": "HealthLexMed",
        "url": "https://www.healthlexmed.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.healthlexmed.com/logo-mark.png"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.healthlexmed.com/rehber#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://www.healthlexmed.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Rehber",
          "item": "https://www.healthlexmed.com/rehber"
        }
      ]
    }
  ]
};

const guideJsonLdScript = `\n    <!-- Pre-rendered Guide Structured Data (Article & BreadcrumbList) for Google Rich Results -->\n    <script type="application/ld+json" id="prerendered-guide-schema">\n    ${JSON.stringify(guideSchemaJson, null, 2)}\n    </script>\n`;

// Semantic HTML content for SEO crawlers inside #root
const prerenderContent = `
<div id="root">
  <div class="rehber-prerender-content" style="max-width: 900px; margin: 0 auto; padding: 24px; font-family: sans-serif; line-height: 1.6; color: #0f1b33;">
    <header>
      <nav aria-label="Breadcrumb">
        <a href="/">Ana Sayfa</a> &gt; <span>Rehber</span>
      </nav>
      <p style="font-weight: bold; color: #1d4ed8; text-transform: uppercase;">Başlangıç rehberi · 8 bölüm</p>
      <h1>Tıbbi Terminoloji Rehberi</h1>
      <p>Tıbbi terimleri tek tek ezberlemek yerine parçalayarak çözmeyi öğren. Bu rehber terim çözümleme mantığını, Latince ve Yunanca köken ilişkilerini, okunuş ve yazım kurallarını ve verimli çalışma yöntemlerini bir arada anlatıyor.</p>
    </header>

    <article>
      <section id="s1">
        <h2>Bölüm 1: Tıbbi terminoloji nedir, neden Latince ve Yunanca?</h2>
        <p>Tıbbi terminoloji; tıp, hemşirelik, fizyoterapi ve sağlık meslek yüksekokullarında öğrenim gördüğün süreçte ve meslek hayatın boyunca sağlık profesyonelleriyle eksiksiz, net ve nesnel bir şekilde iletişim kurmanı sağlayan özel bir bilimsel dildir.</p>
        <p>Günlük dilde kullandığın kelimeler bağlama göre farklı anlamlar kazanabilirken, tıbbi bir terim kişiden kişiye veya kurumdan kuruma değişmeyen tek ve kesin bir anlama sahiptir.</p>
        <p>Sağlık bilimleri eğitimine yeni başladığında bu dil sana ilk bakışta karmaşık görünebilir. Ama tıbbi terimler sonu gelmez bir ezber listesi değil, belirli kurallarla birleştirilmiş birer yapbozdur. Terimleri yapı taşlarına ayırıp çözümlediğinde, daha önce hiç karşılaşmadığın bir hastalığın veya tanı yönteminin anlamını tek bakışta çıkarabilirsin.</p>
        <h3>Neden Latince ve Yunanca?</h3>
        <p>Günümüz tıp dilinin temelleri Antik Yunan ve Roma uygarlıklarına, Hipokrat ve Galen gibi hekimlerin tıp literatürüne kazandırdığı kavramlara dayanır. Bu dilin günümüze kadar korunmasının üç temel sebebi var:</p>
        <ul>
          <li><strong>Değişmeyen bir dil:</strong> Latince hiçbir ülkenin günlük dili olmadığından anlam kaymasına uğramaz, bölgesel farklılıklardan etkilenmez.</li>
          <li><strong>Uluslararası standart:</strong> Anatomi terimleri <em>Terminologia Anatomica</em> adlı resmi standartla belirlenir. Dünyanın her yerinde aynı yapıyı ifade eder.</li>
          <li><strong>Görev paylaşımı:</strong> Anatomik yapılarda ağırlıklı olarak Latince, hastalık ve cerrahi terimlerinde Grekçe kökler kullanılır.</li>
        </ul>
      </section>

      <section id="s2">
        <h2>Bölüm 2: Bir terimin yapısı: Ön ek, kök, birleştirici sesli harf, son ek</h2>
        <p>Bir tıbbi terim, anlamı meydana getiren farklı işlevlerdeki parçaların birleşmesiyle oluşur. Terim çözümlemeyi öğrenmek için önce bu dört yapı taşını tanımalısın.</p>
        <h3>1. Kök (Root)</h3>
        <p>Terimin temel anlamını taşır. Genellikle bir organı, dokuyu veya vücut sıvısını anlatır. Her tıbbi terimde en az bir kök bulunur; birden fazla kök de bir araya gelebilir (örneğin <em>gastr/o</em> + <em>enter/o</em>).</p>
        <h3>2. Ön Ek (Prefix)</h3>
        <p>Kökün önüne gelir. Konum, yön, zaman, sayı veya olumsuzluk katarak kökün anlamını niteler. Her terimde ön ek bulunmak zorunda değildir. Örneğin <em>epi-</em> (üzerinde), <em>endo-</em> (içinde), <em>hypo-</em> (altında/az).</p>
        <h3>3. Son Ek (Suffix)</h3>
        <p>Kökün sonuna gelir. Terimin dil bilgisindeki işlevini (isim, sıfat) belirler ve durum, hastalık, cerrahi işlem veya tanı yöntemi bildirir. Örneğin <em>-itis</em> (iltihap), <em>-logy</em> (bilim/inceleme), <em>-pathy</em> (hastalık).</p>
        <h3>4. Birleştirici Sesli Harf (Combining Vowel)</h3>
        <p>Genellikle <strong>o</strong> harfidir; bazen <strong>e</strong> veya <strong>i</strong> de olabilir. İki kökü veya sessiz harfle başlayan bir son eki köke bağlarken telaffuzu kolaylaştırmak için araya girer.</p>
      </section>

      <section id="s3">
        <h2>Bölüm 3: Bir terim adım adım nasıl çözümlenir?</h2>
        <p>Tıbbi bir terimle karşılaştığında onu baştan sona okumak yerine adım adım analiz etmek en hızlı ve doğru yoldur. Altın kural: <strong>Önce son ekten başla, sonra başa dön.</strong></p>
        <ol>
          <li><strong>Adım 1: Son eki bul ve anlamını yaz.</strong> Terimin sonundaki eki tespit et. Örneğin <em>-itis</em> gördüğünde bunun bir iltihap olduğunu hemen belirlersin.</li>
          <li><strong>Adım 2: Başa dön, ön ek var mı kontrol et.</strong> Varsa konum, sayı veya derece belirtecini ekle.</li>
          <li><strong>Adım 3: Kökü (veya kökleri) çözümle.</strong> Hangi organ veya dokunun söz konusu olduğunu tespit et.</li>
          <li><strong>Adım 4: Parçaları Türkçe cümle mantığıyla birleştir.</strong></li>
        </ol>
        <p>Örnek çözümlemeler: <em>gastroenteritis</em> (mide ve ince bağırsak iltihabı), <em>electrocardiogram</em> (kalbin elektriksel aktivitesinin kaydı), <em>endoscopy</em> (iç organların görüntülenmesi).</p>
      </section>

      <section id="s4">
        <h2>Bölüm 4: Harflerin ve harf gruplarının okunuşu</h2>
        <p>Bir Latince terimi okumak ile Türkçeye yerleşmiş haliyle yazmak iki ayrı şeydir. Derste terimi uluslararası yazımıyla (<em>oesophagus</em>) görürsün; Türkçe bir metin yazarken ise Türk tıp dilindeki yazımını (<em>özofagus</em>) kullanırsın.</p>
        <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th>Harf / Grup</th>
              <th>Nasıl Okunur?</th>
              <th>Örnek</th>
              <th>Okunuşu</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>c</td><td>a, o, u önünde k; e, i, y, ae, oe önünde s</td><td>scapula, cerebrum</td><td>skapula, serebrum</td></tr>
            <tr><td>g</td><td>a, o, u önünde g; e, i önünde j veya sert g</td><td>gaster, digitus</td><td>gaster, dijitus</td></tr>
            <tr><td>y</td><td>Her zaman i</td><td>thymus, myocardium</td><td>timus, miyokardiyum</td></tr>
            <tr><td>x</td><td>ks</td><td>thorax, xiphoid</td><td>toraks, ksifoid</td></tr>
            <tr><td>ch</td><td>k</td><td>cholera</td><td>kolera</td></tr>
            <tr><td>ph</td><td>f</td><td>pharynx</td><td>farinks</td></tr>
            <tr><td>th</td><td>t</td><td>thorax</td><td>toraks</td></tr>
            <tr><td>ae, oe</td><td>e / ö</td><td>caecum, oedema</td><td>sekum, ödem</td></tr>
            <tr><td>eu, au</td><td>ö / av</td><td>neuron, auris</td><td>nöron, avris</td></tr>
          </tbody>
        </table>
      </section>

      <section id="s5">
        <h2>Bölüm 5: Tekil ve çoğul kuralları</h2>
        <p>Anatomi terminolojisinde çoğullar Latince ve Grekçe dil bilgisine göre yapılır. Kelimenin sonundaki değişimi tanıdığında, çoğul bir terimi okuduğunda tekilini hemen bulursun.</p>
        <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th>Tekil Bitişi</th>
              <th>Çoğul Bitişi</th>
              <th>Örnekler</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>-us</td><td>-i</td><td>fungus &rarr; fungi, thrombus &rarr; thrombi</td></tr>
            <tr><td>-a</td><td>-ae</td><td>bursa &rarr; bursae, fossa &rarr; fossae</td></tr>
            <tr><td>-um</td><td>-a</td><td>ovum &rarr; ova, atrium &rarr; atria</td></tr>
            <tr><td>-is</td><td>-es</td><td>diagnosis &rarr; diagnoses, epiphysis &rarr; epiphyses</td></tr>
            <tr><td>-on</td><td>-a</td><td>ganglion &rarr; ganglia</td></tr>
            <tr><td>-ix, -ex</td><td>-ices</td><td>appendix &rarr; appendices, cortex &rarr; cortices</td></tr>
            <tr><td>-ma</td><td>-mata</td><td>condyloma &rarr; condylomata</td></tr>
          </tbody>
        </table>
        <h3>Anatomide Sık Geçen Düzensiz Çoğullar</h3>
        <p><em>os &rarr; ossa</em> (kemik &rarr; kemikler: Ossa Cranii), <em>foramen &rarr; foramina</em> (delik &rarr; delikler), <em>corpus &rarr; corpora</em> (gövde &rarr; gövdeler), <em>caput &rarr; capita</em> (baş &rarr; başlar).</p>
      </section>

      <section id="s6">
        <h2>Bölüm 6: Eş anlamlı kökler ve eşadlılık</h2>
        <p>Aynı organ için iki farklı kök görmen şaşırtıcı gelebilir. Genel eğilim şudur: anatomik tanımlarda Latince, hastalık ve cerrahi tanımlarında Grekçe kök kullanılır.</p>
        <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <thead>
            <tr style="background: #f1f5f9;">
              <th>Organ</th>
              <th>Latince Kök (Anatomi)</th>
              <th>Grekçe Kök (Patoloji / Klinik)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Böbrek</td><td>ren/o (renal)</td><td>nephr/o (nephritis)</td></tr>
            <tr><td>Deri</td><td>cutane/o (subcutaneous)</td><td>derm/o, dermat/o (dermatology)</td></tr>
            <tr><td>Ağız</td><td>or/o (oral)</td><td>stomat/o (stomatitis)</td></tr>
            <tr><td>Akciğer</td><td>pulmon/o (pulmonary)</td><td>pneumon/o (pneumonia)</td></tr>
          </tbody>
        </table>
        <h3>Aynı Kök, İki Farklı Anlam (Eşadlılık)</h3>
        <p><em>scler/o:</em> 1. Sert, sertleşme (arteriosclerosis), 2. Gözün beyaz tabakası (scleritis).</p>
        <p><em>myel/o:</em> 1. Kemik iliği (myelocyte), 2. Omurilik (poliomyelitis).</p>
      </section>

      <section id="s7">
        <h2>Bölüm 7: Sık yapılan hatalar</h2>
        <p>Tıp dilinde küçük bir harf değişikliği bile farklı bir yapıyı işaret edebilir. Hatalar genellikle üç alanda toplanır:</p>
        <ul>
          <li><strong>Yazım ve okunuş hataları:</strong> <em>longitudinal</em> yerine <em>longutidinal</em>, <em>obstrüksiyon</em> yerine <em>obstriksiyon</em> yazılması gibi harf kaymaları.</li>
          <li><strong>Anlam ve kullanım tutarsızlıkları:</strong> Aynı raporda bir bölge için sırayla "karın", Arapça kökenli "batın" ve Latince "abdomen" kullanmak metnin tutarlılığını bozar.</li>
          <li><strong>Niteleyici ön ekleri karıştırmak:</strong> Azlık belirten <em>hypo-</em> ile küçüklük belirten <em>micro-</em> birbirinin yerine kullanılamaz.</li>
        </ul>
      </section>

      <section id="s8">
        <h2>Bölüm 8: Tıbbi terminoloji nasıl çalışılır?</h2>
        <p>Bu dili kalıcı öğrenmenin sırrı binlerce kelimeyi ezberlemek değil, doğru çalışma stratejileridir:</p>
        <ol>
          <li><strong>Ezberleme, parçala:</strong> <em>cardi/o</em> kökünün kalp, <em>-itis</em> ekinin iltihap olduğunu bir kez öğrendiğinde onlarca terimi ezberlemeden çözersin.</li>
          <li><strong>Aralıklı tekrar:</strong> Yeni kök ve ekleri ilk gün, üç gün sonra ve bir hafta sonra tekrar et. Kartın bir yüzüne <em>ren/o</em>, diğerine "böbrek" yaz.</li>
          <li><strong>Sesli oku:</strong> Terimleri okunuş kurallarına dikkat ederek yüksek sesle söyle. İşitsel hafızan da devreye girer.</li>
          <li><strong>Bağlam içinde gör:</strong> Öğrendiğin yapıları atlaslarda, vaka raporlarında ve ders notlarında cümle içinde oku.</li>
        </ol>
      </section>
    </article>
  </div>
</div>
`;

let rehberHtml = indexHtml;

// 1. Replace Title
rehberHtml = rehberHtml.replace(
  /<title>.*?<\/title>/i,
  '<title>Tıbbi Terminoloji Rehberi | HealthLexMed</title>'
);

// 2. Replace Description
rehberHtml = rehberHtml.replace(
  /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
  '<meta name="description" content="Tıbbi terimleri ezberlemeden, parçalayarak öğren: ön ek, kök ve son ek çözümlemesi, Latince okunuş kuralları, çoğul kuralları ve çalışma yöntemleri." />'
);

// 3. Replace Canonical
rehberHtml = rehberHtml.replace(
  /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
  '<link rel="canonical" href="https://www.healthlexmed.com/rehber" />'
);

// 4. Replace OpenGraph & Twitter URLs
rehberHtml = rehberHtml.replace(
  /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:url" content="https://www.healthlexmed.com/rehber" />'
);

rehberHtml = rehberHtml.replace(
  /<meta\s+(name|property)="twitter:url"\s+content=".*?"\s*\/?>/gi,
  '<meta $1="twitter:url" content="https://www.healthlexmed.com/rehber" />'
);

// 5. Replace OpenGraph & Twitter Titles
rehberHtml = rehberHtml.replace(
  /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:title" content="Tıbbi Terminoloji Rehberi | HealthLexMed" />'
);

rehberHtml = rehberHtml.replace(
  /<meta\s+(name|property)="twitter:title"\s+content=".*?"\s*\/?>/gi,
  '<meta $1="twitter:title" content="Tıbbi Terminoloji Rehberi | HealthLexMed" />'
);

// 6. Replace OpenGraph & Twitter Descriptions
rehberHtml = rehberHtml.replace(
  /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:description" content="Tıbbi terimleri ezberlemeden, parçalayarak öğren: ön ek, kök ve son ek çözümlemesi, Latince okunuş kuralları, çoğul kuralları ve çalışma yöntemleri." />'
);

rehberHtml = rehberHtml.replace(
  /<meta\s+(name|property)="twitter:description"\s+content=".*?"\s*\/?>/gi,
  '<meta $1="twitter:description" content="Tıbbi terimleri ezberlemeden, parçalayarak öğren: ön ek, kök ve son ek çözümlemesi, Latince okunuş kuralları, çoğul kuralları ve çalışma yöntemleri." />'
);

// 7. Ensure NO noindex exists
rehberHtml = rehberHtml.replace(/noindex/gi, 'index');
rehberHtml = rehberHtml.replace(/nofollow/gi, 'follow');

// 8. Inject JSON-LD right before </head>
rehberHtml = rehberHtml.replace('</head>', `${guideJsonLdScript}</head>`);

// 9. Inject Pre-rendered Semantic Content into <div id="root"></div>
rehberHtml = rehberHtml.replace(
  /<div id="root"><\/div>/i,
  prerenderContent.trim()
);

// 10. Write to build/rehber.html and build/rehber/index.html
const rehberDir = path.join(buildDir, 'rehber');
if (!fs.existsSync(rehberDir)) {
  fs.mkdirSync(rehberDir, { recursive: true });
}

fs.writeFileSync(path.join(rehberDir, 'index.html'), rehberHtml, 'utf8');
fs.writeFileSync(path.join(buildDir, 'rehber.html'), rehberHtml, 'utf8');

console.log('✅ Generated static /rehber/index.html and /rehber.html with full SEO & content');
