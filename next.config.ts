import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ignore ESLint errors during production builds:
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ... any other existing settings you have
};

export default nextConfig;
