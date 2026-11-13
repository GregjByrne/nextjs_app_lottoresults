import { connection } from "next/server";
import { getHotColdWindows, type Ball, type WindowStats } from "@/lib/analytics/windows";

const dateFmt = new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const d = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`));

function Chips({ balls, tone }: { balls: Ball[]; tone: "hot" | "cold" }) {
  const cls = tone === "hot"
    ? "border-amber-400 bg-amber-100 text-amber-900"
    : "border-blue-400 bg-blue-100 text-blue-900";
  return (
    <ul className="flex flex-wrap gap-2">
      {balls.map((b) => (
        <li key={b.number} className={`flex flex-col items-center rounded-full border px-3 py-1 text-xs ${cls}`}>
          <span className="text-sm font-bold">{b.number}</span>
          <span>{b.count}×</span>
        </li>
      ))}
    </ul>
  );
}

function Card({ w, noun }: { w: WindowStats; noun: string }) {
  const topHot = w.hot[0];
  const topCold = w.cold[0];
  const hotVerdict = topHot.count > w.chance.hotHigh ? "higher than chance usually produces" : "within the normal range for chance";
  const coldVerdict = topCold.count < w.chance.coldLow ? "lower than chance usually produces" : "within the normal range for chance";

  return (
    <section className="rounded-md border border-gray-400 bg-white p-4 shadow">
      <h3 className="text-base font-semibold text-gray-900">{w.label}</h3>
      <p className="text-xs text-gray-600">{d(w.from)} – {d(w.to)} · {w.size} draws</p>
      {w.size < 30 && (
        <p className="mt-1 rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-900">
          Very small sample: differences here are mostly random.
        </p>
      )}

      <h4 className="mt-3 text-sm font-medium text-gray-800">Most drawn</h4>
      <Chips balls={w.hot} tone="hot" />
      <p className="mt-1 text-xs text-gray-700">
        In a fair draw of this length the most-drawn {noun} typically appears {w.chance.hotTypical}× (almost never more
        than {w.chance.hotHigh}×). Here it appeared {topHot.count}×: {hotVerdict}.
      </p>

      <h4 className="mt-3 text-sm font-medium text-gray-800">Least drawn</h4>
      <Chips balls={w.cold} tone="cold" />
      <p className="mt-1 text-xs text-gray-700">
        Chance typically leaves the least-drawn {noun} at {w.chance.coldTypical}× (rarely fewer than {w.chance.coldLow}×).
        Here it was {topCold.count}×: {coldVerdict}.
      </p>
    </section>
  );
}

export default async function HotColdWindows({
    lottoCatId, 
    part = "main", 
    heading = "Most and Least Drawn Numbers", 
    noun = "number", 
    top = 5,
  }: { lottoCatId: number; part?: "main" | "extra"; heading?: string; noun?: string; top?: number }) {
  await connection();
  const { available, since, windows } = await getHotColdWindows(lottoCatId, part, top);
  if (windows.length === 0) return null;

  return (

        <div className="my-2 mb-4 pb-2 border-b border-gray-400">
            <h2 className="text-lg font-semibold text-white">{heading}</h2>
            {available < 50 && (
                <p className="text-sm text-gray-200">
                Only {available} draws have been played under the current rules (since {d(since)}), so longer windows
                aren&apos;t available yet.
                </p>
            )}
            <div className="mt-2 grid gap-3 md:grid-cols-3">
                {windows.map((w) => <Card key={w.size} w={w} noun={noun} />)}
            </div>
            <p className="mt-2 text-xs text-gray-200">
                Past frequency does not predict future draws. Ties are listed lowest number first.
            </p>
        </div>

  );
}