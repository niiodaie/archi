import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@vnx-architype/ui", "@vnx-architype/api", "@vnx-architype/db"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
