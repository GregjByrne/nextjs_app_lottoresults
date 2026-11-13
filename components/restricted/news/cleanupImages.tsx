"use client";

import { useState } from "react";
import { findUnused, deleteUnused } from "@/app/(restrictedAccount)/admin/news/actions";

export default function CleanupImages() {
  const [keys, setKeys] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<number | null>(null);

  async function scan() {
    setBusy(true); setDone(null);
    setKeys(await findUnused());
    setBusy(false);
  }

  async function remove() {
    setBusy(true);
    setDone(await deleteUnused());
    setKeys(null);
    setBusy(false);
  }

  return (
    <div className="rounded-lg bg-white p-4 text-sm text-gray-900">
      <div className="flex items-center gap-3">
        <button onClick={scan} disabled={busy} className="rounded-md border border-gray-400 px-3 py-1.5 disabled:opacity-50">
          {busy ? "Working…" : "Find unused images"}
        </button>
        {keys && keys.length > 0 && (
          <button onClick={remove} disabled={busy} className="rounded-md bg-red-600 px-3 py-1.5 text-white disabled:opacity-50">
            Delete {keys.length} unused
          </button>
        )}
        {keys && keys.length === 0 && <span>Nothing to clean up.</span>}
        {done !== null && <span>Deleted {done} image{done === 1 ? "" : "s"}.</span>}
      </div>
      {keys && keys.length > 0 && (
        <ul className="mt-3 max-h-40 overflow-auto font-mono text-xs text-gray-600">
          {keys.map((k) => <li key={k}>{k}</li>)}
        </ul>
      )}
    </div>
  );
}