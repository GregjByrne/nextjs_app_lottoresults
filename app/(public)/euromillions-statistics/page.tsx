import Link from "next/link";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { EUROMILLIONS_STATS as S } from "@/constants/statsNav";
import DrawTypicality from "@/components/public/stats/drawTypicality";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import AdBanner from "@/components/public/googlead/fixedAd";
import EuroMillionsDescription from "@/components/public/descriptions/euroMillionsDescription";

export const metadata = pageMetadata({
  title: "EuroMillions Statistics",
  description: "Unlock data-driven insights with our EuroMillions statistics tracker. Analyse number frequency, hot and cold streaks, frequent pairs, and draw typicality.",
  path: S.base,
});


export default function EuroMillionsStatisticsHub() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">{S.gameName} Statistics</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Welcome to your ultimate EuroMillions statistics hub, where deep data analytics transform millions of draw results into powerful, actionable insights. Designed for players who prefer strategy over random guessing, our advanced tracking tools break down every European jackpot with mathematical precision. Explore EuroMillions number frequency to discover how often main numbers and Lucky Stars appear compared to theoretical probability and monitor hot and cold numbers to pinpoint current trends or overdue selections. Unlock advanced combinations using our frequent pairs tool to find the most common pairings for any number you choose and assess draw typicality to see how the latest winning combination measures up against 200,000 simulated draws. Back your numbers with real data and elevate your EuroMillions strategy today.
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
        <DrawTypicality lottoCatId={4} label="EuroMillions" />
      </Suspense>
       {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} /> 
       <EuroMillionsDescription />
    </>
  );
}