"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { replaceRaffleNumbers } from "@/lib/adminUpdate/updaterafflenums";

const raffleRowSchema = z.object({
  inputDate: z.coerce.date(),
  lottoCatId: z.number().int().min(1),
  raffleNumber: z.string().min(1),
});

const raffleNumbersUpdatePayloadSchema = z.object({
  inputDate: z.string(),
  lottoCatId: z.number().int().min(1),
  raffleRows: z.array(raffleRowSchema).min(1, "At least one raffle number is required"),
});

export type UpdateRaffleNumbersState = {
  success: boolean;
  error: string | null;
  affectedCount?: number;
};

type UpdateRaffleNumbersPayload = {
  inputDate: string;
  lottoCatId: number;
  raffleRows: unknown[];
};

export async function updateRaffleNumbersAction(
  _prevState: UpdateRaffleNumbersState,
  payload: UpdateRaffleNumbersPayload
): Promise<UpdateRaffleNumbersState> {
  await auth.protect();

  const parsed = raffleNumbersUpdatePayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  await replaceRaffleNumbers(
    parsed.data.lottoCatId,
    new Date(parsed.data.inputDate), // convert string -> Date here
    parsed.data.raffleRows
  );

  return { success: true, error: null, affectedCount: parsed.data.raffleRows.length };
}