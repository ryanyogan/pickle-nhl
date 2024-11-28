import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    dynamicIO: true,
    inlineCss: true,
    turbo: {
      unstablePersistentCaching: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.espncdn.com",
        port: "",
        pathname: "/i/teamlogos/**",
        search: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
