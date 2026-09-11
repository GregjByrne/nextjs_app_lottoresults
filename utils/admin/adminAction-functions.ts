import { formSchema, WinNewsFormValues, WinResultFormValues, RaffleNumbersFormValues, RaffleNewsFormValues } from "@/types/adminTypes/formSchema";
import { InsertWinAmountsType } from "@/types/adminTypes/winAmountTypes";
import { Prisma } from "@/app/generated/prisma/client";
import z from "zod";

// *************************************************************************
// Normalize Lottery Numbers Insert:
export function normalizeLottoEntry(data: z.infer<typeof formSchema>): Prisma.lottorecordsUncheckedCreateInput{
    return {
    lottoCatId: data.lottoCat, // renamed from lottoCat -> lottoCatId to match schema
    inputDate: new Date(data.inputDate), // string -> Date
    num_1: data.num_1,
    num_2: data.num_2,
    num_3: data.num_3,
    num_4: data.num_4,
    num_5: data.num_5,
    num_6: data.num_6,
    num_7: data.num_7,
    winValue: data.winValue,
  };
};
// *************************************************************************

// *************************************************************************
// Normalize Lottery Number Winniner / Winning Amount Insert:
export function normalizeWinEntry(data: WinResultFormValues): InsertWinAmountsType {
  return {
    inputDate: new Date(data.inputDate).toISOString().slice(0, 10),
    lottoCatId: Number(data.lottoCat),
    winRows: data.winRows.map((row) => ({
      inputDate: new Date(data.inputDate),
      lottoCatId: Number(data.lottoCat),
      winCatId: row.winCatId,
      numWinners: row.numWinners ?? 0,
      winAmount: row.winAmount ?? 0,
      emIrishWinners: row.emIrishWinners ?? 0,
      emUkWinners: row.emUkWinners ?? 0,
      emUkWinAmount: row.emUkWinAmount ?? 0,
    })),
  };
}
// *************************************************************************

// *************************************************************************
// Normalize Lottery News Insert:
export function normalizeNewsEntry(data: WinNewsFormValues): Prisma.winnewsUncheckedCreateInput {
  return {
    inputDate: new Date(data.inputDate),
    lottoCatId: Number(data.lottoCat),
    winNews: data.winNews,
  };
}
// *************************************************************************

// *************************************************************************
// Dasboard display date formatting:
export function dasboardformatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'full' },
  locale: string = 'en-GB'
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'UTC',
    ...options
  }).format(date);
}

// *************************************************************************


// *************************************************************************
// Normalize Raffle Numbers Insert:
export function normalizeRaffleEntry(data: RaffleNumbersFormValues): {
  inputDate: string;
  lottoCatId: number;
  raffleRows: Prisma.rafflenumbersUncheckedCreateInput[];
} {
  return {
    inputDate: new Date(data.inputDate).toISOString().slice(0, 10),
    lottoCatId: Number(data.lottoCat),
    raffleRows: data.raffleNumbers.map((row) => ({
      inputDate: new Date(data.inputDate),
      lottoCatId: Number(data.lottoCat),
      raffleNumber: row.raffleNumber,
    })),
  };
}

// *************************************************************************


// *************************************************************************
// Normalize Raffle News Insert:

export function normalizeRaffleNewsEntry(data: RaffleNewsFormValues): Prisma.rafflenewsUncheckedCreateInput {
  return {
    inputDate: new Date(data.inputDate),
    lottoCatId: Number(data.lottoCat),
    raffleNews: data.raffleNews,
  };
}