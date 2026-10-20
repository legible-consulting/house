"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// The desk's one transition: a page's content fades in on arrival (Motion, core/stack.md).
export function Fade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
