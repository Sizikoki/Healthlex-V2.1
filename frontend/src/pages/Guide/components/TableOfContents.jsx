import React, { useState, useEffect } from 'react';
import { MorphemeBadge } from './MorphemeBadge';

const SECTIONS = [
  { id: 's1', num: '1', title: 'Tıbbi terminoloji nedir?' },
  { id: 's2', num: '2', title: 'Bir terimin yapısı' },
  { id: 's3', num: '3', title: 'Adım adım çözümleme' },
  { id: 's4', num: '4', title: 'Harflerin okunuşu' },
  { id: 's5', num: '5', title: 'Tekil ve çoğul' },
  { id: 's6', num: '6', title: 'Eş anlamlı kökler' },
  { id: 's7', num: '7', title: 'Sık yapılan hatalar' },
  { id: 's8', num: '8', title: 'Nasıl çalışılır?' },
];

export const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('s1');

  useEffect(() => {
    const handleScroll = () => {
      // Find current section in view
      const scrollPosition = window.scrollY + 160;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <aside className="sticky top-[104px] flex flex-col gap-[28px] w-[240px] shrink-0">
      <nav aria-label="İçindekiler" className="flex flex-col gap-[2px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#5b6b82] px-[12px] pb-[10px]">
          İçindekiler
        </span>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => handleNavClick(e, sec.id)}
              className={`flex gap-[12px] items-baseline px-[12px] py-[9px] rounded-[10px] text-[15px] leading-[1.35] transition-colors ${
                isActive
                  ? 'bg-[#e8efff] text-[#0f1b33] font-extrabold'
                  : 'text-[#475569] font-semibold hover:bg-[#f1f5f9] hover:text-[#0f1b33]'
              }`}
            >
              <span className="font-['Lora',serif] font-bold text-[15px] leading-none text-[#1d4ed8]">
                {sec.num}
              </span>
              <span>{sec.title}</span>
            </a>
          );
        })}
      </nav>

      {/* Renk Kodu Kartı */}
      <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[18px] flex flex-col gap-[12px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#5b6b82]">
          Renk kodu
        </span>
        <div className="flex items-center gap-[10px]">
          <MorphemeBadge text="epi-" type="prefix" />
          <span className="font-semibold text-[14px] text-[#475569]">Ön ek</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <MorphemeBadge text="cardi/o" type="root" />
          <span className="font-semibold text-[14px] text-[#475569]">Kök</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <MorphemeBadge text="-itis" type="suffix" />
          <span className="font-semibold text-[14px] text-[#475569]">Son ek</span>
        </div>
        <p className="m-0 mt-[4px] font-normal text-[13px] leading-[1.5] text-[#5b6b82]">
          Renkli parçalara tıklayınca o morfemin sayfası açılır.
        </p>
      </div>
    </aside>
  );
};
