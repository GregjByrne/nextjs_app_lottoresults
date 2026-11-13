import Link from "next/link";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { IRISH_LOTTO_STATS as S } from "@/constants/statsNav";
import DrawTypicality from "@/components/public/stats/drawTypicality";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import LottoDescription from "@/components/public/descriptions/lottoDescription";
import AdBanner from "@/components/public/googlead/fixedAd";

export const metadata = pageMetadata({
  title: "Irish Lotto Statistics",
  description: "Irish Lotto statistics from every draw: number frequency, hot and cold numbers, frequent pairs and how typical each draw was.",
  path: S.base,
});

export default function IrishLottoStatisticsHub() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">{S.gameName} Statistics</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Welcome to your ultimate Irish Lotto statistics hub, where data turns lottery results into actionable insights. Whether you are analysing historical patterns or looking for a data-driven approach to your next ticket, our comprehensive tracking tools break down every draw with scientific precision. Explore number frequency to see how often each main and bonus number appears against mathematical probability and track hot and cold numbers to spot recent streaks or overdue digits. Dive deeper with our frequent pairs tool to find the most common number combinations for any selection and evaluate draw typicality to see how closely the latest winning numbers align with over 200,000 simulated draws. Start exploring the numbers behind the luck and smarter your strategy today.
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
        <DrawTypicality lottoCatId={1} label="Irish Lotto" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <LottoDescription />
    </>
  );
}

