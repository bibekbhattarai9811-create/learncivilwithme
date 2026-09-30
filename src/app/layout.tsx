import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AccountBoot from "@/components/AccountBoot";
import AppShell from "@/components/AppShell";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnCivilWithMe — Self-study roadmap to Civil Engineer (PE)",
  description:
    "A complete self-study roadmap, practice questions, calculators and study tracker to become a professional civil engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AccountBoot />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
