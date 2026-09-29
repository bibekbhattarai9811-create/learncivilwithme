"use client";

import { useRef, useState } from "react";
import { exportData, importData, resetAll, todayISO } from "@/lib/store";
import { PageHeader } from "@/components/ui";

export default function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const download = () => {
    const blob = new Blob([exportData()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `learncivilwithme-backup-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setMsg({ ok: true, text: "Backup downloaded." });
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      importData(await f.text());
      setMsg({ ok: true, text: "Progress restored from backup." });
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Could not read that file." });
    }
    e.target.value = "";
  };

  return (
    <div className="max-w-2xl">
      <PageHeader
        kicker="Your data"
        title="Backup & settings"
        subtitle="Your progress lives only in this browser. Download a backup now and then, especially before clearing browser data or switching computers."
      />
      <div className="space-y-4">
        <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <h2 className="font-semibold">Export progress</h2>
            <p className="text-sm text-muted">Tasks, study log, quiz stats as a JSON file.</p>
          </div>
          <button onClick={download} className="btn-primary">
            Download backup
          </button>
        </div>
        <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <h2 className="font-semibold">Import progress</h2>
            <p className="text-sm text-muted">Replaces current progress with a backup file.</p>
          </div>
          <button onClick={() => fileRef.current?.click()} className="btn-ghost">
            Choose file…
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={onFile} />
        </div>
        <div className="card flex flex-wrap items-center justify-between gap-4 border-rose-500/30 p-5">
          <div>
            <h2 className="font-semibold text-rose-300">Reset everything</h2>
            <p className="text-sm text-muted">Clears all tasks, logs and quiz stats. Can&apos;t be undone.</p>
          </div>
          <button
            onClick={() => {
              if (confirm("Delete ALL your LearnCivilWithMe progress? This can't be undone.")) {
                resetAll();
                setMsg({ ok: true, text: "All progress cleared." });
              }
            }}
            className="btn border border-rose-500/50 text-rose-300 hover:bg-rose-500/10"
          >
            Reset
          </button>
        </div>
        {msg && <p className={`text-sm ${msg.ok ? "text-emerald-300" : "text-rose-300"}`}>{msg.text}</p>}
      </div>
    </div>
  );
}
