"use client";

import { useState } from "react";
import { Diagram, Num, Out, Seg } from "./common";

type Units = "us" | "si";
type Load = "point" | "udl";

const U = {
  us: { L: "ft", P: "kip", w: "kip/ft", E: "ksi", I: "in⁴", M: "kip·ft", V: "kip", d: "in" },
  si: { L: "m", P: "kN", w: "kN/m", E: "GPa", I: "×10⁶ mm⁴", M: "kN·m", V: "kN", d: "mm" },
};

/**
 * Simply supported beam. Shear/moment are computed in the display units
 * (kip, ft or kN, m). Deflection is computed in consistent units:
 * US → kip & inch; SI → kN & metre (then shown in mm).
 */
export function solveBeam(units: Units, load: Load, L: number, P: number, a: number, w: number, E: number, I: number) {
  const n = 200;
  const xs = Array.from({ length: n + 1 }, (_, i) => (i / n) * L);

  let Ra: number, Rb: number;
  let V: (x: number) => number, M: (x: number) => number;
  if (load === "point") {
    Ra = (P * (L - a)) / L;
    Rb = (P * a) / L;
    V = (x) => (x < a ? Ra : Ra - P);
    M = (x) => (x <= a ? Ra * x : Ra * x - P * (x - a));
  } else {
    Ra = Rb = (w * L) / 2;
    V = (x) => Ra - w * x;
    M = (x) => (w * x * (L - x)) / 2;
  }

  // consistent units for deflection
  const lf = units === "us" ? 12 : 1; // length factor to calc units
  const Ec = units === "us" ? E : E * 1e6; // ksi or kN/m²
  const Ic = units === "us" ? I : I * 1e-6; // in⁴ or m⁴
  const Lc = L * lf;
  const EI = Ec * Ic;
  const y = (xDisp: number) => {
    const x = xDisp * lf;
    if (load === "udl") {
      const wc = w / lf;
      return (wc * x * (Lc ** 3 - 2 * Lc * x * x + x ** 3)) / (24 * EI);
    }
    const ac = a * lf;
    const bc = Lc - ac;
    if (x <= ac) return (P * bc * x * (Lc * Lc - bc * bc - x * x)) / (6 * EI * Lc);
    const xr = Lc - x;
    return (P * ac * xr * (Lc * Lc - ac * ac - xr * xr)) / (6 * EI * Lc);
  };
  const toDisp = units === "us" ? 1 : 1000; // in → in, m → mm

  // show shear just left of a point load's jump so the max is correct
  const Vs = xs.map((x) => V(x));
  const Ms = xs.map((x) => M(x));
  const Ds = xs.map((x) => y(x) * toDisp);
  return { xs, Ra, Rb, Vs, Ms, Ds };
}

export default function BeamCalc() {
  const [units, setUnits] = useState<Units>("us");
  const [load, setLoad] = useState<Load>("udl");
  const [L, setL] = useState(20);
  const [P, setP] = useState(10);
  const [a, setA] = useState(10);
  const [w, setW] = useState(1.5);
  const [E, setE] = useState(29000);
  const [I, setI] = useState(350);
  const u = U[units];

  const switchUnits = (next: Units) => {
    if (next === units) return;
    setUnits(next);
    if (next === "si") {
      setL(6); setP(40); setA(3); setW(20); setE(200); setI(150);
    } else {
      setL(20); setP(10); setA(10); setW(1.5); setE(29000); setI(350);
    }
  };

  const valid = [L, E, I].every((v) => v > 0) && (load === "udl" ? w >= 0 : P >= 0 && a >= 0 && a <= L);
  const r = valid ? solveBeam(units, load, L, P, a, w, E, I) : null;
  const dMax = r ? Math.max(...r.Ds.map(Math.abs)) : NaN;
  const lim = (L * (units === "us" ? 12 : 1000)) / 360;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex flex-wrap gap-3">
          <Seg value={units} onChange={switchUnits} options={[{ v: "us", label: "US" }, { v: "si", label: "SI" }]} />
          <Seg value={load} onChange={setLoad} options={[{ v: "udl", label: "Uniform load" }, { v: "point", label: "Point load" }]} />
        </div>
        <BeamSketch load={load} a={a} L={L} />
        <Num label="Span L" value={L} onChange={setL} unit={u.L} />
        {load === "udl" ? (
          <Num label="Uniform load w" value={w} onChange={setW} unit={u.w} />
        ) : (
          <>
            <Num label="Point load P" value={P} onChange={setP} unit={u.P} />
            <Num label="Distance a from left support" value={a} onChange={setA} unit={u.L} />
          </>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Num label="Modulus E" value={E} onChange={setE} unit={u.E} />
          <Num label="Inertia I" value={I} onChange={setI} unit={u.I} />
        </div>
        <p className="text-xs text-muted">Tip: steel E = 29,000 ksi (200 GPa). Look up I for W-shapes in the AISC tables, or use the Section Properties tool.</p>
      </div>

      <div className="space-y-4 lg:col-span-3">
        {!r ? (
          <p className="card p-6 text-sm text-rose-300">Check inputs: span, E and I must be positive, and 0 ≤ a ≤ L.</p>
        ) : (
          <>
            <div className="card p-4">
              <Out label="Left reaction Ra" value={r.Ra} unit={u.V} />
              <Out label="Right reaction Rb" value={r.Rb} unit={u.V} />
              <Out label="Max shear |V|" value={Math.max(...r.Vs.map(Math.abs))} unit={u.V} />
              <Out label="Max moment M" value={Math.max(...r.Ms)} unit={u.M} strong />
              <Out label="Max deflection" value={dMax} unit={u.d} strong />
              <Out
                label="Live-load limit L/360"
                value={`${lim.toFixed(units === "us" ? 2 : 1)} ${u.d} → ${dMax <= lim ? "OK ✓" : "EXCEEDS ✗"}`}
              />
            </div>
            <Diagram title="Shear V" xs={r.xs} ys={r.Vs} color="#38bdf8" unit={u.V} />
            <Diagram title="Moment M" xs={r.xs} ys={r.Ms} color="#f5a524" unit={u.M} invert />
            <Diagram title="Deflection" xs={r.xs} ys={r.Ds} color="#a78bfa" unit={u.d} />
            <p className="text-xs text-muted">
              Formulas: UDL M = wL²/8, Δ = 5wL⁴/384EI. Point load M = Pab/L. Always verify by hand before using a result.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function BeamSketch({ load, a, L }: { load: Load; a: number; L: number }) {
  const px = 30 + Math.min(1, Math.max(0, a / (L || 1))) * 240;
  return (
    <svg viewBox="0 0 300 80" className="w-full rounded-lg border border-line bg-bg/70">
      <rect x="30" y="44" width="240" height="8" fill="#8b9bb8" />
      <path d="M30 52 l-9 14 h18 z" fill="none" stroke="#e6ecf7" strokeWidth="1.5" />
      <circle cx="270" cy="60" r="7" fill="none" stroke="#e6ecf7" strokeWidth="1.5" />
      {load === "udl" ? (
        <>
          <rect x="30" y="22" width="240" height="4" fill="#f5a524" opacity="0.6" />
          {Array.from({ length: 9 }, (_, i) => 30 + i * 30).map((x) => (
            <path key={x} d={`M${x} 26 v14 m-4 -5 l4 5 l4 -5`} stroke="#f5a524" strokeWidth="1.5" fill="none" />
          ))}
        </>
      ) : (
        <path d={`M${px} 10 v30 m-6 -8 l6 8 l6 -8`} stroke="#f5a524" strokeWidth="2.5" fill="none" />
      )}
    </svg>
  );
}
