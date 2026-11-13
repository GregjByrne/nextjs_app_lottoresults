"use client";

import { useActionState, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { saveArticle, type FormState } from "@/app/(restrictedAccount)/admin/news/actions";

export type NewsInitial = {
  id?: number; title: string; excerpt: string; content: string;
  game: string; coverImage: string; coverUrl: string; coverAlt: string;
};

async function upload(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Upload failed");
  return json as { key: string; url: string };
}

export default function NewsForm({ initial }: { initial: NewsInitial }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(saveArticle, {});
  const [content, setContent] = useState(initial.content);
  const [cover, setCover] = useState({ key: initial.coverImage, url: initial.coverUrl });
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  async function onCover(file?: File) {
    if (!file) return;
    setBusy(true); setMsg("");
    try { const r = await upload(file); setCover({ key: r.key, url: r.url }); }
    catch (e) { setMsg((e as Error).message); }
    setBusy(false);
  }

  async function onInline(file?: File) {
    if (!file) return;
    setBusy(true); setMsg("");
    try {
      const r = await upload(file);
      const pos = textRef.current?.selectionStart ?? content.length;
      const md = `\n\n![describe the image](${r.url})\n\n`;
      setContent(content.slice(0, pos) + md + content.slice(pos));
    } catch (e) { setMsg((e as Error).message); }
    setBusy(false);
  }

  const field = "w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900";

  return (
    <form action={formAction} className="space-y-4 rounded-lg bg-white p-4 text-gray-900">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="coverImage" value={cover.key} />

      <label className="block text-sm font-medium">Title
        <input name="title" defaultValue={initial.title} maxLength={200} className={field} required />
      </label>

      <label className="block text-sm font-medium">Excerpt (shown on the news list, max 300 characters)
        <textarea name="excerpt" defaultValue={initial.excerpt} maxLength={300} rows={3} className={field} required />
      </label>

      <label className="block text-sm font-medium">Game (optional)
        <select name="game" defaultValue={initial.game} className={field}>
          <option value="">General</option>
          <option value="lotto">Irish Lotto</option>
          <option value="euromillions">EuroMillions</option>
          <option value="dailymillion">Daily Million</option>
        </select>
      </label>

      <div className="space-y-2">
        <div className="text-sm font-medium">Cover image</div>
        {cover.url && <img src={cover.url} alt="" className="aspect-video max-w-sm rounded object-cover" />}
        <input type="file" accept="image/*" onChange={(e) => onCover(e.target.files?.[0])} />
        <input name="coverAlt" defaultValue={initial.coverAlt} placeholder="Alt text describing the image" maxLength={200} className={field} />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between text-sm font-medium">
          <span>Article (Markdown)</span>
          <span className="flex items-center gap-3">
            <label className="cursor-pointer text-indigo-700 underline">
              Insert image
              <input type="file" accept="image/*" hidden onChange={(e) => onInline(e.target.files?.[0])} />
            </label>
            <button type="button" onClick={() => setPreview(!preview)} className="text-indigo-700 underline">
              {preview ? "Edit" : "Preview"}
            </button>
          </span>
        </div>
        <textarea
          ref={textRef} name="content" value={content} onChange={(e) => setContent(e.target.value)}
          rows={18} className={`${field} font-mono text-sm ${preview ? "hidden" : ""}`}
        />
        {preview && (
          <div className="prose max-w-none rounded-md border border-gray-200 p-3">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>

      {(msg || state.error) && <p className="text-sm text-red-600">{msg || state.error}</p>}

      <div className="flex gap-2">
        <button name="intent" value="draft" disabled={pending || busy} className="rounded-md border border-gray-400 px-4 py-2 disabled:opacity-50">
          Save draft
        </button>
        <button name="intent" value="publish" disabled={pending || busy} className="rounded-md bg-indigo-700 px-4 py-2 text-white disabled:opacity-50">
          {busy ? "Uploading…" : "Publish"}
        </button>
      </div>
    </form>
  );
}