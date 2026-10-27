import { HeaderLine, Loading, Pane, Rows } from "@/components/desk/loading";

// Research while it reads: the form, the verdicts, the queue.
export default function ResearchLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Pane lines={2} />
      <Rows count={8} />
      <Rows count={2} />
    </Loading>
  );
}
