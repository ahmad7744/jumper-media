import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactStrictMode: true,
  images: {
    domains: ['tuk-cdn.s3.amazonaws.com'], // Add the domain here
  },
  /* config options here */
};

export default nextConfig;
