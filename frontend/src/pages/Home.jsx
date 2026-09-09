import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Minus, ArrowRight, BookOpen, Layers, Trophy, Brain, Mail } from 'lucide-react';
import { getAllTerms } from '@/data/medicalTerms';
import { PREFIXES, ROOTS, SUFFIXES } from '@/data/morphemesData';
import { db, auth } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { IS_PAYMENT_ACTIVE } from '@/services/paddle';
import { getUser } from '@/utils/storage';
import { useLanguage } from '@/context/LanguageContext';
import { HOME_CONTENT } from '@/data/homeContent';
import { LiveMorphemeSplitDemo } from '@/components/LiveMorphemeSplitDemo';
import { TermsMarquee } from '@/components/TermsMarquee';
import { MorphemeOfTheDay } from '@/components/MorphemeOfTheDay';
import { HomePricingSection } from '@/components/HomePricingSection';
import './LandingPage.css';

export const Home = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'en' ? 'en' : 'tr';
  const content = HOME_CONTENT[lang] || HOME_CONTENT.tr;

  // ── Auth Redirect (Flash-Free) ─────────────────────────────────────────────
  // onAuthStateChanged tamamlanana kadar hiçbir şey render edilmez (flash önleme).
  // Giriş yapmış kullanıcı /dashboard'a yönlendirilir.
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser || getUser()) {
        // Kullanıcı giriş yapmış → dashboard'a yönlendir
        navigate('/dashboard', { replace: true });
      } else {
        // Kullanıcı giriş yapmamış → landing page'i göster
        setAuthChecked(true);
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  // ────────────────────────────────────────────────────────────────────────────

  const [termCount, setTermCount] = useState(() => getAllTerms().length);
  const totalMorphemes = PREFIXES.length + ROOTS.length + SUFFIXES.length; // 571 morfem

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auth kontrolü tamamlanmadan landing page'i render etme (flash önleme)
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page" id="top">
      <main>
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="wrap !max-w-[1360px] px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-center">
              <div className="lg:col-span-6">
                <h1>
                  {content.hero.title1}
                  <br />
                  <span className="text-primary">{content.hero.title2}</span>
                </h1>
                <p className="sub">
                  {content.hero.sub(termCount)}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="site-btn-primary flex items-center"
                    onClick={() => {
                      if (IS_PAYMENT_ACTIVE) {
                        scrollToSection('fiyat');
                      } else {
                        navigate('/study');
                      }
                    }}
                  >
                    {IS_PAYMENT_ACTIVE
                      ? (content.pricing.btnText || (lang === 'en' ? 'Subscribe Now' : 'Hemen Katıl'))
                      : (lang === 'en' ? 'Explore Dictionary' : 'Sözlüğü Keşfet')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
                <p className="microline">
                  <span>{content.hero.micro1}</span>
                  <span>·</span>
                  <span>{content.hero.micro2}</span>
                </p>
                <p
                  className="down"
                  onClick={() => scrollToSection('demo')}
                >
                  {content.hero.scrollProof}
                </p>
              </div>
              <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
                <MorphemeOfTheDay className="w-full max-w-xl lg:ml-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= DEMO ================= */}
        <section id="demo" className="pt-2 pb-8 sm:pb-12">
          <div className="wrap">
            <LiveMorphemeSplitDemo />
          </div>
        </section>

        {/* ================= KAYAN TERİM ŞERİDİ ================= */}
        <TermsMarquee />

        {/* ================= PROBLEM ================= */}
        <section className="problem">
          <div className="wrap">
            <span className="eyebrow">{content.problem.eyebrow}</span>
            <h2>{content.problem.title}</h2>
            <p>
              {content.problem.p1}
            </p>
            <p className="punch">
              {content.problem.punch}
            </p>
            <p className="wave">
              {content.problem.wave}
            </p>
          </div>
        </section>

        {/* ================= YÖNTEM ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.method.eyebrow}</span>
            <h2>{content.method.title}</h2>
            <div className="steps">
              <div className="step">
                <span className="no">{content.method.step1No}</span>
                <h3>{content.method.step1Title}</h3>
                <p className="ex">{content.method.step1Ex}</p>
                <p>{content.method.step1Desc}</p>
              </div>
              <div className="step">
                <span className="no">{content.method.step2No}</span>
                <h3>{content.method.step2Title}</h3>
                <p className="ex">{content.method.step2Ex}</p>
                <p>{content.method.step2Desc(termCount)}</p>
              </div>
              <div className="step">
                <span className="no">{content.method.step3No}</span>
                <h3>{content.method.step3Title}</h3>
                <p className="ex">{content.method.step3Ex}</p>
                <p>{content.method.step3Desc}</p>
              </div>
            </div>
            <p className="logic-close">
              {content.method.logicClose(totalMorphemes)}
            </p>
          </div>
        </section>

        {/* ================= İÇERİK ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.features.eyebrow}</span>
            <h2>{content.features.title}</h2>
            <div className="stats">
              <div className="stat">
                <div className="n">{termCount}+</div>
                <div className="l">{content.features.terms}</div>
              </div>
              <div className="stat">
                <div className="n">{totalMorphemes}+</div>
                <div className="l">{content.features.morphemes}</div>
              </div>
              <div className="stat">
                <div className="n">10</div>
                <div className="l">{content.features.categories}</div>
              </div>
              <div className="stat">
                <div className="n">4</div>
                <div className="l">{content.features.modes}</div>
              </div>
              <div className="stat">
                <div className="n">2</div>
                <div className="l">{content.features.languages}</div>
              </div>
            </div>
            <div className="games">
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3>{content.features.game1Title}</h3>
                </div>
                <p>{content.features.game1Desc}</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Layers className="w-5 h-5 text-primary" />
                  <h3>{content.features.game2Title}</h3>
                </div>
                <p>{content.features.game2Desc}</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3>{content.features.game3Title}</h3>
                </div>
                <p>{content.features.game3Desc}</p>
              </div>
              <div className="game">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-5 h-5 text-primary" />
                  <h3>{content.features.game4Title}</h3>
                </div>
                <p>{content.features.game4Desc}</p>
              </div>
            </div>
            <p className="scope-line">
              {content.features.scopeLine}
            </p>
          </div>
        </section>

        {/* ================= KURUCU (Şimdilik Gizlendi - İleride Tekrar Açılabilir) ================= */}
        {/* 
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
        */}

        {/* ================= YORUMLAR / FEEDBACK (Gerçek kullanıcı yorumları geldiğinde tekrar açılmak üzere şimdilik gizlendi) ================= */}
        {/* 
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.testimonials.eyebrow}</span>
            <h2>{content.testimonials.title}</h2>
            <div className="quotes">
              <div className="quote">
                <p>{content.testimonials.q1Text}</p>
                <p className="who">{content.testimonials.q1Who}</p>
              </div>
              <div className="quote">
                <p>{content.testimonials.q2Text}</p>
                <p className="who">{content.testimonials.q2Who}</p>
              </div>
              <div className="quote">
                <p>{content.testimonials.q3Text}</p>
                <p className="who">{content.testimonials.q3Who}</p>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* ================= KARŞILAŞTIRMA ================= */}
        <section>
          <div className="wrap">
            <span className="eyebrow">{content.comparison.eyebrow}</span>
            <h2>{content.comparison.title}</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>{content.comparison.thFeature}</th>
                    <th>{content.comparison.thHealthlex}</th>
                    <th>
                      {content.comparison.thCards.split('\n')[0]}
                      <br />
                      {content.comparison.thCards.split('\n')[1]}
                    </th>
                    <th>{content.comparison.thNotes}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{content.comparison.row1}</td>
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
                    <td>{content.comparison.row2}</td>
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
                    <td>{content.comparison.row3}</td>
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
                    <td>{content.comparison.row4}</td>
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
                    <td>{content.comparison.row5}</td>
                    <td>
                      <span className="font-semibold text-primary">{content.comparison.row5ValHealthlex}</span>
                    </td>
                    <td>
                      <span className="text-muted-foreground">{content.comparison.row5ValCards}</span>
                    </td>
                    <td>
                      <span className="text-muted-foreground">{content.comparison.row5ValNotes}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>{content.comparison.row6}</td>
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
        <HomePricingSection />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="lp-footer">
        <div className="wrap">
          <p className="giant-term">{content.footer.term}</p>
          <div className="giant-meanings">
            {content.footer.meanings.map((meaning, idx) => (
              <span key={idx}>{meaning}</span>
            ))}
          </div>
          <p className="footer-punch">{content.footer.punch}</p>
          <button
            type="button"
            className="site-btn-primary"
            onClick={() => {
              if (IS_PAYMENT_ACTIVE) {
                scrollToSection('fiyat');
              } else {
                navigate('/study');
              }
            }}
          >
            {IS_PAYMENT_ACTIVE
              ? content.footer.ctaBtn
              : (lang === 'en' ? 'Explore Dictionary' : 'Sözlüğü Keşfet')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};