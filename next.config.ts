import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  // output:'export'
};

export default nextConfig;
