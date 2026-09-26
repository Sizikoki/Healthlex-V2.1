import React from 'react';
import { CalloutBox } from '../components/CalloutBox';
import { PronunciationTable } from '../components/PronunciationTable';

export const Section4Pronunciation = () => {
  return (
    <section id="s4" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 4
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[36px] leading-[1.15] text-[#0f1b33]">
          Harflerin ve harf gruplarının okunuşu
        </h2>
      </div>

      <p className="m-0 font-normal text-[17px] leading-[1.75] text-[#334155]">
        Bir Latince terimi <b>okumak</b> ile Türkçeye yerleşmiş haliyle <b>yazmak</b> iki ayrı şeydir. Derste terimi uluslararası yazımıyla (<span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">oesophagus</span>) görürsün; Türkçe bir metin yazarken ise Türk tıp dilindeki yazımını (özofagus) kullanırsın.
      </p>

      <CalloutBox type="info" title="İngilizce kaynaklar için not">
        Amerikan kaynaklarında sadeleştirilmiş yazımlarla karşılaşırsın: <i>oesophagus</i> yerine <i>esophagus</i>, <i>anaemia</i> yerine <i>anemia</i>, <i>haematology</i> yerine <i>hematology</i>. Bu bir çelişki değil, Amerikan İngilizcesinin yazım tercihidir.
      </CalloutBox>

      {/* 15 Satırlı Tablo */}
      <PronunciationTable />

      <p className="m-0 font-normal text-[15px] leading-[1.75] text-[#475569]">
        <b className="text-[#0f1b33]">Okumak ile yazmak farkına bir örnek:</b>{' '}
        <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">articulatio</span>{' '}
        Latince &quot;artikulasyo&quot; okunur, çünkü u harfi ü okunmaz. Türkçeye Fransızca üzerinden geçen &quot;artikülasyon&quot; kelimesindeki ü sesi ise yazım geleneğinden gelir.
      </p>
    </section>
  );
};
