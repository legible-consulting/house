import { HeaderLine, Loading, Rows } from "@/components/desk/loading";

// The work view while it reads: on your desk, running, the projects.
export default function WorkLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Rows count={2} />
      <Rows count={3} />
      <Rows count={4} />
    </Loading>
  );
}
