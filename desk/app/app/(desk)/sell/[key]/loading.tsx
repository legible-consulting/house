import { HeaderLine, Lines, Loading } from "@/components/desk/loading";

// A lesson while it reads: the track, then the words as prose.
export default function LessonLoading() {
  return (
    <Loading>
      <HeaderLine back />
      <Lines count={1} className="max-w-48" />
      <Lines count={12} className="max-w-reading" />
    </Loading>
  );
}
