import { HeaderLine, Loading } from "@/components/desk/loading";
import { Skeleton } from "@/components/ui/skeleton";

// A board while it reads: four skeleton columns, each a heading and a stack of cards. The phone
// shows the first column only, as the board does.
export default function BoardLoading() {
  return (
    <Loading>
      <HeaderLine back />
      <div aria-hidden="true" className="grid gap-4 md:grid-cols-4">
        {[4, 2, 3, 3].map((cards, i) => (
          <div key={i} className={i === 0 ? "grid content-start gap-2" : "hidden content-start gap-2 md:grid"}>
            <Skeleton className="mb-2 h-4 w-24" />
            {Array.from({ length: cards }, (_, j) => (
              <Skeleton key={j} className="h-16 rounded-pane" />
            ))}
          </div>
        ))}
      </div>
    </Loading>
  );
}
