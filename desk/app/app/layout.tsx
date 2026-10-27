import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Motion } from "./_motion";
import { ServiceWorker } from "./_sw";

// The brand's two faces (core/voice.md): Hanken Grotesk for every word, IBM Plex Mono for
// every figure, date, slug and key. globals.css reads both variables.
const sans = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

// The manifest (app/desk.webmanifest/route.ts), the icons (app/_mark.tsx) and these values
// make the desk installable on the phone, where it is the share target for the research
// queue. The favicon and the Apple icon are app/icon.tsx and app/apple-icon.tsx.
export const metadata: Metadata = {
  applicationName: "Desk",
  title: { default: "Desk", template: "%s · Desk" },
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Desk" },
  manifest: "/desk.webmanifest",
};

// The theme colour follows the system: paper in light, ink in dark (globals.css). The
// viewport reaches under the notch and the home indicator; the safe-area tokens in
// globals.css keep the shell's pieces out of them (components/desk/shell.tsx, page-header.tsx).
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFEFA" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1E1E" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

// The root layout stays static: it loads the faces and the motion config and reads nothing.
// app/(desk)/layout.tsx reads the session and draws the shell; app/(auth)/layout.tsx is the
// frame of the pages without one. Motion follows the user's reduced-motion setting from here
// (app/_motion.tsx). The one client island registers the service worker (public/sw.js) after
// load.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", sans.variable, mono.variable)}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <Motion>{children}</Motion>
        <ServiceWorker />
      </body>
    </html>
  );
}
