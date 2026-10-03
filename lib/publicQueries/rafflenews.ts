import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";

export async function getRaffleNews(lottoCatId: number, inputDate: Date) {

  "use cache";
  cacheTag("rafflenews");  // tells Next.js: this must render at request time, not build time
  const record = await prisma.rafflenews.findFirst({
    where: { lottoCatId, inputDate },
  });

  if (!record) return null;

  return {
    ...record,
    inputDate: record.inputDate.toISOString().split("T")[0],
  };
}