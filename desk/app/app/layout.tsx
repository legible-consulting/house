import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Desk",
  robots: { index: false, follow: false },
  manifest: "/desk.webmanifest",
};

// The manifest (app/desk.webmanifest/route.ts) and this colour make the desk installable on
// the phone, where it is the share target for the research queue.
export const viewport: Viewport = { themeColor: "#0a0a0a" };

// The root layout stays static: each page fetches the session itself and renders the shell
// with it, so nothing here needs a variable at build time.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
