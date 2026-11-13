// lib/images.ts  (safe to import anywhere on the server)
export const imageUrl = (key: string) => `${process.env.IMAGES_URL}/${key}`;