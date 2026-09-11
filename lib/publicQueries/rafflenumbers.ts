import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";

export async function getRaffleNumbers(lottoCatId: number, inputDate: Date) {
  "use cache";
  cacheTag("rafflenumbers");

  const rows = await prisma.rafflenumbers.findMany({
    where: { lottoCatId, inputDate },
    orderBy: { id: "asc" },
  });

  return rows.map((r) => ({
    ...r,
    inputDate: r.inputDate.toISOString().split("T")[0],
  }));
}