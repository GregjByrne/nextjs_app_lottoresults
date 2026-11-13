import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import HotColdWindows from "@/components/public/stats/hotColdWindows";
import { EUROMILLIONS_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

// same imports, plus HotColdWindows from "@/components/public/stats/hotColdWindows"
export const metadata = pageMetadata({
  title: "EuroMillions Hot and Cold Numbers",
  description: "The most and least drawn EuroMillions numbers over recent draws, and whether that differs from pure chance.",
  path: `${S.base}/hot-and-cold-numbers`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">EuroMillions Hot and Cold Numbers</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Discover the most and least drawn EuroMillions numbers over recent draws, and see how they compare to pure chance. Our hot and cold numbers analysis provides insights into number frequency, helping you make informed choices for your next EuroMillions ticket.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton height="h-64" />}>
        <HotColdWindows lottoCatId={4} />
        <HotColdWindows lottoCatId={4} part="extra" noun="star" top={3} heading="Lucky Stars: most and least drawn" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}