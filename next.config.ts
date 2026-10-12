import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Pages load cars from OLX, which allows 60 requests/minute and may ask us to wait.
  staticPageGenerationTimeout: 180,
  experimental: {
    // Generate pages one at a time so they share one cached OLX fetch instead of
    // several workers fetching in parallel and hitting the rate limit.
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
