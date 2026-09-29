"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logOut, useAccount } from "@/lib/account";
import { ALL_TASKS } from "@/lib/roadmap";
import { useAppState, useHydrated } from "@/lib/store";

const LINKS = [
  { href: "/", label: "Dashboard", icon: "◧" },
  { href: "/roadmap", label: "Roadmap", icon: "⟶" },
  { href: "/practice", label: "Practice (FE)", icon: "✎" },
  { href: "/tools", label: "Calculators", icon: "∑" },
  { href: "/log", label: "Study Log", icon: "◷" },
  { href: "/license", label: "License Path", icon: "⚑" },
  { href: "/free", label: "Is it free?", icon: "$" },
  { href: "/settings", label: "Backup & Settings", icon: "⚙" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { done } = useAppState();
  const hydrated = useHydrated();
  const pct = Math.round((done.filter((d) => ALL_TASKS.some((t) => t.id === d)).length / ALL_TASKS.length) * 100);

  // exact segment match, so "/log" doesn't light up on "/login"
  const isActive = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));

  return (
    <aside className="border-line bg-panel/95 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-r">
      <div className="flex items-center justify-between px-5 py-4 md:py-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Logo />
          <span className="text-lg font-bold tracking-tight">
            LearnCivil<span className="text-accent">WithMe</span>
          </span>
        </Link>
        <button
          className="btn-ghost px-3 py-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <nav className={`${open ? "block" : "hidden"} px-3 pb-4 md:block`}>
        <ul className="space-y-1">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive(l.href) ? "bg-accent/15 font-medium text-accent" : "text-muted hover:bg-panel-2 hover:text-ink"
                }`}
              >
                <span className="w-4 text-center font-mono">{l.icon}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-3 mt-6 rounded-lg border border-line bg-bg/60 p-3">
          <div className="mb-2 flex justify-between text-xs text-muted">
            <span>Road to PE</span>
            <span className="font-mono text-ink">{hydrated ? pct : 0}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${hydrated ? pct : 0}%` }} />
          </div>
        </div>

        <AccountBox onNavigate={() => setOpen(false)} />
      </nav>
    </aside>
  );
}

const SYNC_TEXT = {
  idle: ["", ""],
  saving: ["Saving…", "text-muted"],
  saved: ["Synced to your account ✓", "text-emerald-300"],
  offline: ["Offline — saved on this device", "text-amber-300"],
} as const;

function AccountBox({ onNavigate }: { onNavigate: () => void }) {
  const acct = useAccount();
  const [busy, setBusy] = useState(false);

  if (acct.status === "loading") return <div className="mx-3 mt-3 h-[58px]" />;

  if (acct.status === "guest") {
    return (
      <div className="mx-3 mt-3 rounded-lg border border-line bg-bg/60 p-3">
        <p className="text-xs text-muted">Progress is saved on this device only.</p>
        <Link href="/login" onClick={onNavigate} className="btn-primary mt-2 w-full py-1.5">
          Log in / Sign up
        </Link>
      </div>
    );
  }

  const [text, cls] = SYNC_TEXT[acct.sync];
  return (
    <div className="mx-3 mt-3 rounded-lg border border-line bg-bg/60 p-3">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
          {acct.user!.name.slice(0, 1).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{acct.user!.name}</p>
          <p className="truncate text-[11px] text-muted">{acct.user!.email}</p>
        </div>
      </div>
      {text && <p className={`mt-2 text-[11px] ${cls}`}>{text}</p>}
      <button
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          await logOut();
          setBusy(false);
        }}
        className="btn-ghost mt-2 w-full py-1.5 text-xs"
      >
        {busy ? "Logging out…" : "Log out"}
      </button>
    </div>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="7" fill="#f5a524" />
      {/* a little truss bridge */}
      <path d="M4 22h24M6 22l5-9h10l5 9M11 13l5 9 5-9" stroke="#0a1020" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}
