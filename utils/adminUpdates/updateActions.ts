"use server";

import { z } from "zod";
import { Prisma } from "@/app/generated/prisma/client";
import {
  getLatestDateForAdmin,
  getResultForAdmin,
  updateLottoRecordById,
  deleteDrawCascade,
} from "@/lib/adminUpdate/lottorecords";
import { auth } from "@clerk/nextjs/server";

// Thin wrappers matching your component's existing call signatures
export async function getLatestDateUpdate({ searchCatId }: { searchCatId: number }) {
  return getLatestDateForAdmin(searchCatId); // Date | null
}

export async function getResultsForUpdate({
  categories,
  date,
}: {
  categories: number;
  date: string;
}) {
  return getResultForAdmin(categories, new Date(date)); // single record | null
}

// ---- Update ----
const updateLottoRecordSchema = z.object({
  lottoCatId: z.number().int().min(1),
  inputDate: z.coerce.date(),
  num_1: z.number().int(),
  num_2: z.number().int(),
  num_3: z.number().int(),
  num_4: z.number().int(),
  num_5: z.number().int(),
  num_6: z.number().int(),
  num_7: z.number().int(),
  winValue: z.number(),
});

export type UpdateLottoRecordState = {
  success: boolean;
  error: string | null;
  affectedRows?: number;
};

export async function adminUpdateActionWrapper(
  _prevState: UpdateLottoRecordState,
  payload: Prisma.lottorecordsUncheckedCreateInput
): Promise<UpdateLottoRecordState> {
  await auth.protect();
  const parsed = updateLottoRecordSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const existing = await getResultForAdmin(parsed.data.lottoCatId, parsed.data.inputDate);

  if (!existing) {
    return { success: false, error: "Record not found" };
  }

  await updateLottoRecordById(existing.id, parsed.data);

  return { success: true, error: null, affectedRows: 1 };
}

// ---- Delete (cascade) ----
const deleteDrawSchema = z.object({
  lottoCatId: z.number().int().min(1),
  inputDate: z.string(),
});

export async function adminDeletSelResults(payload: unknown) {
  await auth.protect();
  const parsed = deleteDrawSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  await deleteDrawCascade(parsed.data.lottoCatId, new Date(parsed.data.inputDate));

}