import { Suspense } from "react";
import UpdateWinNewsPage from "@/components/restricted/resultsUpdate/updatewinnews";
import { getWinNewsForAdmin } from "@/lib/adminUpdate/winnews";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

type PageProps = {
  params: Promise<{ lottoCatId: string }>;
  searchParams: Promise<{ inputDate?: string }>;
};

export default function UpdateWinNews({ params, searchParams }: PageProps) {
  return (
    <div className="w-full space-y-4">
      <Suspense fallback={<UpdateWinNewsSkeleton />}>
        <WinNewsData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function WinNewsData({ params, searchParams }: PageProps) {
  await auth.protect();
  const { lottoCatId } = await params;
  const { inputDate } = await searchParams;

  const catId = Number(lottoCatId);

  if (!catId || !inputDate) {
    return notFound();
  }

  const currentWinNews = await getWinNewsForAdmin(catId, new Date(inputDate));

  if (!currentWinNews) {
    return notFound();
  }

  return <UpdateWinNewsPage currentWinNews={currentWinNews} />;
}

function UpdateWinNewsSkeleton() {
  return <div className="w-full h-48 rounded-xl bg-gray-100 animate-pulse" />;
}