import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: "/posts", destination: "/essays", permanent: true },
      { source: "/posts/:slug", destination: "/essays/:slug", permanent: true },
      { source: "/tech", destination: "/essays", permanent: true },
      { source: "/regulations", destination: "/essays", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
