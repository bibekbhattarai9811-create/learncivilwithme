"use client";

import Link from "next/link";
import { useState } from "react";
import { PHASES, getPhase } from "@/lib/roadmap";
import { update, useAppState, useHydrated } from "@/lib/store";
import { phasePct } from "@/lib/stats";
import { PageHeader, ProgressBar, ResourceLink, TaskRow } from "@/components/ui";

export default function PhaseView({ id }: { id: string }) {
  const p = getPhase(id)!;
  const { done } = useAppState();
  const hydrated = useHydrated();
  const idx = PHASES.findIndex((x) => x.id === id);
  const prev = PHASES[idx - 1];
  const next = PHASES[idx + 1];
  const pct = hydrated ? phasePct(p, done) : 0;

  return (
    <div>
      <Link href="/roadmap" className="mb-4 inline-block text-sm text-muted hover:text-accent">
        ← All phases
      </Link>
      <PageHeader kicker={`Phase ${p.num} · ${p.when}`} title={p.title} subtitle={p.goal} />
      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar value={pct} />
        </div>
        <span className="font-mono text-sm text-muted">{Math.round(pct)}%</span>
      </div>

      <div className="space-y-6">
        {p.modules.map((m, i) => (
          <ModuleCard key={m.id} moduleIndex={i} phaseId={p.id} done={done} />
        ))}
      </div>

      <div className="mt-10 flex justify-between gap-4">
        {prev ? (
          <Link href={`/roadmap/${prev.id}`} className="btn-ghost">
            ← Phase {prev.num}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/roadmap/${next.id}`} className="btn-primary">
            Phase {next.num}: {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}

function ModuleCard({ phaseId, moduleIndex, done }: { phaseId: string; moduleIndex: number; done: string[] }) {
  const m = getPhase(phaseId)!.modules[moduleIndex];
  const [showConcepts, setShowConcepts] = useState(true);
  const n = m.tasks.filter((t) => done.includes(t.id)).length;
  const allDone = n === m.tasks.length;

  const markAll = () =>
    update((s) => ({
      ...s,
      done: allDone ? s.done.filter((d) => !m.tasks.some((t) => t.id === d)) : [...new Set([...s.done, ...m.tasks.map((t) => t.id)])],
    }));

  return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line p-5">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold">
            {allDone && <span className="mr-2 text-accent">✓</span>}
            {m.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{m.why}</p>
        </div>
        <span className="rounded-md bg-bg px-2 py-1 font-mono text-xs text-muted">
          {n}/{m.tasks.length}
        </span>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Concepts */}
        <div className="border-line p-5 md:border-r">
          <button onClick={() => setShowConcepts((v) => !v)} className="mb-3 flex w-full items-center justify-between text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">Key concepts to master</h3>
            <span className="text-xs text-muted">{showConcepts ? "hide" : "show"}</span>
          </button>
          {showConcepts && (
            <ul className="space-y-2">
              {m.concepts.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          )}

          {m.resources.length > 0 && (
            <>
              <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-accent-2">Extra resources</h3>
              <div className="space-y-1.5">
                {m.resources.map((r) => (
                  <ResourceLink key={r.url + r.label} r={r} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tasks */}
        <div className="p-3">
          <div className="flex items-center justify-between px-2 pb-1 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Checklist</h3>
            <button onClick={markAll} className="text-xs text-muted hover:text-accent">
              {allDone ? "Uncheck all" : "Mark all done"}
            </button>
          </div>
          {m.tasks.map((t) => (
            <TaskRow key={t.id} task={t} done={done.includes(t.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
