import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    results: { stale: 30, revalidate: 86400, expire: 604800 },
  },
};

export default nextConfig;
