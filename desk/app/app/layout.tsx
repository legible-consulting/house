import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Motion } from "./_motion";

// The brand's two faces (core/voice.md): Hanken Grotesk for every word, IBM Plex Mono for
// every figure, date, slug and key. globals.css reads both variables.
const sans = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Desk",
  robots: { index: false, follow: false },
  manifest: "/desk.webmanifest",
};

// The manifest (app/desk.webmanifest/route.ts) and this colour make the desk installable on
// the phone, where it is the share target for the research queue. viewport-fit cover lets the
// page reach under the notch and the home indicator, so the tab bar and the page header can
// pad by env(safe-area-inset-*) (components/desk/shell.tsx, page-header.tsx).
export const viewport: Viewport = { themeColor: "#0a0a0a", viewportFit: "cover" };

// The root layout stays static: it loads the faces and the motion config and reads nothing.
// app/(desk)/layout.tsx reads the session and draws the shell; app/(auth)/layout.tsx is the
// frame of the pages without one. Motion follows the user's reduced-motion setting from here
// (app/_motion.tsx).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", sans.variable, mono.variable)}>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <Motion>{children}</Motion>
      </body>
    </html>
  );
}
