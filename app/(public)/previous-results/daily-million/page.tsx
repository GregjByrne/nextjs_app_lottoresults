import AdBanner from "@/components/public/googlead/fixedAd";
import PreviousResults from "@/components/public/previous/previousResults";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Previous Daily Million Results",
  description: "Past Daily Million numbers for every draw date.",
  path: "/previous-results/daily-million",
});

export default function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return (
    <>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <PreviousResults game="dailymillion" searchParams={searchParams} />
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </>
  );
}