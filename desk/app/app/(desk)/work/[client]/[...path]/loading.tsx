import { HeaderLine, Lines, Loading, Pane, Rows } from "@/components/desk/loading";

// A ticket while it reads: the state, the pull request, the prompt, the stub, the epic.
export default function TicketLoading() {
  return (
    <Loading className="max-w-reading">
      <HeaderLine back />
      <Lines count={1} className="w-1/2" />
      <Pane lines={3} />
      <Pane lines={2} />
      <Lines count={6} />
      <Rows count={4} />
    </Loading>
  );
}
