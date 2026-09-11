import { Suspense } from "react";
import UpdateWinAmountInputs from "@/components/restricted/resultsUpdate/updatewinamounts";
import { getWinAmountsForAdmin } from "@/lib/adminUpdate/winamountrecords";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

type PageProps = {
  params: Promise<{ lottoCatId: string }>;
  searchParams: Promise<{ inputDate?: string }>;
};

export default function UpdateWinAmount({ params, searchParams }: PageProps) {
  return (
    <div className="w-full space-y-4">
      <Suspense fallback={<UpdateWinAmountSkeleton />}>
        <WinAmountData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Child Server Component now owns reading params/searchParams AND the DB fetch
async function WinAmountData({ params, searchParams }: PageProps) {
  await auth.protect();
  const { lottoCatId } = await params;
  const { inputDate } = await searchParams;

  const catId = Number(lottoCatId);

  if (!catId || !inputDate) {
    return notFound();
  }

  const parsedDate = new Date(inputDate);
  const winAmounts = await getWinAmountsForAdmin(catId, parsedDate);

  const currentWinAmounts = {
    lottoCat: catId,
    inputDate: parsedDate,
    winRows: winAmounts,
  };

  return <UpdateWinAmountInputs currentWinAmounts={currentWinAmounts} />;
}

function UpdateWinAmountSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}