import AdBanner from "@/components/public/googlead/fixedAd";
import PreviousResults from "@/components/public/previous/previousResults";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Previous EuroMillions Results",
  description: "Past EuroMillions numbers for every draw date.",
  path: "/previous-results/euromillions",
});

export default function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return (
    <>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <PreviousResults game="euromillions" searchParams={searchParams} />
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}