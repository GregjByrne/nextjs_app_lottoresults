import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getNewsList } from "@/lib/news/news";
import { imageUrl } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import AdBanner from "@/components/public/googlead/fixedAd";

export const metadata = pageMetadata({
  title: "Irish Lottery News",
  description: "The latest Irish Lotto, EuroMillions and Daily Million news and articles.",
  path: "/lottery-news",
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Dublin" });

async function List({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: p } = await searchParams;
  const page = Math.max(1, parseInt(p ?? "1", 10) || 1);
  const { rows, totalPages } = await getNewsList(page);
  const href = (n: number) => (n === 1 ? "/lottery-news" : `/lottery-news?page=${n}`);

  if (rows.length === 0) return <p className="rounded-md bg-white p-4 text-gray-800">No articles yet.</p>;

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {rows.map((a) => (
          <li key={a.slug} className="overflow-hidden rounded-lg bg-white shadow-sm">
            <Link href={`/lottery-news/${a.slug}`} className="block">
              {a.coverImage && (
                <div className="relative aspect-video">
                  <Image src={imageUrl(a.coverImage)} alt={a.coverAlt ?? ""} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="p-4">
                <time dateTime={a.publishedAt} className="text-xs text-gray-500">{fmt(a.publishedAt)}</time>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">{a.title}</h2>
                <p className="mt-1 text-sm text-gray-700">{a.excerpt}</p>
                <span className="mt-2 inline-block text-sm text-indigo-700">Read more →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
        {page < totalPages ? <Link href={href(page + 1)} className="rounded-full bg-white px-4 py-2 text-gray-900 hover:bg-indigo-50">← Older</Link> : <span />}
        <span className="text-gray-200">Page {page} of {totalPages}</span>
        {page > 1 ? <Link href={href(page - 1)} className="rounded-full bg-white px-4 py-2 text-gray-900 hover:bg-indigo-50">Newer →</Link> : <span />}
      </nav>
    </>
  );
}

export default function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <h1 className="mb-4 text-2xl font-bold text-white">Lottery News:</h1>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-white/20" />}>
        <List searchParams={searchParams} />
      </Suspense>
      {/* <!-- AdId001_lottoresults --> */}
      <AdBanner adSlot="6414138135" adFormat="auto" dataFullWidthResponsive={ true} />
    </div>
  );
}