"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { updateRaffleNewsRecord } from "@/lib/adminUpdate/updaterafflenews";

const updateRaffleNewsSchema = z.object({
  lottoCatId: z.number().int().min(1),
  inputDate: z.coerce.date(),
  raffleNews: z.string().min(1),
});

export type UpdateRaffleNewsState = {
  success: boolean;
  error: string | null;
  affectedRows?: number;
};

export async function updateRaffleNewsAction(
  _prevState: UpdateRaffleNewsState,
  payload: unknown
): Promise<UpdateRaffleNewsState> {
  await auth.protect();

  const parsed = updateRaffleNewsSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const result = await updateRaffleNewsRecord(
    parsed.data.lottoCatId,
    parsed.data.inputDate,
    parsed.data.raffleNews
  );

  if (result.count === 0) {
    return { success: false, error: "No matching raffle news entry found" };
  }

  return { success: true, error: null, affectedRows: result.count };
}