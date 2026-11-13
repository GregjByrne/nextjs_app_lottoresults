import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { DAILY_MILLION_STATS as S } from "@/constants/statsNav";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import DailyMillionFrequency from "@/components/public/stats/dailyMillionFrequency";
import AdBanner from "@/components/public/googlead/fixedAd";

export const metadata = pageMetadata({
  title: "Daily Million Number Frequency",
  description: "How often each Daily Million main and bonus number has been drawn, with the range chance alone would produce.",
  path: `${S.base}/number-frequency`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Daily Million Number Frequency</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">Maximise your Daily Million strategy with our comprehensive lotto number frequency tracker. This live-updating dashboard breaks down exactly how often each main and bonus number has been drawn, comparing actual results against the mathematical range that chance alone would produce. Whether you are hunting for &quot;hot&quot; numbers or testing the laws of probability, our data-driven breakdown helps you separate real trends from pure luck.</p>
      <Suspense fallback={<ChartSkeleton />}>
        <DailyMillionFrequency lottoCatId={11} label="9pm draw" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton />}>
        <DailyMillionFrequency lottoCatId={15} label="2pm draw" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}