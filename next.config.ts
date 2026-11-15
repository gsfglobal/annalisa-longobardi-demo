import type { NextConfig } from "next";

// GitHub Pages: il sito vive in /<nome-repo>/ → PAGES_BASE="/annalisa-longobardi-demo"
const base = process.env.PAGES_BASE ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: base || undefined,
  env: { NEXT_PUBLIC_BASE: base },
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
};

export default nextConfig;
