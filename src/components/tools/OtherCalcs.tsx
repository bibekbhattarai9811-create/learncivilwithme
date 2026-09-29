"use client";

import { useState } from "react";
import { Num, Out, Seg, fmt } from "./common";

/* ───────────────────────── Section properties ───────────────────────── */

type Shape = "rect" | "circle" | "ibeam";

export function sectionProps(shape: Shape, d: Record<string, number>) {
  if (shape === "rect") {
    const { b, h } = d;
    const A = b * h, Ix = (b * h ** 3) / 12, Iy = (h * b ** 3) / 12;
    return { A, Ix, Iy, Sx: Ix / (h / 2), Sy: Iy / (b / 2), rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A) };
  }
  if (shape === "circle") {
    const { D } = d;
    const A = (Math.PI * D ** 2) / 4, I = (Math.PI * D ** 4) / 64;
    return { A, Ix: I, Iy: I, Sx: I / (D / 2), Sy: I / (D / 2), rx: D / 4, ry: D / 4 };
  }
  const { bf, tf, dd, tw } = d;
  const hw = dd - 2 * tf;
  const A = 2 * bf * tf + hw * tw;
  const Ix = (bf * dd ** 3 - (bf - tw) * hw ** 3) / 12;
  const Iy = (2 * tf * bf ** 3) / 12 + (hw * tw ** 3) / 12;
  return { A, Ix, Iy, Sx: Ix / (dd / 2), Sy: Iy / (bf / 2), rx: Math.sqrt(Ix / A), ry: Math.sqrt(Iy / A) };
}

export function SectionCalc() {
  const [shape, setShape] = useState<Shape>("rect");
  const [b, setB] = useState(4);
  const [h, setH] = useState(12);
  const [D, setD] = useState(10);
  const [bf, setBf] = useState(8);
  const [tf, setTf] = useState(0.5);
  const [dd, setDd] = useState(16);
  const [tw, setTw] = useState(0.3);
  const r = sectionProps(shape, { b, h, D, bf, tf, dd, tw });
  const ok = Object.values(r).every((v) => Number.isFinite(v) && v > 0) && (shape !== "ibeam" || (2 * tf < dd && tw <= bf));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Seg value={shape} onChange={setShape} options={[{ v: "rect", label: "Rectangle" }, { v: "circle", label: "Circle" }, { v: "ibeam", label: "I-shape" }]} />
        <p className="text-xs text-muted">Use any consistent length unit (in or mm). Results are in that unit², ³, ⁴.</p>
        {shape === "rect" && (
          <div className="grid grid-cols-2 gap-3">
            <Num label="Width b" value={b} onChange={setB} />
            <Num label="Depth h" value={h} onChange={setH} />
          </div>
        )}
        {shape === "circle" && <Num label="Diameter D" value={D} onChange={setD} />}
        {shape === "ibeam" && (
          <div className="grid grid-cols-2 gap-3">
            <Num label="Flange width bf" value={bf} onChange={setBf} />
            <Num label="Flange thickness tf" value={tf} onChange={setTf} />
            <Num label="Total depth d" value={dd} onChange={setDd} />
            <Num label="Web thickness tw" value={tw} onChange={setTw} />
          </div>
        )}
      </div>
      <div className="card p-4">
        {ok ? (
          <>
            <Out label="Area A" value={r.A} />
            <Out label="Moment of inertia Ix" value={r.Ix} strong />
            <Out label="Moment of inertia Iy" value={r.Iy} />
            <Out label="Section modulus Sx = Ix / c" value={r.Sx} strong />
            <Out label="Section modulus Sy" value={r.Sy} />
            <Out label="Radius of gyration rx" value={r.rx} />
            <Out label="Radius of gyration ry" value={r.ry} />
          </>
        ) : (
          <p className="text-sm text-rose-300">Check dimensions (all positive; 2·tf &lt; d; tw ≤ bf).</p>
        )}
        <p className="mt-3 text-xs text-muted">I-shape ignores fillets, so real AISC table values are slightly higher.</p>
      </div>
    </div>
  );
}

/* ───────────────────────── Concrete estimator ───────────────────────── */

