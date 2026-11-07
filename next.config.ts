import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Needed because the root layout lives in the dynamic [lang] segment.
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default nextConfig;
