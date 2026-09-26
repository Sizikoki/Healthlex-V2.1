import React from 'react';
import { MorphemeBadge } from '../components/MorphemeBadge';

const SYNONYM_ROOTS = [
  {
    organ: 'Böbrek',
    latin: {
      badge: 'ren/o',
      example: 'renal',
      desc: 'böbrekle ilgili',
    },
    greek: {
      badges: ['nephr/o'],
      example: 'nephritis',
      desc: 'nefrit',
    },
  },
  {
    organ: 'Deri',
    latin: {
      badge: 'cutane/o',
      example: 'subcutaneous',
      desc: 'subkutan',
    },
    greek: {
      badges: ['derm/o', 'dermat/o'],
      example: 'dermatology',
      desc: 'dermatoloji',
    },
  },
  {
    organ: 'Ağız',
    latin: {
      badge: 'or/o',
      example: 'oral',
      desc: 'ağızla ilgili',
    },
    greek: {
      badges: ['stomat/o'],
      example: 'stomatitis',
      desc: 'stomatit',
    },
  },
  {
    organ: 'Akciğer',
    latin: {
      badge: 'pulmon/o',
      example: 'pulmonary',
      desc: 'pulmoner',
    },
    greek: {
      badges: ['pneumon/o'],
      example: 'pneumonia',
      desc: 'pnömoni',
    },
  },
];

