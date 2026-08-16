import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/trabaf-construction-tunisie',
  assetPrefix: '/trabaf-construction-tunisie/'
};

export default nextConfig;
