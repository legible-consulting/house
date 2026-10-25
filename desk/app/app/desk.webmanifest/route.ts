// The web app manifest: the desk installs on the phone from Chrome's menu, and installed it
// is a share target: a link shared to Desk opens /share (app/share/route.ts). A route, not
// app/manifest.ts, so share_target needs no type from Next. Open to every visitor: proxy.ts
// guards the pages, and the manifest holds no fact of the house.
export const dynamic = "force-static";

const manifest = {
  name: "Desk",
  short_name: "Desk",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#0a0a0a",
  icons: [
    { src: "/icon-192", sizes: "192x192", type: "image/png", purpose: "any maskable" },
    { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "any maskable" },
  ],
  share_target: {
    action: "/share",
    method: "GET",
    params: { title: "title", text: "text", url: "url" },
  },
};

export function GET(): Response {
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json", "Cache-Control": "public, max-age=3600" },
  });
}
