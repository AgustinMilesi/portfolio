import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "gh-pages";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPages ? "/portfolio" : "");

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  output: isGithubPages ? "export" : undefined,
  basePath: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
