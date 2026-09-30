"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { resetPassword } from "@/lib/account";

const readToken = () => new URLSearchParams(window.location.search).get("token") ?? "";

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = useSyncExternalStore(() => () => {}, readToken, () => null); // null while server-rendering
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) return setError("The two passwords don't match.");
    setBusy(true);
    try {
      await resetPassword(token!, password);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setBusy(false);
    }
  };

  if (token === null) return <div className="card h-64 p-8" />;

  if (!token) {
    return (
      <div className="card p-6 md:p-8">
        <h1 className="text-2xl font-bold">Invalid reset link</h1>
        <p className="mt-2 text-sm text-muted">This link is missing its code. Open the link from your email again, or request a new one.</p>
        <Link href="/forgot-password" className="btn-primary mt-6">
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-6 md:p-8">
      <h1 className="text-2xl font-bold">Choose a new password</h1>
      <p className="mt-1 text-sm text-muted">After this, you&apos;ll be logged in here and signed out on every other device.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="label">New password</span>
          <div className="relative">
            <input
              className="input pr-16"
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute inset-y-0 right-2 text-xs text-muted hover:text-ink">
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          <span className="mt-1 block text-xs text-muted">At least 8 characters.</span>
        </label>
        <label className="block">
          <span className="label">Confirm new password</span>
          <input
            className="input"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
          />
        </label>
        {error && (
          <p role="alert" className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {error}{" "}
            {error.includes("expired") && (
              <Link href="/forgot-password" className="underline">
                Get a new link
              </Link>
            )}
          </p>
        )}
        <button className="btn-primary w-full" disabled={busy}>
          {busy ? "Saving…" : "Save new password"}
        </button>
      </form>
    </div>
  );
}
