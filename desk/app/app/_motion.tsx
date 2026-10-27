"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Every animation of the desk runs under this config: a user who asked the OS for reduced
// motion gets none (the breakdown, Motion rule 1).
export function Motion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
