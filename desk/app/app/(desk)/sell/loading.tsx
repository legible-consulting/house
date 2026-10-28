import { HeaderLine, Lines, Loading, Rows } from "@/components/desk/loading";

// Sell while it reads: the kit's intro, then the lessons of a part as rows.
export default function SellLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Lines count={4} className="max-w-reading" />
      <Rows count={4} className="max-w-reading" />
      <Rows count={9} className="max-w-reading" />
    </Loading>
  );
}
