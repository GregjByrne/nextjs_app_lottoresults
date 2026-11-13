import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import HotColdWindows from "@/components/public/stats/hotColdWindows";
import { IRISH_LOTTO_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

// same imports, plus HotColdWindows from "@/components/public/stats/hotColdWindows"
export const metadata = pageMetadata({
  title: "Irish Lotto Hot and Cold Numbers",
  description: "The most and least drawn Irish Lotto numbers over recent draws, and whether that differs from pure chance.",
  path: `${S.base}/hot-and-cold-numbers`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Irish Lotto Hot and Cold Numbers</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Discover the most and least drawn Irish Lotto main and bonus numbers over recent draws. This analysis helps identify hot numbers that have been drawn frequently and cold numbers that have been drawn less often, providing insights into potential patterns. While this information can be interesting for players, it&apos;s important to remember that each draw is random and past results do not influence future outcomes. Use this data to inform your number selection strategy, but always play responsibly.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton height="h-64" />}>
        <HotColdWindows lottoCatId={1} />
        <HotColdWindows lottoCatId={1} part="extra" noun="bonus" top={3} heading="Bonus Numbers: Most and Least Drawn" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}