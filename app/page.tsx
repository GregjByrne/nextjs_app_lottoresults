import MainBanner from "@/components/public/header/mainBanner";
import MainHeader from "@/components/public/header/mainHeader";
import MainFooter from "@/components/public/header/mainFooter";
import ResultsCard from "@/components/public/resultsCard/resultsCard";
import { Suspense } from "react";
import ResultsCardSkeleton from "@/components/public/resultsCard/resultsCardSkeleton";
import { CATEGORY_CARD_COUNTS } from "@/constants/categoryCardCounts";
import RaffleCard from "@/components/public/rafflecard/raffleCard";
import RaffleCardSkeleton from "@/components/public/rafflecard/raffleCardSkeleton";
import AdBanner from "@/components/public/googlead/fixedAd";



export default function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Website",
    "name": "Irish Lotto Results",
    "image": "https://irish-lotto-results.ie/assets/manifest/og-image.png",
    "description": "View the latest Irish Lotto results and check the winning numbers for all three draws, including Plus 1 and Plus 2 after every Monday, Wednesday and Saturday draw.",
    "address": {
      "@type": "PostalAddress", // Corrected standard type
      "streetAddress": "Dublin",
      "addressLocality": "Dublin",
      "addressCountry": "IE"
    },
    "telephone": "+353",
    "url": "https://irish-lotto-results.ie/",
    "priceRange": "€€"
  };


  return (
    <main className="bg-linear-to-r from-gray-800 via-blue-700 to-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainHeader />
      <MainBanner />
      <section id='IrishLotto' className="relative mx-auto flex flex-col items-center justify-center pb-16 px-4 sm:pb-20 lg:pd-28 lg:px-12 max-w-5xl transition-all animate-in" >
        <Suspense fallback={<ResultsCardSkeleton count={CATEGORY_CARD_COUNTS[1]} />}>
          <ResultsCard catid={1} />
        </Suspense>
        <Suspense fallback={<RaffleCardSkeleton numbersCount={1} />}>
          <RaffleCard catid={1} />
        </Suspense>
      </section>
      {/* <!-- AdId001_lottoresults --> */}
       <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
       
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
      
      <MainFooter />
    </main>
  );
}
