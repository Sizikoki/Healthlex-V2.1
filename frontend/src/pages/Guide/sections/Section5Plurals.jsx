import React from 'react';
import { CalloutBox } from '../components/CalloutBox';

const PLURAL_RULES = [
  {
    singular: '-us',
    plural: '-i',
    examples: (
      <>
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">fungus</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">fungi</span>,{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">thrombus</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">thrombi</span>
      </>
    ),
  },
  {
    singular: '-a',
    plural: '-ae',
    examples: (
      <>
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">bursa</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">bursae</span>,{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">fossa</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">fossae</span>{' '}
        <span className="text-[#5b6b82]">(ae, e okunur)</span>
      </>
    ),
  },
  {
    singular: '-um',
    plural: '-a',
    examples: (
      <>
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">ovum</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">ova</span>,{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">atrium</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">atria</span>
      </>
    ),
  },
  {
    singular: '-is',
    plural: '-es',
    examples: (
      <>
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">diagnosis</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">diagnoses</span>,{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">epiphysis</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">epiphyses</span>,{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">canalis</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">canales</span>
      </>
    ),
  },
  {
    singular: '-on',
    plural: '-a',
    examples: (
      <>
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">ganglion</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">ganglia</span>
      </>
    ),
  },
  {
    singular: '-ix, -ex',
    plural: '-ices',
    examples: (
      <>
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">appendix</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">appendices</span>,{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">cortex</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">cortices</span>,{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">apex</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">apices</span>
      </>
    ),
  },
  {
    singular: '-ma',
    plural: '-mata',
    examples: (
      <>
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">condyloma</span> →{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">condylomata</span>
      </>
    ),
  },
];

export const Section5Plurals = () => {
  return (
    <section id="s5" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 5
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[26px] sm:text-[32px] desktop:text-[36px] leading-[1.18] desktop:leading-[1.15] text-[#0f1b33]">
          Tekil ve çoğul kuralları
        </h2>
      </div>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Anatomi terminolojisinde çoğullar Latince ve Grekçe dil bilgisine göre yapılır. Kelimenin sonundaki değişimi tanıdığında, çoğul bir terimi okuduğunda tekilini hemen bulursun.
      </p>

      {/* Masaüstü ve Tablet 3 Sütunlu Çoğul Tablosu (>= 640px) */}
      <div className="hidden sm:block bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-[14px_18px] text-left font-extrabold text-[12px] leading-[1.2] uppercase tracking-[0.08em] text-[#475569] bg-[#f8fafc] border-b border-[#e3e8f1] w-[120px]">
                Tekil
              </th>
              <th className="p-[14px_18px] text-left font-extrabold text-[12px] leading-[1.2] uppercase tracking-[0.08em] text-[#475569] bg-[#f8fafc] border-b border-[#e3e8f1] w-[120px]">
                Çoğul
              </th>
              <th className="p-[14px_18px] text-left font-extrabold text-[12px] leading-[1.2] uppercase tracking-[0.08em] text-[#475569] bg-[#f8fafc] border-b border-[#e3e8f1]">
                Örnekler
              </th>
            </tr>
          </thead>
          <tbody>
            {PLURAL_RULES.map((item, idx) => {
              const isEven = idx % 2 === 1;
              const isLast = idx === PLURAL_RULES.length - 1;
              const borderClass = isLast ? 'border-b-0' : 'border-b border-[#eef1f6]';

              return (
                <tr
                  key={item.singular}
                  className={isEven ? 'bg-[#fbfcfe]' : 'bg-white'}
                >
                  <td
                    className={`p-[14px_18px] align-top font-mono font-extrabold text-[16px] leading-[1.4] text-[#0f1b33] ${borderClass}`}
                  >
                    {item.singular}
                  </td>
                  <td
                    className={`p-[14px_18px] align-top font-mono font-extrabold text-[16px] leading-[1.4] text-[#0f1b33] ${borderClass}`}
                  >
                    {item.plural}
                  </td>
                  <td
                    className={`p-[14px_18px] align-top font-normal text-[15px] leading-[1.55] text-[#334155] ${borderClass}`}
                  >
                    {item.examples}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobil 2 Sütunlu Çoğul Tablosu (< 640px) */}
      <div className="block sm:hidden bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden">
        {PLURAL_RULES.map((item, idx) => {
          const isLast = idx === PLURAL_RULES.length - 1;
          const borderClass = isLast ? '' : 'border-b border-[#eef1f6]';

          return (
            <div
              key={item.singular}
              className={`grid grid-cols-[92px_1fr] gap-[12px] p-[14px_16px] items-start ${borderClass}`}
            >
              <span className="font-mono font-extrabold text-[15px] leading-[1.4] text-[#0f1b33]">
                {item.singular} → {item.plural}
              </span>
              <div className="font-normal text-[15px] leading-[1.6] text-[#475569]">
                {item.examples}
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="m-0 mt-[10px] font-extrabold text-[18px] sm:text-[19px] leading-[1.35] text-[#0f1b33]">
        Anatomide sık geçen düzensiz çoğullar
      </h3>

      {/* 4 Düzensiz Çoğul Kartı */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
        {/* os -> ossa */}
        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[20px] flex flex-col gap-[8px] sm:gap-[10px]">
          <span className="font-['Lora',serif] font-bold text-[19px] sm:text-[20px] text-[#0f1b33]">
            <i>os</i> → <i>ossa</i>
          </span>
          <span className="font-semibold text-[14px] text-[#5b6b82]">
            kemik → kemikler
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#334155]">
            <i>Ossa Cranii</i>, <i>Ossa Manus</i>, <i>Ossa Thoracis</i>
          </span>
        </div>

        {/* foramen -> foramina */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[10px]">
          <span className="font-['Lora',serif] font-bold text-[20px] text-[#0f1b33]">
            <i>foramen</i> → <i>foramina</i>
          </span>
          <span className="font-semibold text-[14px] text-[#5b6b82]">
            delik → delikler
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#334155]">
            <i>Foramina Nasalia</i>: burun kemiğindeki küçük damar ve sinir delikleri.{' '}
            <i>Foramina Palatina Minora</i>: küçük damak delikleri.
          </span>
        </div>

        {/* corpus -> corpora */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[10px]">
          <span className="font-['Lora',serif] font-bold text-[20px] text-[#0f1b33]">
            <i>corpus</i> → <i>corpora</i>
          </span>
          <span className="font-semibold text-[14px] text-[#5b6b82]">
            gövde → gövdeler
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#334155]">
            <i>Corpora Cavernosa</i>
          </span>
        </div>

        {/* caput -> capita */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[10px]">
          <span className="font-['Lora',serif] font-bold text-[20px] text-[#0f1b33]">
            <i>caput</i> → <i>capita</i>
          </span>
          <span className="font-semibold text-[14px] text-[#5b6b82]">
            baş → başlar
          </span>
        </div>
      </div>

      {/* Türkçe metinlerde çoğul bilgi kutusu */}
      <CalloutBox type="info" title="Türkçe metinlerde çoğul">
        Türkçe bir rapor veya ders notu yazarken Latince çoğul eki kullanmak zorunda değilsin.{' '}
        <i>vertebrae</i> yerine <b>vertebralar</b>, <i>thrombi</i> yerine <b>trombüsler</b> yazmak Türk tıp kullanımında tamamen doğrudur.
      </CalloutBox>
    </section>
  );
};
