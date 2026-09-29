"use client";

import { useState } from "react";
import { PHASES } from "@/lib/roadmap";
import { todayISO, update, useAppState, useHydrated } from "@/lib/store";
import { hoursThisWeek, streak, totalHours } from "@/lib/stats";
import { PageHeader, ProgressBar } from "@/components/ui";

const SUBJECTS = [...PHASES.flatMap((p) => p.modules.map((m) => m.title)), "FE exam review", "Work / field experience", "Other"];

export default function LogPage() {
  const s = useAppState();
  const hydrated = useHydrated();
  const [date, setDate] = useState(() => todayISO());
  const [hours, setHours] = useState(2);
  const [subject, setSubject] = useState(SUBJECTS[2]);
  const [note, setNote] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(hours > 0) || hours > 24) return;
    update((st) => ({
      ...st,
      log: [{ id: crypto.randomUUID(), date, hours, subject, note: note.trim() }, ...st.log],
    }));
    setNote("");
  };

  const remove = (id: string) => update((st) => ({ ...st, log: st.log.filter((e) => e.id !== id) }));

  const week = hoursThisWeek(s);
  const bySubject = Object.entries(
    s.log.reduce<Record<string, number>>((a, e) => ((a[e.subject] = (a[e.subject] ?? 0) + e.hours), a), {}),
  ).sort((a, b) => b[1] - a[1]);
  const maxSubj = bySubject[0]?.[1] ?? 1;
  const entries = [...s.log].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);

  return (
    <div>
      <PageHeader
        kicker="Consistency wins"
        title="Study log"
        subtitle="Log every study session. Self-learners who track their hours finish; those who don't usually drift. Aim for 15–20 hours a week."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-muted">This week</p>
          <p className="mt-1 font-mono text-xl font-semibold">
            {hydrated ? week.toFixed(1) : "–"} <span className="text-sm text-muted">/ {s.weeklyGoal} h</span>
          </p>
          <div className="mt-2">
            <ProgressBar value={hydrated ? (week / s.weeklyGoal) * 100 : 0} className="bg-accent-2" />
          </div>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Streak</p>
          <p className="mt-1 font-mono text-xl font-semibold">{hydrated ? streak(s) : "–"} days</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-wide text-muted">All time</p>
          <p className="mt-1 font-mono text-xl font-semibold">{hydrated ? totalHours(s).toFixed(1) : "–"} h</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <form onSubmit={add} className="card space-y-4 p-5 lg:col-span-2">
          <h2 className="font-semibold">Add a session</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="label">Date</span>
              <input type="date" className="input" value={date} max={todayISO()} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label className="block">
              <span className="label">Hours</span>
              <input type="number" className="input font-mono" min="0.25" max="24" step="0.25" value={hours} onChange={(e) => setHours(Number(e.target.value))} required />
            </label>
          </div>
          <label className="block">
            <span className="label">Subject</span>
            <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
              {SUBJECTS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="label">What did you do? (optional)</span>
            <input className="input" placeholder="e.g. 15 truss problems, method of joints" value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} />
          </label>
          <button className="btn-primary w-full">Log session</button>

          <div className="border-t border-line pt-4">
            <label className="block">
              <span className="label">Weekly goal (hours)</span>
              <input
                type="number"
                className="input font-mono"
                min="1"
                max="80"
                value={s.weeklyGoal}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v > 0) update((st) => ({ ...st, weeklyGoal: v }));
                }}
              />
            </label>
          </div>
        </form>

        <div className="space-y-6 lg:col-span-3">
          <section className="card p-5">
            <h2 className="mb-3 font-semibold">Last 16 weeks</h2>
            <Heatmap log={hydrated ? s.log : []} />
          </section>

          {bySubject.length > 0 && (
            <section className="card p-5">
              <h2 className="mb-3 font-semibold">Hours by subject</h2>
              <div className="space-y-2">
                {bySubject.slice(0, 8).map(([name, h]) => (
                  <div key={name} className="flex items-center gap-3 text-sm">
                    <span className="w-44 shrink-0 truncate text-muted" title={name}>{name}</span>
                    <div className="flex-1">
                      <ProgressBar value={(h / maxSubj) * 100} />
                    </div>
                    <span className="w-12 text-right font-mono text-xs">{h.toFixed(1)}h</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="card p-5">
            <h2 className="mb-3 font-semibold">Recent sessions</h2>
            {entries.length === 0 ? (
              <p className="text-sm text-muted">No sessions yet. Log your first one — even 30 minutes counts.</p>
            ) : (
              <ul className="divide-y divide-line">
                {entries.map((e) => (
                  <li key={e.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                    <div className="min-w-0">
                      <p>
                        <span className="font-mono text-muted">{e.date}</span> · <span className="font-medium">{e.subject}</span>
                      </p>
                      {e.note && <p className="truncate text-xs text-muted">{e.note}</p>}
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono">{e.hours}h</span>
                      <button onClick={() => remove(e.id)} className="text-xs text-muted hover:text-rose-400" aria-label="Delete entry">
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Heatmap({ log }: { log: { date: string; hours: number }[] }) {
  const byDay = log.reduce<Record<string, number>>((a, e) => ((a[e.date] = (a[e.date] ?? 0) + e.hours), a), {});
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - ((today.getDay() + 6) % 7) - 15 * 7); // Monday, 15 weeks back
  const weeks: { iso: string; h: number; future: boolean }[][] = [];
  for (let w = 0; w < 16; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(start);
      day.setDate(start.getDate() + w * 7 + d);
      const iso = todayISO(day);
      col.push({ iso, h: byDay[iso] ?? 0, future: day > today });
    }
    weeks.push(col);
  }
  const shade = (h: number) => (h === 0 ? "bg-line/60" : h < 1 ? "bg-amber-900" : h < 2 ? "bg-amber-700" : h < 4 ? "bg-amber-500" : "bg-amber-300");

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto">
        {weeks.map((col, i) => (
          <div key={i} className="flex flex-col gap-1">
            {col.map((c) => (
              <div
                key={c.iso}
                title={`${c.iso}: ${c.h} h`}
                className={`h-3.5 w-3.5 rounded-sm ${c.future ? "opacity-0" : shade(c.h)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-muted">
        Less
        {[0, 0.5, 1.5, 3, 5].map((h) => (
          <span key={h} className={`h-3 w-3 rounded-sm ${shade(h)}`} />
        ))}
        More
      </div>
    </div>
  );
}
