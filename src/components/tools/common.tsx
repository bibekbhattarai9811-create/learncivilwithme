"use client";

export function Num({
  label,
  value,
  onChange,
  unit,
  step = "any",
  min,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  step?: string;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          className="input font-mono"
          value={Number.isFinite(value) ? value : ""}
          step={step}
          min={min}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
        />
        {unit && <span className="w-16 shrink-0 text-xs text-muted">{unit}</span>}
      </div>
    </label>
  );
}

export function Out({ label, value, unit, strong }: { label: string; value: number | string; unit?: string; strong?: boolean }) {
  const shown = typeof value === "number" ? fmt(value) : value;
  return (
    <div className={`flex items-baseline justify-between gap-3 border-b border-line/60 py-2 last:border-0 ${strong ? "text-accent" : ""}`}>
      <span className="text-sm text-muted">{label}</span>
      <span className="font-mono text-sm">
        {shown} {unit && <span className="text-muted">{unit}</span>}
      </span>
    </div>
  );
}

export function fmt(v: number) {
  if (!Number.isFinite(v)) return "—";
  const a = Math.abs(v);
  if (a !== 0 && (a >= 1e7 || a < 1e-3)) return v.toExponential(3);
  return v.toLocaleString("en-US", { maximumFractionDigits: a >= 100 ? 1 : a >= 1 ? 3 : 5 });
}

export function Seg<T extends string>({ value, options, onChange }: { value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-bg p-1">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`rounded-md px-3 py-1 text-sm transition-colors ${value === o.v ? "bg-accent text-black" : "text-muted hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** minimal SVG line/area chart for diagrams */
export function Diagram({
  title,
  xs,
  ys,
  color,
  unit,
  invert = false,
}: {
  title: string;
  xs: number[];
  ys: number[];
  color: string;
  unit: string;
  invert?: boolean; // plot positive values downward (deflection)
}) {
  const W = 600;
  const H = 150;
  const pad = 8;
  const xmax = xs[xs.length - 1] || 1;
  const ymax = Math.max(1e-12, ...ys.map((y) => Math.abs(y)));
  const sx = (x: number) => pad + (x / xmax) * (W - 2 * pad);
  const sy = (y: number) => H / 2 - (invert ? -1 : 1) * (y / ymax) * (H / 2 - 16);
  const pts = xs.map((x, i) => `${sx(x).toFixed(1)},${sy(ys[i]).toFixed(1)}`).join(" ");
  const area = `${sx(0)},${H / 2} ${pts} ${sx(xmax)},${H / 2}`;
  const iMax = ys.reduce((bi, y, i) => (Math.abs(y) > Math.abs(ys[bi]) ? i : bi), 0);

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-semibold uppercase tracking-wide text-muted">{title}</span>
        <span className="font-mono" style={{ color }}>
          max {fmt(ys[iMax])} {unit} @ x = {fmt(xs[iMax])}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg border border-line bg-bg/70">
        <line x1={pad} x2={W - pad} y1={H / 2} y2={H / 2} stroke="var(--color-line)" strokeWidth="1.5" />
        <polygon points={area} fill={color} opacity="0.15" />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
        <circle cx={sx(xs[iMax])} cy={sy(ys[iMax])} r="3.5" fill={color} />
      </svg>
    </div>
  );
}
