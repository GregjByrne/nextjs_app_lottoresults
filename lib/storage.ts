// lib/storage.ts
import "server-only";
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  // newer SDK versions add checksum headers by default that R2 can reject
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

export async function putImage(key: string, body: Buffer, contentType: string) {
  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable", // keys are unique, so cache for a year
  }));
}

export async function listImages(prefix = "news/") {
  const out: { key: string; modified: Date }[] = [];
  let token: string | undefined;
  do {
    const res = await r2.send(new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET!,
      Prefix: prefix,
      ContinuationToken: token,
    }));
    for (const o of res.Contents ?? []) {
      if (o.Key && o.LastModified) out.push({ key: o.Key, modified: o.LastModified });
    }
    token = res.NextContinuationToken;
  } while (token);
  return out;
}

export async function deleteImage(key: string) {
  await r2.send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET!, Key: key }));
}