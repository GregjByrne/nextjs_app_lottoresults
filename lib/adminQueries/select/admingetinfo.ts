import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

// Get the Lotto Categorys & id for Admin Select box
export async function getLottoCategorys() {

  "use cache";
  cacheTag("lottocategory");
  cacheLife({ revalidate: 3600 });
  
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