import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const DEMO_ROUNDS = [
  {
    term: 'GASTROENTERITIS',
    chips: [
      { part: 'GASTRO', meaning: 'MİDE' },
      { part: 'ENTER', meaning: 'BAĞIRSAK' },
      { part: 'ITIS', meaning: 'İLTİHAP' }
    ],
    result: 'Gastroenteritis = mide–bağırsak iltihabı. İlk terimini çözdün.'
  },
  {
    term: 'OSTEOMYELITIS',
    chips: [
      { part: 'OSTEO', meaning: 'KEMİK' },
      { part: 'MYEL', meaning: 'İLİK' },
      { part: 'ITIS', meaning: 'İLTİHAP' }
    ],
    result: 'Osteomyelitis = kemik iliği iltihabı. "itis" ekini artık ömür boyu tanırsın.'
  },
  {
    term: 'STERNOCLEIDOMASTOIDEUS',
    chips: [
      { part: 'STERNO', meaning: 'GÖĞÜS KEMİĞİ' },
      { part: 'CLEIDO', meaning: 'KÖPRÜCÜK KEMİĞİ' },
      { part: 'MASTOID', meaning: 'MEME ÇIKINTISI' }
    ],
    result: 'Musculus sternocleidomastoideus: göğüs kemiği ile köprücükten başlayıp kulak arkasındaki çıkıntıya uzanan kas. Adı, yolunu anlatıyor.'
  }
];

