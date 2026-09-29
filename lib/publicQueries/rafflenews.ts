import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

export async function getRaffleNews(lottoCatId: number, inputDate: Date) {

  await connection(); // tells Next.js: this must render at request time, not build time
  const record = await prisma.rafflenews.findFirst({
    where: { lottoCatId, inputDate },
  });

  if (!record) return null;

  return {
    ...record,
    inputDate: record.inputDate.toISOString().split("T")[0],
  };
}