import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { getLatestNews } from "@/lib/news/news";
import { imageUrl } from "@/lib/images";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Dublin" });

type Props = {
  game: "lotto" | "euromillions" | "dailymillion" | null;
  heading?: string;
  limit?: number;
};

async function Block({ game, heading, limit }: Required<Props>) {
  await connection();
  const rows = await getLatestNews(game, limit);
  if (rows.length === 0) return null; // nothing published yet: show no block at all

  return (
    <section aria-labelledby={`news-${game ?? "all"}`} className="relative mx-auto flex flex-col items-center justify-center px-4 lg:px-12 py-2 sm:py-5 max-w-5xl transition-all animate-in">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 id={`news-${game ?? "all"}`} className="text-xl font-bold text-white">{heading}</h2>
        <Link href="/lottery-news" className="text-sm text-indigo-300 hover:underline ml-2">All news →</Link>
      </div>

      <ul className="flex flex-col gap-4">
        {rows.map((a) => (
          <li key={a.slug} className="overflow-hidden rounded-lg bg-white shadow-sm">
            <Link href={`/lottery-news/${a.slug}`} className="block h-full">
              {a.coverImage && (
                <div className="relative aspect-video">
                  <Image
                    src={imageUrl(a.coverImage)}
                    alt={a.coverAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <time dateTime={a.publishedAt} className="text-xs text-gray-500">{fmt(a.publishedAt)}</time>
                <h3 className="mt-1 font-semibold text-gray-900">{a.title}</h3>
                <p className="mt-1 line-clamp-3 text-sm text-gray-700">{a.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function LatestNews({ game, heading = "Latest news", limit = 3 }: Props) {
  return (
    <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-lg bg-white/20" />}>
      <Block game={game} heading={heading} limit={limit} />
    </Suspense>
  );
}