export const Home = () => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState([]);

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
            <h1>
              Ezberleme.
              <br />
              Çöz.
            </h1>
            <p className="sub">
              Her Latince tıp terimi 2–3 parçadan oluşur. Parçaları öğren; <span className="mono">600+</span> terimi ezberlemeden oku, sınavdan 2 hafta sonra da hatırla.
            </p>
            <button
              type="button"
              className="btn"
              onClick={() => scrollToSection('fiyat')}
            >
              Tüm Terimlerin Kilidini Aç
            </button>
            <p className="microline">Tek seferlik ödeme · Abonelik yok · TR ⟷ EN</p>
            <p
              className="down"
              onClick={() => scrollToSection('demo')}
            >
              ↓ Önce kanıt: ilk terimini 20 saniyede çöz.
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
              <p className="mono" style={{ fontWeight: 700, fontSize: 'clamp(1.3rem,3.2vw,1.9rem)', marginBottom: '6px' }}>
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
                <p className="demo-hint">Parçalara dokun, anlamları açılsın.</p>
              )}

              {isAllRevealed && (
                <div className="demo-result show">
                  <p>{currentRound.result}</p>
                  {!isFinalRound && (
                    <button
                      className="demo-next"
                      type="button"
                      onClick={handleNextRound}
                    >
                      Sıradaki terim →
                    </button>
                  )}
                </div>
              )}

              {isAllRevealed && isFinalRound && (
                <div className="demo-final show">
                  <p>
                    <strong>3 terim çözdün — ezberlemeden.</strong> İçeride 600+ terim ve 200+ morfem seni bekliyor.
                  </p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => scrollToSection('fiyat')}
                  >
                    Tüm Terimlerin Kilidini Aç
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
              Önünde 40 sayfalık kemik listesi. <span className="mono">Sustentaculum tali</span>'yi on kez yazdın; on birincide yine deftere bakıyorsun. Sabah sınavda çıkıyor, hatırlıyorsun. İki hafta sonra klinikte aynı terim geçiyor — kafanda tek harf yok.
            </p>
            <p className="punch">
              Sorun sende değil, yöntemde: anlamadan ezberlenen terim, kısa süreli hafızada misafirdir.
            </p>
            <p className="wave">
              Dil öğrenmenin oyunlaşabildiğini Duolingo kanıtladı. Latince tıp dili neden hâlâ liste ezberi?
            </p>
          </div>
        </section>

        {/* ================= YÖNTEM ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Yöntem</span>
            <h2>Tek mantık: parçala, anla, birleştir.</h2>
            <div className="steps">
              <div className="step">
                <span className="no">ADIM 1</span>
                <h3>Parçala</h3>
                <p className="ex">KARDİYOMİYOPATİ → CARDIO · MYO · PATHY</p>
                <p>Her terim, morfem denen yapı taşlarına ayrılır.</p>
              </div>
              <div className="step">
                <span className="no">ADIM 2</span>
                <h3>Anla</h3>
                <p className="ex">KALP · KAS · HASTALIK</p>
                <p>Her parçanın tek bir anlamı vardır ve 600+ terimin içinde tekrar eder.</p>
              </div>
              <div className="step">
                <span className="no">ADIM 3</span>
                <h3>Birleştir</h3>
                <p className="ex">= KALP KASI HASTALIĞI</p>
                <p>Terim artık senin. Bir daha bakmana gerek yok.</p>
              </div>
            </div>
            <p className="logic-close">
              200+ morfemi öğrendiğinde, daha önce hiç görmediğin terimleri de okursun. Ezber sana liste kazandırır; mantık sana dil kazandırır.
            </p>
          </div>
        </section>

        {/* ================= İÇERİK ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">İçeride ne var</span>
            <h2>Sayılarla Healthlex</h2>
            <div className="stats">
              <div className="stat">
                <div className="n">600+</div>
                <div className="l">Terim</div>
              </div>
              <div className="stat">
                <div className="n">200+</div>
                <div className="l">Morfem</div>
              </div>
              <div className="stat">
                <div className="n">7</div>
                <div className="l">Kategori</div>
              </div>
              <div className="stat">
                <div className="n">4</div>
                <div className="l">Oyun modu</div>
              </div>
              <div className="stat">
                <div className="n">2</div>
                <div className="l">Dil (TR·EN)</div>
              </div>
            </div>
            <div className="games">
              <div className="game">
                <h3>BİLGİ KARTLARI</h3>
                <p>Terimi gör, tahmin et, kartı çevir. Aktif hatırlama tekniğinin ta kendisi.</p>
              </div>
              <div className="game">
                <h3>EŞLEŞTİRME</h3>
                <p>Latince terimleri Türkçe anlamlarıyla süreye karşı eşleştir. Kendi rekorunu kovala.</p>
              </div>
              <div className="game">
                <h3>QUIZ</h3>
                <p>Kategoriye özel dinamik sorular. Her testte çeldiriciler yeniden üretilir.</p>
              </div>
              <div className="game">
                <h3>MORFEM OYUNU</h3>
                <p>Ek ve kökleri birleştirerek terimi kur — az önce bu sayfada oynadığın oyunun tamamı.</p>
              </div>
            </div>
            <p className="scope-line">
              Kapsam: kafatasından ayak bileğine — kemikler, eklemler ve hareket terimleri, kategori kategori. İnternet koptuğunda bile çalışır.
            </p>
          </div>
        </section>

        {/* ================= KURUCU ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Kim yaptı</span>
            <h2>Bu terimleri ben de ezberledim. Sonra unuttum.</h2>
            <div className="founder-grid">
              <div className="placeholder photo-ph">
                FOTOĞRAFIN
                <br />
                (4:5 · yüzün net görünsün)
              </div>
              <div className="founder-text">
                <p>
                  Ben Sıddık. Fizyoterapistim; İstanbul'daki kliniğimde her gün bu terimlerle çalışıyorum — hastalarıma <span className="mono">sternocleidomastoideus</span>'u anlatırken kimse ezber sormuyor.
                </p>
                <p>
                  Öğrenciyken bu terimi sınav için defalarca ezberledim, defalarca unuttum. Aklımda kalan gün, bir hocamın terimi tahtada parçalayarak yazdığı gündü: <span className="mono">sterno · cleido · mastoid</span>. Göğüs kemiği, köprücük, kulak arkasındaki çıkıntı. Kasın adı, kasın yolunu anlatıyordu. O gün ezberlemeyi bıraktım.
                </p>
                <p>
                  Healthlex'i, klinikte her gün kullandığım bu mantığı sağlık bilimleri öğrencilerine taşımak için tek başıma yazdım. İçindeki her terim tek tek elimden geçti.
                </p>
                <p className="founder-sign">— Sıddık, fizyoterapist · Healthlex'in kurucusu</p>
              </div>
            </div>
            <div className="placeholder video-ph">
              60 SANİYELİK VİDEON
              <br />
              (yüzünü göster + ekran kaydıyla ürünü gez — kurumsal tanıtım videosu değil)
            </div>
          </div>
        </section>

        {/* ================= YORUMLAR ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Kullananlar</span>
            <h2>Öğrenciler ne diyor?</h2>
            <p className="editor-note">
              TASLAK — yayına almadan önce bu 3 yorumu gerçek beta kullanıcı yorumlarıyla değiştir, sonra bu notu sil.
            </p>
            <div className="quotes">
              <div className="quote">
                <p>"Eşleştirme oyununda kendi rekorumu kovalarken farkında olmadan 60 terim öğrenmişim."</p>
                <p className="who">F. — Fizyoterapi, 2. sınıf</p>
              </div>
              <div className="quote">
                <p>"Anki'de deste hazırlamaktan çalışmaya vakit kalmıyordu. Burada açıp başlıyorum."</p>
                <p className="who">M. — Tıp, 1. sınıf</p>
              </div>
              <div className="quote">
                <p>"Morfem oyunundan sonra hoca spotta ne sorsa parçalayıp çözüyorum."</p>
                <p className="who">Z. — Hemşirelik, 1. sınıf</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= KARŞILAŞTIRMA ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Alternatifler</span>
            <h2>Neden Anki ya da Quizlet değil?</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Healthlex</th>
                    <th>
                      Genel kart uygulamaları
                      <br />
                      (Anki, Quizlet)
                    </th>
                    <th>PDF & ders notu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Terimleri köklerine ayıran motor</td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tıp içeriği hazır yüklü</td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Türkçe ⟷ Latince çift dil</td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Tıbba özel 4 oyun modu</td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                  </tr>
                  <tr>
                    <td>İnternetsiz çalışır</td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ödeme</td>
                    <td>
                      <span className="alt">Tek sefer</span>
                    </td>
                    <td>
                      <span className="alt">Abonelik / saatlerce deste hazırlığı</span>
                    </td>
                    <td>
                      <span className="alt">Ücretsiz</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2 hafta sonra hatırlıyor musun?</td>
                    <td>
                      <span className="yes">✓</span>
                    </td>
                    <td>
                      <span className="no">—</span>
                    </td>
                    <td>
                      <span className="no">—</span>
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
            <span className="eyebrow">Fiyat</span>
            <h2>Tek seferlik ödeme. Abonelik yok.</h2>
            <p className="price-topline">Aylık ücret yok. Yenileme yok. Bir kez öde, çalışmaya başla.</p>

            <div className="tiers">
              <div className="tier">
                <h3>Temel</h3>
                <div className="price">₺399</div>
                <div className="once">tek seferlik</div>
                <ul>
                  <li>Anatomi çekirdeği: kemikler + eklemler + hareket terimleri</li>
                  <li>Bilgi kartları + Quiz</li>
                  <li>TR ⟷ EN çift dil</li>
                </ul>
                <Link to="/register" className="btn">
                  Temel'i Aç — ₺399
                </Link>
              </div>

              <div className="tier hot">
                <span className="badge">EN ÇOK SEÇİLEN</span>
                <h3>Tam Erişim</h3>
                <div className="price">₺649</div>
                <div className="once">tek seferlik</div>
                <ul>
                  <li>7 kategorinin tamamı + 200+ morfem kütüphanesi</li>
                  <li>4 oyun modunun hepsi</li>
                  <li>İlerleme istatistikleri ve seviye sistemi</li>
                  <li>TR ⟷ EN çift dil</li>
                </ul>
                <Link to="/register" className="btn">
                  Tam Erişimi Aç — ₺649
                </Link>
              </div>

              <div className="tier">
                <h3>Tam Erişim + Gelecek</h3>
                <div className="price">₺999</div>
                <div className="once">tek seferlik</div>
                <ul>
                  <li>Tam Erişim'deki her şey</li>
                  <li>Eklenecek her yeni modül ömür boyu dahil (kaslar, sinirler, klinik terimler)</li>
                  <li>Yeni içeriklere ilk gün erişim</li>
                </ul>
                <Link to="/register" className="btn">
                  Ömür Boyu Aç — ₺999
                </Link>
              </div>
            </div>

            <div className="after-price">
              <p className="flow-line">Ödemeni yap → hesabın açılır → 2 dakika sonra ilk kategorindesin.</p>
              <p className="expensive-line">
                Evet, ücretsiz alternatiflerden pahalıyız. Ezberleyip unutmak bedava; bir daha unutmamak ₺649.
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
            <span>sterno = göğüs kemiği</span>
            <span>cleido = köprücük kemiği</span>
            <span>mastoid = kulak arkasındaki çıkıntı</span>
          </div>
          <p className="footer-punch">
            Bu sayfaya girmeden önce bunu okuyamıyordun. Şimdi bir arkadaşına gönder — bakalım o okuyabilecek mi?
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => scrollToSection('fiyat')}
          >
            Tüm Terimlerin Kilidini Aç
          </button>
          <div className="footer-meta">
            <span>Healthlex — Latince tıp terimlerini kök mantığıyla ve oyunla öğreten platform.</span>
            <span>© 2026 Healthlex · healthlexmed.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};