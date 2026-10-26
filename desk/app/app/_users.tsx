import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usersOf } from "@/lib/db";
import type { ClientUser } from "@/lib/pool";

// The client users of one folder, or the reason they cannot be read. A failed read fails this
// card only, in words, like the sent links (app/_send.tsx).
export async function readUsers(slug: string): Promise<{ users: ClientUser[]; error: string }> {
  try {
    return { users: await usersOf(slug), error: "" };
  } catch (e) {
    return { users: [], error: `The users do not read: ${e instanceof Error ? e.message : String(e)}` };
  }
}

// The Users card, Jamie only, on /clients/<slug>: every user at role client whose `client` is
// this folder, with the state. A user saved by the answer to a sent link is not active and sees
// nothing until Jamie activates them (client-signs-up of .icm/intake/desk-forms).
export function ClientUsers({ read }: { read: { users: ClientUser[]; error: string } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          The people who read this folder. A person who answers a form sent from this page is saved here, not active.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {read.error ? (
          <p className="text-sm text-destructive">{read.error}</p>
        ) : read.users.length === 0 ? (
          <p className="text-sm text-muted-foreground">No user yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Saved</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {read.users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell className="tabular-nums">{u.saved}</TableCell>
                  <TableCell>
                    <Badge variant={u.active ? "secondary" : "outline"}>{u.active ? "active" : "waits for activation"}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
