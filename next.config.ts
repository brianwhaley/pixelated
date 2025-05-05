import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@brianwhaley/pixelated-components'],
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // output:'export'
};

export default nextConfig;
