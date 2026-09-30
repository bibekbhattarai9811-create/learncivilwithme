"use client";

import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/lib/account";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card p-6 md:p-8">
      <h1 className="text-2xl font-bold">Forgot your password?</h1>
      {sent ? (
        <>
          <p className="mt-3 text-sm text-muted">
            If an account exists for <span className="text-ink">{email}</span>, we&apos;ve sent a link to reset the password. It works once
            and expires in 1 hour.
          </p>
          <p className="mt-3 text-sm text-muted">No email after a few minutes? Check your spam folder, or try again.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/login" className="btn-primary">
              Back to log in
            </Link>
            <button onClick={() => setSent(false)} className="btn-ghost">
              Try another email
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-1 text-sm text-muted">Enter your account email and we&apos;ll send you a link to choose a new password.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="label">Email</span>
              <input className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            {error && (
              <p role="alert" className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                {error}
              </p>
            )}
            <button className="btn-primary w-full" disabled={busy}>
              {busy ? "Sending…" : "Send reset link"}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-muted">
            Remembered it?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Log in
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
