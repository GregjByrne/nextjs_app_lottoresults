"use server";

import { z } from "zod";
import { Prisma } from "@/app/generated/prisma/client"; // adjust to your actual output path
import { insertLottoNumbers, insertWinRecords, insertLottoNews, insertRaffleNumbers, insertRaffleNews } from "@/lib/adminQueries/insert/adminInsertData";
import { InsertWinAmountsType } from "@/types/adminTypes/winAmountTypes"; // adjust import path
import { auth } from "@clerk/nextjs/server";

// *************************************************************************
// Define the schema for validating the input data for inserting lottery numbers
const lottoRecordSchema = z.object({
  inputDate: z.coerce.date(),
  lottoCatId: z.number().int(), // renamed from lottoCat
  num_1: z.number().int(),
  num_2: z.number().int(),
  num_3: z.number().int(),
  num_4: z.number().int(),
  num_5: z.number().int(),
  num_6: z.number().int(),
  num_7: z.number().int(),
  winValue: z.number(),
});

export type InsertLottoNumsState = {
  success: boolean;
  error: string | null;
  insertedId?: number;
};

export async function adminInsertActionWrapper(
  _prevState: InsertLottoNumsState,
  payload: Prisma.lottorecordsUncheckedCreateInput
): Promise<InsertLottoNumsState> {
  await auth.protect();
  const parsed = lottoRecordSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }
  // console.log("Would insert:", parsed.data); // inspect what would be sent to Prisma // Testing without actual DB insert
  const { insertedId } = await insertLottoNumbers(parsed.data);

  return { success: true, error: null, insertedId };
  // return { success: true, error: null, insertedId: 999  }; Testing without actual DB insert
}

// *************************************************************************
// Define the schema for validating the input data for inserting winning amounts

const winRecordInsertSchema = z.object({
  inputDate: z.coerce.date(),
  lottoCatId: z.number().int().min(1),
  winCatId: z.number().int().min(1),
  numWinners: z.number().min(0),
  winAmount: z.number().min(0),
  emIrishWinners: z.number().min(0),
  emUkWinners: z.number().min(0),
  emUkWinAmount: z.number().min(0),
});

const winAmountsPayloadSchema = z.object({
  inputDate: z.string(),
  lottoCatId: z.number().int().min(1),
  winRows: z.array(winRecordInsertSchema).min(1, "At least one win row is required"),
});

export type InsertWinAmountsState = {
  success: boolean;
  error: string | null;
  insertedCount?: number;
};

export async function insertWinningAmounts(
  _prevState: InsertWinAmountsState,
  payload: InsertWinAmountsType
): Promise<InsertWinAmountsState> {
  await auth.protect();
  const parsed = winAmountsPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  // console.log("Would insert:", parsed.data); // inspect what would be sent to Prisma // Testing without
  const result = await insertWinRecords(parsed.data.winRows);

  return { success: true, error: null, insertedCount: result.count };
  // return { success: true, error: null, insertedCount: 999  }; //Testing without actual DB insert
}

// *************************************************************************
// Define the schema for validating the input data for inserting winning news
const winNewsInsertSchema = z.object({
  inputDate: z.coerce.date(),
  lottoCatId: z.number().int().min(1),
  winNews: z.string().min(1),
});

export type InsertLottoNewsState = {
  success: boolean;
  error: string | null;
  insertedId?: number;
};

export async function adminInsertNewsWrapper(
  _prevState: InsertLottoNewsState,
  payload: Prisma.winnewsUncheckedCreateInput
): Promise<InsertLottoNewsState> {
  await auth.protect();
  const parsed = winNewsInsertSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  // console.log("Would insert:", parsed.data); // inspect what would be sent to Prisma // Testing without
  const { insertedId } = await insertLottoNews(parsed.data);

  return { success: true, error: null, insertedId };
  // return { success: true, error: null, insertedId: 999  }; //Testing without actual DB insert
}

// *************************************************************************

// *************************************************************************
// Define the schema for validating the input data for inserting raffle numbers
const raffleRowSchema = z.object({
  inputDate: z.coerce.date(),
  lottoCatId: z.number().int().min(1),
  raffleNumber: z.string().min(1),
});

const raffleNumbersPayloadSchema = z.object({
  inputDate: z.string(),
  lottoCatId: z.number().int().min(1),
  raffleRows: z.array(raffleRowSchema).min(1, "At least one raffle number is required"),
});

export type InsertRaffleNumbersState = {
  success: boolean;
  error: string | null;
  insertedCount?: number;
};

export type InsertRaffleNumbersPayload = {
  inputDate: string;
  lottoCatId: number;
  raffleRows: unknown[];
};

export async function insertRaffleAction(
  _prevState: InsertRaffleNumbersState,
  payload: InsertRaffleNumbersPayload
): Promise<InsertRaffleNumbersState> {
  await auth.protect();

  const parsed = raffleNumbersPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const result = await insertRaffleNumbers(parsed.data.raffleRows);

  return { success: true, error: null, insertedCount: result.count };
}

// *************************************************************************

// *************************************************************************
// Define the schema for validating the input data for inserting raffle news
const raffleNewsInsertSchema = z.object({
  inputDate: z.coerce.date(),
  lottoCatId: z.number().int().min(1),
  raffleNews: z.string().min(1),
});

export type InsertRaffleNewsState = {
  success: boolean;
  error: string | null;
  insertedId?: number;
};

export async function insertRaffleNewsAction(
  _prevState: InsertRaffleNewsState,
  payload: Prisma.rafflenewsUncheckedCreateInput
): Promise<InsertRaffleNewsState> {
  await auth.protect();

  const parsed = raffleNewsInsertSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const { insertedId } = await insertRaffleNews(parsed.data);

  return { success: true, error: null, insertedId };
}
