"use server";

import { redirect } from "next/navigation";
import { dispatchWorkflow, isRunKey, RUNS, type RunKey } from "./github";
import { attempt, back } from "./guard";
import { currentUser } from "./user";

// Jamie starts one of the house's workflows from the desk: the glance (sweep-deadlines.yml),
// the Friday review or the monthly close (rhythms.yml). GitHub queues the run on main. A run
// that changes a file commits to main, and Vercel redeploys the desk from that push a few
// minutes later; nothing on the desk changes before that deploy, and the page says so
// (app/_refresh.tsx). Only the jamie role may call it. The call needs Actions read and write
// on DESK_PAT: the token unset, or GitHub refusing, the page shows the reason in words and
// still renders.

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

export async function refresh(form: FormData): Promise<void> {
  let key: RunKey = "glance";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role !== "jamie") throw new Error("Only Jamie refreshes the desk.");
    const k = form.get("run");
    if (!isRunKey(k)) throw new Error("The run is not glance, review or close.");
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
  redirect(`/?started=${key}`);
}
