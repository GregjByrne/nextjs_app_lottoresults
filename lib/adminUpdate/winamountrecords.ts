import { prisma } from "@/lib/prisma";

// No "use cache" — admin needs live data
export async function getWinAmountsForAdmin(lottoCatId: number, inputDate: Date) {
  return prisma.winrecords.findMany({
    where: { lottoCatId, inputDate },
    orderBy: { winCatId: "asc" },
  });
}

type WinRowUpdate = {
  inputDate: Date;
  lottoCatId: number;
  winCatId: number;
  numWinners: number;
  winAmount: number;
  emIrishWinners: number;
  emUkWinners: number;
  emUkWinAmount: number;
};

export async function updateWinRecordsBatch(rows: WinRowUpdate[]) {
  return prisma.$transaction(
    rows.map((row) =>
      prisma.winrecords.update({
        where: {
          // Prisma auto-generates this compound key name from your @@id([inputDate, lottoCatId, winCatId])
          inputDate_lottoCatId_winCatId: {
            inputDate: row.inputDate,
            lottoCatId: row.lottoCatId,
            winCatId: row.winCatId,
          },
        },
        data: {
          numWinners: row.numWinners,
          winAmount: row.winAmount,
          emIrishWinners: row.emIrishWinners,
          emUkWinners: row.emUkWinners,
          emUkWinAmount: row.emUkWinAmount,
        },
      })
    )
  );
}