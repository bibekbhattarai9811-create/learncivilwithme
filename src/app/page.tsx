"use client";

import Link from "next/link";
import { ALL_TASKS, PHASES, TOTAL_HOURS } from "@/lib/roadmap";
import { useAppState, useHydrated } from "@/lib/store";
import { currentPhase, hoursThisWeek, nextTasks, overallPct, phasePct, quizAccuracy, streak, totalHours } from "@/lib/stats";
import { ProgressBar, Ring, TaskRow } from "@/components/ui";

export default function Dashboard() {
  const s = useAppState();
  const hydrated = useHydrated();
  const pct = overallPct(s.done);
  const phase = currentPhase(s.done);
  const week = hoursThisWeek(s);
  const quiz = quizAccuracy(s);
  const next = nextTasks(s.done, 5);
  const fresh = hydrated && s.done.length === 0 && s.log.length === 0;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="card relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Self-study → FE → PE</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {fresh ? "Start your road to Professional Engineer" : "Keep building. You're on your way."}
            </h1>
            <p className="mt-3 text-muted">
              {ALL_TASKS.length} tasks across {PHASES.length} phases, about {Math.round(TOTAL_HOURS / 100) * 100} hours of focused work.
              Currently in <span className="text-ink">Phase {phase.num}: {phase.title}</span>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/roadmap/${phase.id}`} className="btn-primary">
                Continue Phase {phase.num} →
              </Link>
              <Link href="/roadmap" className="btn-ghost">
                See full roadmap
              </Link>
            </div>
          </div>
          <Ring value={hydrated ? pct : 0} size={140} label="complete" />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Tasks done" value={hydrated ? `${s.done.filter((d) => ALL_TASKS.some((t) => t.id === d)).length}/${ALL_TASKS.length}` : "–"} />
        <Stat
          label="This week"
          value={hydrated ? `${week.toFixed(1)} / ${s.weeklyGoal} h` : "–"}
          bar={hydrated ? (week / s.weeklyGoal) * 100 : 0}
        />
        <Stat label="Study streak" value={hydrated ? `${streak(s)} days` : "–"} sub={hydrated ? `${totalHours(s).toFixed(1)} h total` : ""} />
        <Stat
          label="FE practice"
          value={hydrated && quiz.seen ? `${Math.round(quiz.pct)}%` : "–"}
          sub={hydrated ? `${quiz.seen} answered` : ""}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Up next */}
        <section className="card p-5 lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Up next</h2>
            <Link href="/log" className="text-sm text-accent hover:underline">
              Log study time →
            </Link>
          </div>
          {next.length === 0 ? (
            <p className="py-6 text-center text-muted">Every task is done. Congratulations, Engineer. 🎉</p>
          ) : (
            <div className="-mx-2">
              {next.map((t) => (
                <TaskRow key={t.id} task={t} done={s.done.includes(t.id)} sub={t.moduleTitle} />
              ))}
            </div>
          )}
        </section>

        {/* Study rules */}
        <section className="card p-5 lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold">How to study without a classroom</h2>
          <ol className="space-y-3 text-sm text-muted">
            {[
              ["Problems > videos.", "Spend two-thirds of every session solving problems with pencil and paper."],
              ["Draw the free-body diagram.", "Every statics and structures problem starts with one. No exceptions."],
              ["Units, always.", "Write units on every line. Most FE mistakes are unit mistakes."],
              ["Rewrite your formula sheet.", "Once a week, from memory. Then check it."],
              ["Get into the field early.", "A technician job teaches you what books can't — and counts toward licensure."],
            ].map(([h, b], i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="font-medium text-ink">{h}</span> {b}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Phases */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Your phases</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((p) => {
            const pp = hydrated ? phasePct(p, s.done) : 0;
            return (
              <Link key={p.id} href={`/roadmap/${p.id}`} className="card group p-4 transition-colors hover:border-accent/50">
                <div className="mb-1 flex items-center justify-between">
                  <span className={`font-mono text-xs ${p.color}`}>PHASE {p.num}</span>
                  <span className="font-mono text-xs text-muted">{Math.round(pp)}%</span>
                </div>
                <h3 className="font-semibold group-hover:text-accent">{p.title}</h3>
                <p className="mb-3 text-xs text-muted">{p.when}</p>
                <ProgressBar value={pp} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub, bar }: { label: string; value: string; sub?: string; bar?: number }) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-mono text-xl font-semibold">{value}</p>
      {bar !== undefined && (
        <div className="mt-2">
          <ProgressBar value={bar} className="bg-accent-2" />
        </div>
      )}
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  );
}
