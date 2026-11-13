// constants/statsNav.ts
export type StatsPage = { slug: string; title: string; description: string };

export type StatsSection = {
  base: string;         // URL of the hub
  gameName: string;
  resultsHref: string;  // where the latest results live
  pages: StatsPage[];
};

const COMMON_PAGES: StatsPage[] = [
  { slug: "number-frequency", title: "Number frequency",
    description: "How often every main and bonus number has been drawn, compared with what chance predicts." },
  { slug: "hot-and-cold-numbers", title: "Hot and cold numbers",
    description: "The most and least drawn numbers over recent draws, and how that compares with pure chance." },
  { slug: "frequent-pairs", title: "Frequent pairs",
    description: "Which numbers are drawn together most often, for any number you choose." },
  { slug: "draw-typicality", title: "Draw typicality",
    description: "How typical the latest draw was, measured against 200,000 simulated draws." },
];

// Build a section from the common pages, optionally overriding some descriptions
function section(
  base: string,
  gameName: string,
  resultsHref: string,
  overrides: Partial<Record<string, string>> = {}
): StatsSection {
  return {
    base,
    gameName,
    resultsHref,
    pages: COMMON_PAGES.map((p) => ({ ...p, description: overrides[p.slug] ?? p.description })),
  };
}

export const IRISH_LOTTO_STATS = section("/irish-lotto-statistics", "Irish Lotto", "/");

export const EUROMILLIONS_STATS = section("/euromillions-statistics", "EuroMillions", "/euromillions-results", {
  "number-frequency": "How often every main number and Lucky Star has been drawn, compared with what chance predicts.",
  "frequent-pairs": "Which main numbers and which Lucky Star pairs are drawn together most often.",
});

export const DAILY_MILLION_STATS = section("/daily-million-statistics", "Daily Million", "/daily-million-results", {
  "number-frequency": "How often every main and bonus number has been drawn in the 9pm and 2pm draws.",
});

// All sections in one list, for the site footer, the sitemap, or a "all statistics" page
export const ALL_STATS_SECTIONS: StatsSection[] = [
  IRISH_LOTTO_STATS,
  EUROMILLIONS_STATS,
  DAILY_MILLION_STATS,
];



























// export type StatsPage = { slug: string; title: string; description: string };

// export type StatsSection = {
//   base: string;         // URL of the hub
//   gameName: string;
//   resultsHref: string;  // where the latest results live
//   pages: StatsPage[];
// };

// export const IRISH_LOTTO_STATS: StatsSection = {
//   base: "/irish-lotto-statistics",
//   gameName: "Irish Lotto",
//   resultsHref: "/",
//   pages: [
//     { slug: "number-frequency", title: "Number frequency",
//       description: "How often every main and bonus number has been drawn, compared with what chance predicts." },
//     { slug: "hot-and-cold-numbers", title: "Hot and cold numbers",
//       description: "The most and least drawn numbers over recent draws, and how that compares with pure chance." },
//     { slug: "frequent-pairs", title: "Frequent pairs",
//       description: "Which numbers are drawn together most often, for any number you choose." },
//     { slug: "draw-typicality", title: "Draw typicality",
//       description: "How typical the latest draw was, measured against 200,000 simulated draws." },
//   ],
// };