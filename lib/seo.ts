import type { Metadata } from 'next';

const OG_IMAGE = '/assets/manifest/og-image.png'; // must be 1200x630

export function pageMetadata(
  { title, description, path, absolute = false }: { title: string; description: string; path: string; absolute?: boolean; }
): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path,
      siteName: 'Irish Lotto Results', locale: 'en_IE', type: 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}