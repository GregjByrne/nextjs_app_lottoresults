import ResultsCard from "@/components/public/resultsCard/resultsCard";
import { Suspense } from "react";
import ResultsCardSkeleton from "@/components/public/resultsCard/resultsCardSkeleton";
import { CATEGORY_CARD_COUNTS } from "@/constants/categoryCardCounts";
import RaffleCard from "@/components/public/rafflecard/raffleCard";
import RaffleCardSkeleton from "@/components/public/rafflecard/raffleCardSkeleton";
import AdBanner from "@/components/public/googlead/fixedAd";
import EuroMillionsBanner from "@/components/public/banners/euroMillions";
import { pageMetadata } from '@/lib/seo';
import LatestNews from "@/components/public/news/latestNews";


// 3. Dynamic SEO Metadata Generator - descriptions to about 155 characters.
export const metadata = pageMetadata({
  title: 'EuroMillions Results & Lucky Stars',
  description: 'Latest EuroMillions results for Ireland: winning numbers, Lucky Stars, EuroMillions Plus and the Ireland Only Raffle codes, updated after every draw.',
  path: '/euromillions-results',
});


export default function EuroMillions() {

  return (
      <div>
        <EuroMillionsBanner />
        {/* <!-- AdId001_lottoresults --> */}
        <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
        <section id='EuroMillions' className="relative mx-auto flex flex-col items-center justify-center px-4 lg:px-12 py-2 sm:py-5 max-w-5xl transition-all animate-in" >
          <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[4]} />}>
            <ResultsCard catid={4} />
          </Suspense>
          <Suspense fallback={<RaffleCardSkeleton numbersCount={10} />}>
            <RaffleCard catid={4} />
          </Suspense>
        </section>
        {/* <!-- AdId001_lottoresults --> */}
        <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
        <LatestNews game="euromillions" heading="Latest EuroMillions news" />     
      </div>
  );
}
