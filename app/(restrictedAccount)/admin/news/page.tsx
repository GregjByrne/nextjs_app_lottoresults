// app/(restrictedAccount)/admin/news/page.tsx  (list)
import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { deleteArticle } from "./actions";
import CleanupImages from "@/components/restricted/news/cleanupImages";
import { connection } from "next/server";

async function List() {
  await connection(); 
  const rows = await prisma.newsarticles.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, status: true, publishedAt: true },
  });
  return (
    <ul className="divide-y rounded-lg bg-white text-gray-900">
      {rows.map((r) => (
        <li key={r.id} className="flex items-center justify-between gap-3 p-3">
          <div>
            <Link href={`/admin/news/${r.id}`} className="font-medium text-indigo-700 hover:underline">{r.title}</Link>
            <div className="text-xs text-gray-500">{r.status}{r.publishedAt ? ` · ${r.publishedAt.toISOString().slice(0, 10)}` : ""}</div>
          </div>
          <form action={deleteArticle}>
            <input type="hidden" name="id" value={r.id} />
            <button className="text-sm text-red-600 hover:underline">Delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <div className="space-y-4">
      <Link href="/admin/news/new" className="inline-block rounded-md bg-indigo-700 px-4 py-2 text-white">New article</Link>
      <Suspense fallback={<p>Loading…</p>}><List /></Suspense>
      <CleanupImages />
    </div>
  );
}