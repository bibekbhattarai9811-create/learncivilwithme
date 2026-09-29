import Link from "next/link";
import { ALL_RESOURCES, ALL_TASKS } from "@/lib/roadmap";
import { CostBadge, PageHeader, ResourceLink } from "@/components/ui";

export const metadata = { title: "Is it free? — LearnCivilWithMe" };

const UNAVOIDABLE = [
  { item: "FE Civil exam", cost: "$225", when: "Year ~2", note: "Paid to NCEES. Required for everyone." },
  { item: "PE Civil exam + state license", cost: "Several hundred $", when: "Year ~6+", note: "NCEES exam fee plus your state board's application fee." },
  { item: "FE-approved calculator", cost: "~$20", when: "Now", note: "TI-36X Pro or Casio fx-115ES PLUS." },
];

const OPTIONAL = [
  { item: "NCEES official FE practice exam", note: "Small fee. The closest thing to the real exam, so it's worth buying once near exam time." },
  { item: "OSHA 30, ACI, NICET certificates", note: "Help you get hired. Employers often pay for these, so ask first." },
  { item: "Autodesk certification exam", note: "Not needed. A portfolio proves the same skill for free." },
  { item: "Printed textbooks (Hibbeler, Das, McCormac…)", note: "Nice to have. Every subject here has a free textbook or video course instead." },
];

const SWAPS = [
  ["AutoCAD / Civil 3D / Revit ($2,000+/yr)", "Free Autodesk student license, or LibreCAD / FreeCAD"],
  ["SAP2000 / ETABS / RISA (thousands $)", "Ftool (free), OpenSees (free); your employer provides the paid tools"],
  ["Microsoft Excel / Project", "LibreOffice Calc, Google Sheets, ProjectLibre (all free)"],
  ["Paid textbooks ($150–$300 each)", "OpenStax, LibreTexts, MIT OCW, Verruijt, Engineering Statics (all free)"],
  ["Paid FE review courses ($300–$1,500)", "This site's practice + free NCEES Handbook + NPTEL/MIT lectures"],
  ["ACI 318 / AISC Manual (paid codes)", "FE Handbook has the equations you need; AISC 360 spec is a free download"],
];

export default function FreePage() {
  const counts = { free: 0, student: 0, paid: 0 };
  ALL_RESOURCES.forEach((r) => counts[r.cost]++);
  const linked = ALL_TASKS.filter((t) => t.links?.length).length;
  const freeList = ALL_RESOURCES.filter((r) => r.cost === "free").sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div>
      <PageHeader
        kicker="Cost breakdown"
        title="Is this roadmap free?"
        subtitle="Yes. Every subject you need to learn has a free source, and no subscription is needed anywhere. The only unavoidable costs are the official exams."
      />

      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <CostBadge cost="free" />
          <p className="mt-2 font-mono text-3xl font-bold">{counts.free}</p>
          <p className="text-sm text-muted">free resources: courses, textbooks, software</p>
        </div>
        <div className="card p-5">
          <CostBadge cost="student" />
          <p className="mt-2 font-mono text-3xl font-bold">{counts.student}</p>
          <p className="text-sm text-muted">free with a student account (Autodesk, ASCE)</p>
        </div>
        <div className="card p-5">
          <CostBadge cost="paid" />
          <p className="mt-2 font-mono text-3xl font-bold">{counts.paid}</p>
          <p className="text-sm text-muted">paid items: only exams and optional certificates</p>
        </div>
      </section>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <section className="card p-5">
          <h2 className="mb-3 font-semibold">Costs you can&apos;t avoid</h2>
          <ul className="divide-y divide-line">
            {UNAVOIDABLE.map((u) => (
              <li key={u.item} className="flex items-start justify-between gap-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">{u.item}</p>
                  <p className="text-xs text-muted">{u.note}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-accent">{u.cost}</p>
                  <p className="text-xs text-muted">{u.when}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">FE fee checked on ncees.org, Sept 2026. Fees change, so check before you register.</p>
        </section>

        <section className="card p-5">
          <h2 className="mb-3 font-semibold">Optional costs (you can skip all of these)</h2>
          <ul className="space-y-3">
            {OPTIONAL.map((o) => (
              <li key={o.item} className="text-sm">
                <span className="font-medium">{o.item}</span>
                <p className="text-xs text-muted">{o.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card mb-8 overflow-x-auto p-5">
        <h2 className="mb-3 font-semibold">Paid things → free replacements used in this roadmap</h2>
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr className="border-b border-line">
              <th className="py-2 pr-4">Usually paid</th>
              <th className="py-2">Free option</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {SWAPS.map(([a, b]) => (
              <tr key={a}>
                <td className="py-2.5 pr-4 text-muted line-through decoration-rose-400/60">{a}</td>
                <td className="py-2.5 text-emerald-300">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-semibold">All {freeList.length} free resources in the roadmap</h2>
          <Link href="/roadmap" className="text-sm text-accent hover:underline">
            {linked} tasks have exact &quot;Start here&quot; links →
          </Link>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {freeList.map((r) => (
            <ResourceLink key={r.url + r.label} r={r} />
          ))}
        </div>
      </section>

      <p className="text-xs text-muted">
        About NPTEL: its video courses are free to watch. Only the optional proctored certificate exam costs money, and you don&apos;t need it. A few NPTEL design courses use Indian codes; the engineering is the same, only the code factors differ from US codes.
      </p>
    </div>
  );
}
