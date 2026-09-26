import React from 'react';

export const Section1Intro = () => {
  return (
    <section id="s1" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 1
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[26px] sm:text-[32px] desktop:text-[36px] leading-[1.18] desktop:leading-[1.15] text-[#0f1b33]">
          Tıbbi terminoloji nedir, neden Latince ve Yunanca?
        </h2>
      </div>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Tıbbi terminoloji; tıp, hemşirelik, fizyoterapi ve sağlık meslek yüksekokullarında öğrenim gördüğün süreçte ve meslek hayatın boyunca sağlık profesyonelleriyle eksiksiz, net ve nesnel bir şekilde iletişim kurmanı sağlayan özel bir bilimsel dildir.
      </p>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Günlük dilde kullandığın kelimeler bağlama göre farklı anlamlar kazanabilirken, tıbbi bir terim kişiden kişiye veya kurumdan kuruma değişmeyen tek ve kesin bir anlama sahiptir.
      </p>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Sağlık bilimleri eğitimine yeni başladığında bu dil sana ilk bakışta karmaşık görünebilir. Ama tıbbi terimler sonu gelmez bir ezber listesi değil, belirli kurallarla birleştirilmiş birer yapbozdur. Terimleri yapı taşlarına ayırıp çözümlediğinde, daha önce hiç karşılaşmadığın bir hastalığın veya tanı yönteminin anlamını tek bakışta çıkarabilirsin.
      </p>

      <h3 className="m-0 mt-[10px] font-extrabold text-[18px] sm:text-[19px] leading-[1.35] text-[#0f1b33]">
        Neden Latince ve Yunanca?
      </h3>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Günümüz tıp dilinin temelleri Antik Yunan ve Roma uygarlıklarına, Hipokrat ve Galen gibi hekimlerin tıp literatürüne kazandırdığı kavramlara dayanır. Bu dilin günümüze kadar korunmasının üç temel sebebi var:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 desktop:grid-cols-3 gap-[14px]">
        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[20px] flex flex-col gap-[6px] sm:gap-[8px]">
          <span className="font-extrabold text-[16px] leading-[1.3] text-[#0f1b33]">
            Değişmeyen bir dil
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Latince hiçbir ülkenin günlük dili olmadığından anlam kaymasına uğramaz, bölgesel farklılıklardan etkilenmez.
          </span>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[20px] flex flex-col gap-[6px] sm:gap-[8px]">
          <span className="font-extrabold text-[16px] leading-[1.3] text-[#0f1b33]">
            Uluslararası standart
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Anatomi terimleri <b>Terminologia Anatomica</b> adlı resmi standartla belirlenir. Dünyanın her yerinde aynı yapıyı ifade eder.
          </span>
        </div>

        <div className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[20px] flex flex-col gap-[6px] sm:gap-[8px]">
          <span className="font-extrabold text-[16px] leading-[1.3] text-[#0f1b33]">
            Görev paylaşımı
          </span>
          <span className="font-normal text-[15px] leading-[1.6] text-[#475569]">
            Anatomik yapılarda ağırlıklı olarak Latince, hastalık ve cerrahi terimlerinde Grekçe kökler kullanılır.
          </span>
        </div>
      </div>
    </section>
  );
};
