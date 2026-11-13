import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import DrawTypicality from "@/components/public/stats/drawTypicality";
import { EUROMILLIONS_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = pageMetadata({
  title: "EuroMillions Draw Typicality",
  description: "How typical the latest EuroMillions draw was: total, spread, consecutive numbers, odd/even and low/high splits.",
  path: `${S.base}/draw-typicality`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">How typical was the latest EuroMillions Draw?</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Discover how typical the latest EuroMillions draw was by analyzing its total, spread, consecutive numbers, odd/even and low/high splits. Compare the results against 200,000 simulated draws to see how it stacks up statistically.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton height="h-72" />}>
        <DrawTypicality lottoCatId={4} label="EuroMillions" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}