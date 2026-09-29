"use client";

// Account state + cloud sync. Guests keep progress in localStorage only.
// Logged-in users: every local change is pushed (debounced) to /api/progress,
// and the latest cloud copy is pulled on load and when the tab regains focus.
import { useSyncExternalStore } from "react";
import { EMPTY_STATE, getState, mergeStates, onLocalChange, setFromRemote, type AppState } from "./store";

export type User = { id: string; email: string; name: string };
export type SyncStatus = "idle" | "saving" | "saved" | "offline";
type Account = { status: "loading" | "guest" | "user"; user: User | null; sync: SyncStatus };

const LOADING: Account = { status: "loading", user: null, sync: "idle" }; // stable object for server render
let acct: Account = LOADING;
const listeners = new Set<() => void>();
const set = (patch: Partial<Account>) => {
  acct = { ...acct, ...patch };
  listeners.forEach((l) => l());
};

export function useAccount(): Account {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => acct,
    () => LOADING,
  );
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(body.error ?? `Request failed (${res.status})`), { status: res.status });
  return body as T;
}

// ── push (debounced) ────────────────────────────────────────────────
let timer: ReturnType<typeof setTimeout> | undefined;
let pending = false;
let lastSynced: string | null = null;

async function push(data: AppState) {
  try {
    const r = await api<{ updatedAt: string }>("/api/progress", { method: "PUT", body: JSON.stringify({ data }) });
    lastSynced = r.updatedAt;
    pending = false;
    set({ sync: "saved" });
  } catch (e) {
    if ((e as { status?: number }).status === 401) return signedOutElsewhere();
    set({ sync: "offline" }); // keeps pending = true; retried on next change or focus
  }
}

function schedulePush() {
  if (acct.status !== "user") return;
  pending = true;
  set({ sync: "saving" });
  clearTimeout(timer);
  timer = setTimeout(() => push(getState()), 800);
}

// ── pull ────────────────────────────────────────────────────────────
async function pull(mergeLocal: boolean) {
  const r = await api<{ data: AppState | null; updatedAt: string | null }>("/api/progress");
  if (mergeLocal) {
    // first sync after login: keep anything done as a guest too
    const merged = r.data ? mergeStates(getState(), r.data) : getState();
    setFromRemote(merged);
    await push(merged);
  } else if (r.data && r.updatedAt !== lastSynced && !pending) {
    setFromRemote(r.data);
    lastSynced = r.updatedAt;
    set({ sync: "saved" });
  }
}

function signedOutElsewhere() {
  set({ status: "guest", user: null, sync: "idle" });
}

// ── public API ──────────────────────────────────────────────────────
let started = false;
export function startAccount() {
  if (started || typeof window === "undefined") return;
  started = true;
  onLocalChange(schedulePush);
  window.addEventListener("focus", () => {
    if (acct.status !== "user") return;
    if (pending) push(getState());
    else pull(false).catch(() => set({ sync: "offline" }));
  });
  api<{ user: User | null }>("/api/auth/me")
    .then(async ({ user }) => {
      if (!user) return set({ status: "guest" });
      set({ status: "user", user });
      await pull(true);
    })
    .catch(() => set({ status: "guest" }));
}

export async function signUp(name: string, email: string, password: string) {
  const { user } = await api<{ user: User }>("/api/auth/signup", { method: "POST", body: JSON.stringify({ name, email, password }) });
  set({ status: "user", user });
  await pull(true);
}

export async function logIn(email: string, password: string) {
  const { user } = await api<{ user: User }>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  set({ status: "user", user });
  await pull(true);
}

export async function logOut() {
  if (pending) await push(getState()); // don't lose the last change
  await api("/api/auth/logout", { method: "POST", body: "{}" }).catch(() => {});
  clearTimeout(timer);
  pending = false;
  lastSynced = null;
  set({ status: "guest", user: null, sync: "idle" });
  setFromRemote(EMPTY_STATE); // progress stays safe in the account; this device is cleared
}
