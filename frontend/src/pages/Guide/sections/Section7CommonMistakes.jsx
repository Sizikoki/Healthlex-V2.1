import React from 'react';
import { MorphemeBadge } from '../components/MorphemeBadge';
import { CalloutBox } from '../components/CalloutBox';

export const Section7CommonMistakes = () => {
  return (
    <section id="s7" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 7
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[26px] sm:text-[32px] desktop:text-[36px] leading-[1.18] desktop:leading-[1.15] text-[#0f1b33]">
          Sık yapılan hatalar
        </h2>
      </div>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Tıp dilinde küçük bir harf değişikliği bile farklı bir yapıyı işaret edebilir. Hatalar genellikle üç alanda toplanır.
      </p>

      {/* 1. Yazım ve okunuş */}
      <h3 className="m-0 font-extrabold text-[18px] sm:text-[19px] leading-[1.35] text-[#0f1b33]">
        Yazım ve okunuş
      </h3>

      <div className="bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden">
        {/* Satır 1: longutidinal / longitudinal */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 border-b border-[#eef1f6]">
          <div className="p-[14px_16px] sm:p-[16px_20px] flex gap-[10px] items-center border-b sm:border-b-0 sm:border-r border-[#eef1f6]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9a3f07"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-label="Yanlış"
              className="shrink-0"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="font-semibold text-[16px] text-[#7c4a1c] line-through">
              longutidinal
            </span>
          </div>

          <div className="p-[14px_16px] sm:p-[16px_20px] flex gap-[10px] items-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e40af"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Doğru"
              className="shrink-0"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="font-bold text-[16px] text-[#0f1b33]">
              longitudinal
            </span>
          </div>
        </div>

        {/* Satır 2: obstriksiyon / obstrüksiyon */}
        <div className="flex flex-col sm:grid sm:grid-cols-2">
          <div className="p-[14px_16px] sm:p-[16px_20px] flex gap-[10px] items-center border-b sm:border-b-0 sm:border-r border-[#eef1f6]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9a3f07"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-label="Yanlış"
              className="shrink-0"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="font-semibold text-[16px] text-[#7c4a1c] line-through">
              obstriksiyon
            </span>
          </div>

          <div className="p-[14px_16px] sm:p-[16px_20px] flex gap-[10px] items-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e40af"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Doğru"
              className="shrink-0"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="font-bold text-[16px] text-[#0f1b33]">
              obstrüksiyon
            </span>
          </div>
        </div>
      </div>

      {/* 2. Anlam ve kullanım */}
      <h3 className="m-0 mt-[10px] font-extrabold text-[19px] leading-[1.35] text-[#0f1b33]">
        Anlam ve kullanım
      </h3>

      <div className="flex flex-col gap-[12px]">
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[6px]">
          <span className="font-extrabold text-[16px] text-[#0f1b33]">
            Yerleşik Türkçe karşılığı varken yabancı terimi aktarmak
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Türkçe anatomik adı <b>orta serebral arter</b> olan yapıyı &quot;midılserebral arter&quot; diye söylemek veya yazmak.
          </span>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[6px]">
          <span className="font-extrabold text-[16px] text-[#0f1b33]">
            Aynı metinde terim değiştirmek
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Bir raporda aynı bölge için sırayla &quot;karın&quot;, Arapça kökenli &quot;batın&quot; ve Latince{' '}
            <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">abdomen</span>{' '}
            kullanmak metnin tutarlılığını bozar.
          </span>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[6px]">
          <span className="font-extrabold text-[16px] text-[#0f1b33]">
            Niteleyici ön ekleri karıştırmak
          </span>
          <div className="font-normal text-[15px] leading-[1.6] text-[#475569] flex gap-[6px] items-center flex-wrap">
            <span>Azlık belirten</span>
            <MorphemeBadge text="hypo-" type="prefix" />
            <span>ile küçüklük belirten</span>
            <MorphemeBadge text="micro-" type="prefix" />
            <span>birbirinin yerine kullanılamaz.</span>
          </div>
        </div>
      </div>

      {/* 3. Kısaltmalar */}
      <h3 className="m-0 mt-[10px] font-extrabold text-[19px] leading-[1.35] text-[#0f1b33]">
        Kısaltmalar
      </h3>

      <CalloutBox type="warning" title="Hasta güvenliği">
        Aynı kısaltma bağlama göre farklı anlamlara gelebilir. <b>Ca</b> bir metinde karsinom, bir laboratuvar raporunda kalsiyum demektir. Belirsiz kısaltmalar hasta güvenliği açısından risk taşır.
      </CalloutBox>
    </section>
  );
};
