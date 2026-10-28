import { HeaderLine, Loading, Pane } from "@/components/desk/loading";

// Preferences while it reads: the one field group.
export default function PreferencesLoading() {
  return (
    <Loading>
      <HeaderLine />
      <Pane lines={3} />
    </Loading>
  );
}
