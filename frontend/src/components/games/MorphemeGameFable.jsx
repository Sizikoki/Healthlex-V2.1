/**
 * =====================================================================
 *  HealthLexMed — Morfem Yapıcı (Morpheme Builder)
 *  MorphemeGameFable.jsx
 * =====================================================================
 */
import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import {
  Check,
  X,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Puzzle,
} from "lucide-react";

const STRINGS = {
  tr: {
    gameTitle: "Morfem Yapıcı",
    gameSubtitle: "Terimi parçalarından inşa et",
    back: "Geri",
    score: "Puan",
    question: "Soru",
    targetTerm: "Hedef Terim",
    builtTerm: "Oluşturulan Terim",
    emptyHint: "Havuzdan parçaları sırayla seç: Ön Ek → Kök → Son Ek",
    pool: "Parça Havuzu",
    confirm: "Kombinasyonu Onayla",
    correctMsg: "Doğru! Harika dizilim.",
    wrongMsg: "Yanlış kombinasyon. Dizilim sıfırlanıyor, tekrar dene!",
    prefix: "Ön Ek",
    root: "Kök",
    suffix: "Son Ek",
    finishedTitle: "Oyun Bitti!",
    finalScore: "Toplam Puan",
    playAgain: "Yeniden Oyna",
    noQuestions: "Bu kategori için soru bulunamadı.",
    analysis: "Morfem Analizi",
  },
  en: {
    gameTitle: "Morpheme Builder",
    gameSubtitle: "Build the term from its parts",
    back: "Back",
    score: "Score",
    question: "Question",
    targetTerm: "Target Term",
    builtTerm: "Built Term",
    emptyHint: "Pick parts from the pool in order: Prefix → Root → Suffix",
    pool: "Morpheme Pool",
    confirm: "Confirm Combination",
    correctMsg: "Correct! Great sequence.",
    wrongMsg: "Wrong combination. Sequence reset — try again!",
    prefix: "Prefix",
    root: "Root",
    suffix: "Suffix",
    finishedTitle: "Game Over!",
    finalScore: "Final Score",
    playAgain: "Play Again",
    noQuestions: "No questions found for this category.",
    analysis: "Morpheme Analysis",
  },
};

const PART_META = {
  prefix: {
    chip: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:border-indigo-400",
    dot: "bg-indigo-400",
  },
  root: {
    chip: "border-violet-500/40 bg-violet-500/10 text-violet-300 hover:border-violet-400",
    dot: "bg-violet-400",
  },
  suffix: {
    chip: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 hover:border-fuchsia-400",
    dot: "bg-fuchsia-400",
  },
};

const P = (id, text, meaningTr, meaningEn, partType) => ({
  id,
  text,
  meaning: { tr: meaningTr, en: meaningEn },
  partType,
});

