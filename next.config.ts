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
      // Old static filename — keep bookmarks working
      {
        source: "/index.html",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    // beforeFiles: win over public/ filesystem quirks (esp. /index vs index.html)
    return {
      beforeFiles: [
        // Index page = Creative Arena / research (must not collide with home)
        {
          source: "/index",
          destination: "/index.html",
        },
        {
          source: "/index/:path*",
          destination: "/index.html",
        },
        {
          source: "/",
          destination: "/home.html",
        },
      ],
      afterFiles: [
        {
          source: "/themis",
          destination: "/themis.html",
        },
        {
          source: "/dike",
          destination: "/home.html",
        },
        {
          source: "/dike/:path*",
          destination: "/home.html",
        },
        {
          source: "/human-creativity-benchmark",
          destination: "/index.html",
        },
        {
          source: "/jobs",
          destination: "/home.html",
        },
        {
          source: "/jobs/:path*",
          destination: "/home.html",
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
          destination: "/home.html",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
