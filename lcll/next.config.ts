import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
      ],
    },
  },
  /* config options here */
};

export default nextConfig;
