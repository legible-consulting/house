import type { ReactNode } from "react";

// The frame of the pages without the shell: sign-in, the two password pages and the free
// look. One column and no navigation; each page draws its own card. The paths are the same as
// before the group: a route group adds nothing to the URL.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left">
      <div className="mx-auto w-full max-w-2xl px-gutter py-8">{children}</div>
    </div>
  );
}
