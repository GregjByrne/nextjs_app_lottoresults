import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: false,
  cacheLife: {
    results: { stale: 30, revalidate: 86400, expire: 604800 },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.irish-lotto-results.ie" }],
  },
};

export default nextConfig;