export const DEFAULT_QUESTIONS = [
  {
    id: 1,
    targetLatinTerm: "Dysphagia",
    definition: { tr: "Yutma güçlüğü", en: "Difficulty swallowing" },
    correctSequence: [
      P("dys", "dys-", "güçlük, bozukluk", "difficult, impaired", "prefix"),
      P("phag", "phag", "yutma, yeme", "swallowing, eating", "root"),
      P("ia1", "-ia", "durum", "condition", "suffix"),
    ],
    distractors: [
      P("a1", "a-", "yokluk", "absence of", "prefix"),
      P("gastr", "gastr", "mide", "stomach", "root"),
      P("itis1", "-itis", "iltihap", "inflammation", "suffix"),
    ],
  },
  {
    id: 2,
    targetLatinTerm: "Sublingualis",
    definition: { tr: "Dil altına ait", en: "Pertaining to under the tongue" },
    correctSequence: [
      P("sub", "sub-", "altında", "under, below", "prefix"),
      P("lingu", "lingu", "dil", "tongue", "root"),
      P("alis1", "-alis", "ait, ilgili", "pertaining to", "suffix"),
    ],
    distractors: [
      P("supra", "supra-", "üstünde", "above", "prefix"),
      P("gloss", "gloss", "dil (Yunanca)", "tongue (Greek)", "root"),
      P("osis1", "-osis", "hastalık durumu", "diseased condition", "suffix"),
    ],
  },
  {
    id: 3,
    targetLatinTerm: "Arthritis",
    definition: { tr: "Eklem iltihabı", en: "Inflammation of a joint" },
    correctSequence: [
      P("arthr", "arthr", "eklem", "joint", "root"),
      P("itis2", "-itis", "iltihap", "inflammation", "suffix"),
    ],
    distractors: [
      P("peri", "peri-", "çevresinde", "around", "prefix"),
      P("oste", "oste", "kemik", "bone", "root"),
      P("osis2", "-osis", "dejeneratif durum", "degenerative condition", "suffix"),
    ],
  },
  {
    id: 4,
    targetLatinTerm: "Intervertebralis",
    definition: { tr: "Omurlar arasında yer alan", en: "Located between vertebrae" },
    correctSequence: [
      P("inter", "inter-", "arasında", "between", "prefix"),
      P("vertebr", "vertebr", "omur", "vertebra", "root"),
      P("alis2", "-alis", "ait, ilgili", "pertaining to", "suffix"),
    ],
    distractors: [
      P("intra", "intra-", "içinde", "within", "prefix"),
      P("spondyl", "spondyl", "omur (Yunanca)", "vertebra (Greek)", "root"),
      P("aris1", "-aris", "ait, ilgili", "pertaining to", "suffix"),
    ],
  },
  {
    id: 5,
    targetLatinTerm: "Bradycardia",
    definition: {
      tr: "Kalp atım hızının yavaşlaması",
      en: "Abnormally slow heart rate",
    },
    correctSequence: [
      P("brady", "brady-", "yavaş", "slow", "prefix"),
      P("card", "card", "kalp", "heart", "root"),
      P("ia2", "-ia", "durum", "condition", "suffix"),
    ],
    distractors: [
      P("tachy", "tachy-", "hızlı", "fast", "prefix"),
      P("angi", "angi", "damar", "vessel", "root"),
      P("itis3", "-itis", "iltihap", "inflammation", "suffix"),
    ],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function assembledPreview(parts) {
  return parts.map((p) => p.text.replace(/^-+|-+$/g, "")).join("");
}

function isCorrectSequence(selected, correct) {
  return (
    selected.length === correct.length &&
    correct.every((p, i) => p.text === selected[i].text)
  );
}

function normalizeQuestions(terms) {
  if (!Array.isArray(terms) || terms.length === 0) return DEFAULT_QUESTIONS;
  const valid = terms.filter(
    (q) =>
      q &&
      typeof q.targetLatinTerm === "string" &&
      Array.isArray(q.correctSequence) &&
      q.correctSequence.length > 0
  );
  return valid.length === 0 ? DEFAULT_QUESTIONS : valid;
}

function loadQuestion(model, index) {
  const q = model.questions[index];
  if (!q) return { ...model, state: { tag: "Finished" } };
  const pool = [...q.correctSequence, ...(q.distractors ?? q.poolOptions ?? [])];
  return {
    ...model,
    currentIndex: index,
    selectedSequence: [],
    availablePool: shuffle(pool),
    state: { tag: "Playing" },
  };
}

function init(questions) {
  return loadQuestion(
    {
      questions,
      currentIndex: 0,
      selectedSequence: [],
      availablePool: [],
      score: 0,
      state: { tag: "Playing" },
    },
    0
  );
}

function update(model, msg) {
  const tag = model.state.tag;

  switch (msg.type) {
    case "SelectPart": {
      if (tag !== "Playing") return model;
      if (!model.availablePool.some((p) => p.id === msg.part.id)) return model;
      return {
        ...model,
        selectedSequence: [...model.selectedSequence, msg.part],
        availablePool: model.availablePool.filter((p) => p.id !== msg.part.id),
      };
    }
    case "DeselectPart": {
      if (tag !== "Playing") return model;
      if (!model.selectedSequence.some((p) => p.id === msg.part.id)) return model;
      return {
        ...model,
        selectedSequence: model.selectedSequence.filter((p) => p.id !== msg.part.id),
        availablePool: [...model.availablePool, msg.part],
      };
    }
    case "SubmitAnswer": {
      if (tag !== "Playing" || model.selectedSequence.length === 0) return model;
      const q = model.questions[model.currentIndex];
      const isSuccess = isCorrectSequence(model.selectedSequence, q.correctSequence);
      return {
        ...model,
        score: model.score + (isSuccess ? 1 : -1),
        state: { tag: "AnswerChecked", isSuccess },
      };
    }
    case "NextQuestion": {
      if (tag !== "AnswerChecked" || !model.state.isSuccess) return model;
      const next = model.currentIndex + 1;
      if (next >= model.questions.length)
        return { ...model, state: { tag: "Finished" } };
      return loadQuestion(model, next);
    }
    case "RetryQuestion": {
      if (tag !== "AnswerChecked" || model.state.isSuccess) return model;
      return loadQuestion(model, model.currentIndex);
    }
    case "ResetGame":
      return loadQuestion({ ...model, score: 0 }, 0);
    case "SetQuestions":
      return init(msg.questions);
    default:
      return model;
  }
}

function MorphemeChip({ part, onClick, tr, language, dimmed = false }) {
  const meta = PART_META[part.partType] ?? PART_META.root;
  const meaning =
    typeof part.meaning === "string"
      ? part.meaning
      : part.meaning?.[language] ?? part.meaning?.tr ?? "";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${part.text} — ${meaning}`}
      className={`group flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2 text-left
        transition-all duration-150 hover:scale-[1.03] active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
        ${meta.chip} ${dimmed ? "opacity-60" : ""}`}
    >
      <span className="font-mono text-base font-semibold tracking-tight">
        {part.text}
      </span>
      <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
        {tr(part.partType)} · {meaning}
      </span>
    </button>
  );
}

export default function MorphemeGameFable({
  terms,
  onBack,
  language = "tr",
  t: tProp,
}) {
  const questions = useMemo(() => normalizeQuestions(terms), [terms]);

  const tr = useCallback(
    (key) => {
      if (typeof tProp === "function") {
        const v = tProp(`morphemeGame.${key}`);
        if (v && v !== `morphemeGame.${key}`) return v;
      }
      return STRINGS[language]?.[key] ?? STRINGS.tr[key] ?? key;
    },
    [tProp, language]
  );

  const loc = useCallback(
    (field) =>
      typeof field === "string" ? field : field?.[language] ?? field?.tr ?? "",
    [language]
  );

  const [model, dispatch] = useReducer(update, questions, init);

  useEffect(() => {
    dispatch({ type: "SetQuestions", questions });
  }, [questions]);

  useEffect(() => {
    if (model.state.tag !== "AnswerChecked") return;
    const timer = setTimeout(
      () =>
        dispatch(
          model.state.isSuccess
            ? { type: "NextQuestion" }
            : { type: "RetryQuestion" }
        ),
      model.state.isSuccess ? 1500 : 1400
    );
    return () => clearTimeout(timer);
  }, [model.state]);

  const q = model.questions[model.currentIndex];
  const total = model.questions.length;
  const isPlaying = model.state.tag === "Playing";
  const checked = model.state.tag === "AnswerChecked";
  const finished = model.state.tag === "Finished";
  const success = checked && model.state.isSuccess;
  const failure = checked && !model.state.isSuccess;

  if (finished) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 px-6 py-14 text-center text-slate-100">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500">
          <Trophy aria-hidden="true" className="h-8 w-8 text-white"/>
        </div>
        <h2 className="text-2xl font-bold">{tr("finishedTitle")}</h2>
        <p className="mt-2 text-slate-400">
          {tr("finalScore")}:{" "}
          <span
            className={`font-mono text-xl font-semibold ${
              model.score >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {model.score > 0 ? `+${model.score}` : model.score}
          </span>{" "}
          / {total}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => dispatch({ type: "ResetGame" })}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4"/>
            {tr("playAgain")}
          </button>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-2.5 text-slate-300 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4"/>
              {tr("back")}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        {tr("noQuestions")}
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 px-4 py-6 text-slate-100 sm:px-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4"/>
            {tr("back")}
          </button>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          <Puzzle aria-hidden="true" className="h-4 w-4 text-violet-400"/>
          <span className="text-sm font-semibold">{tr("gameTitle")}</span>
        </div>

        <div
          className={`rounded-full border px-3 py-1 font-mono text-sm ${
            model.score >= 0
              ? "border-slate-700 bg-slate-800 text-slate-200"
              : "border-rose-500/40 bg-rose-500/10 text-rose-300"
          }`}
          aria-live="polite"
        >
          {tr("score")}: {model.score > 0 ? `+${model.score}` : model.score}
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-1.5 flex justify-between text-xs text-slate-500">
          <span>
            {tr("question")} {model.currentIndex + 1} / {total}
          </span>
          <span>{tr("gameSubtitle")}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            style={{ width: `${((model.currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-800/50 p-5">
        <p className="mb-1 text-[11px] uppercase tracking-widest text-indigo-400">
          {tr("targetTerm")}
        </p>
        <h2 className="font-serif text-3xl italic tracking-tight text-slate-100">
          {q.targetLatinTerm}
        </h2>
        <p className="mt-1 text-slate-400">{loc(q.definition)}</p>
      </div>

      <div
        className={`mb-5 min-h-[96px] rounded-2xl border-2 border-dashed p-4 transition-colors duration-300 ${
          success
            ? "border-emerald-500/60 bg-emerald-500/5"
            : failure
            ? "border-rose-500/60 bg-rose-500/5"
            : "border-slate-700"
        }`}
      >
        <p className="mb-2 text-[11px] uppercase tracking-widest text-slate-500">
          {tr("builtTerm")}
        </p>

        {model.selectedSequence.length === 0 ? (
          <p className="text-sm text-slate-500">{tr("emptyHint")}</p>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {model.selectedSequence.map((part, i) => (
              <React.Fragment key={part.id}>
                {i > 0 && (
                  <span className="text-slate-600" aria-hidden="true">
                    +
                  </span>
                )}
                <MorphemeChip
                  part={part}
                  tr={tr}
                  language={language}
                  dimmed={!isPlaying}
                  onClick={() => dispatch({ type: "DeselectPart", part })}
                />
              </React.Fragment>
            ))}
            <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 text-slate-600"/>
            <span className="font-mono text-lg font-semibold text-violet-300">
              {assembledPreview(model.selectedSequence)}
            </span>
          </div>
        )}
      </div>

      {success && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3"
        >
          <p className="flex items-center gap-2 font-semibold text-emerald-300">
            <Check aria-hidden="true" className="h-5 w-5"/>
            {tr("correctMsg")} (+1)
          </p>
          <p className="mt-1.5 text-sm text-emerald-200/80">
            <span className="uppercase tracking-wide text-[10px] text-emerald-400/80">
              {tr("analysis")}:{" "}
            </span>
            {q.correctSequence
              .map((p) => `${p.text} (${loc(p.meaning)})`)
              .join(" + ")}
          </p>
        </div>
      )}
      {failure && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 font-semibold text-rose-300"
        >
          <X aria-hidden="true" className="h-5 w-5"/>
          {tr("wrongMsg")} (−1)
        </div>
      )}

      <div className="mb-6">
        <p className="mb-2 text-[11px] uppercase tracking-widest text-slate-500">
          {tr("pool")}
        </p>
        <div className="flex flex-wrap gap-2">
          {model.availablePool.map((part) => (
            <MorphemeChip
              key={part.id}
              part={part}
              tr={tr}
              language={language}
              dimmed={!isPlaying}
              onClick={() => dispatch({ type: "SelectPart", part })}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: "SubmitAnswer" })}
        disabled={!isPlaying || model.selectedSequence.length === 0}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
          ${
            isPlaying && model.selectedSequence.length > 0
              ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 active:scale-[0.99]"
              : "cursor-not-allowed bg-slate-800 text-slate-500"
          }`}
      >
        <Check aria-hidden="true" className="h-5 w-5"/>
        {tr("confirm")}
      </button>
    </div>
  );
}
