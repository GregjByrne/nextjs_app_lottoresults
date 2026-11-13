import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import Partners from "@/components/public/stats/partners";
import { IRISH_LOTTO_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

// Partners from "@/components/public/stats/partners"
export const metadata = pageMetadata({
  title: "Irish Lotto Frequent Pairs",
  description: "Which Irish Lotto numbers are drawn together most often, for any number you choose, compared with chance.",
  path: `${S.base}/frequent-pairs`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Irish Lotto Frequent Pairs</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Discover which Irish Lotto numbers are drawn together most often, for any number you choose, compared with chance. This analysis helps identify frequent pairs of main and bonus numbers, providing insights into potential patterns. While this information can be interesting for players, it&apos;s important to remember that each draw is random and past results do not influence future outcomes. Use this data to inform your number selection strategy, but always play responsibly.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton />}>
        <Partners lottoCatId={1} rulesetIds={["lotto-45-a", "lotto-45-b"]} title="Frequent partners (6/45 rules)" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}