export function ConcreteCalc() {
  const [kind, setKind] = useState<"slab" | "column">("slab");
  const [len, setLen] = useState(20);
  const [wid, setWid] = useState(10);
  const [thk, setThk] = useState(4);
  const [dia, setDia] = useState(12);
  const [ht, setHt] = useState(8);
  const [qty, setQty] = useState(1);
  const [waste, setWaste] = useState(10);

  const ft3 = (kind === "slab" ? len * wid * (thk / 12) : Math.PI * (dia / 12 / 2) ** 2 * ht) * qty;
  const total = ft3 * (1 + waste / 100);
  const yd3 = total / 27;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Seg value={kind} onChange={setKind} options={[{ v: "slab", label: "Slab / footing" }, { v: "column", label: "Round column / pier" }]} />
        {kind === "slab" ? (
          <div className="grid grid-cols-2 gap-3">
            <Num label="Length" value={len} onChange={setLen} unit="ft" />
            <Num label="Width" value={wid} onChange={setWid} unit="ft" />
            <Num label="Thickness" value={thk} onChange={setThk} unit="in" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Num label="Diameter" value={dia} onChange={setDia} unit="in" />
            <Num label="Height" value={ht} onChange={setHt} unit="ft" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Num label="Quantity" value={qty} onChange={setQty} step="1" min={1} />
          <Num label="Waste allowance" value={waste} onChange={setWaste} unit="%" />
        </div>
      </div>
      <div className="card p-4">
        <Out label="Net volume" value={ft3} unit="ft³" />
        <Out label="Order volume (with waste)" value={total} unit="ft³" />
        <Out label="Order volume" value={yd3} unit="yd³" strong />
        <Out label="Metric" value={total * 0.0283168} unit="m³" />
        <Out label="80 lb premix bags (0.60 ft³ each)" value={Math.ceil(total / 0.6)} unit="bags" />
        <Out label="60 lb premix bags (0.45 ft³ each)" value={Math.ceil(total / 0.45)} unit="bags" />
        <p className="mt-3 text-xs text-muted">Ready-mix trucks usually carry up to ~10 yd³. Round orders up to the nearest ¼ yd³.</p>
      </div>
    </div>
  );
}

/* ───────────────────────── Manning's equation ───────────────────────── */

export function manning(units: "us" | "si", b: number, y: number, z: number, n: number, S: number) {
  const A = (b + z * y) * y;
  const P = b + 2 * y * Math.sqrt(1 + z * z);
  const R = A / P;
  const k = units === "us" ? 1.486 : 1.0;
  const V = (k / n) * R ** (2 / 3) * Math.sqrt(S);
  const T = b + 2 * z * y;
  const g = units === "us" ? 32.2 : 9.81;
  const Fr = V / Math.sqrt((g * A) / T);
  return { A, P, R, V, Q: V * A, Fr };
}

export function ManningCalc() {
  const [units, setUnits] = useState<"us" | "si">("us");
  const [b, setB] = useState(6);
  const [y, setY] = useState(2);
  const [z, setZ] = useState(2);
  const [n, setN] = useState(0.013);
  const [S, setS] = useState(0.005);
  const L = units === "us" ? "ft" : "m";
  const r = manning(units, b, y, z, n, S);
  const ok = b >= 0 && y > 0 && z >= 0 && n > 0 && S > 0 && b + z > 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Seg value={units} onChange={setUnits} options={[{ v: "us", label: "US (k = 1.486)" }, { v: "si", label: "SI (k = 1.0)" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Num label="Bottom width b" value={b} onChange={setB} unit={L} />
          <Num label="Flow depth y" value={y} onChange={setY} unit={L} />
          <Num label="Side slope z (H:1V)" value={z} onChange={setZ} unit="0 = rect." />
          <Num label="Manning n" value={n} onChange={setN} step="0.001" />
          <Num label="Slope S" value={S} onChange={setS} unit={`${L}/${L}`} step="0.0001" />
        </div>
        <div className="rounded-lg border border-line p-3 text-xs text-muted">
          <p className="mb-1 font-semibold text-ink">Typical n values</p>
          Finished concrete 0.012–0.013 · Corrugated metal 0.024 · Earth channel, clean 0.022 · Grass-lined 0.030–0.035 · Natural stream 0.035–0.05
        </div>
      </div>
      <div className="card p-4">
        {ok ? (
          <>
            <Out label="Flow area A" value={r.A} unit={`${L}²`} />
            <Out label="Wetted perimeter P" value={r.P} unit={L} />
            <Out label="Hydraulic radius R = A/P" value={r.R} unit={L} />
            <Out label="Velocity V" value={r.V} unit={`${L}/s`} strong />
            <Out label="Discharge Q = VA" value={r.Q} unit={units === "us" ? "cfs" : "m³/s"} strong />
            <Out label="Froude number" value={`${fmt(r.Fr)} (${r.Fr < 1 ? "subcritical" : r.Fr > 1 ? "supercritical" : "critical"})`} />
          </>
        ) : (
          <p className="text-sm text-rose-300">All inputs must be positive.</p>
        )}
        <p className="mt-3 text-xs text-muted">V = (k/n)·R^(2/3)·S^(1/2), uniform flow, trapezoidal channel.</p>
      </div>
    </div>
  );
}

/* ───────────────────────── Engineering economics ───────────────────────── */

export function EconCalc() {
  const [P, setP] = useState(100000);
  const [i, setI] = useState(6);
  const [n, setN] = useState(10);
  const r = i / 100;
  const g = (1 + r) ** n;
  const F = P * g;
  const A = r === 0 ? P / n : (P * r * g) / (g - 1);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Num label="Present amount P" value={P} onChange={setP} unit="$" />
        <Num label="Interest rate i" value={i} onChange={setI} unit="% / yr" />
        <Num label="Periods n" value={n} onChange={setN} unit="years" step="1" />
      </div>
      <div className="card p-4">
        <Out label="(F/P, i, n) = (1+i)ⁿ" value={g} />
        <Out label="(P/F, i, n) = 1/(1+i)ⁿ" value={1 / g} />
        <Out label="(A/P, i, n)" value={A / P} />
        <Out label="Future worth F" value={`$${fmt(F)}`} strong />
        <Out label="Equivalent annual payment A" value={`$${fmt(A)}`} strong />
        <Out label="Total paid over n years" value={`$${fmt(A * n)}`} />
        <p className="mt-3 text-xs text-muted">Check yourself against the interest tables in the FE Reference Handbook.</p>
      </div>
    </div>
  );
}

/* ───────────────────────── Unit converter ───────────────────────── */

const UNITS: Record<string, Record<string, number>> = {
  Length: { m: 1, mm: 0.001, cm: 0.01, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  Force: { N: 1, kN: 1000, lbf: 4.4482216, kip: 4448.2216, kgf: 9.80665 },
  "Stress / pressure": { Pa: 1, kPa: 1e3, MPa: 1e6, GPa: 1e9, psi: 6894.757, ksi: 6894757, psf: 47.880259, bar: 1e5 },
  Moment: { "N·m": 1, "kN·m": 1000, "lb·ft": 1.3558179, "lb·in": 0.11298483, "kip·ft": 1355.8179, "kip·in": 112.98483 },
  Area: { "m²": 1, "mm²": 1e-6, "ft²": 0.09290304, "in²": 0.00064516, acre: 4046.8564, hectare: 1e4 },
  Volume: { "m³": 1, L: 0.001, "ft³": 0.028316847, "yd³": 0.76455486, "gal (US)": 0.003785412 },
  Flow: { "m³/s": 1, "L/s": 0.001, cfs: 0.028316847, gpm: 6.3090196e-5, MGD: 0.043812636 },
  "Unit weight": { "kN/m³": 1, "N/m³": 0.001, pcf: 0.15708746 },
  "Distributed load": { "kN/m": 1, "N/m": 0.001, "kip/ft": 14.593903, "lb/ft": 0.014593903 },
};

export function UnitCalc() {
  const [cat, setCat] = useState("Length");
  const units = Object.keys(UNITS[cat]);
  const [from, setFrom] = useState("ft");
  const [val, setVal] = useState(1);
  const f = UNITS[cat][from] ?? UNITS[cat][units[0]];
  const base = val * f;

  const pickCat = (c: string) => {
    setCat(c);
    setFrom(Object.keys(UNITS[c])[0]);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <label className="block">
          <span className="label">Quantity</span>
          <select className="input" value={cat} onChange={(e) => pickCat(e.target.value)}>
            {Object.keys(UNITS).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Num label="Value" value={val} onChange={setVal} />
          <label className="block">
            <span className="label">From</span>
            <select className="input" value={from} onChange={(e) => setFrom(e.target.value)}>
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="card p-4">
        {units.map((u) => (
          <Out key={u} label={u} value={base / UNITS[cat][u]} strong={u === from} />
        ))}
      </div>
    </div>
  );
}
