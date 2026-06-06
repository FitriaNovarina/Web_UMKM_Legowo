import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "admin.legowo.id", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "plantoys.com", pathname: "/**" },
      { protocol: "https", hostname: "www.melissaanddoug.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
