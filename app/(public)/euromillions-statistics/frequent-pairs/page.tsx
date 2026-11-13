import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import Partners from "@/components/public/stats/partners";
import { EUROMILLIONS_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

// Partners from "@/components/public/stats/partners"
export const metadata = pageMetadata({
  title: "EuroMillions Frequent Pairs",
  description: "Which EuroMillions numbers are drawn together most often, for any number you choose, compared with chance.",
  path: `${S.base}/frequent-pairs`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">EuroMillions Frequent Pairs</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Discover the most frequently drawn EuroMillions number pairs, including Lucky Stars, and how they compare to random chance. Our data-driven analysis reveals which combinations have historically appeared together in winning draws, helping you make informed choices for your next ticket. Explore the patterns and trends that could give you an edge in the game.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton />}>
        <Partners lottoCatId={4} rulesetIds={["em-9", "em-11", "em-12"]} title="Frequent partners (EuroMillions Rules)" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
       <Suspense fallback={<ChartSkeleton />}>
        <Partners lottoCatId={4} rulesetIds={["em-12"]} part="extra" noun="star" title="Lucky Star pairs (12-star era)" />
      </Suspense>
    </>
  );
}