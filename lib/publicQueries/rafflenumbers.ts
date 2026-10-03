import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";

export async function getRaffleNumbers(lottoCatId: number, inputDate: Date) {
  "use cache";
  cacheTag("rafflenumbers");  //// tells Next.js: this must render at request time, not build time
  const rows = await prisma.rafflenumbers.findMany({
    where: { lottoCatId, inputDate },
    orderBy: { id: "asc" },
  });

  return rows.map((r) => ({
    ...r,
    inputDate: r.inputDate.toISOString().split("T")[0],
  }));
}