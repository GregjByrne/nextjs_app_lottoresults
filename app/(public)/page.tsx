import ResultsCard from "@/components/public/resultsCard/resultsCard";
import { Suspense } from "react";
import ResultsCardSkeleton from "@/components/public/resultsCard/resultsCardSkeleton";
import { CATEGORY_CARD_COUNTS } from "@/constants/categoryCardCounts";
import AdBanner from "@/components/public/googlead/fixedAd";
import LottoBanner from "@/components/public/banners/lottoResults";
import { pageMetadata } from "@/lib/seo";
import LatestNews from "@/components/public/news/latestNews";

// Update Git hub

export const metadata = pageMetadata({
  title: 'Irish Lotto Results and Winning Numbers',
  description: 'Latest Irish Lotto, Lotto Plus 1 and Plus 2 results and winning numbers, updated after every draw.',
  path: '/',
  absolute: true,
});

export default function Home() {

  return (
      <div>
        <LottoBanner />
        {/* <!-- AdId001_lottoresults --> */}
        <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
        <section id='IrishLotto' className="relative mx-auto flex flex-col items-center px-4 lg:px-12 py-2 sm:py-5 justify-center max-w-5xl transition-all animate-in" >
          <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[1]} />}>
            <ResultsCard catid={1} />
          </Suspense>
        </section>
          {/* <!-- AdId001_lottoresults --> */}
          <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
          <LatestNews game="lotto" heading="Latest Irish Lotto news" />
      </div>
  );
}

//pb-16 px-4 sm:pb-20 lg:pd-28 lg:px-12 
