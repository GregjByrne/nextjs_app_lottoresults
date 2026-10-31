import { Metadata } from 'next';
import ResultsCard from "@/components/public/resultsCard/resultsCard";
import { Suspense } from "react";
import ResultsCardSkeleton from "@/components/public/resultsCard/resultsCardSkeleton";
import { CATEGORY_CARD_COUNTS } from "@/constants/categoryCardCounts";
import RaffleCard from "@/components/public/rafflecard/raffleCard";
import RaffleCardSkeleton from "@/components/public/rafflecard/raffleCardSkeleton";
import AdBanner from "@/components/public/googlead/fixedAd";
import EuroMillionsBanner from "@/components/public/banners/euroMillions";
import EuroMillionsDescription from "@/components/public/descriptions/euroMillionsDescription";

// 3. Dynamic SEO Metadata Generator
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Latest EuroMillions Results | Irish Plus & Raffle Winning Numbers",
    description: "Get tonight's official EuroMillions results. See the winning numbers, Lucky Stars, EuroMillions Plus numbers, and the 10 guaranteed €5,000 Ireland Only Raffle winning codes.",
  };
}


export default function EuroMillions() {

  return (
      <div>
      <EuroMillionsBanner />
      
       <section id='EuroMillions' className="relative mx-auto flex flex-col items-center justify-center py-16 px-4 sm:py-20 lg:pd-28 lg:px-12 max-w-5xl transition-all animate-in" >
        <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[4]} />}>
          <ResultsCard catid={4} />
        </Suspense>
        <Suspense fallback={<RaffleCardSkeleton numbersCount={10} />}>
          <RaffleCard catid={4} />
        </Suspense>
      </section>
      {/* <!-- AdId001_lottoresults --> */}
       <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <EuroMillionsDescription />
      </div>
      
    
  );
}
