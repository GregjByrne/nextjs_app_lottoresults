// app/(restrictedAccount)/admin/news/[id]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import NewsForm from "@/components/restricted/news/newsForm";
import { prisma } from "@/lib/prisma";
import { imageUrl } from "@/lib/images";

async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await prisma.newsarticles.findUnique({ where: { id: Number(id) } });
  if (!a) notFound();
  return (
    <NewsForm initial={{
      id: a.id, title: a.title, excerpt: a.excerpt, content: a.content, game: a.game ?? "",
      coverImage: a.coverImage ?? "", coverUrl: a.coverImage ? imageUrl(a.coverImage) : "", coverAlt: a.coverAlt ?? "",
    }} />
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <Suspense fallback={<p>Loading…</p>}><Edit params={params} /></Suspense>;
}