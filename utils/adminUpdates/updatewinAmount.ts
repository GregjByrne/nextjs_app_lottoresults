"use server";
import { updateWinRecordsBatch } from "@/lib/adminUpdate/winamountrecords";
import { InsertWinAmountsType } from "@/types/adminTypes/winAmountTypes"; // reuse same type as insert
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

const winRowUpdateSchema = z.object({
  inputDate: z.coerce.date(),
  lottoCatId: z.number().int().min(1),
  winCatId: z.number().int().min(1),
  numWinners: z.number().min(0),
  winAmount: z.number().min(0),
  emIrishWinners: z.number().min(0),
  emUkWinners: z.number().min(0),
  emUkWinAmount: z.number().min(0),
});

const winAmountsUpdatePayloadSchema = z.object({
  inputDate: z.string(),
  lottoCatId: z.number().int().min(1),
  winRows: z.array(winRowUpdateSchema).min(1),
});

export type UpdateWinAmountsState = {
  success: boolean;
  error: string | null;
  affectedRows?: number;
};

export async function updateWinningAmounts(
  _prevState: UpdateWinAmountsState,
  payload: InsertWinAmountsType
): Promise<UpdateWinAmountsState> {
  await auth.protect();
  const parsed = winAmountsUpdatePayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  await updateWinRecordsBatch(parsed.data.winRows);


  return { success: true, error: null, affectedRows: parsed.data.winRows.length };
}