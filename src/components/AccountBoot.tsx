"use client";

import { useEffect } from "react";
import { startAccount } from "@/lib/account";

/** Checks the login session once per page load and starts cloud sync. */
export default function AccountBoot() {
  useEffect(() => startAccount(), []);
  return null;
}
