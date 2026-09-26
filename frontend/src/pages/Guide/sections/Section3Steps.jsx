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
        <h2 className="m-0 font-['Lora',serif] font-bold text-[36px] leading-[1.15] text-[#0f1b33]">
          Bir terim adım adım nasıl çözülür?
        </h2>
      </div>

      <p className="m-0 font-normal text-[17px] leading-[1.75] text-[#334155]">
        Uzun bir terimi soldan sağa okumak seni yanıltabilir. Altın kural: kelimeyi <b>sondan başa doğru</b> çözümle.
      </p>

      {/* 3 Adım Kartları */}
      <div className="grid grid-cols-3 gap-[14px]">
        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[10px]">
          <span className="w-[36px] height-[36px] h-[36px] rounded-[10px] bg-[#fdf1e3] text-[#9a3f07] font-['Lora',serif] font-bold text-[18px] flex items-center justify-center">
            1
          </span>
          <span className="font-extrabold text-[16px] text-[#0f1b33]">Son ekten başla</span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Son ek, terimin hastalık mı, işlem mi, bilim dalı mı olduğunu söyler.
          </span>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[10px]">
          <span className="w-[36px] height-[36px] h-[36px] rounded-[10px] bg-[#e7f6ec] text-[#166534] font-['Lora',serif] font-bold text-[18px] flex items-center justify-center">
            2
          </span>
          <span className="font-extrabold text-[16px] text-[#0f1b33]">Başa dön</span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Ön eki veya ilk kökü incele: yer, yön, sayı ya da etkilenen yapı.
          </span>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[20px] flex flex-col gap-[10px]">
          <span className="w-[36px] height-[36px] h-[36px] rounded-[10px] bg-[#e8efff] text-[#1e40af] font-['Lora',serif] font-bold text-[18px] flex items-center justify-center">
            3
          </span>
          <span className="font-extrabold text-[16px] text-[#0f1b33]">Ortayı birleştir</span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Ortada kalan kökleri sırayla okuyarak anlamı tamamla.
          </span>
        </div>
      </div>

      <h3 className="m-0 mt-[10px] font-extrabold text-[19px] leading-[1.35] text-[#0f1b33]">
        Uygulamalı örnekler
      </h3>

      {/* Örnek 1: gastroenteritis */}
      <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[26px] flex flex-col gap-[16px]">
        <div className="flex items-baseline gap-[12px]">
          <span className="font-['Lora',serif] italic font-semibold text-[26px] text-[#0f1b33]">
            gastroenteritis
          </span>
          <span className="font-semibold text-[15px] text-[#5b6b82]">Türkçede gastroenterit</span>
        </div>
        <div className="flex gap-[10px] items-center flex-wrap">
          <MorphemeBadge text="-itis" type="suffix" />
          <span className="font-semibold text-[15px] text-[#475569]">iltihap</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="gastr/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">mide</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="enter/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">ince bağırsak</span>
        </div>
        <p className="m-0 font-normal text-[16px] leading-[1.75] text-[#0f1b33]">
          <b>Mide ve ince bağırsağın iltihabı.</b>
        </p>
      </div>

      {/* Örnek 2: osteoarthritis */}
      <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[26px] flex flex-col gap-[16px]">
        <div className="flex items-baseline gap-[12px]">
          <span className="font-['Lora',serif] italic font-semibold text-[26px] text-[#0f1b33]">
            osteoarthritis
          </span>
          <span className="font-semibold text-[15px] text-[#5b6b82]">Türkçede osteoartrit</span>
        </div>
        <div className="flex gap-[10px] items-center flex-wrap">
          <MorphemeBadge text="-itis" type="suffix" />
          <span className="font-semibold text-[15px] text-[#475569]">iltihap</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="oste/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">kemik</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="arthr/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">eklem</span>
        </div>
        <p className="m-0 font-normal text-[16px] leading-[1.75] text-[#0f1b33]">
          <b>Kelime anlamıyla:</b> kemik ve eklemin iltihabı.
        </p>
        <CalloutBox type="warning" title="Klinik not">
          Terim &quot;-itis&quot; taşısa da osteoartrit esas olarak eklem kıkırdağının yıpranmasına bağlı dejeneratif bir hastalıktır. Terimin kelime anlamı ile klinik anlamı her zaman örtüşmez. Parçalama yöntemi güçlü bir araçtır ama klinik bilginin yerini tutmaz.
        </CalloutBox>
      </div>

      {/* Örnek 3: electrocardiogram */}
      <div className="bg-white border border-[#e3e8f1] rounded-[16px] p-[26px] flex flex-col gap-[16px]">
        <div className="flex items-baseline gap-[12px]">
          <span className="font-['Lora',serif] italic font-semibold text-[26px] text-[#0f1b33]">
            electrocardiogram
          </span>
          <span className="font-semibold text-[15px] text-[#5b6b82]">Türkçede elektrokardiyogram</span>
        </div>
        <div className="flex gap-[10px] items-center flex-wrap">
          <MorphemeBadge text="-gram" type="suffix" />
          <span className="font-semibold text-[15px] text-[#475569]">kayıt</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="electr/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">elektrik</span>
          <span className="text-[#c2cad8]">·</span>
          <MorphemeBadge text="cardi/o" type="root" />
          <span className="font-semibold text-[15px] text-[#475569]">kalp</span>
        </div>
        <p className="m-0 font-normal text-[16px] leading-[1.75] text-[#0f1b33]">
          <b>Kalbin elektriksel aktivitesinin kaydı.</b>
        </p>
      </div>
    </section>
  );
};
