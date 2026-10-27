import { HeaderLine, Lines, Loading, Pane, Tiles } from "@/components/desk/loading";

// The desk's home while it reads: the tiles, the action cards, Jamie's hand.
export default function HomeLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Tiles count={4} />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <Pane lines={3} />
        <Pane lines={3} />
        <Pane lines={3} />
      </div>
      <Lines count={6} />
    </Loading>
  );
}
