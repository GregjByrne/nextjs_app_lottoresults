import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export async function getRaffleNumbers(lottoCatId: number, inputDate: Date) {
  "use cache";
  cacheTag("rafflenumbers");
  cacheLife({ revalidate: 15 });

  const rows = await prisma.rafflenumbers.findMany({
    where: { lottoCatId, inputDate },
    orderBy: { id: "asc" },
  });

  return rows.map((r) => ({
    ...r,
    inputDate: r.inputDate.toISOString().split("T")[0],
  }));
}