"use server";

import { auth } from "@clerk/nextjs/server";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/storage";
import { findUnusedImages } from "@/lib/news/unusedImages";

export type FormState = { error?: string };

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || "article";

export async function saveArticle(_prev: FormState, fd: FormData): Promise<FormState> {
  const { userId } = await auth();
  if (!userId) return { error: "Not signed in" };

  const id = Number(fd.get("id")) || null;
  const publish = fd.get("intent") === "publish";
  const title = String(fd.get("title") ?? "").trim();
  const excerpt = String(fd.get("excerpt") ?? "").trim();
  const content = String(fd.get("content") ?? "").trim();
  const coverImage = String(fd.get("coverImage") ?? "") || null;
  const coverAlt = String(fd.get("coverAlt") ?? "").trim() || null;
  const game = String(fd.get("game") ?? "") || null;

  if (!title || !excerpt || !content) return { error: "Title, excerpt and content are required" };
  if (excerpt.length > 300) return { error: "Excerpt must be 300 characters or less" };
  if (coverImage && !coverAlt) return { error: "Add alt text for the cover image" };

  const data = { title, excerpt, content, coverImage, coverAlt, game };

//   if (id) {
//     const existing = await prisma.lottorecords.count({ where: { id: -1 } }).then(() => null); // placeholder removed below
//     void existing;
//   }

  if (id) {
    const current = await prisma.newsarticles.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!current) return { error: "Article not found" };
    await prisma.newsarticles.update({
      where: { id },
      data: {
        ...data,
        status: publish ? "published" : "draft",
        publishedAt: publish ? (current.publishedAt ?? new Date()) : current.publishedAt,
      },
    });
  } else {
    // slug is created once from the title and never changes; add a number if it is taken
    const base = slugify(title);
    for (let n = 0; ; n++) {
      try {
        await prisma.newsarticles.create({
          data: {
            ...data,
            slug: n === 0 ? base : `${base}-${n + 1}`,
            status: publish ? "published" : "draft",
            publishedAt: publish ? new Date() : null,
          },
        });
        break;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002" && n < 20) continue;
        throw e;
      }
    }
  }

  updateTag("news");
  redirect("/admin/news");
}

export async function deleteArticle(fd: FormData) {
  const { userId } = await auth();
  if (!userId) return;
  await prisma.newsarticles.delete({ where: { id: Number(fd.get("id")) } });
  updateTag("news");
  redirect("/admin/news");
}

export async function findUnused(): Promise<string[]> {
  const { userId } = await auth();
  if (!userId) return [];
  return findUnusedImages();
}

export async function deleteUnused(): Promise<number> {
  const { userId } = await auth();
  if (!userId) return 0;
  const keys = await findUnusedImages(); // recomputed here, never trusted from the browser
  for (const k of keys) await deleteImage(k);
  return keys.length;
}