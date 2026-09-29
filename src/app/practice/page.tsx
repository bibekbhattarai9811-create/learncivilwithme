"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, QUESTIONS, type Category, type Question } from "@/lib/questions";
import { update, useAppState, useHydrated } from "@/lib/store";
import { PageHeader, ProgressBar } from "@/components/ui";

type Mode = { kind: "idle" } | { kind: "quiz"; qs: Question[]; i: number; picked: number | null; score: number; started: number };

function shuffle<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function PracticePage() {
  const s = useAppState();
  const hydrated = useHydrated();
  const [cats, setCats] = useState<Category[]>([]);
  const [size, setSize] = useState(10);
  const [mode, setMode] = useState<Mode>({ kind: "idle" });

  const pool = cats.length ? QUESTIONS.filter((q) => cats.includes(q.cat)) : QUESTIONS;
  const missedPool = QUESTIONS.filter((q) => s.missed.includes(q.id));

  // shuffle question order and each question's choices (so the answer letter isn't predictable)
  const start = (qs: Question[]) =>
    setMode({
      kind: "quiz",
      qs: shuffle(qs)
        .slice(0, size)
        .map((q) => {
          const order = shuffle(q.choices.map((_, k) => k));
          return { ...q, choices: order.map((k) => q.choices[k]), answer: order.indexOf(q.answer) };
        }),
      i: 0,
      picked: null,
      score: 0,
      started: Date.now(),
    });

  const toggleCat = (c: Category) => setCats((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  if (mode.kind === "quiz") return <Quiz mode={mode} setMode={setMode} />;

  return (
    <div>
      <PageHeader
        kicker="FE Civil practice"
        title="Practice questions"
        subtitle={`${QUESTIONS.length} FE-style questions with worked solutions across ${CATEGORIES.length} exam topics. Solve on paper first, then pick an answer. Your accuracy per topic shows where to study next.`}
      />

      <section className="card mb-6 p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">1 · Choose topics (none = all)</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const st = s.quiz[c];
            const pct = st && st.seen ? (st.correct / st.seen) * 100 : null;
            const count = QUESTIONS.filter((q) => q.cat === c).length;
            const on = cats.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleCat(c)}
                className={`rounded-lg border p-3 text-left transition-colors ${on ? "border-accent bg-accent/10" : "border-line hover:bg-panel-2"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c}</span>
                  <span className="font-mono text-xs text-muted">{count} q</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1">
                    <ProgressBar
                      value={hydrated && pct !== null ? pct : 0}
                      className={pct === null ? "bg-line" : pct >= 80 ? "bg-emerald-400" : pct >= 60 ? "bg-amber-400" : "bg-rose-400"}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-xs text-muted">{hydrated && pct !== null ? `${Math.round(pct)}%` : "—"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card flex flex-wrap items-end gap-4 p-5">
        <div>
          <span className="label">2 · Questions per round</span>
          <div className="flex gap-2">
            {[5, 10, 20, 50].map((n) => (
              <button key={n} onClick={() => setSize(n)} className={size === n ? "btn-primary" : "btn-ghost"}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-wrap justify-end gap-3">
          {hydrated && missedPool.length > 0 && (
            <button onClick={() => start(missedPool)} className="btn-ghost">
              Review {missedPool.length} missed
            </button>
          )}
          <button onClick={() => start(pool)} className="btn-primary">
            Start {Math.min(size, pool.length)} questions →
          </button>
        </div>
      </section>

      <p className="mt-6 text-sm text-muted">
        On the real FE exam you get ~110 questions in about 5 h 20 min of exam time (≈ 3 minutes each) and only the NCEES Reference Handbook. Practice finding formulas in the handbook with Ctrl+F.
      </p>
    </div>
  );
}

function Quiz({ mode, setMode }: { mode: Extract<Mode, { kind: "quiz" }>; setMode: (m: Mode) => void }) {
  const { qs, i, picked, score } = mode;
  const finished = i >= qs.length;

  if (finished) {
    const pct = (score / qs.length) * 100;
    return (
      <div className="card mx-auto max-w-xl p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Round complete</p>
        <p className="my-4 font-mono text-5xl font-bold">
          {score}/{qs.length}
        </p>
        <p className="text-muted">
          {pct >= 80 ? "Exam-ready on these topics. Move on and keep reviewing." : pct >= 60 ? "Close. Rework the ones you missed on paper." : "Go back to the roadmap concepts for these topics, then try again."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => setMode({ kind: "idle" })} className="btn-primary">
            Back to topics
          </button>
        </div>
      </div>
    );
  }

  const q = qs[i];

  const pick = (k: number) => {
    if (picked !== null) return;
    const right = k === q.answer;
    update((s) => {
      const st = s.quiz[q.cat] ?? { seen: 0, correct: 0 };
      return {
        ...s,
        quiz: { ...s.quiz, [q.cat]: { seen: st.seen + 1, correct: st.correct + (right ? 1 : 0) } },
        missed: right ? s.missed.filter((m) => m !== q.id) : [...new Set([...s.missed, q.id])],
      };
    });
    setMode({ ...mode, picked: k, score: score + (right ? 1 : 0) });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm text-muted">
        <button onClick={() => setMode({ kind: "idle" })} className="hover:text-accent">
          ← Quit
        </button>
        <span className="flex items-center gap-3 font-mono">
          <Timer started={mode.started} answered={i} />
          {i + 1} / {qs.length} · score {score}
        </span>
      </div>
      <ProgressBar value={(i / qs.length) * 100} />

      <div className="card mt-6 p-6">
        <span className="rounded bg-bg px-2 py-1 font-mono text-xs text-accent">{q.cat}</span>
        <h2 className="mt-4 text-lg leading-relaxed">{q.q}</h2>
        <div className="mt-5 space-y-2">
          {q.choices.map((c, k) => {
            const state =
              picked === null ? "idle" : k === q.answer ? "right" : k === picked ? "wrong" : "dim";
            return (
              <button
                key={k}
                onClick={() => pick(k)}
                disabled={picked !== null}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  state === "idle"
                    ? "border-line hover:border-accent hover:bg-panel-2"
                    : state === "right"
                      ? "border-emerald-400 bg-emerald-500/10"
                      : state === "wrong"
                        ? "border-rose-400 bg-rose-500/10"
                        : "border-line opacity-50"
                }`}
              >
                <span className="font-mono text-muted">{"ABCD"[k]}</span>
                <span>{c}</span>
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className={`mt-5 rounded-lg border p-4 text-sm ${picked === q.answer ? "border-emerald-400/40 bg-emerald-500/5" : "border-rose-400/40 bg-rose-500/5"}`}>
            <p className="mb-1 font-semibold">{picked === q.answer ? "Correct ✓" : `Not quite — answer is ${"ABCD"[q.answer]}`}</p>
            <p className="text-muted">{q.why}</p>
          </div>
        )}
      </div>

      {picked !== null && (
        <div className="mt-4 flex justify-end">
          <button autoFocus onClick={() => setMode({ ...mode, i: i + 1, picked: null })} className="btn-primary">
            {i + 1 === qs.length ? "See results" : "Next question →"}
          </button>
        </div>
      )}
    </div>
  );
}

/** elapsed time vs. the real FE pace (~3 min per question) */
function Timer({ started, answered }: { started: number; answered: number }) {
  const [now, setNow] = useState(started);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const sec = Math.max(0, Math.floor((now - started) / 1000));
  const mmss = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  const behind = sec > (answered + 1) * 180;
  return (
    <span title="FE pace: about 3 minutes per question" className={behind ? "text-rose-300" : "text-emerald-300"}>
      ⏱ {mmss}
    </span>
  );
}
