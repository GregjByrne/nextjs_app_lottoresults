import "server-only";
import { prisma } from "@/lib/prisma";
import { listImages } from "@/lib/storage";

export async function findUnusedImages(minAgeHours = 24) {
  const [objects, articles] = await Promise.all([
    listImages(),
    prisma.newsarticles.findMany({ select: { coverImage: true, content: true } }),
  ]);

  const used = new Set<string>();
  const re = /news\/\d{4}\/\d{2}\/[a-f0-9]+\.webp/g; // matches both the old random keys and the new hash keys
  for (const a of articles) {
    if (a.coverImage) used.add(a.coverImage);
    for (const m of a.content.matchAll(re)) used.add(m[0]);
  }

  const cutoff = Date.now() - minAgeHours * 3_600_000;
  return objects
    .filter((o) => !used.has(o.key) && o.modified.getTime() < cutoff)
    .map((o) => o.key);
}