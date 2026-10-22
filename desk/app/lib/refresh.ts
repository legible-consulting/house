"use server";

import { redirect } from "next/navigation";
import { maybeEnv } from "./env";
import { dispatchWorkflow, isRunKey, RUNS, type RunKey } from "./github";
import { attempt, back } from "./guard";
import { currentUser } from "./user";

// Jamie starts one of the house's runs from the sync pill: the glance or the monthly close
// (rhythms.yml). GitHub queues the run on main. A run that changes a file commits to main,
// and Vercel redeploys the desk from that push about a minute later. The page follows the
// run and the deploy: the redirect carries the run and the start's time
// (?started=<key>&at=<seconds>), and the pill shows the run's state while the page re-reads
// itself (app/_sync.tsx, app/_shell.tsx). Only the jamie role may call it. The call needs
// Actions read and write on DESK_PAT: the token unset, or GitHub refusing, the page shows the
// reason in words and still renders.

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

export async function refresh(form: FormData): Promise<void> {
  let key: RunKey = "glance";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role !== "jamie") throw new Error("Only Jamie refreshes the desk.");
    const k = form.get("run");
    if (!isRunKey(k)) throw new Error("The run is not glance or close.");
    key = k;
    const inputs = { ...RUNS[k].inputs };
    const month = String(form.get("month") ?? "").trim();
    if (k === "close" && month) {
      if (!MONTH.test(month)) throw new Error(`The month ${month} is not YYYY-MM.`);
      inputs.month = month;
    }
    await dispatchWorkflow(RUNS[k].file, inputs);
  });
  if (error) back("/", { error });
  redirect(`/?started=${key}&at=${Math.floor(Date.now() / 1000)}`);
}

// Jamie redeploys the desk from main when the pill says out of sync: one POST to the Vercel
// deploy hook (DEPLOY_HOOK_URL). Vercel builds main again and the pill follows the deploy.
export async function redeploy(): Promise<void> {
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role !== "jamie") throw new Error("Only Jamie redeploys the desk.");
    const url = maybeEnv("DEPLOY_HOOK_URL");
    if (!url) throw new Error("DEPLOY_HOOK_URL is not set on the Vercel project. Redeploy from Vercel.");
    let res: Response;
    try {
      res = await fetch(url, { method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000) });
    } catch {
      throw new Error("Vercel did not answer the deploy hook.");
    }
    if (!res.ok) throw new Error(`Vercel answered ${res.status} to the deploy hook.`);
  });
  if (error) back("/", { error });
  back("/", { note: "Redeploy started. Vercel builds main in about a minute, and the pill follows it." });
}
