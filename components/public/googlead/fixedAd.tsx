'use client';

import { useEffect, useState } from 'react';
import { useSyncExternalStore } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: string;
  dataFullWidthResponsive: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const emptySubscribe = () => () => {};

export default function AdBanner({ adSlot, 
                                   adFormat = 'auto', 
                                   dataFullWidthResponsive
                                   }: AdBannerProps) {

  // const [isMounted, setIsMounted] = useState(false);

  const isClient = useSyncExternalStore(
      emptySubscribe,
      () => true,
      () => false
   );

  useEffect(() => {
      try {
        if (typeof window !== 'undefined') {
          // 1. Find all AdSense elements on the current page
          const adElements = document.querySelectorAll('.adsbygoogle');
          
          // 2. Count how many of them have NOT been processed yet
          // Google marks processed ads by adding a 'data-adsbygoogle-status' attribute
          const uninitializedSlots = Array.from(adElements).filter(
            (el) => !el.hasAttribute('data-adsbygoogle-status')
          );

          // 3. Only push if there's a slot waiting for an ad
          if (uninitializedSlots.length > 0) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (error) {
        const err = error as Error;
        console.error(err.message);
      }
  }, []);

  // if (!isMounted) return null;
   if (!isClient) return null;

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center max-w-4xl" style={{ overflow: 'hidden', minWidth: '250px', minHeight: '100px'  }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_ADSENSE_PUB_ID}
        data-ad-slot={ adSlot }       //"6414138135"
        data-ad-format={ adFormat }
        data-full-width-responsive={ dataFullWidthResponsive.toString() }
      />
    </div>
  );
}

// // <!-- AdId001_lottoresults -->
// <ins class="adsbygoogle"
//      style="display:block"
//      data-ad-client="ca-pub-4631480557630993"
//      data-ad-slot="6414138135"
//      data-ad-format="auto"
//      data-full-width-responsive="true"></ins>
// <script>
//      (adsbygoogle = window.adsbygoogle || []).push({});
// </script>


// export default function AdBanner({ adSlot, 
//                                    adFormat = 'auto', 
//                                    dataFullWidthResponsive,
//                                    adLayoutKey }: AdBannerProps) {
//   const pathname = usePathname();

//   useEffect(() => {
//     try {
//        if (typeof window !== 'undefined') {
//           (window.adsbygoogle = window.adsbygoogle || []).push({});
//         }
//     } catch (error) {
//       console.error('AdSense error:', error);
//     }
//   }, [pathname]); // Depend on pathname to reload ads on navigation

//   return (
//     <div style={{ overflow: 'hidden', minWidth: '250px', minHeight: '100px'  }}>
//       <ins
//         className="adsbygoogle"
//         style={{ display: 'block' }}
//         data-ad-client={process.env.NEXT_ADSENSE_PUB_ID}
//         data-ad-slot={ adSlot }       //"6414138135"
//         data-ad-format={ adFormat }
//         data-full-width-responsive={ dataFullWidthResponsive.toString() }
//         {...(adLayoutKey && { 'data-ad-layout-key': adLayoutKey })}
//       />
//     </div>
//   );
// }
