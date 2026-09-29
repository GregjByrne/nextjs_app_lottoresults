import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

export async function getRaffleNumbers(lottoCatId: number, inputDate: Date) {
  await connection(); // tells Next.js: this must render at request time, not build time
  const rows = await prisma.rafflenumbers.findMany({
    where: { lottoCatId, inputDate },
    orderBy: { id: "asc" },
  });

  return rows.map((r) => ({
    ...r,
    inputDate: r.inputDate.toISOString().split("T")[0],
  }));
}