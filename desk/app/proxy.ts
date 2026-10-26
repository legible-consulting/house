import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Every page needs a Neon Auth session except the ones the matcher leaves out: sign-in, the
// password pages, /start (the public free look), /f/<token> (a sent link: the token is the
// credential), /robots.txt and /api/pool (its own token). The SDK's middleware sends a visitor
// without one to the sign-in page and refreshes a session that has one; the role is each
// page's own check. Built on the first request, like the auth instance it wraps.
let guard: ReturnType<NeonAuthMiddleware> | undefined;
type NeonAuthMiddleware = ReturnType<typeof auth>["middleware"];

export default function proxy(request: NextRequest) {
  guard ??= auth().middleware({ loginUrl: "/sign-in" });
  return guard(request);
}

export const config = {
  matcher: ["/", "/work", "/pool/:path*", "/sell/:path*", "/close", "/clients/:path*", "/research/:path*", "/share"],
};
