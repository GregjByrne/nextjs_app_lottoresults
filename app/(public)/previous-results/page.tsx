import AdBanner from "@/components/public/googlead/fixedAd";
import PreviousResults from "@/components/public/previous/previousResults";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Previous Irish Lotto Results",
  description: "Past Irish Lotto, Lotto Plus 1 and Lotto Plus 2 numbers for every draw date.",
  path: "/previous-results",
});

export default function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return(
    <>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <PreviousResults game="lotto" searchParams={searchParams} />
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}