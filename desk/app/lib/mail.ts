import { maybeEnv } from "./env";
import { identity } from "./house";

// The desk's one mail: a plain-text notice to Jamie, sent through Resend's HTTP API with
// RESEND_API_KEY. No SDK, no template. From the domain the portfolio verified in Resend, to
// the business email in core/identity.md (read at build), reply-to the person who wrote. The
// desk sends nothing to a visitor.
// A send never fails its caller: an unset key or a refused send is logged with the reason,
// and the caller continues (why: the answers are in git before the mail is sent · 2026-10-25).

const RESEND_URL = "https://api.resend.com/emails";
const FROM = "Desk <desk@mail.jamienisbet.com>";
const TIMEOUT_MS = 5000;

export interface Mail {
  subject: string;
  text: string;
  replyTo: string;
}

// True when Resend accepted the mail. False, with the reason in the log, otherwise.
export async function mailJamie(mail: Mail): Promise<boolean> {
  const key = maybeEnv("RESEND_API_KEY");
  const to = identity.email;
  const why = !key ? "RESEND_API_KEY is not set" : !to ? "house.json has no business email" : null;
  if (why) {
    console.error(`[desk] mail not sent: ${why}`);
    return false;
  }
  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "User-Agent": "legible-desk",
      },
      body: JSON.stringify({ from: FROM, to: [to], subject: mail.subject, text: mail.text, reply_to: mail.replyTo }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) return true;
    const body = (await res.json().catch(() => ({}))) as { message?: unknown };
    const msg = typeof body.message === "string" ? body.message : "no message";
    console.error(`[desk] mail not sent: Resend ${res.status}: ${msg}`);
  } catch (err) {
    console.error("[desk] mail not sent:", err instanceof Error ? err.message : err);
  }
  return false;
}
