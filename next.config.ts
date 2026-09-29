import type { NextConfig } from "next";

// Fully static site (progress lives in localStorage), so it can be hosted on
// GitHub Pages. `npm run deploy` (scripts/deploy.mjs) sets PAGES_BASE_PATH=/learncivilwithme because
// Pages serves the site from a sub-path; locally it stays at "/".
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
