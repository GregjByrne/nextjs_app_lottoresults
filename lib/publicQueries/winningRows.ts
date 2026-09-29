import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

// Get the winnings results for a specific date and lotto category
export async function getWinningsByCategoryAndDate(categories: number[], date: string) {
  await connection(); // tells Next.js: this must render at request time, not build time
  if (categories.length === 0) return [];

  const winnings = await prisma.winrecords.findMany({
    where: {
      lottoCatId: { in: categories },
      inputDate: new Date(date),
    },
    orderBy: [{ lottoCatId: "asc" }, { winAmount: "desc" }],
  });

  return winnings.map((w) => ({
    ...w,
    inputDate: w.inputDate.toISOString().split("T")[0],
  }));
}
