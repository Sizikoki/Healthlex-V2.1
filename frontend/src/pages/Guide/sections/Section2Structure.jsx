import React from 'react';
import { MorphemeBadge } from '../components/MorphemeBadge';

export const Section2Structure = () => {
  return (
    <section id="s2" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 2
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[36px] leading-[1.15] text-[#0f1b33]">
          Bir terimin yapısı
        </h2>
      </div>

      <p className="m-0 font-normal text-[17px] leading-[1.75] text-[#334155]">
        Bir tıbbi terim, anlamı meydana getiren farklı işlevlerdeki parçaların birleşmesiyle oluşur. Terim çözümlemeyi öğrenmek için önce bu dört yapı taşını tanımalısın.
      </p>

      <div className="grid grid-cols-2 gap-[14px]">
        {/* Kök */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[22px] flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-[17px] text-[#0f1b33]">Kök</span>
            <span className="font-extrabold text-[12px] uppercase tracking-[0.14em] text-[#1e40af]">
              Word root
            </span>
          </div>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Terimin ana gövdesi ve anlam merkezi. Genellikle bir organı, dokuyu veya sistemi temsil eder.
          </span>
          <div className="flex gap-[8px] flex-wrap items-center">
            <MorphemeBadge text="cardi/o" type="root" />
            <span className="font-semibold text-[14px] leading-[1.9] text-[#475569]">kalp</span>
            <MorphemeBadge text="gastr/o" type="root" />
            <span className="font-semibold text-[14px] leading-[1.9] text-[#475569]">mide</span>
          </div>
        </div>

        {/* Ön ek */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[22px] flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-[17px] text-[#0f1b33]">Ön ek</span>
            <span className="font-extrabold text-[12px] uppercase tracking-[0.14em] text-[#166534]">
              Prefix
            </span>
          </div>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Kökün önüne gelir; yer, yön, sayı, zaman, boyut veya olumsuzluk katar.
          </span>
          <div className="flex gap-[6px] flex-wrap items-center">
            <MorphemeBadge text="epi-" type="prefix" />
            <span className="font-semibold text-[14px] text-[#475569]">+</span>
            <MorphemeBadge text="derm/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">→</span>
            <span className="font-['Lora',serif] italic font-semibold text-[16px] text-[#0f1b33]">
              epidermis
            </span>
          </div>
        </div>

        {/* Son ek */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[22px] flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-[17px] text-[#0f1b33]">Son ek</span>
            <span className="font-extrabold text-[12px] uppercase tracking-[0.14em] text-[#9a3f07]">
              Suffix
            </span>
          </div>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Kökün sonuna gelir; bir hastalığı, işlemi ya da terimin türünü belirler.
          </span>
          <div className="flex gap-[6px] flex-wrap items-center">
            <MorphemeBadge text="arthr/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">+</span>
            <MorphemeBadge text="-itis" type="suffix" />
            <span className="font-semibold text-[14px] text-[#475569]">→</span>
            <span className="font-['Lora',serif] italic font-semibold text-[16px] text-[#0f1b33]">
              arthritis
            </span>
            <span className="font-semibold text-[13px] text-[#5b6b82]">(artrit)</span>
          </div>
        </div>

        {/* Bağlayıcı ünlü */}
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[22px] flex flex-col gap-[10px]">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-[17px] text-[#0f1b33]">Bağlayıcı ünlü</span>
            <span className="font-extrabold text-[12px] uppercase tracking-[0.14em] text-[#475569]">
              Combining vowel
            </span>
          </div>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Parçaları birleştirirken telaffuzu kolaylaştırır. Neredeyse her zaman <b>o</b> harfidir.
          </span>
          <div className="flex gap-[6px] flex-wrap items-center">
            <span className="font-['Lora',serif] font-bold text-[15px] text-[#0f1b33]">
              gastr
              <span className="bg-[#fff3c4] px-[3px] rounded-[4px]">o</span>
              enter
              <span className="bg-[#fff3c4] px-[3px] rounded-[4px]">o</span>
              logy
            </span>
          </div>
        </div>
      </div>

      <h3 className="m-0 mt-[10px] font-extrabold text-[19px] leading-[1.35] text-[#0f1b33]">
        Bağlayıcı ünlünün istisnaları
      </h3>

      <p className="m-0 font-normal text-[17px] leading-[1.75] text-[#334155]">
        Kural olarak bağlayıcı ünlü &quot;o&quot; olsa da bazı köklerde farklı bir harf karşına çıkar: safra anlamına gelen <MorphemeBadge text="chol/e" type="root" /> kökünde <b>e</b>, pelvis anlamına gelen <MorphemeBadge text="pelv/i" type="root" /> kökünde ise <b>i</b> kullanılır.
      </p>

      <h3 className="m-0 mt-[10px] font-extrabold text-[19px] leading-[1.35] text-[#0f1b33]">
        Farklı kombinasyonlar
      </h3>

      <p className="m-0 font-normal text-[17px] leading-[1.75] text-[#334155]">
        Her terimde dört parçanın birden bulunması gerekmez.
      </p>

      <div className="bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden">
        {/* Satır 1 */}
        <div className="grid grid-cols-[170px_1fr_1fr] p-[16px_20px] gap-[16px] items-center border-b border-[#eef1f6]">
          <span className="font-bold text-[14px] text-[#5b6b82]">Kök + son ek</span>
          <div className="flex gap-[6px]">
            <MorphemeBadge text="neur/o" type="root" />
            <MorphemeBadge text="-logy" type="suffix" />
          </div>
          <span>
            <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">neurology</span>{' '}
            <span className="font-semibold text-[14px] text-[#5b6b82]">· nöroloji</span>
          </span>
        </div>

        {/* Satır 2 */}
        <div className="grid grid-cols-[170px_1fr_1fr] p-[16px_20px] gap-[16px] items-center border-b border-[#eef1f6]">
          <span className="font-bold text-[14px] text-[#5b6b82]">Ön ek + son ek</span>
          <div className="flex gap-[6px]">
            <MorphemeBadge text="endo-" type="prefix" />
            <MorphemeBadge text="-scope" type="suffix" />
          </div>
          <span>
            <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">endoscope</span>{' '}
            <span className="font-semibold text-[14px] text-[#5b6b82]">· endoskop</span>
          </span>
        </div>

        {/* Satır 3 */}
        <div className="grid grid-cols-[170px_1fr_1fr] p-[16px_20px] gap-[16px] items-center">
          <span className="font-bold text-[14px] text-[#5b6b82]">Birden fazla kök</span>
          <div className="flex gap-[6px]">
            <MorphemeBadge text="cardi/o" type="root" />
            <MorphemeBadge text="my/o" type="root" />
            <MorphemeBadge text="-pathy" type="suffix" />
          </div>
          <span>
            <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">cardiomyopathy</span>{' '}
            <span className="font-semibold text-[14px] text-[#5b6b82]">· kardiyomiyopati</span>
          </span>
        </div>
      </div>
    </section>
  );
};
