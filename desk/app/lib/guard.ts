import { redirect } from "next/navigation";

// Server actions run the work inside attempt() and redirect outside it: redirect() throws,
// and a catch around it would swallow the redirect. The page shows ?error= and ?note=.
export async function attempt(fn: () => Promise<void>): Promise<string> {
  try {
    await fn();
    return "";
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
}

// The page's query, as Next.js types it; flash() picks the two strings a page shows.
export type Search = Promise<Record<string, string | string[] | undefined>>;

export async function flash(searchParams: Search): Promise<{ error: string; note: string }> {
  const q = await searchParams;
  const pick = (k: string) => (typeof q[k] === "string" ? q[k] : "");
  return { error: pick("error"), note: pick("note") };
}

export function back(path: string, { error = "", note = "" } = {}): never {
  const q = error ? `?error=${encodeURIComponent(error)}` : note ? `?note=${encodeURIComponent(note)}` : "";
  redirect(`${path}${q}`);
}
