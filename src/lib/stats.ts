import { ALL_TASKS, PHASES, phaseTasks, type Phase } from "./roadmap";
import { todayISO, type AppState } from "./store";
import { PHASE_TEST_IDS } from "./tests";

export function phasePct(p: Phase, done: string[]) {
  const tasks = phaseTasks(p);
  const n = tasks.filter((t) => done.includes(t.id)).length;
  return tasks.length ? (n / tasks.length) * 100 : 0;
}

export function overallPct(done: string[]) {
  return (ALL_TASKS.filter((t) => done.includes(t.id)).length / ALL_TASKS.length) * 100;
}

/** first incomplete tasks in roadmap order (orientation first, then by phase) */
export function nextTasks(done: string[], n = 5) {
  return ALL_TASKS.filter((t) => !done.includes(t.id)).slice(0, n);
}

export function currentPhase(done: string[]) {
  return PHASES.find((p) => phasePct(p, done) < 100) ?? PHASES[PHASES.length - 1];
}

function mondayOf(d: Date) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Mon = 0
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function hoursThisWeek(s: AppState) {
  const start = todayISO(mondayOf(new Date()));
  return s.log.filter((e) => e.date >= start).reduce((a, e) => a + e.hours, 0);
}

export function totalHours(s: AppState) {
  return s.log.reduce((a, e) => a + e.hours, 0);
}

/** consecutive days (ending today or yesterday) with at least one log entry */
export function streak(s: AppState) {
  const days = new Set(s.log.map((e) => e.date));
  const d = new Date();
  if (!days.has(todayISO(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(todayISO(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function quizAccuracy(s: AppState) {
  const all = Object.values(s.quiz);
  const seen = all.reduce((a, x) => a + x.seen, 0);
  const correct = all.reduce((a, x) => a + x.correct, 0);
  return { seen, pct: seen ? (correct / seen) * 100 : 0 };
}

// ── phase tests ──────────────────────────────────────────────────────

export type TestStatus = { unlocked: boolean; reason: string; passed: boolean; best: number | null; attempts: number };

/** phase tests unlock when every task in the phase is checked; the final exam when all phase tests are passed */
export function testStatus(id: string, s: AppState): TestStatus {
  const r = s.tests?.[id];
  const base = { passed: !!r?.passed, best: r ? r.best : null, attempts: r?.attempts ?? 0 };
  if (id === "final") {
    const left = PHASE_TEST_IDS.filter((t) => !s.tests?.[t]?.passed).length;
    return { ...base, unlocked: left === 0, reason: left ? `Pass all phase tests first (${left} left)` : "" };
  }
  const p = PHASES.find((x) => x.id === id);
  if (!p) return { ...base, unlocked: false, reason: "Unknown test" };
  const tasks = phaseTasks(p);
  const left = tasks.filter((t) => !s.done.includes(t.id)).length;
  return { ...base, unlocked: left === 0, reason: left ? `Finish the phase first: ${left} task${left === 1 ? "" : "s"} left` : "" };
}

export function testsPassed(s: AppState) {
  return PHASE_TEST_IDS.filter((t) => s.tests?.[t]?.passed).length;
}
