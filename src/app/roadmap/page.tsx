"use client";

import Link from "next/link";
import { PHASES, phaseTasks } from "@/lib/roadmap";
import { useAppState, useHydrated } from "@/lib/store";
import { phasePct } from "@/lib/stats";
import { PageHeader, ProgressBar } from "@/components/ui";

export default function RoadmapPage() {
  const { done } = useAppState();
  const hydrated = useHydrated();

  return (
    <div>
      <PageHeader
        kicker="The complete path"
        title="Roadmap to Professional Civil Engineer"
        subtitle="Nine phases, from high-school math to a PE license. Phases 3 (software) and 5 (industry) run in parallel with your studies. Getting paid civil work early is the fastest way through."
      />

      <ol className="relative space-y-6 border-l-2 border-line pl-6 md:pl-10">
        {PHASES.map((p) => {
          const pp = hydrated ? phasePct(p, done) : 0;
          const tasks = phaseTasks(p);
          const hours = tasks.reduce((a, t) => a + (t.hours ?? 0), 0);
          const complete = pp >= 100;
          return (
            <li key={p.id} className="relative">
              <span
                className={`absolute -left-[35px] top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 font-mono text-[10px] md:-left-[51px] ${
                  complete ? "border-accent bg-accent text-black" : "border-line bg-bg text-muted"
                }`}
              >
                {complete ? "✓" : p.num}
              </span>
              <Link href={`/roadmap/${p.id}`} className="card block p-5 transition-colors hover:border-accent/50">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className={`font-mono text-xs ${p.color}`}>PHASE {p.num} · {p.when}</span>
                    <h2 className="text-xl font-semibold">{p.title}</h2>
                  </div>
                  <span className="font-mono text-sm text-muted">
                    {tasks.filter((t) => done.includes(t.id)).length}/{tasks.length} tasks{hours ? ` · ~${hours} h` : ""}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{p.goal}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.modules.map((m) => (
                    <span key={m.id} className="rounded-md border border-line bg-bg/60 px-2 py-1 text-xs text-muted">
                      {m.title}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <ProgressBar value={pp} />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
