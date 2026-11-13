import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import DrawTypicality from "@/components/public/stats/drawTypicality";
import { DAILY_MILLION_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = pageMetadata({
  title: "Daily Million Draw Typicality",
  description: "See how typical the latest Daily Million 2pm & 9pm draws were. Analysis of number totals, spread, consecutive numbers, and odd/even or low/high splits.",
  path: `${S.base}/draw-typicality`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">How typical was the latest Daily Million draw?</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">Evaluate the statistical typicality of the latest 2pm and 9pm Daily Million results. This analysis breakdown scores each recent draw across five core lottery metrics: the sum total of numbers, the numerical spread, consecutive number pairs, odd/even ratios, and low/high splits. Discover instantly whether the latest winning numbers formed a highly standard, textbook combination or defied the odds as a rare, atypical anomaly compared to random probability distribution.</p>
      <Suspense fallback={<ChartSkeleton height="h-72" />}>
        <DrawTypicality lottoCatId={11} label="Daily Million 9pm" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton height="h-72" />}>
        <DrawTypicality lottoCatId={15} label="Daily Million 2pm" />
      </Suspense>
        {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}