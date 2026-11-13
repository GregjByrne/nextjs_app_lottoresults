import AdsInjectioin from "@/components/public/googlead/adsInjection";
import MainHeader from "@/components/public/header/mainHeader";
import MainFooter from "@/components/public/header/mainFooter";
import { Suspense } from "react";


function HeaderFallback() {
  return (
    <header className="sticky top-0 z-40 w-full rounded-b-md bg-slate-900 px-4 py-2 shadow-md lg:px-8 lg:py-3">
      <div className="container mx-auto flex items-center justify-between">
        <span className="py-1.5 font-serif text-xl font-bold text-gray-200">Irish Lotto Results</span>
      </div>
    </header>
  );
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Website",
    "name": "Irish Lotto Results",
    "image": "https://irish-lotto-results.ie/manifest/og-image.png",
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

export default function PublicLayout({ children }: { children: React.ReactNode }) {

  return (
    <main className="bg-linear-to-r from-gray-800 via-blue-700 to-gray-900">
      <AdsInjectioin pId={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || ""} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<HeaderFallback />}>
        <MainHeader />
      </Suspense>
      {children}
      <MainFooter />
    </main>
  );
}