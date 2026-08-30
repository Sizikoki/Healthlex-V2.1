import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, Minus, ArrowRight, BookOpen, Layers, Trophy, Brain } from 'lucide-react';
import { getAllTerms } from '@/data/medicalTerms';
import { PREFIXES, ROOTS, SUFFIXES } from '@/data/morphemesData';
import { db, auth } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getPricePreviews, openPaddleCheckout } from '@/services/paddle';
import { getUser } from '@/utils/storage';
import { toast } from 'sonner';
import './LandingPage.css';

const DEMO_ROUNDS = [
  {
    term: 'GASTROENTERITIS',
    chips: [
      { part: 'GASTRO', meaning: 'MİDE' },
      { part: 'ENTER', meaning: 'BAĞIRSAK' },
      { part: 'ITIS', meaning: 'İLTİHAP' }
    ],
    result: 'Gastroenteritis = Mide-bağırsak iltihabı. İlk terimini çözdün.'
  },
  {
    term: 'OSTEOMYELITIS',
    chips: [
      { part: 'OSTEO', meaning: 'KEMİK' },
      { part: 'MYEL', meaning: 'İLİK' },
      { part: 'ITIS', meaning: 'İLTİHAP' }
    ],
    result: 'Osteomyelitis = Kemik iliği iltihabı. "-itis" ekini artık ömür boyu tanırsın.'
  },
  {
    term: 'STERNOCLEIDOMASTOIDEUS',
    chips: [
      { part: 'STERNO', meaning: 'GÖĞÜS KEMİĞİ' },
      { part: 'CLEIDO', meaning: 'KÖPRÜCÜK KEMİĞİ' },
      { part: 'MASTOID', meaning: 'MEME ÇIKINTISI' }
    ],
    result: 'Musculus sternocleidomastoideus: Göğüs kemiği ile köprücük kemiğinden başlayıp kulak arkasındaki çıkıntıya uzanan kas. Adı, tam olarak izlediği yolu anlatıyor.'
  }
];

const PADDLE_PRICE_BASIC = process.env.REACT_APP_PADDLE_PRICE_ID_BASIC;
const PADDLE_PRICE_PRO = process.env.REACT_APP_PADDLE_PRICE_ID_PRO;
const PADDLE_PRICE_LIFETIME = process.env.REACT_APP_PADDLE_PRICE_ID_LIFETIME;

