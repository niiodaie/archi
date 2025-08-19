// apps/architype-web/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: [
    "@vnx-architype/ui",
    "@vnx-architype/api",
    "@vnx-architype/db",
  ],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // If your first build is blocked by lint/TS, temporarily flip these to true:
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
