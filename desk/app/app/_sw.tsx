"use client";

import { useEffect } from "react";

// Registers the service worker (public/sw.js) after the page has loaded, so the register
// never competes with the page's own requests. `updateViaCache: "none"` makes the browser
// read sw.js from the network on every check, and next.config.ts serves it uncached, so a
// new offline page reaches the phone on the next visit. Renders nothing.
export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {});
    };
    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);
  return null;
}
