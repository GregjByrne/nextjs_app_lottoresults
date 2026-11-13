import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import {  RULESETS, GAME_BY_CATEGORY, partShape, type Part } from "@/constants/rulesets";

const COLS = ["num_1", "num_2", "num_3", "num_4", "num_5", "num_6", "num_7"] as const;
const WINDOW_SIZES = [50, 100, 365] as const;
const SIMULATIONS = 1000;

export type Ball = { number: number; count: number };

export type WindowStats = {
  size: number;
  label: string;
  from: string; // YYYY-MM-DD
  to: string;
  expected: number;
  hot: Ball[];
  cold: Ball[];
  chance: { hotTypical: number; hotHigh: number; coldTypical: number; coldLow: number };
};

export type HotColdResult = { available: number; since: string; windows: WindowStats[] };

// Small seeded PRNG so the "by chance" figures are stable between recalculations
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function simulateExtremes(draws: number, pick: number, pool: number, seed: number) {
  const rand = mulberry32(seed);
  const order = Array.from({ length: pool }, (_, i) => i);
  const maxima: number[] = [];
  const minima: number[] = [];

  for (let s = 0; s < SIMULATIONS; s++) {
    const counts = new Array<number>(pool).fill(0);
    for (let d = 0; d < draws; d++) {
      for (let i = 0; i < pick; i++) {
        const j = i + Math.floor(rand() * (pool - i)); // partial Fisher-Yates
        const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
        counts[order[i]]++;
      }
    }
    maxima.push(Math.max(...counts));
    minima.push(Math.min(...counts));
  }

  maxima.sort((a, b) => a - b);
  minima.sort((a, b) => a - b);
  const q = (arr: number[], p: number) => arr[Math.floor(p * (arr.length - 1))];

  return {
    hotTypical: q(maxima, 0.5),
    hotHigh: q(maxima, 0.95),
    coldTypical: q(minima, 0.5),
    coldLow: q(minima, 0.05),
  };
}

export async function getHotColdWindows(
    lottoCatId: number,
    part: Part = "main",
    top = 5
  ): Promise<HotColdResult> {
  "use cache";
  cacheTag("lottorecords");
  cacheLife("results");

  const game = GAME_BY_CATEGORY[lottoCatId];
  const rules = RULESETS.find((r) => r.game === game && r.endDate === null);
  if (!rules) throw new Error("No current ruleset");
  const { start, pick, pool } = partShape(rules, part);

  const rows = await prisma.lottorecords.findMany({
    where: { lottoCatId, inputDate: { gte: new Date(`${rules.startDate}T00:00:00Z`) } },
    orderBy: { inputDate: "desc" },
    take: WINDOW_SIZES[WINDOW_SIZES.length - 1],
    select: { inputDate: true, num_1: true, num_2: true, num_3: true, num_4: true, num_5: true, num_6: true, num_7: true },
  });

  const sizes: number[] = WINDOW_SIZES.filter((s) => s <= rows.length);
  const fallback = sizes.length === 0 && rows.length > 0;
  if (fallback) sizes.push(rows.length);

  const cols = COLS.slice(start, start + pick);
  const p = pick / pool;

  const windows: WindowStats[] = sizes.map((size) => {
    const slice = rows.slice(0, size);
    const counts = new Array<number>(pool + 1).fill(0);
    for (const r of slice) for (const c of cols) counts[r[c]]++;

    const balls: Ball[] = counts.slice(1).map((count, i) => ({ number: i + 1, count }));
    const hot = [...balls].sort((a, b) => b.count - a.count || a.number - b.number).slice(0, top);
    const cold = [...balls].sort((a, b) => a.count - b.count || a.number - b.number).slice(0, top);

    return {
      size,
      label: fallback ? "Since the rules changed" : `Last ${size} draws`,
      from: slice[slice.length - 1].inputDate.toISOString().slice(0, 10),
      to: slice[0].inputDate.toISOString().slice(0, 10),
      expected: size * p,
      hot,
      cold,
      chance: simulateExtremes(size, pick, pool, 1000 + size + start),
    };
  });

  return { available: rows.length, since: rules.startDate, windows };
}