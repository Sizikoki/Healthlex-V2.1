import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { REHBER_QUIZZES } from '@/data/rehberQuizzes';
import { MorphemeBadge } from './MorphemeBadge';

const PART_TYPE_MAP = {
  on_ek: 'prefix',
  kok: 'root',
  son_ek: 'suffix',
};

/**
 * RehberQuiz Component — /rehber bölüm içi 5 soruluk mini quiz
 * @param {number} bolum - Bölüm numarası (3, 4, 5, 6, 7)
 * @param {Array<{text: string, type: 'prefix' | 'root' | 'suffix'}>} [morphemes] - S3, S4, S7 için alt morfem bağlantıları
 */
export const RehberQuiz = ({ bolum, morphemes = [] }) => {
  const quiz = REHBER_QUIZZES[bolum];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!quiz || !Array.isArray(quiz.sorular) || quiz.sorular.length === 0) {
    return null;
  }

  const sorular = quiz.sorular;
  const currentSoru = sorular[currentIndex];
  const hasAnswered = selectedOption !== null;
  const isCurrentCorrect = hasAnswered && selectedOption === currentSoru.dogru;
  const isLastQuestion = currentIndex === sorular.length - 1;
  const visibleMorphemes = Array.isArray(morphemes) ? morphemes.slice(0, 3) : [];

  const handleSelectOption = (optionIndex) => {
    if (hasAnswered) return;
    setSelectedOption(optionIndex);
    setAnswers((prev) => [
      ...prev,
      {
        selected: optionIndex,
        isCorrect: optionIndex === currentSoru.dogru,
        tur: currentSoru.tur,
      },
    ]);
  };

  const handleNext = () => {
    if (!hasAnswered) return;
    if (isLastQuestion) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsFinished(false);
  };

  const dogru = answers.filter((a) => a.isCorrect).length;
  const yeniDogru = answers.filter((a) => a.tur === 'yeni' && a.isCorrect).length;

  return (
    <div
      className="mt-[10px] flex flex-col gap-[12px] font-['Nunito',sans-serif]"
      data-rehber-quiz={`s${bolum}`}
    >
      <div className="rounded-[16px] overflow-hidden border border-[#cbd5e1] bg-white shadow-[0_8px_24px_rgba(15,27,51,0.08)]">
        {/* Üst Başlık Bandı */}
        <div className="bg-[#0f1b33] px-[18px] py-[16px] sm:px-[24px] sm:py-[18px] flex flex-col gap-[6px]">
          <div className="flex items-center justify-between gap-[10px] flex-wrap">
            <h3 className="m-0 font-extrabold text-[17px] sm:text-[18px] leading-[1.3] text-white">
              Okuduğunu dene
            </h3>
            <span className="inline-flex items-center px-[10px] py-[3px] rounded-full text-[12px] font-extrabold tracking-[0.02em] bg-[#5eead4]/15 text-[#5eead4] border border-[#5eead4]/40">
              5 soru
            </span>
          </div>
          <p className="m-0 font-medium text-[14px] sm:text-[15px] leading-[1.45] text-[#cbd5e1]">
            {quiz.baslik}
          </p>
        </div>

        {/* Kart Gövdesi */}
        <div className="p-[18px] sm:p-[24px] flex flex-col gap-[16px]">
          {!isFinished ? (
            <>
              {/* 5 Noktalı İlerleme Göstergesi */}
              <div className="flex items-center justify-between gap-[12px]">
                <div
                  className="flex items-center gap-[8px]"
                  role="list"
                  aria-label="Soru ilerlemesi"
                >
                  {sorular.map((_, idx) => {
                    const pastAnswer = answers[idx];
                    let dotClass = 'w-[10px] h-[10px] bg-[#cbd5e1]';
                    let dotLabel = `Soru ${idx + 1}`;

                    if (pastAnswer) {
                      dotClass = pastAnswer.isCorrect
                        ? 'w-[10px] h-[10px] bg-[#16a34a]'
                        : 'w-[10px] h-[10px] bg-[#dc2626]';
                      dotLabel = pastAnswer.isCorrect
                        ? `Soru ${idx + 1}: doğru`
                        : `Soru ${idx + 1}: yanlış`;
                    } else if (idx === currentIndex) {
                      dotClass = 'w-[24px] h-[10px] bg-[#0f766e]';
                      dotLabel = `Soru ${idx + 1}: şu anki soru`;
                    }

                    return (
                      <span
                        key={idx}
                        role="listitem"
                        aria-label={dotLabel}
                        className={`rounded-full transition-all duration-200 ${dotClass}`}
                      />
                    );
                  })}
                </div>
                <span className="font-bold text-[12px] text-[#64748b]">
                  {currentIndex + 1} / {sorular.length}
                </span>
              </div>

              {/* Soru Türü Rozeti */}
              <div>
                {currentSoru.tur === 'yeni' ? (
                  <span className="inline-flex items-center px-[12px] py-[4px] rounded-full text-[12px] sm:text-[13px] font-extrabold bg-[#ccfbf1] text-[#0f766e] border border-[#5eead4]">
                    Yeni terim · parçalarından çöz
                  </span>
                ) : (
                  <span className="inline-flex items-center px-[11px] py-[4px] rounded-full text-[12px] sm:text-[13px] font-bold bg-[#eef2f9] text-[#334155] border border-[#d6e0f0]">
                    Rehberde gördün
                  </span>
                )}
              </div>

              {/* Soru Metni ve Varsa Terim */}
              <div className="flex flex-col gap-[10px]">
                <p className="m-0 font-extrabold text-[17px] sm:text-[18px] leading-[1.4] text-[#0f1b33]">
                  {currentSoru.soru}
                </p>
                {currentSoru.terim && (
                  <div className="px-[14px] py-[12px] rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] font-['Lora',serif] italic font-bold text-[23px] sm:text-[26px] leading-[1.25] text-[#0f1b33]">
                    {currentSoru.terim}
                  </div>
                )}
              </div>

              {/* 3 Şık (Tam Genişlik, Min 48px, Karıştırma Yok) */}
              <div className="flex flex-col gap-[10px]">
                {currentSoru.siklar.map((sik, idx) => {
                  const isCorrectOption = idx === currentSoru.dogru;
                  const isSelected = idx === selectedOption;

                  let buttonClasses =
                    'border-[#d5dfed] bg-white text-[#0f1b33] hover:border-[#2563eb] hover:bg-[#f0f6ff] cursor-pointer';

                  if (hasAnswered) {
                    if (isCorrectOption) {
                      buttonClasses =
                        'border-[#16a34a] bg-[#f0fdf4] text-[#14532d] cursor-default';
                    } else if (isSelected) {
                      buttonClasses =
                        'border-[#dc2626] bg-[#fef2f2] text-[#7f1d1d] cursor-default';
                    } else {
                      buttonClasses =
                        'border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] cursor-default';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full min-h-[48px] px-[16px] py-[12px] rounded-[12px] border-[1.5px] font-['Nunito',sans-serif] font-bold text-[15px] sm:text-[16px] leading-[1.4] text-left flex items-center justify-between gap-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 ${buttonClasses}`}
                    >
                      <span>{sik}</span>
                      {hasAnswered && isCorrectOption && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="shrink-0"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                      {hasAnswered && isSelected && !isCorrectOption && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="shrink-0"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Geri Bildirim Alanı */}
              <div aria-live="polite">
                {hasAnswered && (
                  <div
                    className={`rounded-[12px] p-[14px] sm:p-[16px] border-l-[4px] flex flex-col gap-[10px] ${
                      isCurrentCorrect
                        ? 'bg-[#f0fdf4] border-[#16a34a]'
                        : 'bg-[#fef2f2] border-[#dc2626]'
                    }`}
                  >
                    <p
                      className={`m-0 font-extrabold text-[15px] leading-[1.35] ${
                        isCurrentCorrect ? 'text-[#16a34a]' : 'text-[#dc2626]'
                      }`}
                    >
                      {isCurrentCorrect
                        ? 'Doğru!'
                        : `Doğrusu: ${currentSoru.siklar[currentSoru.dogru]}`}
                    </p>

                    <p className="m-0 font-normal text-[14px] sm:text-[15px] leading-[1.55] text-[#1e293b]">
                      {currentSoru.aciklama}
                    </p>

                    {Array.isArray(currentSoru.parcalar) &&
                      currentSoru.parcalar.length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-[12px] gap-y-[8px] pt-[2px]">
                          {currentSoru.parcalar.map(([metin, tur, anlam], pIdx) => (
                            <span
                              key={`${metin}-${pIdx}`}
                              className="inline-flex items-center gap-[6px]"
                            >
                              <MorphemeBadge
                                text={metin}
                                type={PART_TYPE_MAP[tur] || 'root'}
                                linkable={false}
                                className="text-[13px]"
                              />
                              <span className="font-semibold text-[13px] sm:text-[14px] text-[#334155]">
                                {anlam}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>

              {/* Sonraki Soru / Sonucu Gör Butonu */}
              {hasAnswered && (
                <div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-[22px] py-[12px] rounded-[11px] bg-[#2563eb] text-white font-['Nunito',sans-serif] font-extrabold text-[15px] leading-[1.3] hover:bg-[#1d4ed8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 cursor-pointer"
                  >
                    {isLastQuestion ? 'Sonucu gör →' : 'Sonraki soru →'}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Bitiş Ekranı */
            <div className="flex flex-col gap-[14px]" aria-live="polite">
              <div className="flex flex-col gap-[8px]">
                <h4 className="m-0 font-['Lora',serif] font-bold text-[24px] sm:text-[26px] leading-[1.25] text-[#0f1b33]">
                  Sonuç: {dogru}/5 doğru
                </h4>
                <p className="m-0 font-bold text-[15px] sm:text-[16px] leading-[1.55] text-[#0f766e]">
                  Rehberde görmediğin terimlerde: {yeniDogru}/2 doğru. Parçalamayı bilen, ezberlemeden çözer.
                </p>
                <p className="m-0 font-normal text-[14px] sm:text-[15px] leading-[1.55] text-[#475569]">
                  Daha fazla kategori ve terimle çalışmak için oyunlara göz at.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-[12px] pt-[4px]">
                <Link
                  to={`/games?from=rehber-s${bolum}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-[22px] py-[12px] rounded-[11px] bg-[#0f1b33] text-white font-['Nunito',sans-serif] font-extrabold text-[15px] leading-[1.3] text-center hover:bg-[#1b2d52] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
                >
                  Oyunlar sayfasına git →
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center min-h-[44px] px-[12px] font-['Nunito',sans-serif] font-bold text-[14px] text-[#0f766e] hover:text-[#0f1b33] underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 cursor-pointer"
                >
                  Tekrar çöz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alt Morfem Sayfaları Bağlantıları (S3, S4, S7) */}
      {visibleMorphemes.length > 0 && (
        <div className="flex flex-wrap items-center gap-[8px] px-[4px] pt-[2px]">
          <span className="font-bold text-[12px] sm:text-[13px] text-[#5b6b82]">
            Morfem sayfaları:
          </span>
          {visibleMorphemes.map((m) => (
            <MorphemeBadge
              key={m.text}
              text={m.text}
              type={m.type}
              from={`rehber-s${bolum}`}
              className="text-[13px]"
            />
          ))}
        </div>
      )}
    </div>
  );
};
