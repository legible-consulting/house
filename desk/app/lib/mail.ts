import { maybeEnv } from "./env";
import { businessEmail } from "./house";

// The desk's one mail: a plain-text notice to Jamie, through Resend's HTTP API with
// RESEND_API_KEY. The sender is the domain the portfolio verified in Resend. The recipient is
// the business email in core/identity.md, read at build. The desk mails Jamie only, never a
// visitor. An unset key or a failed send is logged with the reason and returns false, and the
// caller goes on (why: the answers are in git before the mail is sent · 2026-10-25).

const FROM = "Desk <desk@mail.jamienisbet.com>";
const API = "https://api.resend.com/emails";

export interface Mail {
  subject: string;
  text: string;
  replyTo: string; // the visitor, so a reply from the mail reaches them
}

export async function mailJamie({ subject, text, replyTo }: Mail): Promise<boolean> {
  const key = maybeEnv("RESEND_API_KEY");
  if (!key) {
    console.error("[desk] mail not sent: RESEND_API_KEY is not set in this environment");
    return false;
  }
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [businessEmail], subject, text, reply_to: replyTo }),
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return true;
    console.error(`[desk] mail not sent: Resend answered ${res.status}:`, await res.text().catch(() => ""));
  } catch (e) {
    console.error("[desk] mail not sent:", e);
  }
  return false;
}
