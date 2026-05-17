import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Vercel Blob storage (production uploads)
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Life Quest live API (team photos imported from live site)
      { protocol: "https", hostname: "api.lifequestclinicallab.com.np" },
      { protocol: "https", hostname: "lifequestclinicallab.com.np" },
    ],
  },
};

export default nextConfig;

