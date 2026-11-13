import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { IRISH_LOTTO_STATS as S } from "@/constants/statsNav";
import LottoFrequency from "@/components/public/stats/lottoFrequency";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import AdBanner from "@/components/public/googlead/fixedAd";

export const metadata = pageMetadata({
  title: "Irish Lotto Number Frequency",
  description: "How often each Irish Lotto main and bonus number has been drawn, with the range chance alone would produce.",
  path: `${S.base}/number-frequency`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Irish Lotto Number Frequency</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Explore the frequency of each Irish Lotto main and bonus number across all draws. This data provides insights into how often each number has been drawn compared to what would be expected by chance alone. Use this information to inform your number selection strategy, while remembering that every draw is random and past results do not influence future outcomes.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton />}>
        <LottoFrequency />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}