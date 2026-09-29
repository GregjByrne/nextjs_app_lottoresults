import { prisma } from "@/lib/prisma";
import { connection } from "next/server";

// Get the Lotto Categorys & id for Admin Select box
export async function getLottoCategorys() {
 await connection(); // tells Next.js: this must render at request time, not build time
  
  const lottoCategories = await prisma.lottocategory.findMany({
    select: {
      id: true,
      lottoCat: true,
    },
  });

   if (!lottoCategories || lottoCategories.length === 0) {
     throw new Error("Lotto Categories not found");
   }

  return lottoCategories;
};