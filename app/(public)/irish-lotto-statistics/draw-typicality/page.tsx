import AdBanner from "@/components/public/googlead/fixedAd";
import ChartSkeleton from "@/components/public/stats/chartSkeleton";
import DrawTypicality from "@/components/public/stats/drawTypicality";
import { IRISH_LOTTO_STATS as S } from "@/constants/statsNav";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = pageMetadata({
  title: "Irish Lotto Draw Typicality",
  description: "How typical the latest Irish Lotto draw was: total, spread, consecutive numbers, odd/even and low/high splits.",
  path: `${S.base}/draw-typicality`,
});

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">How typical was the latest Irish Lotto Draw?</h1>
      <p className="text-sm py-4 mt-1 text-gray-200">
        Discover how typical the latest Irish Lotto draw was by analysing total, spread, consecutive numbers, odd/even and low/high splits. This analysis helps identify patterns in the draw results and provides insights into how closely the latest winning numbers align with over 200,000 simulated draws. While this information can be interesting for players, it&apos;s important to remember that each draw is random and past results do not influence future outcomes. Use this data to inform your number selection strategy, but always play responsibly.
      </p>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<ChartSkeleton height="h-72" />}>
        <DrawTypicality lottoCatId={1} label="Irish Lotto" />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}