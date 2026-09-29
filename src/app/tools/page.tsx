"use client";

import { useState } from "react";
import BeamCalc from "@/components/tools/BeamCalc";
import { ConcreteCalc, EconCalc, ManningCalc, SectionCalc, UnitCalc } from "@/components/tools/OtherCalcs";
import { PageHeader } from "@/components/ui";

const TOOLS = [
  { id: "beam", label: "Beam analysis", desc: "Reactions, shear, moment and deflection diagrams for a simply supported beam.", C: BeamCalc },
  { id: "section", label: "Section properties", desc: "Area, moment of inertia, section modulus and radius of gyration.", C: SectionCalc },
  { id: "manning", label: "Open channel (Manning)", desc: "Velocity and discharge for rectangular and trapezoidal channels.", C: ManningCalc },
  { id: "concrete", label: "Concrete estimator", desc: "Order quantities for slabs, footings and piers.", C: ConcreteCalc },
  { id: "econ", label: "Engineering economics", desc: "F/P, P/F and A/P factors: future worth and annual payments.", C: EconCalc },
  { id: "units", label: "Unit converter", desc: "US ↔ SI for length, force, stress, moment, flow and more.", C: UnitCalc },
];

export default function ToolsPage() {
  const [id, setId] = useState("beam");
  const t = TOOLS.find((x) => x.id === id)!;

  return (
    <div>
      <PageHeader
        kicker="Engineering calculators"
        title="Tools"
        subtitle="Use these to CHECK your hand calculations, not replace them. On the FE exam and on the job, you must be able to do every one of these by hand."
      />
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {TOOLS.map((x) => (
          <button
            key={x.id}
            onClick={() => setId(x.id)}
            className={`shrink-0 rounded-lg border px-3 py-2 text-sm transition-colors ${
              id === x.id ? "border-accent bg-accent/10 text-accent" : "border-line text-muted hover:text-ink"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <section className="card p-5 md:p-6">
        <h2 className="text-xl font-semibold">{t.label}</h2>
        <p className="mb-6 text-sm text-muted">{t.desc}</p>
        <t.C />
      </section>
    </div>
  );
}
