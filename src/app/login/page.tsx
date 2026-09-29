"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logIn, signUp, useAccount } from "@/lib/account";

export default function LoginPage() {
  const router = useRouter();
  const acct = useAccount();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") await signUp(name, email, password);
      else await logIn(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (acct.status === "user" && !busy) {
    return (
      <div className="card mx-auto mt-10 max-w-md p-8 text-center">
        <p className="text-lg font-semibold">You&apos;re logged in as {acct.user?.name}</p>
        <p className="mt-1 text-sm text-muted">{acct.user?.email}</p>
        <Link href="/" className="btn-primary mt-6">
          Go to dashboard →
        </Link>
      </div>
    );
  }

  const signup = mode === "signup";
  return (
    <div className="mx-auto mt-4 max-w-md md:mt-10">
      <div className="card p-6 md:p-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">LearnCivilWithMe account</p>
        <h1 className="text-2xl font-bold">{signup ? "Create your free account" : "Welcome back"}</h1>
        <p className="mt-1 text-sm text-muted">
          {signup
            ? "Save your roadmap progress, study log and quiz scores, and pick up on any device."
            : "Log in to sync your progress across all your devices."}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-lg border border-line bg-bg p-1" role="tablist">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setError("");
              }}
              className={`rounded-md py-1.5 text-sm transition-colors ${mode === m ? "bg-accent font-medium text-black" : "text-muted hover:text-ink"}`}
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {signup && (
            <label className="block">
              <span className="label">Name</span>
              <input className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={60} />
            </label>
          )}
          <label className="block">
            <span className="label">Email</span>
            <input className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label className="block">
            <span className="label">Password</span>
            <div className="relative">
              <input
                className="input pr-16"
                type={showPw ? "text" : "password"}
                autoComplete={signup ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={signup ? 8 : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute inset-y-0 right-2 text-xs text-muted hover:text-ink"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {signup && <span className="mt-1 block text-xs text-muted">At least 8 characters.</span>}
          </label>

          {error && (
            <p role="alert" className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}

          <button className="btn-primary w-full" disabled={busy}>
            {busy ? "Please wait…" : signup ? "Create account" : "Log in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          {signup ? "Already have an account? " : "New here? "}
          <button type="button" onClick={() => setMode(signup ? "login" : "signup")} className="text-accent hover:underline">
            {signup ? "Log in" : "Create a free account"}
          </button>
        </p>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Accounts are optional. Everything works without one; progress just stays on this device.
      </p>
    </div>
  );
}
