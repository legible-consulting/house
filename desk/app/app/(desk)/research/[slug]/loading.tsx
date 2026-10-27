import { HeaderLine, Lines, Loading } from "@/components/desk/loading";

// A verdict while it reads: the body as prose.
export default function VerdictLoading() {
  return (
    <Loading>
      <HeaderLine back />
      <Lines count={12} className="max-w-reading" />
    </Loading>
  );
}
