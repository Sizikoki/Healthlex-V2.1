import React from 'react';
import { Link } from 'react-router-dom';
import { MorphemeBadge } from '../components/MorphemeBadge';

const STUDY_METHODS = [
  {
    num: '01',
    title: 'Ezberleme, parçala',
    desc: (
      <>
        <MorphemeBadge text="cardi/o" type="root" /> kökünün kalp,{' '}
        <MorphemeBadge text="-itis" type="suffix" /> ekinin iltihap olduğunu bir kez öğrendiğinde onlarca terimi ezberlemeden çözersin.
      </>
    ),
  },
  {
    num: '02',
    title: 'Aralıklı tekrar',
    desc: (
      <>
        Yeni kök ve ekleri ilk gün, üç gün sonra ve bir hafta sonra tekrar et. Kartın bir yüzüne{' '}
        <MorphemeBadge text="ren/o" type="root" />, diğerine &quot;böbrek&quot; yaz.
      </>
    ),
  },
  {
    num: '03',
    title: 'Sesli oku',
    desc: 'Terimleri okunuş kurallarına dikkat ederek yüksek sesle söyle. İşitsel hafızan da devreye girer.',
  },
  {
    num: '04',
    title: 'Bağlam içinde gör',
    desc: 'Öğrendiğin yapıları atlaslarda, vaka raporlarında ve ders notlarında cümle içinde oku.',
  },
];

const HEALTHLEX_APPS = [
  {
    title: 'Morfem kütüphanesi',
    path: '/morphemes',
    desc: "570'ten fazla ön ek, kök ve son ek, örnek çözümlemeleriyle.",
  },
  {
    title: 'Kelime kartları',
    path: '/flashcards',
    desc: 'Aralıklı tekrar planına göre kendin kullanarak terimleri hatırla.',
  },
  {
    title: 'Eşleştirme',
    path: '/match',
    desc: 'Terimleri Türkçe karşılıklarıyla süreye karşı eşleştir.',
  },
  {
    title: 'Quiz',
    path: '/quiz',
    desc: 'Kategorilere göre çoktan seçmeli sorularla kendini ölç.',
  },
  {
    title: 'Morfem yapıcı',
    path: '/morpheme',
    desc: 'Verilen tanımdan terimi parçalarıyla sıfırdan kur.',
  },
  {
    title: 'İlerleme takibi',
    path: '/progress',
    desc: 'Öğrendiğin terimleri ve çalışma serini panelinden izle.',
  },
];

export const Section8HowToStudy = () => {
  return (
    <section id="s8" className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <span className="font-extrabold text-[12px] leading-none uppercase tracking-[0.14em] text-[#1d4ed8]">
          Bölüm 8
        </span>
        <h2 className="m-0 font-['Lora',serif] font-bold text-[26px] sm:text-[32px] desktop:text-[36px] leading-[1.18] desktop:leading-[1.15] text-[#0f1b33]">
          Tıbbi terminoloji nasıl çalışılır?
        </h2>
      </div>

      <p className="m-0 font-normal text-[16px] sm:text-[17px] leading-[1.7] sm:leading-[1.75] text-[#334155]">
        Bu dili kalıcı öğrenmenin sırrı binlerce kelimeyi ezberlemek değil, doğru çalışma stratejileridir.
      </p>

      {/* 4 Çalışma Yöntemi Kartı */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
        {STUDY_METHODS.map((item) => (
          <div
            key={item.num}
            className="bg-white border border-[#e3e8f1] rounded-[14px] sm:rounded-[16px] p-[18px] sm:p-[22px] flex flex-col gap-[8px]"
          >
            <span className="font-['Lora',serif] font-bold text-[20px] sm:text-[22px] leading-none text-[#1d4ed8]">
              {item.num}
            </span>
            <span className="font-extrabold text-[16px] text-[#0f1b33]">
              {item.title}
            </span>
            <div className="font-normal text-[15px] leading-[1.6] text-[#475569]">
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Koyu Renkli HealthLexMed Bloğu */}
      <div className="mt-[18px] bg-[#0f1b33] rounded-[18px] sm:rounded-[20px] p-[24px_18px] sm:p-[36px] flex flex-col gap-[20px] sm:gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <span className="font-extrabold text-[11px] sm:text-[12px] leading-none uppercase tracking-[0.14em] text-[#9fb4d6]">
            HealthLexMed&apos;de uygula
          </span>
          <h3 className="m-0 font-['Lora',serif] font-bold text-[22px] sm:text-[26px] leading-[1.25] text-white">
            Bu yöntemi burada nasıl uygularsın?
          </h3>
        </div>

        {/* 6 Uygulama Kartı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 desktop:grid-cols-3 gap-[12px]">
          {HEALTHLEX_APPS.map((app) => (
            <Link
              key={app.title}
              to={app.path}
              className="bg-[#182a4a] border border-[#2a3f63] rounded-[14px] p-[16px] sm:p-[18px] flex flex-col gap-[6px] hover:bg-[#1f375f] hover:border-[#3b5788] transition-all"
            >
              <span className="font-extrabold text-[15px] text-white">
                {app.title}
              </span>
              <span className="font-normal text-[14px] leading-[1.55] text-[#c5d3ea]">
                {app.desc}
              </span>
            </Link>
          ))}
        </div>

        {/* Alt Buton: Telefonda tam genişlikte */}
        <Link
          to="/morphemes"
          className="w-full sm:w-auto text-center sm:self-start min-h-[48px] flex items-center justify-center bg-white text-[#0f1b33] font-extrabold text-[15px] px-[22px] py-[14px] rounded-[11px] hover:bg-[#f1f5f9] transition-colors"
        >
          Morfem kütüphanesine göz at →
        </Link>
      </div>
    </section>
  );
};
