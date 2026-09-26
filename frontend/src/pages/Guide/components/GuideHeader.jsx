import React from 'react';
import { Link } from 'react-router-dom';
import { MorphemeBadge } from './MorphemeBadge';

export const GuideHeader = () => {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const isMobile = window.innerWidth < 1120;
      const topOffset = isMobile ? 165 : 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white border-b border-[#e3e8f1] px-[16px] sm:px-[24px] desktop:px-[40px] wide:px-0 pt-[28px] sm:pt-[44px] desktop:pt-[64px] pb-[24px] sm:pb-[40px] desktop:pb-[56px] flex justify-center">
      <div className="w-full max-w-[720px] desktop:max-w-none desktop:w-[1024px] wide:w-[1352px] flex flex-col desktop:grid desktop:grid-cols-[1fr_400px] wide:grid-cols-[240px_1fr_440px] gap-[20px] sm:gap-[32px] desktop:gap-[64px] wide:gap-[56px] items-center">
        {/* Geniş ekranda ilk sütun boş (sol içindekiler hizası: 240px) */}
        <div className="hidden wide:block" />

        {/* Metin ve Butonlar (Orta sütun hizası) */}
        <div className="w-full flex flex-col gap-[14px] sm:gap-[20px]">
          <div className="flex gap-[8px] sm:gap-[10px] items-center font-semibold text-[13px] sm:text-[14px] text-[#5b6b82]">
            <Link to="/" className="text-[#5b6b82] hover:text-[#0f1b33] transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-[#0f1b33]">Rehber</span>
          </div>

          <span className="font-extrabold text-[11px] sm:text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
            Başlangıç rehberi · 8 bölüm
          </span>

          <h1 className="m-0 font-['Lora',serif] font-bold text-[32px] sm:text-[44px] desktop:text-[54px] leading-[1.12] desktop:leading-[1.08] text-[#0f1b33] tracking-[-0.01em]">
            Tıbbi Terminoloji Rehberi
          </h1>

          <p className="m-0 font-normal text-[16px] sm:text-[18px] desktop:text-[19px] leading-[1.7] sm:leading-[1.75] text-[#475569] max-w-[560px]">
            Tıbbi terimleri tek tek ezberlemek yerine parçalayarak çözmeyi öğren. Bu rehber terim çözümleme mantığını, Latince ve Yunanca köken ilişkilerini, okunuş ve yazım kurallarını ve verimli çalışma yöntemlerini bir arada anlatıyor.
          </p>

          {/* Masaüstü ve Tablet Butonları (sm ve üzerinde metnin hemen altında) */}
          <div className="hidden sm:flex gap-[12px] mt-[4px]">
            <a
              href="#s1"
              onClick={(e) => scrollTo(e, 's1')}
              className="bg-[#0f1b33] text-white font-extrabold text-[15px] px-[22px] py-[14px] rounded-[11px] hover:bg-[#1b2d52] transition-colors shadow-sm"
            >
              Okumaya başla
            </a>
            <a
              href="#s4"
              onClick={(e) => scrollTo(e, 's4')}
              className="bg-white text-[#0f1b33] font-extrabold text-[15px] px-[21px] py-[13px] rounded-[11px] border border-[#d5dce8] hover:bg-[#f8fafc] transition-colors"
            >
              Okunuş tablosuna git
            </a>
          </div>
        </div>

        {/* Sağ Kolon / Mobil Kartı: Bir Terimi Parçala */}
        <div className="w-full desktop:w-auto bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[28px] flex flex-col gap-[12px] sm:gap-[18px] shadow-[0_1px_2px_rgba(15,27,51,0.05),0_12px_32px_rgba(15,27,51,0.07)] wide:w-[440px]">
          <span className="font-extrabold text-[11px] sm:text-[12px] leading-none uppercase tracking-[0.14em] text-[#5b6b82]">
            Bir terimi parçala
          </span>

          <div className="font-['Lora',serif] italic font-bold text-[22px] sm:text-[28px] desktop:text-[30px] leading-[1.2] text-[#0f1b33]">
            gastroenteritis
          </div>

          <div className="grid grid-cols-3 gap-[6px] sm:gap-[8px]">
            <div className="flex flex-col gap-[6px] sm:gap-[8px] items-start">
              <MorphemeBadge text="gastr/o" type="root" />
              <span className="font-semibold text-[13px] sm:text-[14px] leading-[1.3] text-[#475569]">
                mide
              </span>
            </div>
            <div className="flex flex-col gap-[6px] sm:gap-[8px] items-start">
              <MorphemeBadge text="enter/o" type="root" />
              <span className="font-semibold text-[13px] sm:text-[14px] leading-[1.3] text-[#475569]">
                ince bağırsak
              </span>
            </div>
            <div className="flex flex-col gap-[6px] sm:gap-[8px] items-start">
              <MorphemeBadge text="-itis" type="suffix" />
              <span className="font-semibold text-[13px] sm:text-[14px] leading-[1.3] text-[#475569]">
                iltihap
              </span>
            </div>
          </div>

          <div className="h-[1px] bg-[#eef1f6]" />

          <p className="m-0 font-normal text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] text-[#0f1b33]">
            <b>Mide ve ince bağırsağın iltihabı.</b> Türkçede gastroenterit.
          </p>
        </div>

        {/* SADECE TELEFONDA (< sm): Kartın altında tek, tam genişlikte Okumaya başla düğmesi */}
        <a
          href="#s1"
          onClick={(e) => scrollTo(e, 's1')}
          className="flex sm:hidden w-full min-h-[48px] items-center justify-center bg-[#0f1b33] text-white font-extrabold text-[15px] rounded-[11px] hover:bg-[#1b2d52] transition-colors shadow-sm"
        >
          Okumaya başla
        </a>
      </div>
    </section>
  );
};
