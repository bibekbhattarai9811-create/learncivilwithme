"use client";

import Link from "next/link";
import { PHASES } from "@/lib/roadmap";
import { useAppState, useHydrated } from "@/lib/store";
import { phasePct, testStatus, testsPassed } from "@/lib/stats";
import { TESTS } from "@/lib/tests";
import { PageHeader, ProgressBar } from "@/components/ui";
import { Certificate } from "./[id]/TestRunner";

export default function TestsPage() {
  const s = useAppState();
  const hydrated = useHydrated();
  const passed = hydrated ? testsPassed(s) : 0;
  const final = testStatus("final", s);

  return (
    <div>
      <PageHeader
        kicker="Check your knowledge"
        title="Phase tests"
        subtitle="Each phase ends with a test. It unlocks when you've checked off every task in that phase. Pass all nine to unlock the Final Exam."
      />

      <div className="card mb-6 flex flex-wrap items-center gap-4 p-5">
        <div className="flex-1">
          <p className="text-sm text-muted">Phase tests passed</p>
          <div className="mt-2">
            <ProgressBar value={(passed / 9) * 100} className="bg-emerald-400" />
          </div>
        </div>
        <span className="font-mono text-2xl font-bold">{passed}/9</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {TESTS.filter((t) => t.id !== "final").map((t) => {
          const st = testStatus(t.id, s);
          const p = PHASES.find((x) => x.id === t.id)!;
          return (
            <Link key={t.id} href={`/tests/${t.id}`} className="card group flex items-center gap-4 p-4 transition-colors hover:border-accent/50">
              <Badge state={!hydrated ? "locked" : st.passed ? "passed" : st.unlocked ? "open" : "locked"} />
              <div className="min-w-0 flex-1">
                <p className={`font-mono text-xs ${p.color}`}>PHASE {p.num}</p>
                <p className="font-medium group-hover:text-accent">{p.title}</p>
                <p className="text-xs text-muted">
                  {t.count} questions · pass {t.pass}%
                  {hydrated && st.best !== null && ` · best ${st.best}%`}
                </p>
              </div>
              {hydrated && !st.unlocked && <span className="font-mono text-xs text-muted">{Math.round(phasePct(p, s.done))}%</span>}
            </Link>
          );
        })}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold">Final exam</h2>
      {hydrated && final.passed ? (
        <Certificate pct={final.best ?? 0} />
      ) : (
        <Link href="/tests/final" className="card group flex items-center gap-4 border-accent/40 p-5 transition-colors hover:border-accent">
          <Badge state={hydrated && final.unlocked ? "open" : "locked"} big />
          <div className="flex-1">
            <p className="text-lg font-semibold group-hover:text-accent">Final Exam: Road to PE</p>
            <p className="text-sm text-muted">40 mixed questions from every phase · pass 75% · earns your completion certificate</p>
            {hydrated && !final.unlocked && <p className="mt-1 text-xs text-muted">🔒 {final.reason}</p>}
          </div>
        </Link>
      )}
    </div>
  );
}

function Badge({ state, big }: { state: "passed" | "open" | "locked"; big?: boolean }) {
  const size = big ? "h-12 w-12 text-xl" : "h-10 w-10";
  const look = {
    passed: "bg-emerald-500/20 text-emerald-300",
    open: "bg-accent/20 text-accent",
    locked: "bg-line/60 text-muted",
  }[state];
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${size} ${look}`} aria-label={state}>
      {state === "passed" ? "✓" : state === "open" ? "▶" : "🔒"}
    </span>
  );
}
