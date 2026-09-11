import { prisma } from "@/lib/prisma";

export async function getRaffleNewsForAdmin(lottoCatId: number, inputDate: Date) {
  return prisma.rafflenews.findFirst({
    where: { lottoCatId, inputDate },
  });
}

export async function updateRaffleNewsRecord(
  lottoCatId: number,
  inputDate: Date,
  raffleNews: string
) {
  return prisma.rafflenews.updateMany({
    where: { lottoCatId, inputDate },
    data: { raffleNews },
  });
}