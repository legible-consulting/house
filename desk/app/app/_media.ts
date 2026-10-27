"use client";

import { useSyncExternalStore } from "react";

// True from md, the desk's width; false on a phone. The server renders the desk's frame, and
// a phone swaps it after hydration, so a frame that starts closed does not move.
const MD = "(min-width: 48rem)";
const subscribe = (onChange: () => void) => {
  const m = window.matchMedia(MD);
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
};
export const useDesk = () => useSyncExternalStore(subscribe, () => window.matchMedia(MD).matches, () => true);
