import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/datasets",
        destination: "/index",
        permanent: true,
      },
      {
        source: "/datasets/:path*",
        destination: "/index",
        permanent: true,
      },
      {
        source: "/research",
        destination: "/index",
        permanent: true,
      },
      {
        source: "/research/:path*",
        destination: "/index/:path*",
        permanent: true,
      },
    ];
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
        source: "/dike",
        destination: "/index.html",
      },
      {
        source: "/dike/:path*",
        destination: "/index.html",
      },
      {
        source: "/human-creativity-benchmark",
        destination: "/index.html",
      },
      {
        source: "/index",
        destination: "/index.html",
      },
      {
        source: "/index/:path*",
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
        source: "/our-thesis",
        destination: "/our-thesis.html",
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
