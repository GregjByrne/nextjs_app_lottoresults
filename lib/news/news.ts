import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const NEWS_PAGE_SIZE = 10;

const live = () => ({ status: "published" as const, publishedAt: { lte: new Date() } });

export async function getNewsList(page: number, game: string | null = null) {
  "use cache";
  cacheTag("news");
  cacheLife("results");
  const where = { ...live(), ...(game ? { game } : {}) };
  const [rows, total] = await Promise.all([
    prisma.newsarticles.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * NEWS_PAGE_SIZE,
      take: NEWS_PAGE_SIZE,
      select: { slug: true, title: true, excerpt: true, coverImage: true, coverAlt: true, publishedAt: true },
    }),
    prisma.newsarticles.count({ where }),
  ]);
  return {
    totalPages: Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE)),
    rows: rows.map((r) => ({ ...r, publishedAt: r.publishedAt!.toISOString() })),
  };
}

export async function getArticle(slug: string) {
  "use cache";
  cacheTag("news");
  cacheLife("results");
  const a = await prisma.newsarticles.findFirst({ where: { slug, ...live() } });
  if (!a) return null;
  return { ...a, publishedAt: a.publishedAt!.toISOString(), updatedAt: a.updatedAt.toISOString(), createdAt: a.createdAt.toISOString() };
}

export async function getLatestNews(game: string | null, limit = 3) {
  "use cache";
  cacheTag("news");
  cacheLife("results");

  const rows = await prisma.newsarticles.findMany({
    where: {
      ...live(),
      // a game's block shows its own articles plus general ones (no game set)
      ...(game ? { OR: [{ game }, { game: null }] } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: { slug: true, title: true, excerpt: true, coverImage: true, coverAlt: true, publishedAt: true },
  });

  return rows.map((r) => ({ ...r, publishedAt: r.publishedAt!.toISOString() }));
}

export async function getSitemapArticles() {
  "use cache";
  cacheTag("news");   // refreshed by updateTag("news") whenever you publish, edit or delete
  cacheLife("results");

  const rows = await prisma.newsarticles.findMany({
    where: live(),                       // published only, same filter as the public pages
    orderBy: { publishedAt: "desc" },
    select: { slug: true, updatedAt: true },
  });
  return rows.map((r) => ({ slug: r.slug, updatedAt: r.updatedAt.toISOString() }));
}