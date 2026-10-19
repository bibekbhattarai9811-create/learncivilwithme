"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "@/lib/account";
import { PHASES } from "@/lib/roadmap";
import { recordTest, useAppState, useHydrated } from "@/lib/store";
import { testStatus } from "@/lib/stats";
import { getTest, makePaper, type TestQ } from "@/lib/tests";
import { PageHeader, ProgressBar } from "@/components/ui";

type Stage =
  | { kind: "intro" }
  | { kind: "exam"; paper: TestQ[]; picks: (number | null)[]; i: number; started: number }
  | { kind: "result"; paper: TestQ[]; picks: (number | null)[]; pct: number; seconds: number };

export default function TestRunner({ id }: { id: string }) {
  const test = getTest(id)!;
  const s = useAppState();
  const hydrated = useHydrated();
  const [stage, setStage] = useState<Stage>({ kind: "intro" });
  const status = testStatus(id, s);
  const phase = PHASES.find((p) => p.id === id);
  const isFinal = id === "final";

  const start = () => {
    const paper = makePaper(test);
    setStage({ kind: "exam", paper, picks: paper.map(() => null), i: 0, started: Date.now() });
    window.scrollTo(0, 0);
  };

  // ── results ──
  if (stage.kind === "result") {
    return <Results test={test} stage={stage} phaseNum={phase?.num} isFinal={isFinal} onRetake={start} />;
  }

  // ── exam ──
  if (stage.kind === "exam") {
    const { paper, picks, i } = stage;
    const q = paper[i];
    const answered = picks.filter((p) => p !== null).length;
    const submit = () => {
      const unanswered = paper.length - answered;
      if (unanswered && !confirm(`You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submit anyway?`)) return;
      const correct = paper.filter((qq, k) => picks[k] === qq.answer).length;
      const pct = Math.round((correct / paper.length) * 100);
      recordTest(id, pct, test.pass);
      setStage({ kind: "result", paper, picks, pct, seconds: Math.round((Date.now() - stage.started) / 1000) });
      window.scrollTo(0, 0);
    };
    const pick = (k: number) => setStage({ ...stage, picks: picks.map((p, j) => (j === i ? k : p)) });
    const go = (j: number) => setStage({ ...stage, i: j });

    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <span className="font-semibold text-ink">{test.title}</span>
          <span className="flex items-center gap-3 font-mono">
            <Clock started={stage.started} minutes={test.minutes} />
            {answered}/{paper.length} answered
          </span>
        </div>
        <ProgressBar value={(answered / paper.length) * 100} />

        <div className="card mt-5 p-6">
          <p className="font-mono text-xs text-accent">
            Question {i + 1} of {paper.length}
          </p>
          <h2 className="mt-3 text-lg leading-relaxed">{q.q}</h2>
          <div className="mt-5 space-y-2" role="radiogroup">
            {q.choices.map((c, k) => (
              <button
                key={k}
                role="radio"
                aria-checked={picks[i] === k}
                onClick={() => pick(k)}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  picks[i] === k ? "border-accent bg-accent/10" : "border-line hover:border-accent/50 hover:bg-panel-2"
                }`}
              >
                <span className={`font-mono ${picks[i] === k ? "text-accent" : "text-muted"}`}>{"ABCD"[k]}</span>
                <span>{c}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between gap-3">
            <button onClick={() => go(i - 1)} disabled={i === 0} className="btn-ghost">
              ← Previous
            </button>
            {i + 1 < paper.length ? (
              <button onClick={() => go(i + 1)} className="btn-primary">
                Next →
              </button>
            ) : (
              <button onClick={submit} className="btn-primary">
                Submit test
              </button>
            )}
          </div>
        </div>

        {/* question palette */}
        <div className="card mt-4 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-muted">Jump to question</p>
            <button onClick={submit} className="text-xs text-accent hover:underline">
              Submit now
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {paper.map((_, j) => (
              <button
                key={j}
                onClick={() => go(j)}
                aria-label={`Question ${j + 1}${picks[j] !== null ? ", answered" : ""}`}
                className={`h-8 w-8 rounded-md border font-mono text-xs ${
                  j === i ? "border-accent text-accent" : picks[j] !== null ? "border-line bg-accent/20 text-ink" : "border-line text-muted"
                }`}
              >
                {j + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── intro ──
  return (
    <div className="mx-auto max-w-2xl">
      <Link href={phase ? `/roadmap/${phase.id}` : "/tests"} className="mb-4 inline-block text-sm text-muted hover:text-accent">
        ← {phase ? `Phase ${phase.num}: ${phase.title}` : "All tests"}
      </Link>
      <PageHeader
        kicker={isFinal ? "Final exam" : `End of Phase ${phase?.num}`}
        title={test.title}
        subtitle={
          isFinal
            ? "A mixed exam across everything on the roadmap. Pass it to earn your LearnCivilWithMe certificate."
            : "Prove you've mastered this phase before moving on. Questions are drawn at random each time, so every attempt is different."
        }
      />

      <div className="card p-6">
        <dl className="grid grid-cols-3 gap-4 text-center">
          <Fact label="Questions" value={String(test.count)} />
          <Fact label="Pass mark" value={`${test.pass}%`} />
          <Fact label="Time guide" value={test.minutes ? `${test.minutes} min` : "None"} />
        </dl>

        {hydrated && status.attempts > 0 && (
          <p className={`mt-5 rounded-lg border px-3 py-2 text-sm ${status.passed ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300" : "border-line text-muted"}`}>
            {status.passed ? "✓ Passed" : "Not passed yet"} · best score {status.best}% · {status.attempts} attempt{status.attempts === 1 ? "" : "s"}
          </p>
        )}

        <ul className="mt-5 space-y-1.5 text-sm text-muted">
          <li>• Answers aren&apos;t revealed until you submit, just like the real exam.</li>
          <li>• You can move between questions and change answers before submitting.</li>
          <li>• Work on paper. After submitting you&apos;ll see every solution.</li>
        </ul>

        <div className="mt-6">
          {!hydrated ? (
            <div className="h-10" />
          ) : status.unlocked ? (
            <button onClick={start} className="btn-primary w-full">
              {status.attempts ? "Retake test" : "Start test"} →
            </button>
          ) : (
            <div className="rounded-lg border border-line bg-bg/60 p-4 text-center">
              <p className="text-sm font-medium">🔒 Locked</p>
              <p className="mt-1 text-sm text-muted">{status.reason}</p>
              <Link href={phase ? `/roadmap/${phase.id}` : "/tests"} className="btn-ghost mt-3">
                {phase ? `Go to Phase ${phase.num}` : "See phase tests"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-mono text-xl font-semibold">{value}</dd>
    </div>
  );
}

function Clock({ started, minutes }: { started: number; minutes?: number }) {
  const [now, setNow] = useState(started);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const sec = Math.max(0, Math.floor((now - started) / 1000));
  const over = minutes ? sec > minutes * 60 : false;
  return (
    <span className={over ? "text-rose-300" : ""} title={minutes ? `Time guide: ${minutes} minutes` : undefined}>
      ⏱ {Math.floor(sec / 60)}:{String(sec % 60).padStart(2, "0")}
      {minutes ? ` / ${minutes}:00` : ""}
    </span>
  );
}

function Results({
  test,
  stage,
  phaseNum,
  isFinal,
  onRetake,
}: {
  test: NonNullable<ReturnType<typeof getTest>>;
  stage: Extract<Stage, { kind: "result" }>;
  phaseNum?: number;
  isFinal: boolean;
  onRetake: () => void;
}) {
  const { paper, picks, pct, seconds } = stage;
  const passed = pct >= test.pass;
  const correct = paper.filter((q, k) => picks[k] === q.answer).length;
  const next = phaseNum !== undefined ? PHASES.find((p) => p.num === phaseNum + 1) : undefined;
  const [onlyWrong, setOnlyWrong] = useState(!passed);

  return (
    <div className="mx-auto max-w-3xl">
      {isFinal && passed ? (
        <Certificate pct={pct} />
      ) : (
        <div className={`card p-8 text-center ${passed ? "border-emerald-400/40" : ""}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{test.title}</p>
          <p className={`my-3 font-mono text-5xl font-bold ${passed ? "text-emerald-300" : "text-rose-300"}`}>{pct}%</p>
          <p className="text-lg font-semibold">{passed ? `Passed! Phase ${phaseNum ?? ""} complete ✓` : `Not yet: you need ${test.pass}% to pass`}</p>
          <p className="mt-1 text-sm text-muted">
            {correct} of {paper.length} correct · {Math.floor(seconds / 60)} min {seconds % 60} s
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {passed && next && (
              <Link href={`/roadmap/${next.id}`} className="btn-primary">
                Start Phase {next.num}: {next.title} →
              </Link>
            )}
            {passed && !next && !isFinal && (
              <Link href="/tests/final" className="btn-primary">
                Go to the Final Exam →
              </Link>
            )}
            <button onClick={onRetake} className={passed ? "btn-ghost" : "btn-primary"}>
              {passed ? "Retake for a higher score" : "Try again (new questions)"}
            </button>
            <Link href="/tests" className="btn-ghost">
              All tests
            </Link>
          </div>
        </div>
      )}

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Review</h2>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={onlyWrong} onChange={(e) => setOnlyWrong(e.target.checked)} className="accent-amber-500" />
          Only show mistakes
        </label>
      </div>
      <ol className="space-y-3">
        {paper.map((q, k) => {
          const ok = picks[k] === q.answer;
          if (onlyWrong && ok) return null;
          return (
            <li key={q.id} className={`card p-4 ${ok ? "border-emerald-400/30" : "border-rose-400/30"}`}>
              <p className="text-xs text-muted">
                <span className={ok ? "text-emerald-300" : "text-rose-300"}>{ok ? "✓ Correct" : "✗ Incorrect"}</span> · Q{k + 1} · {q.cat}
              </p>
              <p className="mt-1 text-sm">{q.q}</p>
              {!ok && (
                <p className="mt-2 text-sm text-rose-300">
                  Your answer: {picks[k] === null ? "(none)" : q.choices[picks[k]!]}
                </p>
              )}
              <p className="mt-1 text-sm text-emerald-300">Correct: {q.choices[q.answer]}</p>
              <p className="mt-2 text-sm text-muted">{q.why}</p>
            </li>
          );
        })}
      </ol>
      {onlyWrong && correct === paper.length && <p className="text-sm text-muted">No mistakes. Perfect score! 🎉</p>}
    </div>
  );
}

export function Certificate({ pct }: { pct: number }) {
  const acct = useAccount();
  const name = acct.user?.name;
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div>
      <div id="certificate" className="card relative overflow-hidden border-2 border-accent/60 p-8 text-center md:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Certificate of completion</p>
        <p className="mt-6 text-sm text-muted">This certifies that</p>
        <p className="mt-2 text-3xl font-bold">{name ?? "A dedicated learner"}</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          completed all 9 phases of the LearnCivilWithMe roadmap to Professional Civil Engineer and passed the Final Exam with a score of{" "}
          <span className="font-mono text-ink">{pct}%</span>.
        </p>
        <p className="mt-6 font-mono text-xs text-muted">{date}</p>
        <p className="mt-6 text-[11px] text-muted">A self-study milestone, not a license or academic credential.</p>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button onClick={() => window.print()} className="btn-primary">
          Print / save as PDF
        </button>
        {!name && (
          <Link href="/login" className="btn-ghost">
            Log in to put your name on it
          </Link>
        )}
      </div>
    </div>
  );
}
