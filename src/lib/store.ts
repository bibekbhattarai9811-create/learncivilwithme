"use client";

import { useSyncExternalStore } from "react";

// Everything the learner does is saved in the browser (localStorage).
// A tiny external store keeps every component in sync and avoids
// hydration mismatches (the server always renders the empty state).

export type LogEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  hours: number;
  subject: string;
  note: string;
};

export type QuizStats = Record<string, { seen: number; correct: number }>;

export type AppState = {
  done: string[]; // completed roadmap task ids
  log: LogEntry[];
  weeklyGoal: number; // hours
  quiz: QuizStats; // keyed by quiz category
  missed: string[]; // question ids answered wrong most recently
};

const KEY = "civilpath:v1";
const EMPTY: AppState = { done: [], log: [], weeklyGoal: 15, quiz: {}, missed: [] };

let state: AppState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    state = EMPTY;
  }
}

function save() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — keep working in memory */
  }
}

// called after every LOCAL change (the cloud sync uses this to push)
const changeHooks = new Set<(s: AppState) => void>();
export function onLocalChange(fn: (s: AppState) => void) {
  changeHooks.add(fn);
  return () => changeHooks.delete(fn);
}

export function update(fn: (s: AppState) => AppState) {
  load();
  state = fn(state);
  save();
  listeners.forEach((l) => l());
  changeHooks.forEach((h) => h(state));
}

/** replace state with data from the server (does not trigger a push back) */
export function setFromRemote(s: Partial<AppState>) {
  load();
  state = { ...EMPTY, ...s };
  save();
  listeners.forEach((l) => l());
}

export function getState() {
  load();
  return state;
}

/** combine guest progress with account progress when logging in */
export function mergeStates(a: AppState, b: AppState): AppState {
  const quiz: QuizStats = { ...a.quiz };
  for (const [cat, st] of Object.entries(b.quiz ?? {})) {
    if (!quiz[cat] || st.seen > quiz[cat].seen) quiz[cat] = st;
  }
  const log = new Map([...(a.log ?? []), ...(b.log ?? [])].map((e) => [e.id, e]));
  return {
    done: [...new Set([...(a.done ?? []), ...(b.done ?? [])])],
    log: [...log.values()],
    weeklyGoal: b.weeklyGoal ?? a.weeklyGoal,
    quiz,
    missed: [...new Set([...(a.missed ?? []), ...(b.missed ?? [])])],
  };
}

export const EMPTY_STATE = EMPTY;

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

/** true after hydration — lets pages hide numbers that would flash from 0 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function toggleTask(id: string) {
  update((s) => ({
    ...s,
    done: s.done.includes(id) ? s.done.filter((d) => d !== id) : [...s.done, id],
  }));
}

export function resetAll() {
  update(() => EMPTY);
}

export function exportData(): string {
  load();
  return JSON.stringify(state, null, 2);
}

export function importData(json: string) {
  const parsed = JSON.parse(json);
  if (typeof parsed !== "object" || !Array.isArray(parsed.done)) {
    throw new Error("Not a LearnCivilWithMe backup file");
  }
  update(() => ({ ...EMPTY, ...parsed }));
}

export function todayISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
