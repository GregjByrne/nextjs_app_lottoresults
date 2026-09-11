import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import UpdateRaffleNumbersInputs from "@/components/restricted/resultsUpdate/updaterafflenums";
import { getRaffleNumbersForAdmin } from "@/lib/adminUpdate/updaterafflenums";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ lottoCatId: string }>;
  searchParams: Promise<{ inputDate?: string }>;
};

export default function UpdateRaffleNumbers({ params, searchParams }: PageProps) {
  return (
    <div className="w-full space-y-4">
      <Suspense fallback={<UpdateRaffleNumbersSkeleton />}>
        <RaffleNumbersData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function RaffleNumbersData({ params, searchParams }: PageProps) {
  await auth.protect();

  const { lottoCatId } = await params;
  const { inputDate } = await searchParams;

  const catId = Number(lottoCatId);

  if (!catId || !inputDate) {
    return notFound();
  }

  const parsedDate = new Date(inputDate);
  const raffleNumbers = await getRaffleNumbersForAdmin(catId, parsedDate);

  const currentRaffleNumbers = {
    lottoCat: catId,
    inputDate: parsedDate,
    raffleNumbers: raffleNumbers.length > 0
      ? raffleNumbers.map((r) => ({ raffleNumber: r.raffleNumber }))
      : [{ raffleNumber: "" }], // fallback: at least one blank field if none exist yet
  };

  return <UpdateRaffleNumbersInputs currentRaffleNumbers={currentRaffleNumbers} />;
}

function UpdateRaffleNumbersSkeleton() {
  return <div className="w-full h-64 rounded-xl bg-gray-100 animate-pulse" />;
}