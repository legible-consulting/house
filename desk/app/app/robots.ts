import type { MetadataRoute } from "next";

// /robots.txt. Every page is `noindex` already (app/layout.tsx); /f/<token> also keeps crawlers
// out, because a link forwarded in a mail is a credential (answer-a-link of
// .icm/intake/desk-forms · 2026-10-25).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/f/" } };
}
