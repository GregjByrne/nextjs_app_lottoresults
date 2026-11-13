import { prisma } from "@/lib/prisma";
import { RULESETS, GAME_BY_CATEGORY, partShape, type Part } from "@/constants/rulesets";

const COLS = ["num_1", "num_2", "num_3", "num_4", "num_5", "num_6", "num_7"] as const;

export async function fetchDrawNumbers(lottoCatId: number, rulesetIds: string[], part: Part) {
  const game = GAME_BY_CATEGORY[lottoCatId];
  const sets = RULESETS.filter((r) => r.game === game && rulesetIds.includes(r.id));
  if (sets.length === 0) throw new Error("No matching ruleset");

  const { start, pick, pool } = partShape(sets[0], part);
  if (sets.some((s) => {
    const x = partShape(s, part);
    return x.start !== start || x.pick !== pick || x.pool !== pool;
  })) throw new Error("Rulesets are not comparable");

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

  const cols = COLS.slice(start, start + pick);
  return { draws: rows.map((r) => cols.map((c) => r[c])), pick, pool };
}