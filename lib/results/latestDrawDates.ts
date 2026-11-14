import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PREVIOUS_GAMES, type GameKey } from "@/constants/previousResults";

export async function getLatestDrawDates() {
  "use cache";
  cacheTag("lottorecords");   // refreshed when you publish results
  cacheLife("results");

  const keys = Object.keys(PREVIOUS_GAMES) as GameKey[];
  const entries = await Promise.all(
    keys.map(async (k) => {
      const r = await prisma.lottorecords.aggregate({
        _max: { inputDate: true },
        where: { lottoCatId: { in: PREVIOUS_GAMES[k].draws.map((d) => d.catId) } },
      });
      return [k, r._max.inputDate ? r._max.inputDate.toISOString() : null] as const;
    })
  );
  return Object.fromEntries(entries) as Record<GameKey, string | null>;
}