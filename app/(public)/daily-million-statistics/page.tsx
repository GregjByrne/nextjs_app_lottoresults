import Link from "next/link";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { DAILY_MILLION_STATS as S } from "@/constants/statsNav";
import DrawTypicality from "@/components/public/stats/drawTypicality";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import AdBanner from "@/components/public/googlead/fixedAd";
import DailyMillionDescription from "@/components/public/descriptions/dialyMilDescription";

export const metadata = pageMetadata({
  title: "Daily Million Statistics",
  description: "Explore live Daily Million statistics for both 2pm & 9pm draws. Track number frequencies, hot/cold numbers, frequent pairs, and draw typicality analysis.",
  path: S.base, 
});


export default function DailyMillionStatisticsHub() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">{S.gameName} Statistics</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Analyse every Irish Daily Million draw with our definitive, live-updating statistics dashboard. Whether you are tracking the 2pm afternoon draw or the 9pm evening draw, this page aggregates comprehensive historical data to fuel your lottery strategy. Explore overall number frequency, pinpoint hot and cold numbers, identify the most frequent pairs, and evaluate how &quot;typical&quot; each set of winning numbers is compared to random probability.
      </p>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {S.pages.map((p) => (
          <li key={p.slug}>
            <Link
              href={`${S.base}/${p.slug}`}
              className="block h-full rounded-md border border-gray-400 bg-white p-4 shadow hover:bg-indigo-50"
            >
              <h2 className="text-lg font-semibold text-gray-900">{p.title}</h2>
              <p className="mt-1 text-sm text-gray-700">{p.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton height="h-72" />}>
        <DrawTypicality lottoCatId={11} label="Daily Million 9pm" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <DailyMillionDescription />
    </>
  );
}