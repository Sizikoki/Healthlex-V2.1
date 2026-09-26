import React, { useState, useEffect } from 'react';
import { ColorCodeCard } from './ColorCodeCard';

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

export const MobileTableOfContents = () => {
  const [activeSection, setActiveSection] = useState('s1');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 80px Navbar + ~72px Mobile TOC bar + 50px buffer = 202px
      const scrollPosition = window.scrollY + 210;

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

  const handleSectionClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 165; // accounts for 80px Navbar + 72px Mobile TOC bar
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  const currentSec = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <div className="block desktop:hidden sticky top-[80px] z-40 bg-[#f5f7fb] border-b border-[#e3e8f1] px-[16px] sm:px-[24px] py-[12px]">
      <div className="max-w-[720px] mx-auto">
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full min-h-[48px] bg-white border border-[#d5dce8] rounded-[12px] px-[16px] py-[10px] flex items-center justify-between text-[#0f1b33] shadow-sm hover:border-[#b0c0d8] transition-colors"
        >
          <span className="flex items-center gap-[10px] text-left truncate mr-2">
            <span className="font-extrabold text-[11px] leading-none uppercase tracking-[0.14em] text-[#5b6b82] shrink-0">
              İçindekiler
            </span>
            <span className="font-bold text-[15px] truncate">
              {currentSec.num} · {currentSec.title}
            </span>
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Açılan Menü */}
        {isOpen && (
          <div className="mt-[10px] bg-white border border-[#e3e8f1] rounded-[16px] p-[16px] shadow-xl flex flex-col gap-[14px] max-h-[calc(100vh-170px)] overflow-y-auto">
            <nav aria-label="Mobil İçindekiler" className="flex flex-col gap-[2px]">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSectionClick(sec.id)}
                    className={`flex items-baseline gap-[12px] px-[12px] py-[10px] rounded-[10px] text-[15px] leading-[1.35] text-left transition-colors ${
                      isActive
                        ? 'bg-[#e8efff] text-[#0f1b33] font-extrabold'
                        : 'text-[#475569] font-semibold hover:bg-[#f1f5f9] hover:text-[#0f1b33]'
                    }`}
                  >
                    <span className="font-['Lora',serif] font-bold text-[15px] leading-none text-[#1d4ed8]">
                      {sec.num}
                    </span>
                    <span>{sec.title}</span>
                  </button>
                );
              })}
            </nav>

            <div className="h-[1px] bg-[#eef1f6]" />

            <ColorCodeCard />
          </div>
        )}
      </div>
    </div>
  );
};
