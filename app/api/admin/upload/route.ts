import { auth } from "@clerk/nextjs/server";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { putImage } from "@/lib/storage";
import { imageUrl } from "@/lib/images";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const file = (await req.formData()).get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/"))
    return Response.json({ error: "Please choose an image file" }, { status: 400 });
  if (file.size > 8 * 1024 * 1024)
    return Response.json({ error: "Image is over 8 MB" }, { status: 413 });

  // fix rotation, cap the width at 1600px, convert to WebP
  const out = await sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const d = new Date();
  const hash = createHash("sha256").update(out).digest("hex").slice(0, 16);
  const key = `news/${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${hash}.webp`;
  await putImage(key, out, "image/webp");

  return Response.json({ key, url: imageUrl(key) });
}