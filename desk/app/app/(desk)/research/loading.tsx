import { HeaderLine, Loading, Pane, Rows } from "@/components/desk/loading";

// Research while it reads: the queue and its form, then the verdicts.
export default function ResearchLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Rows count={2} />
      <Pane lines={2} />
      <Rows count={8} />
    </Loading>
  );
}
