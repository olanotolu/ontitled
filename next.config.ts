import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index.html",
      },
      {
        source: "/themis",
        destination: "/themis.html",
      },
      {
        source: "/human-creativity-benchmark",
        destination: "/index.html",
      },
      {
        source: "/research",
        destination: "/index.html",
      },
      {
        source: "/research/:path*",
        destination: "/index.html",
      },
      {
        source: "/jobs",
        destination: "/index.html",
      },
      {
        source: "/jobs/:path*",
        destination: "/index.html",
      },
      {
        source: "/company",
        destination: "/company.html",
      },
      {
        source: "/creative-arena/:path*",
        destination: "/index.html",
      },
      {
        source: "/vision",
        destination: "/index.html",
      },
    ];
  },
};

export default nextConfig;
