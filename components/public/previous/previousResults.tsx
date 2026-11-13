import Link from "next/link";
import { Suspense } from "react";
import { PREVIOUS_GAMES, type GameKey } from "@/constants/previousResults";
import { getPreviousResults, type DrawRow } from "@/lib/results/previousResults";

function Ball({ n, kind }: { n: number; kind: "main" | "extra" | "star" }) {
  const style =
    kind === "main" ? "size-8 sm:size-9 bg-red-800 text-white"
    : kind === "star" ? "size-7 sm:size-8 bg-red-800 ring-red-800 ring-2 ring-offset-2 text-white mx-0.5"
    : "size-7 sm:size-8 bg-red-800 ring-red-800 ring-2 ring-offset-2 text-white";
  return (
    <span className={`inline-flex items-center justify-center rounded-full text-sm font-bold ${style}`}>
      {n}
    </span>
  );
}

function DrawLine({ d }: { d: DrawRow }) {
  const extraKind = d.extraLabel === "Lucky Stars" ? "star" : "extra";
  return (
    <div className="pb-5 flex lg:block border-b border-gray-300">
      <div className="flex flex-row flex-wrap gap-1 sm:gap-6 lg:gap-10">
        <div className="flex flex-col pr-1">
          <div className="leading-5 font-heading py-1.5 text-sm">{d.label}</div>
          <div className="flex flex-col space-y-4">
            <div className="flex gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
              {d.main.map((n, i) => (
                <div key={i} className="">
                  <Ball n={n} kind="main" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
         <div className="leading-5 font-heading py-1.5 text-sm">{d.extraLabel}</div>
          <div className="flex flex-col space-y-4">
            <div className="flex gap-1.5 sm:gap-1.5 md:gap-2 flex-wrap">
              {d.extra.map((n, i) => (
                <div key={i} className="">
                  <Ball n={n} kind={extraKind} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IE", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

async function Results({ game, searchParams }: { game: GameKey; searchParams: Promise<{ page?: string }> }) {
  const g = PREVIOUS_GAMES[game];
  const { page: p } = await searchParams;
  const page = Math.max(1, parseInt(p ?? "1", 10) || 1);
  const { rows, totalPages } = await getPreviousResults(game, page);

  if (rows.length === 0) {
    return (
      <p className="rounded-md bg-white p-4 text-gray-800">
        No results on this page. <Link href={g.href} className="text-indigo-700 underline">Back to the latest</Link>
      </p>
    );
  }

  const pageHref = (n: number) => (n === 1 ? g.href : `${g.href}?page=${n}`);

  return (
    <>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.date} className="rounded-lg bg-white py-4 px-1 sm:py-4 sm:px-4 shadow-sm">
            <span className="font-serif text-gray-500">
              <time dateTime={r.date}>{fmt(r.date)}</time>
            </span>
            <div className="divide-y divide-gray-100">
              {r.draws.map((d) => <DrawLine key={d.label} d={d} />)}
            </div>
          </li>
        ))}
      </ul>

      <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
        {page < totalPages ? (
          <Link href={pageHref(page + 1)} className="rounded-full bg-white px-2 sm:px-4 py-1 sm:py-2 text-gray-900 hover:bg-indigo-50">
            ← Older results
          </Link>
        ) : <span />}
        
        {page > 1 ? (
          <Link href={pageHref(page - 1)} className="rounded-full bg-white px-2 sm:px-4 py-1 sm:py-2 text-gray-900 hover:bg-indigo-50">
            Newer results →
          </Link>
        ) : <span />}
      </nav>
      <div className="flex justify-center h-4 w-full mt-2">
        <span className="text-gray-200">Page {page} of {totalPages}</span>
      </div>
    </>
  );
}

export default function PreviousResults({ game, searchParams }: { game: GameKey; searchParams: Promise<{ page?: string }> }) {
  return (
    <div className="w-full rounded-lg bg-gray-900/50 p-1 sm:p-6 lg:p-6 pb-4">
      <h2 className="flex justify-center flex-col gap-1 mb-4 text-xl font-bold text-white"><span>{PREVIOUS_GAMES[game].name}:</span> <span>Previous Results</span></h2>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-white/20" />}>
        <Results game={game} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}