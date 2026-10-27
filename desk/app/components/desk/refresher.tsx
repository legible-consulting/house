"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// The page's re-read while something it shows is in flight (page-header.tsx). router.refresh()
// renders the server components again in place: the scroll, an open ticket, an open panel and
// a half-typed field stay as they are. A hidden tab does not re-read, so a tab left open spends
// no GitHub requests; it re-reads once when it is shown again.
export function Refresher({ seconds }: { seconds: number }) {
  const router = useRouter();
  useEffect(() => {
    const read = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    const id = setInterval(read, seconds * 1000);
    document.addEventListener("visibilitychange", read);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", read);
    };
  }, [router, seconds]);
  return null;
}
