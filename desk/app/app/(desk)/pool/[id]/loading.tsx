import { HeaderLine, Loading, Pane, Rows } from "@/components/desk/loading";

// A pool row while it reads: the facts, the touches, the next touch.
export default function ProspectLoading() {
  return (
    <Loading>
      <HeaderLine back />
      <Pane lines={6} />
      <Rows count={3} />
      <Pane lines={3} />
    </Loading>
  );
}
