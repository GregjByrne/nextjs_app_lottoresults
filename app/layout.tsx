import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL('https://irish-lotto-results.ie'),
  title: {
    default: 'Irish Lotto Results and Winning Numbers',
    template: '%s | Irish Lotto Results', // Automatically adds page titles dynamically
  },
  description: 'View the latest Irish Lotto results and check the winning numbers for all three draws, including Plus 1 and Plus 2 after every Monday, Wednesday and Saturday draw.',
  authors: [{ name: "Conuresites Team", url: "https://conuresites.com", },],
icons: {
    icon: [
      { url: '/assets/manifest/favicon.ico', type: 'image/x-icon' },
      { url: '/assets/manifest/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/manifest/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/manifest/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/assets/manifest/manifest.json',

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
