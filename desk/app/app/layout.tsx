import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desk",
  robots: { index: false, follow: false },
};

// The root layout stays static: each page fetches the session itself and renders the shell
// with it, so nothing here needs a variable at build time.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
