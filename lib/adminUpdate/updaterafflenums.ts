import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function getRaffleNumbersForAdmin(lottoCatId: number, inputDate: Date) {
  return prisma.rafflenumbers.findMany({
    where: { lottoCatId, inputDate },
    orderBy: { id: "asc" },
  });
}

export async function replaceRaffleNumbers(
  lottoCatId: number,
  inputDate: Date,
  rows: Prisma.rafflenumbersUncheckedCreateInput[]
) {
  return prisma.$transaction([
    prisma.rafflenumbers.deleteMany({ where: { lottoCatId, inputDate } }),
    prisma.rafflenumbers.createMany({ data: rows }),
  ]);
}