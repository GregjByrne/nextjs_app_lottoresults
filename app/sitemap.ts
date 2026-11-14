import type { MetadataRoute } from "next";
import {
  IRISH_LOTTO_STATS,
  EUROMILLIONS_STATS,
  DAILY_MILLION_STATS,
  type StatsSection,
} from "@/constants/statsNav";
import { PREVIOUS_GAMES, type GameKey } from "@/constants/previousResults";
import { getLatestDrawDates } from "@/lib/results/latestDrawDates";
import { getSitemapArticles } from "@/lib/news/news";

const BASE = "https://irish-lotto-results.ie";

const GAMES: { key: GameKey; results: string; stats: StatsSection }[] = [
  { key: "lotto", results: "/", stats: IRISH_LOTTO_STATS },
  { key: "euromillions", results: "/euromillions-results", stats: EUROMILLIONS_STATS },
  { key: "dailymillion", results: "/daily-million-results", stats: DAILY_MILLION_STATS },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [draws, articles] = await Promise.all([getLatestDrawDates(), getSitemapArticles()]);
  const at = (iso: string | null | undefined) => (iso ? new Date(iso) : undefined);

  // results, statistics and previous-results pages for each game
  const gamePages: MetadataRoute.Sitemap = GAMES.flatMap(({ key, results, stats }) => {
    const lastModified = at(draws[key]);
    return [
      { url: `${BASE}${results}`, lastModified },
      { url: `${BASE}${stats.base}`, lastModified },
      ...stats.pages.map((p) => ({ url: `${BASE}${stats.base}/${p.slug}`, lastModified })),
      { url: `${BASE}${PREVIOUS_GAMES[key].href}`, lastModified },
    ];
  });

  // news list + every published article
  const latestNews = articles.reduce<string | undefined>(
    (max, a) => (!max || a.updatedAt > max ? a.updatedAt : max),
    undefined
  );
  const news: MetadataRoute.Sitemap = [
    { url: `${BASE}/lottery-news`, lastModified: at(latestNews) },
    ...articles.map((a) => ({
      url: `${BASE}/lottery-news/${a.slug}`,
      lastModified: new Date(a.updatedAt),
    })),
  ];

  return [...gamePages, ...news];
}