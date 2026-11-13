import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import Partners from "@/components/public/stats/partners";
import { DAILY_MILLION_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

// Partners from "@/components/public/stats/partners"
export const metadata = pageMetadata({
  title: "Daily Million Frequent Pairs",
  description: "Which Daily Million numbers are drawn together most often, for any number you choose, compared with chance.",
  path: `${S.base}/frequent-pairs`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Daily Million Frequent Pairs</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">Uncover the most frequent Daily Million pairs and combinations for any number you choose. This interactive tool maps out how often your selected numbers are drawn together, instantly calculating whether their partnerships are genuine statistical anomalies or simply the expected results of pure chance. Just select any number from 1 to 39 to reveal its most common companion numbers and evaluate their historical pairing performance across all past draws.</p>
      <Suspense fallback={<ChartSkeleton />}>
        <Partners lottoCatId={11} rulesetIds={["dm-39"]} title="Frequent Partners (9pm draw)" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton />}>
        <Partners lottoCatId={15} rulesetIds={["dm-39"]} title="Frequent Partners (2pm draw)" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}