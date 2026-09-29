import Link from "next/link";
import { PageHeader } from "@/components/ui";

export const metadata = { title: "License Path (USA) — LearnCivilWithMe" };

const STEPS = [
  {
    t: "Learn the fundamentals",
    d: "Phases 1–4 of this roadmap. This is everything an accredited civil engineering program teaches, studied on your own schedule.",
    tag: "Now",
  },
  {
    t: "Work in the field",
    d: "Get hired as a drafter, technician, inspector, or survey tech. Log every week of experience with the name of your supervising engineer.",
    tag: "Month 9+",
  },
  {
    t: "Pass the FE Civil exam",
    d: "Computer-based at Pearson VUE, year-round. About 110 questions. The only reference is the NCEES Reference Handbook. Passing makes you eligible for Engineer Intern (EI/EIT) status.",
    tag: "Year 1.5–2",
  },
  {
    t: "Complete an accepted education route",
    d: "Most states require an ABET-accredited engineering degree. A part-time or online degree while you work is the most reliable path, and your self-study makes it much faster. A few states accept long experience (often 8–12+ years) instead.",
    tag: "Years 2–6",
  },
  {
    t: "Gain supervised experience",
    d: "Typically 4 years of progressive engineering experience under a licensed PE after your degree (more on experience-only routes). Keep detailed records and references.",
    tag: "Ongoing",
  },
  {
    t: "Pass the PE Civil exam",
    d: "Choose a depth area: Construction, Geotechnical, Structural, Transportation, or Water Resources & Environmental. Pass it and your state board issues your PE license.",
    tag: "Final",
  },
];

export default function LicensePage() {
  return (
    <div>
      <PageHeader
        kicker="United States"
        title="How to become a licensed PE"
        subtitle="Being skilled makes you an engineer at work. Being licensed lets you legally sign and seal drawings and call yourself a Professional Engineer. Here's the honest path."
      />

      <div className="card mb-8 border-amber-500/40 bg-amber-500/5 p-5 text-sm">
        <p className="font-semibold text-accent">The honest truth about skipping university</p>
        <p className="mt-2 text-muted">
          In the US, licensing is controlled by each <span className="text-ink">state board</span>, and most require an ABET-accredited
          degree. Self-study alone won&apos;t get you licensed in most states, but it can make you employable as a technician and get you through the FE.
          It also makes any degree you do later far easier and cheaper. <span className="text-ink">Requirements change, so always confirm your
          route in writing with your state board before committing years to it.</span>
        </p>
        <a href="https://ncees.org/licensing-boards/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sky-300 hover:underline">
          Find your state board on NCEES ↗
        </a>
      </div>

      <ol className="relative mb-10 space-y-4 border-l-2 border-line pl-6">
        {STEPS.map((s, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[37px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-bg font-mono text-[10px] text-accent">
              {i + 1}
            </span>
            <div className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">{s.t}</h2>
                <span className="rounded bg-bg px-2 py-0.5 font-mono text-xs text-muted">{s.tag}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mb-4 text-xl font-semibold">Three realistic routes</h2>
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {[
          {
            t: "A · Work + part-time/online degree",
            best: "Recommended",
            d: "Work as a technician and earn an ABET-accredited degree part-time or online. Many employers (DOTs and large firms especially) offer tuition assistance. You never stop earning.",
          },
          {
            t: "B · Experience-only route",
            best: "Limited states",
            d: "A small number of state boards accept many years of qualifying experience in place of a degree, sometimes with extra requirements. It's slow and the rules change. You may be limited to that state at first.",
          },
          {
            t: "C · Engineering Technology degree",
            best: "Middle path",
            d: "An ABET-accredited Civil Engineering Technology (ETAC) bachelor's is often cheaper and more hands-on. Some states accept it for PE with extra experience years.",
          },
        ].map((r) => (
          <div key={r.t} className="card p-5">
            <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-accent">{r.best}</span>
            <h3 className="mt-2 font-semibold">{r.t}</h3>
            <p className="mt-2 text-sm text-muted">{r.d}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-semibold">Jobs you can get before a license</h2>
      <div className="mb-10 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr className="border-b border-line">
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">What gets you hired</th>
              <th className="py-2">What you learn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {[
              ["CAD / BIM drafter", "AutoCAD, Civil 3D or Revit + portfolio", "How real plan sets are built"],
              ["Engineering technician", "Software + math + statics", "Design calcs under an engineer"],
              ["Materials testing tech", "ACI Field Testing, NICET", "Concrete, soil and asphalt behavior"],
              ["Survey technician", "Trig, surveying basics, Civil 3D", "Field data, grades, stakeout"],
              ["Construction inspector", "OSHA 30, NICET, reading plans", "How designs get built (and fail)"],
              ["Estimator assistant", "Excel, takeoffs, reading plans", "Costs, quantities, bidding"],
            ].map((r) => (
              <tr key={r[0]}>
                <td className="py-2.5 pr-4 font-medium">{r[0]}</td>
                <td className="py-2.5 pr-4 text-muted">{r[1]}</td>
                <td className="py-2.5 text-muted">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/roadmap/pe" className="btn-primary">
          Open the licensing checklist →
        </Link>
        <a href="https://ncees.org/exams/fe-exam/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
          NCEES FE exam ↗
        </a>
        <a href="https://ncees.org/exams/pe-exam/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
          NCEES PE exam ↗
        </a>
      </div>
    </div>
  );
}
