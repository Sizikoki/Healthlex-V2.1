import React, { useEffect } from 'react';
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

export const Guide = () => {
  // Temporary security: set <meta name="robots" content="noindex">
  useEffect(() => {
    document.title = 'Tıbbi Terminoloji Rehberi | HealthLexMed';

    let meta = document.querySelector('meta[name="robots"]');
    let created = false;
    let originalContent = '';

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
      created = true;
    } else {
      originalContent = meta.getAttribute('content') || '';
    }

    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (created && meta.parentNode) {
        meta.parentNode.removeChild(meta);
      } else if (meta) {
        meta.setAttribute('content', originalContent || 'index, follow');
      }
    };
  }, []);

  return (
    <div className="bg-[#f5f7fb] text-[#0f1b33] font-['Nunito',sans-serif] min-h-screen">
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
