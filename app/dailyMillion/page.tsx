import { Metadata } from 'next';
import ResultsCard from "@/components/public/resultsCard/resultsCard";
import { Suspense } from "react";
import ResultsCardSkeleton from "@/components/public/resultsCard/resultsCardSkeleton";
import { CATEGORY_CARD_COUNTS } from "@/constants/categoryCardCounts";
import AdBanner from "@/components/public/googlead/fixedAd";
import DailyMillionBanner from "@/components/public/banners/dailyMillion";
import DailyMillionDescription from "@/components/public/descriptions/dialyMilDescription";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Latest Irish Daily Million Results | 2PM & 9PM Winning Numbers",
    description: "View the official Irish Daily Million and Daily Million Plus results. Check the winning numbers and bonus ball for today's afternoon (14:00) and evening (21:00) draws.",
  };
}


export default function EuroMillions() {

  return (
      <div>
        <DailyMillionBanner />
            <section id='DailyMillion' className="relative mx-auto flex flex-col items-center justify-center pt-16 px-4 sm:pt-20 lg:pd-28 lg:px-12 max-w-5xl transition-all animate-in" >
            <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[15]} />}>
              <ResultsCard catid={15} />
            </Suspense>
          </section>
          <section id='DailyMillion_nine' className="relative mx-auto flex flex-col items-center justify-center pb-16 px-4 sm:pb-20 lg:pd-28 lg:px-12 max-w-5xl transition-all animate-in" >
            <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[11]} />}>
              <ResultsCard catid={11} />
            </Suspense>
          </section>
          {/* <!-- AdId001_lottoresults --> */}
          <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
          <DailyMillionDescription />
      </div>
      
    
  );
}