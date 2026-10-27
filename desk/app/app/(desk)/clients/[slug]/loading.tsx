import { HeaderLine, Loading, Pane, Rows } from "@/components/desk/loading";

// A client's page while it reads: where it stands, the documents, the work.
export default function ClientLoading() {
  return (
    <Loading>
      <HeaderLine back />
      <Pane lines={6} />
      <Pane lines={4} />
      <Rows count={4} />
    </Loading>
  );
}
