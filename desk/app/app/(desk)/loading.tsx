import { HeaderLine, Loading, Pane, Rows, Tiles } from "@/components/desk/loading";

// The desk's home while it reads: the glance card, the seven pool tiles, the clients table.
export default function HomeLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Pane lines={5} />
      <Tiles count={7} className="lg:grid-cols-7" />
      <Rows count={5} />
    </Loading>
  );
}
