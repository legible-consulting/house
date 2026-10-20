import { redirect } from "next/navigation";
import { flash, type Search } from "@/lib/guard";
import { sessionUser } from "@/lib/user";
import { Shell } from "../_shell";
import { signIn } from "./actions";

export const dynamic = "force-dynamic";

export default async function SignIn({ searchParams }: { searchParams: Search }) {
  if (await sessionUser()) redirect("/");
  const { error } = await flash(searchParams);
  return (
    <Shell user={null}>
      <h2>Sign in</h2>
      {error && <p className="error">{error}</p>}
      <form action={signIn} className="grid narrow">
        <label>
          Email <input type="email" name="email" required autoComplete="username" />
        </label>
        <label>
          Password <input type="password" name="password" required autoComplete="current-password" />
        </label>
        <div>
          <button>Sign in</button>
        </div>
      </form>
    </Shell>
  );
}
