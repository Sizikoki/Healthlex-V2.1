import React from 'react';
import { Link } from 'react-router-dom';
import { ColorCodeCard } from './ColorCodeCard';

const QUICK_LINKS = [
  { id: 's4', label: 'Okunuş tablosu' },
  { id: 's5', label: 'Çoğul kuralları' },
  { id: 's6', label: 'Eş anlamlı kökler' },
];

export const RightSidebar = () => {
  const handleScrollTo = (e, id) => {
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
    }
  };

  return (
    <aside className="hidden wide:flex sticky top-[104px] flex-col gap-[20px] w-[240px] shrink-0">
      {/* 1. Renk Kodu Kutusu (1440px ve üzerinde burada gösterilir) */}
      <ColorCodeCard />

      {/* 2. Hızlı Başvuru Kartı */}
      <div className="bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden flex flex-col">
        <div className="p-[14px_18px_10px] font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#5b6b82]">
          Hızlı başvuru
        </div>

        <div className="flex flex-col">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScrollTo(e, link.id)}
              className="min-h-[44px] px-[18px] py-[12px] border-t border-[#eef1f6] flex items-center justify-between hover:bg-[#f8fafc] transition-colors group cursor-pointer"
            >
              <span className="font-semibold text-[14px] text-[#0f1b33] group-hover:text-[#1d4ed8] transition-colors">
                {link.label}
              </span>
              <span className="text-[#5b6b82] group-hover:text-[#1d4ed8] group-hover:translate-x-0.5 transition-all text-[15px] font-bold">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* 3. Koyu Lacivert Morfem Kütüphanesi Kartı */}
      <Link
        to="/morfemler"
        className="bg-[#0f1b33] border border-[#1f2e4d] rounded-[16px] p-[20px] flex flex-col gap-[10px] hover:bg-[#162544] transition-all group shadow-sm cursor-pointer"
      >
        <h4 className="m-0 font-['Lora',serif] font-bold text-[18px] text-white leading-[1.3]">
          Morfem kütüphanesi
        </h4>
        <p className="m-0 font-normal text-[13px] leading-[1.55] text-[#c5d3ea]">
          570&apos;ten fazla ön ek, kök ve son eki örnek çözümlemeleriyle keşfet.
        </p>
        <span className="font-extrabold text-[13px] text-white group-hover:text-blue-300 flex items-center gap-[6px] mt-[4px] transition-colors">
          Göz at →
        </span>
      </Link>
    </aside>
  );
};
