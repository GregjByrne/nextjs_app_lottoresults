import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PREVIOUS_GAMES, type GameKey } from "@/constants/previousResults";

const COLS = ["num_1", "num_2", "num_3", "num_4", "num_5", "num_6", "num_7"] as const;

export type DrawRow = { label: string; main: number[]; extra: number[]; extraLabel: string };
export type DateRow = { date: string; draws: DrawRow[] }; // date = YYYY-MM-DD

export async function getPreviousResults(key: GameKey, page: number) {
  "use cache";
  cacheTag("lottorecords");
  cacheLife("results");

  const game = PREVIOUS_GAMES[key];
  const cats = game.draws.map((d) => d.catId);
  const where = { lottoCatId: { in: cats } };

  const [pageDates, allDates] = await Promise.all([
    prisma.lottorecords.groupBy({
      by: ["inputDate"],
      where,
      orderBy: { inputDate: "desc" },
      skip: (page - 1) * game.pageSize,
      take: game.pageSize,
    }),
    prisma.lottorecords.groupBy({ by: ["inputDate"], where }),
  ]);

  const dates = pageDates.map((d) => d.inputDate);
  const records = dates.length
    ? await prisma.lottorecords.findMany({
        where: { lottoCatId: { in: cats }, inputDate: { in: dates } },
        select: { lottoCatId: true, inputDate: true, num_1: true, num_2: true, num_3: true, num_4: true, num_5: true, num_6: true, num_7: true },
      })
    : [];

  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const rows: DateRow[] = dates.map((date) => ({
    date: iso(date),
    draws: game.draws.flatMap((def) => {
      const rec = records.find((r) => r.lottoCatId === def.catId && iso(r.inputDate) === iso(date));
      if (!rec) return []; // that draw wasn't held / recorded on this date
      const nums = COLS.map((c) => rec[c]);
      return [{
        label: def.label,
        main: nums.slice(0, def.mainCount),
        extra: nums.slice(def.mainCount, def.mainCount + def.extraCount),
        extraLabel: def.extraLabel,
      }];
    }),
  }));

  return { rows, page, totalPages: Math.max(1, Math.ceil(allDates.length / game.pageSize)) };
}