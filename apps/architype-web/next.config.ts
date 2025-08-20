import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@vnx-architype/ui","@vnx-architype/api","@vnx-architype/db"],
  experimental: { optimizePackageImports: ["lucide-react"] },

  // ✅ Do not fail the build on ESLint errors
  eslint: { ignoreDuringBuilds: true },

  // keep strict TS; flip to true only if TS blocks the build
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
