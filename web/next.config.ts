import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

export default function nextConfig(phase: string): NextConfig {
  return {
    reactStrictMode: true,
    experimental: {
      externalDir: true,
    },
    // Keep dev and production builds isolated so `next dev` artifacts do not
    // pollute `next build` / `next start` validation.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  };
}
