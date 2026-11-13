import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";


// *************************************************************************************************
// Insert Latest Lottery Numbers 
    export async function insertLottoNumbers(data: Prisma.lottorecordsUncheckedCreateInput) {
      try {
        const record = await prisma.lottorecords.create({ data });
        return { success: true, data: { id: record.id }, error: null };
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
          return {
            success: false,
            data: null,
            error: "Results for this draw date already exist. Use Update Results instead.",
          };
        }
        throw err; // anything else is a real failure
      }
    }
// *************************************************************************************************

// *************************************************************************************************
// Insert Lottery Winning Amounts
export async function insertWinRecords(rows: Prisma.winrecordsUncheckedCreateInput[]) {
  return prisma.winrecords.createMany({ data: rows });
}

// *************************************************************************************************

// *************************************************************************************************
// Insert Lottery Winning News
export async function insertLottoNews(data: Prisma.winnewsUncheckedCreateInput) {
  const record = await prisma.winnews.create({ data });
  return { insertedId: record.id };
}

// *************************************************************************************************

// *************************************************************************************************
// Insert Raffle Numbers

export async function insertRaffleNumbers(rows: Prisma.rafflenumbersUncheckedCreateInput[]) {
  return prisma.rafflenumbers.createMany({ data: rows });
}

// *************************************************************************************************

// *************************************************************************************************
// Insert Raffle News
export async function insertRaffleNews(data: Prisma.rafflenewsUncheckedCreateInput) {
  const record = await prisma.rafflenews.create({ data });
  return { insertedId: record.id };
}