export const Section6Synonyms = () => {
  return (
    <section id="s6" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 6
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[26px] sm:text-[32px] desktop:text-[36px] leading-[1.18] desktop:leading-[1.15] text-[#0f1b33]">
          Eş anlamlı kökler ve eşadlılık
        </h2>
      </div>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Aynı organ için iki farklı kök görmen şaşırtıcı gelebilir. Genel eğilim şudur: anatomik tanımlarda Latince, hastalık ve cerrahi tanımlarında Grekçe kök. Ama bu katı bir kural değildir. Böbrek yetmezliğinde Latince kökten gelen{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">renal</span> kullanılır; derinin bir katmanı olan{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">dermis</span> ise Grekçe kökten gelir.
      </p>

      {/* Masaüstü ve Tablet 3 Sütunlu Tablo (>= 640px) */}
      <div className="hidden sm:block bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden">
        {/* Tablo Başlığı */}
        <div className="grid grid-cols-[130px_1fr_1fr] p-[14px_20px] bg-[#f8fafc] border-b border-[#e3e8f1]">
          <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#475569]">
            Organ
          </span>
          <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#475569]">
            Latince kök
          </span>
          <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#475569]">
            Grekçe kök
          </span>
        </div>

        {/* 4 Organ Satırı */}
        {SYNONYM_ROOTS.map((item, idx) => {
          const isLast = idx === SYNONYM_ROOTS.length - 1;
          const borderClass = isLast ? '' : 'border-b border-[#eef1f6]';

          return (
            <div
              key={item.organ}
              className={`grid grid-cols-[130px_1fr_1fr] p-[18px_20px] gap-[12px] items-start ${borderClass}`}
            >
              <span className="font-extrabold text-[16px] text-[#0f1b33]">
                {item.organ}
              </span>

              {/* Latince Kolonu */}
              <div className="flex flex-col gap-[6px] items-start">
                <MorphemeBadge text={item.latin.badge} type="root" />
                <span className="font-normal text-[14px] text-[#475569]">
                  <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                    {item.latin.example}
                  </span>
                  , {item.latin.desc}
                </span>
              </div>

              {/* Grekçe Kolonu */}
              <div className="flex flex-col gap-[6px] items-start">
                <div className="flex gap-[6px]">
                  {item.greek.badges.map((b) => (
                    <MorphemeBadge key={b} text={b} type="root" />
                  ))}
                </div>
                <span className="font-normal text-[14px] text-[#475569]">
                  <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                    {item.greek.example}
                  </span>
                  , {item.greek.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobil Organ Kutuları (< 640px) */}
      <div className="block sm:hidden bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden">
        {SYNONYM_ROOTS.map((item, idx) => {
          const isLast = idx === SYNONYM_ROOTS.length - 1;
          const borderClass = isLast ? '' : 'border-b border-[#eef1f6]';

          return (
            <div key={item.organ} className={`p-[16px] flex flex-col gap-[10px] ${borderClass}`}>
              <span className="font-extrabold text-[16px] text-[#0f1b33]">
                {item.organ}
              </span>
              <div className="grid grid-cols-2 gap-[10px]">
                {/* Latince */}
                <div className="flex flex-col gap-[6px] items-start">
                  <span className="font-extrabold text-[11px] leading-none uppercase tracking-[0.14em] text-[#5b6b82]">
                    Latince
                  </span>
                  <MorphemeBadge text={item.latin.badge} type="root" />
                  <span className="font-semibold text-[14px] text-[#475569]">
                    <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                      {item.latin.example}
                    </span>
                  </span>
                </div>
                {/* Grekçe */}
                <div className="flex flex-col gap-[6px] items-start">
                  <span className="font-extrabold text-[11px] leading-none uppercase tracking-[0.14em] text-[#5b6b82]">
                    Grekçe
                  </span>
                  <div className="flex gap-[4px] flex-wrap">
                    {item.greek.badges.map((b) => (
                      <MorphemeBadge key={b} text={b} type="root" />
                    ))}
                  </div>
                  <span className="font-semibold text-[14px] text-[#475569]">
                    <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                      {item.greek.example}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="m-0 mt-[10px] font-extrabold text-[18px] sm:text-[19px] leading-[1.35] text-[#0f1b33]">
        Aynı kök, iki farklı anlam
      </h3>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Bazı kökler aynı yazılıp tamamen farklı yapıları anlatır. Buna eşadlılık denir. Hangi anlamın kastedildiğini terimin diğer parçalarından ve bağlamdan anlarsın.
      </p>

      {/* 2 Eşadlılık Kartı */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
        {/* scler/o */}
        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[22px] flex flex-col gap-[12px] sm:gap-[14px]">
          <MorphemeBadge
            text="scler/o"
            type="root"
            className="self-start text-[16px]"
          />
          <div className="flex flex-col gap-[4px]">
            <span className="font-extrabold text-[15px] text-[#0f1b33]">
              1. Sert, sertleşme
            </span>
            <span className="font-normal text-[15px] leading-[1.5] text-[#475569]">
              <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                arteriosclerosis
              </span>
              , damar sertliği
            </span>
          </div>
          <div className="h-[1px] bg-[#eef1f6]" />
          <div className="flex flex-col gap-[4px]">
            <span className="font-extrabold text-[15px] text-[#0f1b33]">
              2. Gözün beyaz tabakası
            </span>
            <span className="font-normal text-[15px] leading-[1.5] text-[#475569]">
              <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                scleritis
              </span>
              , sklera iltihabı
            </span>
          </div>
        </div>

        {/* myel/o */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[22px] flex flex-col gap-[14px]">
          <MorphemeBadge
            text="myel/o"
            type="root"
            className="self-start text-[16px]"
          />
          <div className="flex flex-col gap-[4px]">
            <span className="font-extrabold text-[15px] text-[#0f1b33]">
              1. Kemik iliği
            </span>
            <span className="font-normal text-[15px] leading-[1.5] text-[#475569]">
              <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                myelocyte
              </span>
              , genç ilik hücresi
            </span>
          </div>
          <div className="h-[1px] bg-[#eef1f6]" />
          <div className="flex flex-col gap-[4px]">
            <span className="font-extrabold text-[15px] text-[#0f1b33]">
              2. Omurilik
            </span>
            <span className="font-normal text-[15px] leading-[1.5] text-[#475569]">
              <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                poliomyelitis
              </span>
              , çocuk felci
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
