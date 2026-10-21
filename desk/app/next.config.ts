import type { NextConfig } from "next";

// Every page renders per request on Vercel, behind the app's own sign-in; the clients table
// comes from lib/house.json, written by scripts/read-house.mjs before `next build`. The
// commit and the build time are inlined here so the footer can name the build and
// lib/github.ts can measure the distance from that commit to main. Vercel sets
// VERCEL_GIT_COMMIT_SHA; check.yml sets GITHUB_SHA; anywhere else the build is "local". The
// full sha is kept, because the compare read names it; the footer shortens it.
const nextConfig: NextConfig = {
  env: {
    BUILD_COMMIT: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "local",
    BUILD_TIME: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
  },
};

export default nextConfig;
