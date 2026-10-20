import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// Server output: every page renders per request on Vercel, behind the app's own sign-in.
// clients/*/record.md is still read at build time (src/lib/clients.ts); the pool lives in
// Neon. The commit and the build time are inlined here so the footer can name them.
export default defineConfig({
  output: "server",
  adapter: vercel(),
  vite: {
    define: {
      __BUILD_COMMIT__: JSON.stringify((process.env.GITHUB_SHA ?? "local").slice(0, 7)),
      __BUILD_TIME__: JSON.stringify(
        new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
      ),
    },
  },
});
