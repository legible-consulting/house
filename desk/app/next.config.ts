import type { NextConfig } from "next";

// Every page renders per request on Vercel, behind the app's own sign-in; the clients table
// comes from lib/house.json, written by scripts/read-house.mjs before `next build`. The
// commit and the build time are inlined here so the footer can name the build.
const nextConfig: NextConfig = {
  env: {
    BUILD_COMMIT: (process.env.GITHUB_SHA ?? "local").slice(0, 7),
    BUILD_TIME: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
  },
};

export default nextConfig;
