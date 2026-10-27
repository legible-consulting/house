import { HeaderLine, Loading, Pane, Rows } from "@/components/desk/loading";

// The pool while it reads: the rows, then the form that adds one.
export default function PoolLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Rows count={8} />
      <Pane lines={4} />
    </Loading>
  );
}
