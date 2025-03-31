import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  // output:'export'
};

export default nextConfig;
