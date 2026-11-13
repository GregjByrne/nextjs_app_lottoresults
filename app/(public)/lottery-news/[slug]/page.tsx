import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { getArticle } from "@/lib/news/news";
import { imageUrl } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import AdBanner from "@/components/public/googlead/fixedAd";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return { title: "Article not found", robots: { index: false } };
  const base = pageMetadata({ title: a.title, description: a.excerpt, path: `/lottery-news/${a.slug}` });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      ...(a.coverImage ? { images: [{ url: imageUrl(a.coverImage), alt: a.coverAlt ?? a.title }] } : {}),
    },
  };
}

async function Article({ params }: Props) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    ...(a.coverImage ? { image: [imageUrl(a.coverImage)] } : {}),
    mainEntityOfPage: `https://irish-lotto-results.ie/lottery-news/${a.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl rounded-lg bg-white p-4 text-gray-900 sm:p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Link href="/lottery-news" className="text-sm text-indigo-700 hover:underline">← All news</Link>
      <h1 className="mt-3 text-3xl font-bold">{a.title}</h1>
      <time dateTime={a.publishedAt} className="mt-1 block text-sm text-gray-500">
        {new Date(a.publishedAt).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Dublin" })}
      </time>
      {a.coverImage && (
        <div className="relative mt-4 aspect-video overflow-hidden rounded-lg">
          <Image src={imageUrl(a.coverImage)} alt={a.coverAlt ?? ""} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}
      <div className="prose mt-6 max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @next/next/no-img-element
            img: ({ src, alt }) => <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" className="rounded-lg" />,
          }}
        >
          {a.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default function Page({ params }: Props) {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<div className="mx-auto h-96 max-w-3xl animate-pulse rounded-lg bg-white/20" />}>
        <Article params={params} />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </div>
  );
}