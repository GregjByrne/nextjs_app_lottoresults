import { prisma } from "@/lib/prisma";

export async function getWinNewsForAdmin(lottoCatId: number, inputDate: Date) {
  return prisma.winnews.findFirst({
    where: { lottoCatId, inputDate },
  });
}

export async function updateWinNewsRecord(
  lottoCatId: number,
  inputDate: Date,
  winNews: string
) {
  return prisma.winnews.updateMany({
    where: { lottoCatId, inputDate },
    data: { winNews },
  });
}