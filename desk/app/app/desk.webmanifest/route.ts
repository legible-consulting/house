// The web app manifest: the desk installs on the phone from Chrome's menu, and installed it
// is a share target: a link shared to Desk opens /share (app/share/route.ts). A route, not
// app/manifest.ts, so share_target needs no type from Next. Open to every visitor: proxy.ts
// guards the pages, and the manifest holds no fact of the house. The icons are drawn at
// build (app/_mark.tsx). The colours are the brand's paper; the theme colour per scheme is
// the meta tag app/layout.tsx writes.
export const dynamic = "force-static";

const manifest = {
  id: "/",
  name: "Legible Consulting desk",
  short_name: "Desk",
  start_url: "/",
  scope: "/",
  display: "standalone",
  orientation: "any",
  background_color: "#FFFEFA",
  theme_color: "#FFFEFA",
  icons: [
    { src: "/icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/icon-maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
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
