import { connection } from "next/server";
import { getLatestTypicality } from "@/lib/analytics/typicality";

const dateFmt = new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const TAG = {
  typical: "border-gray-400 bg-gray-100 text-gray-800",
  uncommon: "border-amber-400 bg-amber-100 text-amber-900",
  rare: "border-red-400 bg-red-100 text-red-900",
} as const;

export default async function DrawTypicality({ lottoCatId, label }: { lottoCatId: number; label: string }) {
  await connection();
  const t = await getLatestTypicality(lottoCatId);
  if (!t) return null;

  return (
     <div className=" mb-4 pb-2 border-b border-gray-400">
        <section className="my-2 w-full rounded-md border border-gray-400 bg-white p-4 shadow">
        <h2 className="text-lg font-semibold text-gray-900">How typical was the latest {label} draw?</h2>
        <p className="text-xs text-gray-600">{dateFmt.format(new Date(`${t.inputDate}T00:00:00Z`))}</p>

        <ul className="mt-2 flex flex-wrap gap-2">
            {t.numbers.map((n) => (
            <li key={n} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-400 bg-gray-100 text-sm font-bold text-gray-900">
                {n}
            </li>
            ))}
        </ul>

        <div className="mt-3">
            <p className="text-base font-semibold text-gray-900">{t.headline}</p>
            <div
            role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={t.score}
            aria-label="Typicality score"
            className="mt-1 h-3 w-full overflow-hidden rounded bg-gray-200"
            >
            <div className="h-full bg-indigo-600" style={{ width: `${t.score}%` }} />
            </div>
            <p className="mt-1 text-sm text-gray-700">
            Typicality score {t.score}/100: more typical than {t.score}% of random draws.
            </p>
        </div>

        <ul className="mt-3 divide-y divide-gray-200">
            {t.metrics.map((m) => (
            <li key={m.key} className="flex flex-wrap items-start justify-between gap-2 py-2">
                <div>
                <p className="text-sm font-medium text-gray-900">{m.label}: {m.value}</p>
                <p className="text-xs text-gray-600">{m.detail}</p>
                </div>
                <span className={`rounded border px-2 py-0.5 text-xs font-medium ${TAG[m.verdict]}`}>{m.verdict}</span>
            </li>
            ))}
        </ul>

        <p className="mt-2 text-xs text-gray-700">
            Compared with {t.simulated.toLocaleString("en-IE")} simulated fair draws. Every combination is equally likely
            to be drawn, so 1-2-3-4-5-6 is exactly as likely as any other. This score describes the shape of the numbers,
            not their chance of coming up, and it cannot predict the next draw.
        </p>
        </section>
    </div>
  );
}