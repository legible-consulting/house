import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Every page needs a Neon Auth session except sign-in. The SDK's middleware sends a visitor
// without one to the sign-in page and refreshes a session that has one; the role is each
// page's own check. Built on the first request, like the auth instance it wraps.
let guard: ReturnType<NeonAuthMiddleware> | undefined;
type NeonAuthMiddleware = ReturnType<typeof auth>["middleware"];

export default function proxy(request: NextRequest) {
  guard ??= auth().middleware({ loginUrl: "/sign-in" });
  return guard(request);
}

export const config = {
  matcher: ["/", "/work", "/pool/:path*", "/sell/:path*", "/close", "/clients/:path*", "/research", "/share"],
};
