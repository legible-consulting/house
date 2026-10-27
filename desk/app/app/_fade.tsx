"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The desk's one transition: a page's content fades in and rises 6 px on arrival, 180 ms,
// ease-out (Motion, core/stack.md; the breakdown, Motion rule 2). The key is the pathname, so
// the fade runs once per page and not on a re-read of the same one. Under reduced motion
// MotionConfig drops the rise, and the fade is dropped here, so the page simply appears.
export function Fade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const still = useReducedMotion();
  return (
    <motion.div
      key={pathname}
      initial={still ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
