import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { RULESETS, GAME_BY_CATEGORY, partShape, type Part } from "@/constants/rulesets";

const COLS = ["num_1", "num_2", "num_3", "num_4", "num_5", "num_6", "num_7"] as const;

export type FrequencyResult = {
  draws: number;
  expected: number;
  band: number;
  rows: { number: number; count: number }[];
};

export async function getFrequency(
  lottoCatId: number,
  rulesetIds: string[],
  part: Part = "main"
): Promise<FrequencyResult> {
  "use cache";
  cacheTag("lottorecords");
  cacheLife("results");

  const game = GAME_BY_CATEGORY[lottoCatId];
  const sets = RULESETS.filter((r) => r.game === game && rulesetIds.includes(r.id));
  if (sets.length === 0) throw new Error("No matching ruleset");

  const { start, pick, pool } = partShape(sets[0], part);
  if (sets.some((s) => {
    const x = partShape(s, part);
    return x.start !== start || x.pick !== pick || x.pool !== pool;
  })) {
    throw new Error("Rulesets are not comparable");
  }

  const rows = await prisma.lottorecords.findMany({
    where: {
      lottoCatId,
      OR: sets.map((s) => ({
        inputDate: {
          gte: new Date(`${s.startDate}T00:00:00Z`),
          ...(s.endDate ? { lte: new Date(`${s.endDate}T00:00:00Z`) } : {}),
        },
      })),
    },
    select: { num_1: true, num_2: true, num_3: true, num_4: true, num_5: true, num_6: true, num_7: true },
  });

  const counts = new Array<number>(pool + 1).fill(0);
  const cols = COLS.slice(start, start + pick);
  for (const row of rows) for (const c of cols) counts[row[c]]++;

  const n = rows.length;
  const p = pick / pool;

  return {
    draws: n,
    expected: n * p,
    band: 2 * Math.sqrt(n * p * (1 - p)),
    rows: counts.slice(1).map((count, i) => ({ number: i + 1, count })),
  };
}