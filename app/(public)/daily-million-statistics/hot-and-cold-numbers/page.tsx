import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import HotColdWindows from "@/components/public/stats/hotColdWindows";
import { DAILY_MILLION_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

// same imports, plus HotColdWindows from "@/components/public/stats/hotColdWindows"
export const metadata = pageMetadata({
  title: "Daily Million Hot and Cold Numbers",
  description: "See the most and least drawn Daily Million numbers over recent draws, and whether that differs from pure chance.",
  path: `${S.base}/hot-and-cold-numbers`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Daily Million Hot and Cold Numbers</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">Discover which Daily Million numbers are breaking patterns or sticking strictly to the laws of probability. This targeted page isolates the most and least drawn numbers over your chosen window of recent draws, contrasting real-world outcomes directly with mathematical expectations. Dive deep into the data to see whether recent hot spikes and cold slumps are statistically significant anomalies or if they sit perfectly within the predictable variation of pure chance.</p>
      <Suspense fallback={<ChartSkeleton height="h-64" />}>
        <HotColdWindows lottoCatId={11} heading='9pm Draw: Most and Least Drawn Numbers' />
        <HotColdWindows lottoCatId={11} part="extra" noun="bonus" top={3} heading="9pm Draw Bonus Numbers: Most and Least Drawn" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton height="h-64" />}>
        <HotColdWindows lottoCatId={15} heading='2pm Draw: Most and Least Drawn Numbers' />
        <HotColdWindows lottoCatId={15} part="extra" noun="bonus" top={3} heading="2pm Draw Bonus Numbers: Most and Least Drawn" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}