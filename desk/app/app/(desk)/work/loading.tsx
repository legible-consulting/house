import { HeaderLine, Loading, Rows } from "@/components/desk/loading";

// The work view while it reads: what waits on Jamie, the next ticket per repo, the tickets.
export default function WorkLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Rows count={2} />
      <Rows count={3} />
      <Rows count={8} />
    </Loading>
  );
}
