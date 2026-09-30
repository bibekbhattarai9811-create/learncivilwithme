"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useGuestChoice } from "@/lib/account";
import Nav, { Logo } from "./Nav";

const AUTH_PAGES = ["/login", "/forgot-password", "/reset-password"];

/**
 * Asks visitors to log in first: anyone not logged in (and who hasn't chosen
 * "continue without an account" this session) is sent to /login.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const acct = useAccount();
  const guestOk = useGuestChoice();
  const isAuthPage = AUTH_PAGES.includes(path);
  const needLogin = acct.status === "guest" && !guestOk && !isAuthPage;

  useEffect(() => {
    if (needLogin) router.replace(path === "/" ? "/login" : `/login?next=${encodeURIComponent(path)}`);
  }, [needLogin, path, router]);

  if (isAuthPage) {
    return (
      <div className="flex min-h-screen flex-col items-center px-4 py-8">
        <Link href="/" className="mb-6 flex items-center gap-2">
          <Logo />
          <span className="text-lg font-bold tracking-tight">
            LearnCivil<span className="text-accent">WithMe</span>
          </span>
        </Link>
        <main className="w-full max-w-md">{children}</main>
      </div>
    );
  }

  if (acct.status === "loading" || needLogin) {
    return (
      <div className="flex min-h-screen items-center justify-center" aria-busy="true">
        <div className="flex items-center gap-3 text-muted">
          <Logo />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Nav />
      <main className="min-w-0 flex-1 px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
