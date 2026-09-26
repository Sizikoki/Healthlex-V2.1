import React from 'react';
import { MorphemeBadge } from '../components/MorphemeBadge';
import { CalloutBox } from '../components/CalloutBox';

export const Section3Steps = () => {
  return (
    <section id="s3" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 3
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[26px] sm:text-[32px] desktop:text-[36px] leading-[1.18] desktop:leading-[1.15] text-[#0f1b33]">
          Bir terim adım adım nasıl çözülür?
        </h2>
      </div>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Uzun bir terimi soldan sağa okumak seni yanıltabilir. Altın kural: kelimeyi <b>sondan başa doğru</b> çözümle.
      </p>

      {/* 3 Adım Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 desktop:grid-cols-3 gap-[14px]">
        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[16px] sm:p-[20px] flex flex-row sm:flex-col items-start gap-[14px] sm:gap-[10px]">
          <span className="w-[34px] sm:w-[36px] h-[34px] sm:h-[36px] shrink-0 rounded-[10px] bg-[#fdf1e3] text-[#9a3f07] font-['Lora',serif] font-bold text-[17px] sm:text-[18px] flex items-center justify-center">
            1
          </span>
          <div className="flex flex-col gap-[4px] sm:gap-0">
            <span className="font-extrabold text-[16px] text-[#0f1b33]">Son ekten başla</span>
            <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
              Son ek, terimin hastalık mı, işlem mi, bilim dalı mı olduğunu söyler.
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[16px] sm:p-[20px] flex flex-row sm:flex-col items-start gap-[14px] sm:gap-[10px]">
          <span className="w-[34px] sm:w-[36px] h-[34px] sm:h-[36px] shrink-0 rounded-[10px] bg-[#e7f6ec] text-[#166534] font-['Lora',serif] font-bold text-[17px] sm:text-[18px] flex items-center justify-center">
            2
          </span>
          <div className="flex flex-col gap-[4px] sm:gap-0">
            <span className="font-extrabold text-[16px] text-[#0f1b33]">Başa dön</span>
            <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
              Ön eki veya ilk kökü incele: yer, yön, sayı ya da etkilenen yapı.
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[16px] sm:p-[20px] flex flex-row sm:flex-col items-start gap-[14px] sm:gap-[10px]">
          <span className="w-[34px] sm:w-[36px] h-[34px] sm:h-[36px] shrink-0 rounded-[10px] bg-[#e8efff] text-[#1e40af] font-['Lora',serif] font-bold text-[17px] sm:text-[18px] flex items-center justify-center">
            3
          </span>
          <div className="flex flex-col gap-[4px] sm:gap-0">
            <span className="font-extrabold text-[16px] text-[#0f1b33]">Ortayı birleştir</span>
            <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
              Ortada kalan kökleri sırayla okuyarak anlamı tamamla.
            </span>
          </div>
        </div>
      </div>

      <h3 className="m-0 mt-[10px] font-extrabold text-[18px] sm:text-[19px] leading-[1.35] text-[#0f1b33]">
        Uygulamalı örnekler
      </h3>

      {/* Örnek 1: gastroenteritis */}
      <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[26px] flex flex-col gap-[14px] sm:gap-[16px]">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-[4px] sm:gap-[12px]">
          <span className="font-['Lora',serif] italic font-semibold text-[22px] sm:text-[26px] text-[#0f1b33]">
            gastroenteritis
          </span>
          <span className="font-semibold text-[14px] sm:text-[15px] text-[#5b6b82]">Türkçede gastroenterit</span>
        </div>

        {/* Masaüstü ve Tablet Yatay Morfem Sırası */}
        <div className="hidden sm:flex gap-[10px] items-center flex-wrap">
          <MorphemeBadge text="-itis" type="suffix" />
          <span className="font-semibold text-[15px] text-[#475569]">iltihap</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="gastr/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">mide</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="enter/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">ince bağırsak</span>
        </div>

        {/* Mobil Dikey 1, 2, 3 Morfem Sırası */}
        <div className="flex sm:hidden flex-col gap-[8px]">
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#9a3f07]">1</span>
            <MorphemeBadge text="-itis" type="suffix" />
            <span className="font-semibold text-[14px] text-[#475569]">iltihap</span>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#166534]">2</span>
            <MorphemeBadge text="gastr/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">mide</span>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#1e40af]">3</span>
            <MorphemeBadge text="enter/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">ince bağırsak</span>
          </div>
        </div>

        <p className="m-0 font-normal text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] text-[#0f1b33]">
          <b>Mide ve ince bağırsağın iltihabı.</b>
        </p>
      </div>

      {/* Örnek 2: osteoarthritis */}
      <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[26px] flex flex-col gap-[14px] sm:gap-[16px]">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-[4px] sm:gap-[12px]">
          <span className="font-['Lora',serif] italic font-semibold text-[22px] sm:text-[26px] text-[#0f1b33]">
            osteoarthritis
          </span>
          <span className="font-semibold text-[14px] sm:text-[15px] text-[#5b6b82]">Türkçede osteoartrit</span>
        </div>

        {/* Masaüstü ve Tablet Yatay Morfem Sırası */}
        <div className="hidden sm:flex gap-[10px] items-center flex-wrap">
          <MorphemeBadge text="-itis" type="suffix" />
          <span className="font-semibold text-[15px] text-[#475569]">iltihap</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="oste/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">kemik</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="arthr/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">eklem</span>
        </div>

        {/* Mobil Dikey 1, 2, 3 Morfem Sırası */}
        <div className="flex sm:hidden flex-col gap-[8px]">
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#9a3f07]">1</span>
            <MorphemeBadge text="-itis" type="suffix" />
            <span className="font-semibold text-[14px] text-[#475569]">iltihap</span>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#166534]">2</span>
            <MorphemeBadge text="oste/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">kemik</span>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#1e40af]">3</span>
            <MorphemeBadge text="arthr/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">eklem</span>
          </div>
        </div>

        <p className="m-0 font-normal text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] text-[#0f1b33]">
          <b>Kelime anlamıyla:</b> kemik ve eklemin iltihabı.
        </p>
        <CalloutBox type="warning" title="Klinik not">
          Terim &quot;-itis&quot; taşısa da osteoartrit esas olarak eklem kıkırdağının yıpranmasına bağlı dejeneratif bir hastalıktır. Terimin kelime anlamı ile klinik anlamı her zaman örtüşmez. Parçalama yöntemi güçlü bir araçtır ama klinik bilginin yerini tutmaz.
        </CalloutBox>
      </div>

      {/* Örnek 3: electrocardiogram */}
      <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[26px] flex flex-col gap-[14px] sm:gap-[16px]">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-[4px] sm:gap-[12px]">
          <span className="font-['Lora',serif] italic font-semibold text-[22px] sm:text-[26px] text-[#0f1b33]">
            electrocardiogram
          </span>
          <span className="font-semibold text-[14px] sm:text-[15px] text-[#5b6b82]">Türkçede elektrokardiyogram</span>
        </div>

        {/* Masaüstü ve Tablet Yatay Morfem Sırası */}
        <div className="hidden sm:flex gap-[10px] items-center flex-wrap">
          <MorphemeBadge text="-gram" type="suffix" />
          <span className="font-semibold text-[15px] text-[#475569]">kayıt</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="electr/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">elektrik</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="cardi/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">kalp</span>
        </div>

        {/* Mobil Dikey 1, 2, 3 Morfem Sırası */}
        <div className="flex sm:hidden flex-col gap-[8px]">
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#9a3f07]">1</span>
            <MorphemeBadge text="-gram" type="suffix" />
            <span className="font-semibold text-[14px] text-[#475569]">kayıt</span>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#166534]">2</span>
            <MorphemeBadge text="electr/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">elektrik</span>
          </div>
          <div className="flex gap-[10px] items-center">
            <span className="w-[20px] font-['Lora',serif] font-bold text-[14px] text-[#1e40af]">3</span>
            <MorphemeBadge text="cardi/o" type="root" />
            <span className="font-semibold text-[14px] text-[#475569]">kalp</span>
          </div>
        </div>

        <p className="m-0 font-normal text-[15px] sm:text-[16px] leading-[1.7] sm:leading-[1.75] text-[#0f1b33]">
          <b>Kalbin elektriksel aktivitesinin kaydı.</b>
        </p>
      </div>
    </section>
  );
};
