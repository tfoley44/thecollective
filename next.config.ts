import type { NextConfig } from "next";

const config: NextConfig = {
  distDir: ".next",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
