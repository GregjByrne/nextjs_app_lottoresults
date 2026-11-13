import ResultsCard from "@/components/public/resultsCard/resultsCard";
import { Suspense } from "react";
import ResultsCardSkeleton from "@/components/public/resultsCard/resultsCardSkeleton";
import { CATEGORY_CARD_COUNTS } from "@/constants/categoryCardCounts";
import AdBanner from "@/components/public/googlead/fixedAd";
import DailyMillionBanner from "@/components/public/banners/dailyMillion";
import { pageMetadata } from '@/lib/seo';
import LatestNews from "@/components/public/news/latestNews";

// 3. Dynamic SEO Metadata Generator - descriptions to about 155 characters.
export const metadata = pageMetadata({
  title: 'Daily Million Results & Winning Numbers',
  description: 'Latest Irish Daily Million and Daily Million Plus and bonus numbers for each afternoon 2pm and evening 9pm draws, updated after every day.',
  path: '/daily-million-results',
});

export default function EuroMillions() {

  return (
      <div>
        <DailyMillionBanner />
        {/* <!-- AdId001_lottoresults --> */}
        <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
        <section id='DailyMillion' className="relative mx-auto flex flex-col items-center justify-center px-4 lg:px-12 py-2 sm:py-5 max-w-5xl transition-all animate-in" >
        <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[15]} />}>
          <ResultsCard catid={15} />
        </Suspense>
        </section>
        {/* <!-- AdId001_lottoresults --> */}
        <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
        <section id='DailyMillion_nine' className="relative mx-auto flex flex-col items-center justify-center px-4 lg:px-12 py-2 sm:py-5 max-w-5xl transition-all animate-in" >
          <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[11]} />}>
            <ResultsCard catid={11} />
          </Suspense>
        </section>
        {/* <!-- AdId001_lottoresults --> */}
        <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
        <LatestNews game="dailymillion" heading="Latest Daily Million news" />
      </div>
  );
}