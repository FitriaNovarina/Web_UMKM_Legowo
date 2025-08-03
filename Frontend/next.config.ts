import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "admin.legowo.id",
      "127.0.0.1",
      "images.unsplash.com",
      "plantoys.com",
      "www.melissaanddoug.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.legowo.id",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
