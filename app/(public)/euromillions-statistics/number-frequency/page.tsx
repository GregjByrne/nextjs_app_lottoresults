import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { EUROMILLIONS_STATS as S } from "@/constants/statsNav";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import AdBanner from "@/components/public/googlead/fixedAd";
import EuroMillionsFrequency from "@/components/public/stats/euroMillionsFrequency";

export const metadata = pageMetadata({
  title: "EuroMillions Number Frequency",
  description: "How often each EuroMillions main and lucky star number has been drawn, with the range chance alone would produce.",
  path: `${S.base}/number-frequency`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">EuroMillions Number Frequency</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        How often each EuroMillions main and lucky star number has been drawn, with the range chance alone would produce. The frequency of each number is shown as a percentage of the total draws, with the expected frequency based on probability also shown for comparison.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton />}>
        <EuroMillionsFrequency />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}