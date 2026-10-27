"use client";

import { Plus } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useDesk } from "@/app/_media";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

// "Add a prospect": one form, two containers. The button sits on the page header's trailing
// edge. Below md it opens a bottom drawer with the form; from md it opens the same form in a
// card under the table and moves the focus to its first field. `AddProspect` holds the one
// open state that the button and the panel share. Both start closed, so the phone's swap
// after hydration moves nothing.

const PANEL = "add-prospect";
const TITLE = "Add a prospect";
const WHAT = "Company and source now; the rest on the row's page.";

const Open = createContext<{ open: boolean; setOpen: (open: boolean) => void }>({ open: false, setOpen: () => {} });

export function AddProspect({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <Open.Provider value={{ open, setOpen }}>{children}</Open.Provider>;
}

export function AddProspectButton() {
  const { open, setOpen } = useContext(Open);
  const desk = useDesk();
  return (
    <Button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={desk ? open : undefined}
      aria-controls={desk && open ? PANEL : undefined}
      aria-haspopup={desk ? undefined : "dialog"}
    >
      <Plus aria-hidden="true" data-icon="inline-start" />
      <span aria-hidden="true" className="sm:hidden">
        Add
      </span>
      <span className="max-sm:sr-only">{TITLE}</span>
    </Button>
  );
}

// The form's container: the card from md, the drawer below it. `children` is the form.
export function AddProspectPanel({ children }: { children: ReactNode }) {
  const { open, setOpen } = useContext(Open);
  const desk = useDesk();
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && desk) card.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  }, [open, desk]);
  if (desk) {
    if (!open) return null;
    return (
      <Card id={PANEL} ref={card} className="mt-8">
        <CardHeader>
          <CardTitle>
            <h2>{TITLE}</h2>
          </CardTitle>
          <CardDescription>{WHAT}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{TITLE}</DrawerTitle>
          <DrawerDescription>{WHAT}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto p-4 pb-[calc(1rem+var(--safe-bottom))]">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
