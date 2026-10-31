import ResultsCard from "@/components/public/resultsCard/resultsCard";
import { Suspense } from "react";
import ResultsCardSkeleton from "@/components/public/resultsCard/resultsCardSkeleton";
import { CATEGORY_CARD_COUNTS } from "@/constants/categoryCardCounts";

import AdBanner from "@/components/public/googlead/fixedAd";
import LottoBanner from "@/components/public/banners/lottoResults";
import LottoDescription from "@/components/public/descriptions/lottoDescription";

// Update Git hub


export default function Home() {

  return (
      <div>
      <LottoBanner />
      <section id='IrishLotto' className="relative mx-auto flex flex-col items-center justify-center pb-16 px-4 sm:pb-20 lg:pd-28 lg:px-12 max-w-5xl transition-all animate-in" >
        <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[1]} />}>
          <ResultsCard catid={1} />
        </Suspense>
      </section>
        {/* <!-- AdId001_lottoresults --> */}
        <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
        <LottoDescription />
      </div>
      
    
  );
}
