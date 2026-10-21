"use server";

import { revalidatePath } from "next/cache";
import { back } from "@/lib/guard";
import { currentUser } from "@/lib/user";
import { dropWork, gateOf, ReadFailed, request, tickedBody, tokenOrReason, type GateName } from "@/lib/work";

// Jamie ticks a gate from the desk: the action reads the pull request's body, ticks the
// `- [ ]` after the gate's anchor and writes the body back. The write needs Pull requests
// write on the owner's token. A 403 or 404 means the token is read-only: the sentence names
// the variable and the pull request, and Jamie ticks on GitHub. Only the jamie role may call
// it: a gate is where Jamie's judgement enters, and nothing else ticks one.

const LABEL: Record<GateName, string> = { "spec-approved": "Spec approved", "ready-to-merge": "Ready to merge" };
const isGate = (v: unknown): v is GateName => v === "spec-approved" || v === "ready-to-merge";

export async function tickGate(repo: string, number: number, gate: GateName): Promise<void> {
  let error = "";
  let note = "";
  try {
    const user = await currentUser();
    if (!user || user.role !== "jamie") throw new Error("Only Jamie ticks a gate.");
    if (!isGate(gate)) throw new Error("The gate is not spec-approved or ready-to-merge.");
    if (!Number.isInteger(number) || number < 1) throw new Error("The pull request number is not valid.");
    const t = tokenOrReason(repo);
    if ("reason" in t) throw new Error(t.reason);
    const label = LABEL[gate];

    const pr = await request(t.token, "GET", `/repos/${repo}/pulls/${number}`);
    if (pr.status !== 200) throw new Error(`GitHub answered ${pr.status} for ${repo}#${number}.`);
    const raw = pr.body as Record<string, unknown>;
    const body = String(raw.body ?? "");
    const url = String(raw.html_url ?? `https://github.com/${repo}/pull/${number}`);

    const state = gateOf(body, gate);
    if (state === "not-required") throw new Error(`${repo}#${number} has no ${label} gate.`);
    if (state === "ticked") {
      note = `${label} on ${repo}#${number} was already ticked.`;
    } else {
      const next = tickedBody(body, gate);
      if (!next) throw new Error(`The ${label} line of ${repo}#${number} is not a checkbox. Tick it on GitHub: ${url}`);
      const put = await request(t.token, "PATCH", `/repos/${repo}/pulls/${number}`, { body: next });
      if (put.status === 403 || put.status === 404) {
        throw new Error(
          `${t.token.name} cannot write to ${repo} (${put.status}). Give it Pull requests read and write, or tick on GitHub: ${url}`,
        );
      }
      if (put.status !== 200) throw new Error(`GitHub answered ${put.status} when writing ${repo}#${number}.`);
      note = `Ticked ${label} on ${repo}#${number}.`;
    }
    dropWork(repo);
    revalidatePath("/work");
    revalidatePath("/clients/[slug]", "page");
  } catch (e) {
    error = e instanceof ReadFailed || e instanceof Error ? e.message : String(e);
  }
  if (error) back("/work", { error });
  back("/work", { note });
}
