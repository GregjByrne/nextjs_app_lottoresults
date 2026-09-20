import Script from 'next/script';

type AdsInjectionProps = {
  pId: string;
};

const AdsInjectioin = ({ pId }: AdsInjectionProps) => {

    return (
       <Script
            async 
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
       />
    );

}

export default AdsInjectioin;