import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";

// Get the latest draw date for a specific lotto category
export async function getLatestDate(lottoCatId: number) {
  "use cache";
  cacheTag("lottorecords");

  const latestDraw = await prisma.lottorecords.findFirst({
    where: { lottoCatId },
    orderBy: { inputDate: "desc" },
  });
  return latestDraw?.inputDate.toISOString().split("T")[0] ?? null;
}

// Multiple Lotto Results joined with Lotto News for a specific date and lotto category
export async function getResultsByCategoryAndDate(categories: number[], date: string) {
  "use cache";
  cacheTag("lottorecords");
  cacheTag("winnews");

  if (categories.length === 0) return [];

  const inputDate = new Date(date);

  const [records, news] = await Promise.all([
    prisma.lottorecords.findMany({ where: { lottoCatId: { in: categories }, inputDate } }),
    prisma.winnews.findMany({ where: { lottoCatId: { in: categories }, inputDate } }),
  ]);

  const newsMap = new Map(
    news.map((n) => [`${n.lottoCatId}_${n.inputDate.toISOString()}`, n.winNews])
  );

  return records.map((r) => ({
    ...r,
    inputDate: r.inputDate.toISOString().split("T")[0],
    winNews: newsMap.get(`${r.lottoCatId}_${r.inputDate.toISOString()}`) ?? null,
  }));
}
