import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

// No "use cache" — admin always needs live data
export async function getLatestDateForAdmin(lottoCatId: number) {
  const latest = await prisma.lottorecords.findFirst({
    where: { lottoCatId },
    orderBy: { inputDate: "desc" },
  });
  return latest?.inputDate ?? null;
}

export async function getResultForAdmin(lottoCatId: number, inputDate: Date) {
  return prisma.lottorecords.findFirst({
    where: { lottoCatId, inputDate },
  });
}

export async function updateLottoRecordById(
  id: number,
  data: Prisma.lottorecordsUncheckedUpdateInput
) {
  return prisma.lottorecords.update({ where: { id }, data });
}

export async function deleteDrawCascade(lottoCatId: number, inputDate: Date) {
  return prisma.$transaction([
    prisma.winrecords.deleteMany({ where: { lottoCatId, inputDate } }),
    prisma.winnews.deleteMany({ where: { lottoCatId, inputDate } }),
    prisma.rafflenumbers.deleteMany({ where: { lottoCatId, inputDate } }),
    prisma.rafflenews.deleteMany({ where: { lottoCatId, inputDate } }),
    prisma.lottorecords.deleteMany({ where: { lottoCatId, inputDate } }),
  ]);
}