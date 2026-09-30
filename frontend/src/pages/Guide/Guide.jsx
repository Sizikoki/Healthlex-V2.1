import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Info } from 'lucide-react';
import { GuideHeader } from './components/GuideHeader';
import { TableOfContents } from './components/TableOfContents';
import { Section1Intro } from './sections/Section1Intro';
import { Section2Structure } from './sections/Section2Structure';
import { Section3Steps } from './sections/Section3Steps';
import { Section4Pronunciation } from './sections/Section4Pronunciation';
import { Section5Plurals } from './sections/Section5Plurals';
import { Section6Synonyms } from './sections/Section6Synonyms';
import { Section7CommonMistakes } from './sections/Section7CommonMistakes';
import { Section8HowToStudy } from './sections/Section8HowToStudy';
import { RightSidebar } from './components/RightSidebar';
import { MobileTableOfContents } from './components/MobileTableOfContents';

import { updateCanonicalUrl } from '@/utils/seo';

export const Guide = () => {
  const { currentLanguage } = useLanguage();
  const isEn = currentLanguage === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tıbbi Terminoloji Rehberi | HealthLexMed';

    const desc = 'Tıbbi terimleri ezberlemeden, parçalayarak öğren: ön ek, kök ve son ek çözümlemesi, Latince okunuş kuralları, çoğul kuralları ve çalışma yöntemleri.';
    const canonicalUrl = 'https://www.healthlexmed.com/rehber';

    const setMeta = (selector, attrKey, attrVal, content) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attrKey, attrVal);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    setMeta('meta[name="description"]', 'name', 'description', desc);
    setMeta('meta[property="og:title"]', 'property', 'og:title', 'Tıbbi Terminoloji Rehberi | HealthLexMed');
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', 'Tıbbi Terminoloji Rehberi | HealthLexMed');
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl);

    // Robots meta: ensure normal indexing
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Canonical link
    updateCanonicalUrl(canonicalUrl);

    // Structured Data (JSON-LD: Article & BreadcrumbList)
    const jsonLdData = {
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
          "description": desc,
          "inLanguage": "tr",
          "mainEntityOfPage": canonicalUrl,
          "url": canonicalUrl,
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
              "item": canonicalUrl
            }
          ]
        }
      ]
    };

    let script = document.getElementById('guide-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'guide-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(jsonLdData);

    return () => {
      const el = document.getElementById('guide-jsonld');
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, []);

  return (
    <div className="bg-[#f5f7fb] text-[#0f1b33] font-['Nunito',sans-serif] min-h-screen">
      {/* İngilizce Bilgilendirme Bandı */}
      {isEn && (
        <div className="bg-[#eff6ff] border-b border-[#bfdbfe] text-[#1e40af] px-4 py-2.5 text-center text-[14px] font-medium flex items-center justify-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-[#2563eb]" />
          <span>This guide is currently available in Turkish only.</span>
        </div>
      )}

      {/* Başlık Bölümü */}
      <GuideHeader />

      {/* Mobil ve Tablet Yapışkan İçindekiler Çubuğu (< 1120px) */}
      <MobileTableOfContents />

      {/* Ana İçerik: Sol İçindekiler + Orta Bölümler + Sağ Yardımcı Sütun */}
      <main className="px-[16px] sm:px-[24px] desktop:px-[40px] wide:px-0 pt-[32px] desktop:pt-[56px] pb-0 flex justify-center">
        <div className="w-full max-w-[720px] desktop:max-w-none desktop:w-[1024px] wide:w-[1352px] flex flex-col desktop:grid desktop:grid-cols-[240px_720px] wide:grid-cols-[240px_760px_240px] desktop:gap-[64px] wide:gap-[56px] items-start">
          {/* Sol Sabit İçindekiler (>= 1120px) */}
          <TableOfContents />

          {/* Orta Makale Bölümleri 1 - 8 */}
          <article className="flex flex-col gap-[56px] desktop:gap-[88px] pb-[96px] w-full desktop:w-[720px] wide:w-[760px]">
            <Section1Intro />
            <Section2Structure />
            <Section3Steps />
            <Section4Pronunciation />
            <Section5Plurals />
            <Section6Synonyms />
            <Section7CommonMistakes />
            <Section8HowToStudy />
          </article>

          {/* Sağ Yardımcı Sütun (1440px ve üzerinde görünür) */}
          <RightSidebar />
        </div>
      </main>
    </div>
  );
};
