"use server";

import { z } from "zod";
import { updateWinNewsRecord } from "@/lib/adminUpdate/winnews";
import { auth } from "@clerk/nextjs/server";

const updateWinNewsSchema = z.object({
  lottoCatId: z.number().int().min(1),
  inputDate: z.coerce.date(),
  winNews: z.string().min(1),
});

export type UpdateWinNewsState = {
  success: boolean;
  error: string | null;
  affectedRows?: number;
};

export async function adminUpdateNewsWrapper(
  _prevState: UpdateWinNewsState,
  payload: unknown
): Promise<UpdateWinNewsState> {
  await auth.protect();
  const parsed = updateWinNewsSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const result = await updateWinNewsRecord(
    parsed.data.lottoCatId,
    parsed.data.inputDate,
    parsed.data.winNews
  );

  if (result.count === 0) {
    return { success: false, error: "No matching news entry found" };
  }

  return { success: true, error: null, affectedRows: result.count };
}