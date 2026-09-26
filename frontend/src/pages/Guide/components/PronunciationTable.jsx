import React from 'react';

const PRONUNCIATION_RULES = [
  {
    letter: 'c',
    rule: (
      <>
        a, o, u, au ve sessiz harflerden önce <b>k</b>; e, i, y, ae, oe önünde <b>s</b>
      </>
    ),
    examples: ['scapula', 'crista', 'cerebrum'],
    pronunciations: ['skapula', 'krista', 'serebrum'],
  },
  {
    letter: 'g',
    rule: (
      <>
        a, o, u önünde <b>g</b>. e, i, y önünde Türkçeleşmiş kelimelerde <b>j</b>; Latince anatomi terimlerinde sert <b>g</b> okunuşu da yaygındır. İkisini de duyabilirsin.
      </>
    ),
    examples: ['gaster', 'gynaecologia', 'digitus'],
    pronunciations: ['gaster', 'jinekoloji', 'dijitus / digitus'],
  },
  {
    letter: 'y',
    rule: (
      <>
        Her zaman <b>i</b>. Ünlüden önce Türkçede doğal olarak y sesi eklenir.
      </>
    ),
    examples: ['thymus', 'myocardium'],
    pronunciations: ['timus', 'miyokardiyum'],
  },
  {
    letter: 'x',
    rule: (
      <>
        Her yerde <b>ks</b>
      </>
    ),
    examples: ['thorax', 'xiphoid'],
    pronunciations: ['toraks', 'ksifoid'],
  },
  {
    letter: 'ch',
    rule: (
      <>
        <b>k</b>
      </>
    ),
    examples: ['cholera'],
    pronunciations: ['kolera'],
  },
  {
    letter: 'ph',
    rule: (
      <>
        <b>f</b>
      </>
    ),
    examples: ['pharynx'],
    pronunciations: ['farinks'],
  },
  {
    letter: 'th',
    rule: (
      <>
        <b>t</b>
      </>
    ),
    examples: ['thorax'],
    pronunciations: ['toraks'],
  },
  {
    letter: 'rh, rrh',
    rule: (
      <>
        <b>r</b>
      </>
    ),
    examples: ['rhinitis', 'myorrhexis'],
    pronunciations: ['rinit', 'miyoreksis'],
  },
  {
    letter: 'sch',
    rule: (
      <>
        <b>ş</b>
      </>
    ),
    examples: ['schizophrenia'],
    pronunciations: ['şizofreni'],
  },
  {
    letter: 't',
    rule: (
      <>
        ia, io, iu önünde <b>s</b>
      </>
    ),
    examples: ['articulatio'],
    pronunciations: ['artikulasyo'],
  },
  {
    letter: 'j',
    rule: (
      <>
        Ünlüden önce <b>y</b>
      </>
    ),
    examples: ['junctura'],
    pronunciations: ['yunktura'],
  },
  {
    letter: 'ae',
    rule: (
      <>
        <b>e</b>
      </>
    ),
    examples: ['caecum', 'anaemia'],
    pronunciations: ['sekum', 'anemi'],
  },
  {
    letter: 'oe',
    rule: (
      <>
        <b>ö</b>
      </>
    ),
    examples: ['oedema', 'oesophagus'],
    pronunciations: ['ödem', 'ösofagus'],
  },
  {
    letter: 'eu',
    rule: (
      <>
        <b>ö</b>
      </>
    ),
    examples: ['neuron'],
    pronunciations: ['nöron'],
  },
  {
    letter: 'au',
    rule: (
      <>
        Latince terimde <b>av</b>; Türkçeye yerleşmiş kelimelerde <b>o</b>
      </>
    ),
    examples: ['auris', 'autopsia'],
    pronunciations: ['avris', 'otopsi'],
  },
];

export const PronunciationTable = () => {
  return (
    <div className="bg-white border border-[#e3e8f1] rounded-[16px] overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-[14px_18px] text-left font-extrabold text-[12px] leading-[1.2] uppercase tracking-[0.08em] text-[#475569] bg-[#f8fafc] border-b border-[#e3e8f1] w-[90px]">
              Harf
            </th>
            <th className="p-[14px_18px] text-left font-extrabold text-[12px] leading-[1.2] uppercase tracking-[0.08em] text-[#475569] bg-[#f8fafc] border-b border-[#e3e8f1]">
              Nasıl okunur
            </th>
            <th className="p-[14px_18px] text-left font-extrabold text-[12px] leading-[1.2] uppercase tracking-[0.08em] text-[#475569] bg-[#f8fafc] border-b border-[#e3e8f1] w-[170px]">
              Örnek
            </th>
            <th className="p-[14px_18px] text-left font-extrabold text-[12px] leading-[1.2] uppercase tracking-[0.08em] text-[#475569] bg-[#f8fafc] border-b border-[#e3e8f1] w-[130px]">
              Okunuşu
            </th>
          </tr>
        </thead>
        <tbody>
          {PRONUNCIATION_RULES.map((item, idx) => {
            const isEven = idx % 2 === 1;
            const isLast = idx === PRONUNCIATION_RULES.length - 1;
            const borderClass = isLast ? 'border-b-0' : 'border-b border-[#eef1f6]';

            return (
              <tr
                key={item.letter}
                className={isEven ? 'bg-[#fbfcfe]' : 'bg-white'}
              >
                <td
                  className={`p-[14px_18px] align-top font-mono font-extrabold text-[16px] leading-[1.4] text-[#0f1b33] ${borderClass}`}
                >
                  {item.letter}
                </td>
                <td
                  className={`p-[14px_18px] align-top font-normal text-[15px] leading-[1.55] text-[#334155] ${borderClass}`}
                >
                  {item.rule}
                </td>
                <td
                  className={`p-[14px_18px] align-top font-normal text-[15px] leading-[1.55] text-[#334155] ${borderClass}`}
                >
                  {item.examples.map((ex, i) => (
                    <React.Fragment key={ex}>
                      <span className="font-['Lora',serif] italic font-semibold text-[#0f1b33]">
                        {ex}
                      </span>
                      {i < item.examples.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
                <td
                  className={`p-[14px_18px] align-top font-bold text-[15px] leading-[1.55] text-[#0f1b33] ${borderClass}`}
                >
                  {item.pronunciations.map((pr, i) => (
                    <React.Fragment key={i}>
                      {pr}
                      {i < item.pronunciations.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
