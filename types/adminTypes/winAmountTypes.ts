import { Prisma } from "@/app/generated/prisma/client";

export type InsertWinAmountsType = {
  inputDate: string;
  lottoCatId: number; // renamed from lottoCat to match Prisma field
  winRows: Prisma.winrecordsUncheckedCreateInput[];
};