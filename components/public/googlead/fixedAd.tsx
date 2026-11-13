'use client';

import { useEffect, useSyncExternalStore } from 'react';

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

export default function AdBanner({ adSlot, adFormat = 'auto', dataFullWidthResponsive }: AdBannerProps) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (!isClient) return;
    try {
      const pending = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])');
      if (pending.length > 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center max-w-4xl my-5"
         style={{ overflow: 'hidden', minWidth: '250px', minHeight: '100px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