export const Home = () => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState([]);
  const [termCount, setTermCount] = useState(() => getAllTerms().length);
  const [paddlePrices, setPaddlePrices] = useState({});

  const totalMorphemes = PREFIXES.length + ROOTS.length + SUFFIXES.length; // 559 morfem

  // Fetch Paddle localized price previews
  useEffect(() => {
    const fetchPrices = async () => {
      const basicId = PADDLE_PRICE_BASIC || localStorage.getItem('paddle_test_price_basic');
      const proId = PADDLE_PRICE_PRO || localStorage.getItem('paddle_test_price_pro');

      const priceIds = [basicId, proId].filter(Boolean);
      if (priceIds.length > 0) {
        const previews = await getPricePreviews(priceIds);
        setPaddlePrices(previews);
      }
    };
    fetchPrices();
  }, []);

  // Handle Paddle checkout opening
  const handlePaddleCheckout = async (priceId, planName, planKey = 'pro') => {
    const currentUser = auth.currentUser || getUser();
    const customerEmail = currentUser?.email || undefined;

    let targetPriceId = priceId || localStorage.getItem(`paddle_test_price_${planKey}`);

    if (!targetPriceId) {
      const enteredPriceId = window.prompt(
        `Paddle Checkout Test: ${planName} için Price ID giriniz:\n(Örn: pri_01j... Paddle Sandbox panelinizden alabilirsiniz)`,
        ''
      );

      if (!enteredPriceId || !enteredPriceId.trim()) {
        toast.info('Paddle Checkout açmak için geçerli bir Price ID gereklidir.');
        return;
      }

      targetPriceId = enteredPriceId.trim();
      localStorage.setItem(`paddle_test_price_${planKey}`, targetPriceId);
    }

    try {
      toast.loading('Paddle Checkout açılıyor...', { id: 'paddle-loading' });
      await openPaddleCheckout({
        priceId: targetPriceId,
        customerEmail,
        customData: {
          plan: planName,
          userId: currentUser?.uid || currentUser?.email || 'guest'
        }
      });
      toast.dismiss('paddle-loading');
    } catch (err) {
      toast.dismiss('paddle-loading');
      console.error('Checkout error:', err);
      toast.error('Paddle Checkout açılırken hata oluştu.');
    }
  };

  useEffect(() => {
    const fetchTermCount = async () => {
      try {
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Firestore timeout')), 3000);
        });

        const querySnapshot = await Promise.race([
          getDocs(collection(db, 'terms')),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);

        if (querySnapshot && querySnapshot.size > 0) {
          setTermCount(querySnapshot.size);
        }
      } catch (error) {
        console.warn('Using local terms count fallback:', error);
      }
    };

    fetchTermCount();
  }, []);

  const currentRound = DEMO_ROUNDS[currentRoundIndex];
  const isAllRevealed = revealedIndices.length === currentRound.chips.length;
  const isFinalRound = currentRoundIndex === DEMO_ROUNDS.length - 1;

  const handleChipClick = (index) => {
    if (revealedIndices.includes(index)) return;
    setRevealedIndices((prev) => [...prev, index]);
  };

  const handleNextRound = () => {
    if (currentRoundIndex < DEMO_ROUNDS.length - 1) {
      setCurrentRoundIndex((prev) => prev + 1);
      setRevealedIndices([]);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page" id="top">
      <main>
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="wrap">
            <span className="eyebrow">
              <Sparkles className="w-4 h-4 text-primary" />
              Sağlık Bilimleri ve Anatomi İçin
            </span>
            <h1>
              Ezberleme.
              <br />
              <span className="text-primary">Çöz.</span>
            </h1>
            <p className="sub">
              Her Latince tıp terimi 2–3 parçadan oluşur. Parçaları öğren; <strong className="text-foreground font-bold">{termCount}+</strong> terimi ezberlemeden oku, sınavdan 2 hafta sonra da hatırla.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="site-btn-primary"
                onClick={() => scrollToSection('fiyat')}
              >
                Tüm Terimlerin Kilidini Aç
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <Link to="/study" className="site-btn-secondary">
                Sözlüğü İncele
              </Link>
            </div>
            <p className="microline">
              <span>✓ Tek seferlik ödeme</span>
              <span>·</span>
              <span>✓ Abonelik yok</span>
              <span>·</span>
              <span>✓ TR ⟷ EN</span>
            </p>
            <p
              className="down"
              onClick={() => scrollToSection('demo')}
            >
              ↓ Önce kanıt: İlk terimini 20 saniyede çöz.
            </p>
          </div>
        </section>

        {/* ================= DEMO ================= */}
        <section id="demo" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="demo-box" aria-live="polite">
              <p className="demo-progress">
                <span>{currentRoundIndex + 1}</span> / {DEMO_ROUNDS.length}
              </p>
              <p className="demo-term-label">Bu terimi daha önce hiç görmediysen bile çözebilirsin:</p>
              <p className="font-bold text-2xl sm:text-3xl text-foreground mb-2 tracking-tight">
                {currentRound.term}
              </p>
              <div className="chips">
                {currentRound.chips.map((chip, idx) => {
                  const revealed = revealedIndices.includes(idx);
                  return (
                    <button
                      key={chip.part + idx}
                      type="button"
                      className={`chip ${revealed ? 'revealed' : ''}`}
                      onClick={() => handleChipClick(idx)}
                    >
                      {chip.part}
                      <span className="meaning">{chip.meaning}</span>
                    </button>
                  );
                })}
              </div>
              {!isAllRevealed && (
                <p className="demo-hint">Parçalara dokunun, anlamları açılsın.</p>
              )}

              {isAllRevealed && (
                <div className="demo-result">
                  <p>{currentRound.result}</p>
                  {!isFinalRound && (
                    <button
                      className="demo-next"
                      type="button"
                      onClick={handleNextRound}
                    >
                      Sıradaki Terim →
                    </button>
                  )}
                </div>
              )}

              {isAllRevealed && isFinalRound && (
                <div className="demo-final">
                  <p>
                    <strong className="text-foreground">3 terimi ezberlemeden çözdün!</strong> İçeride {termCount}+ terim ve {totalMorphemes}+ morfem seni bekliyor.
                  </p>
                  <button
                    type="button"
                    className="site-btn-primary"
                    onClick={() => scrollToSection('fiyat')}
                  >
                    Tüm Terimlerin Kilidini Aç
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="problem">
          <div className="wrap">
            <span className="eyebrow">Sorun</span>
            <h2>Sınav gecesini hatırlıyor musun?</h2>
            <p>
              Önünde 40 sayfalık kemik listesi. <span className="font-semibold text-foreground">Sustentaculum tali</span>'yi on kez yazdın; on birincide yine deftere bakıyorsun. Sabah sınavda çıkıyor, hatırlıyorsun. İki hafta sonra klinikte aynı terim geçiyor; kafanda tek bir harf bile yok.
            </p>
            <p className="punch">
              Sorun sende değil, yöntemde: Anlamadan ezberlenen terim, kısa süreli hafızada misafirdir.
            </p>
            <p className="wave">
              Dil öğrenmenin oyunlaştırılabileceğini Duolingo kanıtladı. Latince tıp dili neden hâlâ liste ezberi?
            </p>
          </div>
        </section>

        {/* ================= YÖNTEM ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Yöntem</span>
            <h2>Tek mantık: Parçala, anla, birleştir.</h2>
            <div className="steps">
              <div className="step">
                <span className="no">ADIM 1</span>
                <h3>Parçala</h3>
                <p className="ex">KARDİYOMİYOPATİ → CARDIO · MYO · PATHY</p>
                <p>Her terim, morfem adı verilen yapı taşlarına ayrılır.</p>
              </div>
              <div className="step">
                <span className="no">ADIM 2</span>
                <h3>Anla</h3>
                <p className="ex">KALP · KAS · HASTALIK</p>
                <p>Her parçanın tek bir anlamı vardır ve {termCount}+ terimin içinde tekrar eder.</p>
              </div>
              <div className="step">
                <span className="no">ADIM 3</span>
                <h3>Birleştir</h3>
                <p className="ex">= KALP KASI HASTALIĞI</p>
                <p>Terim artık hafızanda. Bir daha listeye bakmana gerek yok.</p>
              </div>
            </div>
            <p className="logic-close">
              {totalMorphemes}+ morfemi öğrendiğinde, daha önce hiç görmediğin terimleri bile rahatlıkla okursun. Ezber sana liste kazandırır; mantık sana tıp dili kazandırır.
            </p>
          </div>
        </section>

        {/* ================= İÇERİK ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">İçeride Ne Var?</span>
            <h2>Sayılarla HealthLexMed</h2>
            <div className="stats">
              <div className="stat">
                <div className="n">{termCount}+</div>
                <div className="l">Terim</div>
              </div>
              <div className="stat">
                <div className="n">{totalMorphemes}+</div>
                <div className="l">Morfem</div>
              </div>
              <div className="stat">
                <div className="n">10</div>
                <div className="l">Kategori</div>
              </div>
              <div className="stat">
                <div className="n">4</div>
                <div className="l">Oyun Modu</div>
              </div>
              <div className="stat">
                <div className="n">2</div>
                <div className="l">Dil (TR·EN)</div>
              </div>
            </div>
            <div className="games">
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3>BİLGİ KARTLARI</h3>
                </div>
                <p>Terimi gör, tahmin et ve kartı çevir. Aktif hatırlama tekniğinin ta kendisi.</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="w-5 h-5 text-primary" />
                  <h3>EŞLEŞTİRME</h3>
                </div>
                <p>Latince terimleri Türkçe anlamlarıyla süreye karşı eşleştir. Kendi rekorunu kır.</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3>QUIZ</h3>
                </div>
                <p>Kategoriye özel dinamik sorular. Her testte çeldiriciler yeniden üretilir.</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3>MORFEM OYUNU</h3>
                </div>
                <p>Ek ve kökleri birleştirerek terimi kur — az önce yukarıda oynadığın oyunun tamamı.</p>
              </div>
            </div>
            <p className="scope-line">
              Kapsam: Kafatasından ayak bileğine kadar kemikler, eklemler ve hareket terimleri — kategori kategori. Üstelik internet bağlantısı olmasa bile çalışır.
            </p>
          </div>
        </section>

        {/* ================= KURUCU ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Kim Yaptı?</span>
            <h2>Bu terimleri ben de ezberledim. Sonra unuttum.</h2>
            <div className="founder-grid">
              <div className="placeholder photo-ph">
                FOTOĞRAF
                <br />
                (4:5 · Yüzün net görünsün)
              </div>
              <div className="founder-text">
                <p>
                  Ben Sıddık. Fizyoterapistim; meslek hayatımda her gün bu terimlerle çalışıyorum — hastalarıma <span className="font-semibold text-foreground">sternocleidomastoideus</span> kasını anlatırken kimse ezber sormuyor.
                </p>
                <p>
                  Öğrenciyken bu terimi sınav için defalarca ezberledim, defalarca unuttum. Aklımda kaldığı gün, bir hocamın terimi tahtada parçalayarak yazdığı gündü: <span className="font-semibold text-primary">sterno · cleido · mastoid</span>. Göğüs kemiği, köprücük kemiği ve kulak arkasındaki çıkıntı. Kasın adı, tam olarak izlediği yolu anlatıyordu. O gün ezberlemeyi bıraktım.
                </p>
                <p>
                  HealthLexMed'i, klinikte ve meslek hayatımda her gün kullandığım bu mantığı sağlık bilimleri öğrencilerine kazandırmak için geliştirdim. İçindeki her terim tek tek elimden geçti.
                </p>
                <p className="founder-sign">— Sıddık, Fizyoterapist · HealthLexMed'in Kurucusu</p>
              </div>
            </div>
            <div className="placeholder video-ph">
              60 SANİYELİK TANITIM VİDEOSU
              <br />
              (Yüzünü göster + ekran kaydıyla ürünü gez — samimi geliştirici anlatımı)
            </div>
          </div>
        </section>

        {/* ================= YORUMLAR ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Kullananlar</span>
            <h2>Öğrenciler Ne Diyor?</h2>
            <p className="editor-note">
              TASLAK — Yayına almadan önce bu 3 yorumu gerçek beta kullanıcı yorumlarıyla değiştirip bu notu kaldırabilirsiniz.
            </p>
            <div className="quotes">
              <div className="quote">
                <p>"Eşleştirme oyununda kendi rekorumu kovalarken farkında olmadan 60 terim öğrenmişim."</p>
                <p className="who">F. — Fizyoterapi, 2. Sınıf</p>
              </div>
              <div className="quote">
                <p>"Anki'de deste hazırlamaktan çalışmaya vakit kalmıyordu. Burada doğrudan açıp çalışmaya başlıyorum."</p>
                <p className="who">M. — Tıp, 1. Sınıf</p>
              </div>
              <div className="quote">
                <p>"Morfem oyunundan sonra hoca spotta ne sorsa parçalayıp hemen çözüyorum."</p>
                <p className="who">Z. — Hemşirelik, 1. Sınıf</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= KARŞILAŞTIRMA ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Alternatifler</span>
            <h2>Neden Anki ya da Quizlet Değil?</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Özellik</th>
                    <th>HealthLexMed</th>
                    <th>
                      Genel Kart Uygulamaları
                      <br />
                      (Anki, Quizlet)
                    </th>
                    <th>PDF & Ders Notları</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Terimleri köklerine ayıran motor</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>Tıp içeriği hazır yüklü</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>Türkçe ⟷ Latince çift dil desteği</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>Tıbba özel 4 farklı oyun modu</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>İnternetsiz çalışabilme</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td>Ödeme Modeli</td>
                    <td>
                      <span className="font-semibold text-primary">Tek seferlik</span>
                    </td>
                    <td>
                      <span className="text-muted-foreground">Abonelik / Saatlerce deste hazırlığı</span>
                    </td>
                    <td>
                      <span className="text-muted-foreground">Ücretsiz (Zaman maliyeti yüksek)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2 hafta sonra hatırlama oranı</td>
                    <td>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                    <td>
                      <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= FİYAT ================= */}
        <section id="fiyat">
          <div className="wrap">
            <span className="eyebrow">Fiyatlandırma</span>
            <h2>Tek seferlik ödeme. Abonelik yok.</h2>
            <p className="price-topline">Aylık ücret yok. Yenileme ücreti yok. Bir kez ödeyin, sınırsız çalışın.</p>

            <div className="tiers">
              {/* Temel Paket */}
              <div className="tier">
                <h3>Temel Paket</h3>
                <div className="price">{paddlePrices[PADDLE_PRICE_BASIC]?.formattedTotal || '$15'}</div>
                <div className="once">tek seferlik</div>
                <ul>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>Anatomi çekirdeği: Kemikler, eklemler ve hareket terimleri</span>
                  </li>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>Bilgi kartları ve Quiz modları</span>
                  </li>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>TR ⟷ EN çift dil desteği</span>
                  </li>
                </ul>
                <div className="btn-container">
                  <button
                    type="button"
                    onClick={() => handlePaddleCheckout(PADDLE_PRICE_BASIC, 'Temel Paket', 'basic')}
                    className="site-btn-secondary w-full text-center"
                  >
                    Temel Paketi Aç — {paddlePrices[PADDLE_PRICE_BASIC]?.formattedTotal || '$15'}
                  </button>
                </div>
              </div>

              {/* Tam Paket (Öne Çıkan) */}
              <div className="tier hot">
                <span className="badge">EN ÇOK TERCİH EDİLEN</span>
                <h3 className="text-primary">Tam Paket</h3>
                <div className="price">{paddlePrices[PADDLE_PRICE_PRO]?.formattedTotal || '$20'}</div>
                <div className="once">tek seferlik</div>
                <ul>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>10 kategorinin tamamı + {totalMorphemes}+ morfem kütüphanesi</span>
                  </li>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>4 oyun modunun tamamı (Bilgi Kartları, Eşleştirme, Quiz, Morfem Oyunu)</span>
                  </li>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>İlerleme istatistikleri ve seviye sistemi</span>
                  </li>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>TR ⟷ EN çift dil desteği</span>
                  </li>
                  <li>
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>Gelecek tüm yeni modüller ve güncellemeler dahil</span>
                  </li>
                </ul>
                <div className="btn-container">
                  <button
                    type="button"
                    onClick={() => handlePaddleCheckout(PADDLE_PRICE_PRO, 'Tam Paket', 'pro')}
                    className="site-btn-primary w-full text-center"
                  >
                    Tam Paketi Aç — {paddlePrices[PADDLE_PRICE_PRO]?.formattedTotal || '$20'}
                  </button>
                </div>
              </div>
            </div>

            <div className="after-price">
              <p className="flow-line">Ödemenizi yapın → Hesabınız açılsın → 2 dakika içinde ilk kategorinizde çalışmaya başlayın.</p>
              <p className="expensive-line">
                Evet, ücretsiz alternatiflerden farklı olarak bir bedeli var. Ancak ezberleyip unutmak zaman kaybettirir; bir kez öğrenip ömür boyu hatırlamak {paddlePrices[PADDLE_PRICE_PRO]?.formattedTotal || '$20'}.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="lp-footer">
        <div className="wrap">
          <p className="giant-term">STERNO · CLEIDO · MASTOIDEUS</p>
          <div className="giant-meanings">
            <span>sterno = Göğüs kemiği</span>
            <span>cleido = Köprücük kemiği</span>
            <span>mastoid = Kulak arkasındaki çıkıntı</span>
          </div>
          <p className="footer-punch">
            Bu sayfaya girmeden önce bu terimi anlamlandıramıyor olabilirdiniz. Şimdi bir arkadaşınıza gönderin — bakalım o çözebilecek mi?
          </p>
          <button
            type="button"
            className="site-btn-primary"
            onClick={() => scrollToSection('fiyat')}
          >
            Tüm Terimlerin Kilidini Aç
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <div className="footer-meta">
            <span>HealthLexMed — Latince tıp terimlerini kök mantığıyla ve oyunlaştırarak öğreten eğitim platformu.</span>
            <span>© 2026 HealthLexMed · healthlexmed.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};