import { HeaderLine, Loading, Pane } from "@/components/desk/loading";

// Sell while it reads: the profile and the cadence as cards.
export default function SellLoading() {
  return (
    <Loading>
      <HeaderLine />
      <div className="grid gap-4 sm:grid-cols-2">
        <Pane lines={5} />
        <Pane lines={5} />
        <Pane lines={4} />
        <Pane lines={4} />
      </div>
    </Loading>
  );
}
