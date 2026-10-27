import { HeaderLine, Loading, Pane, Rows, Tiles } from "@/components/desk/loading";

// The close while it reads: the four totals, the engagements, the two pipeline cards.
export default function CloseLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Tiles count={4} />
      <Rows count={5} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Pane lines={3} />
        <Pane lines={3} />
      </div>
    </Loading>
  );
}
