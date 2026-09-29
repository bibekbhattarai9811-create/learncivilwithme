"use client";

import { toggleTask } from "@/lib/store";
import type { Cost, Resource, Task, TaskKind } from "@/lib/roadmap";

export function ProgressBar({ value, className = "bg-accent" }: { value: number; className?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-line">
      <div className={`h-full rounded-full transition-all duration-500 ${className}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export function Ring({ value, size = 120, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--color-line)" strokeWidth="10" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--color-accent)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(100, value) / 100)}
          style={{ transition: "stroke-dashoffset .6s" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-bold">{Math.round(value)}%</span>
        {label && <span className="text-xs text-muted">{label}</span>}
      </div>
    </div>
  );
}

const KIND_STYLE: Record<TaskKind, string> = {
  learn: "bg-sky-500/15 text-sky-300",
  practice: "bg-violet-500/15 text-violet-300",
  build: "bg-emerald-500/15 text-emerald-300",
  milestone: "bg-amber-500/15 text-amber-300",
};

export function KindTag({ kind }: { kind: TaskKind }) {
  return <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${KIND_STYLE[kind]}`}>{kind}</span>;
}

const COST_STYLE: Record<Cost, [string, string]> = {
  free: ["FREE", "bg-emerald-500/15 text-emerald-300"],
  student: ["FREE FOR STUDENTS", "bg-sky-500/15 text-sky-300"],
  paid: ["PAID", "bg-rose-500/15 text-rose-300"],
};

export function CostBadge({ cost }: { cost: Cost }) {
  const [label, cls] = COST_STYLE[cost];
  return <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${cls}`}>{label}</span>;
}

export function ResourceLink({ r, compact = false }: { r: Resource; compact?: boolean }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      title={r.note}
      className={`group/link flex items-start gap-2 rounded-md border border-line bg-bg/60 transition-colors hover:border-accent/60 hover:bg-panel-2 ${
        compact ? "px-2 py-1.5" : "px-3 py-2"
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="text-xs text-sky-300 group-hover/link:underline">{r.label} ↗</span>
        {r.note && <span className="mt-0.5 block text-[11px] leading-snug text-muted">{r.note}</span>}
      </span>
      <CostBadge cost={r.cost} />
    </a>
  );
}

export function TaskRow({ task, done, sub }: { task: Task; done: boolean; sub?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-panel-2/60">
      <input
        id={`task-${task.id}`}
        type="checkbox"
        checked={done}
        onChange={() => toggleTask(task.id)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-amber-500"
      />
      <div className="min-w-0 flex-1">
        <label htmlFor={`task-${task.id}`} className={`cursor-pointer text-sm ${done ? "text-muted line-through" : "text-ink"}`}>
          {task.text}
        </label>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
          <KindTag kind={task.kind} />
          {task.hours ? <span>~{task.hours} h</span> : null}
          {sub && <span className="truncate">· {sub}</span>}
        </div>
        {task.links && task.links.length > 0 && !done && (
          <div className="mt-2 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-accent">Start here</p>
            {task.links.map((r) => (
              <ResourceLink key={r.url + r.label} r={r} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, kicker }: { title: string; subtitle?: string; kicker?: string }) {
  return (
    <header className="mb-8">
      {kicker && <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">{kicker}</p>}
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-3xl text-muted">{subtitle}</p>}
    </header>
  );
}
