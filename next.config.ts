import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: isGithubActions ? '/trabaf-construction-tunisie' : '',
};

export default nextConfig;
