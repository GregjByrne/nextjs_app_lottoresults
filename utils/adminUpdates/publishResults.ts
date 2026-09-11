"use server";

import { updateTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export type PublishResultsState = {
  success: boolean;
  publishedAt?: string;
};

export async function publishResults(): Promise<PublishResultsState> {
  await auth.protect();
  updateTag("lottorecords");
  updateTag("winrecords");
  updateTag("winnews");
  updateTag("rafflenumbers");
  updateTag("rafflenews");
  return { success: true, publishedAt: new Date().toISOString() };
}