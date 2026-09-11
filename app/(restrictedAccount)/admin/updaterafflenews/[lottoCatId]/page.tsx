import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import UpdateRaffleNewsPage from "@/components/restricted/resultsUpdate/updaterafflenews";
import { getRaffleNewsForAdmin } from "@/lib/adminUpdate/updaterafflenews";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ lottoCatId: string }>;
  searchParams: Promise<{ inputDate?: string }>;
};

export default function UpdateRaffleNews({ params, searchParams }: PageProps) {
  return (
    <div className="w-full space-y-4">
      <Suspense fallback={<UpdateRaffleNewsSkeleton />}>
        <RaffleNewsData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function RaffleNewsData({ params, searchParams }: PageProps) {
  await auth.protect();

  const { lottoCatId } = await params;
  const { inputDate } = await searchParams;

  const catId = Number(lottoCatId);

  if (!catId || !inputDate) {
    return notFound();
  }

  const currentRaffleNews = await getRaffleNewsForAdmin(catId, new Date(inputDate));

  if (!currentRaffleNews) {
    return notFound();
  }

  return <UpdateRaffleNewsPage currentRaffleNews={currentRaffleNews} />;
}

function UpdateRaffleNewsSkeleton() {
  return <div className="w-full h-48 rounded-xl bg-gray-100 animate-pulse" />;
}