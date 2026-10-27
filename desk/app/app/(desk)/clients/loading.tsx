import { HeaderLine, Loading, Rows } from "@/components/desk/loading";

// The clients table while it reads: one row per client.
export default function ClientsLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Rows count={5} />
    </Loading>
  );
}
