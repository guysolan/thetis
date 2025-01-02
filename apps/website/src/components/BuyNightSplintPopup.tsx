"use client";

import { DrawerDialog, DrawerDialogContent } from "@thetis/ui/drawer-or-dialog";
import BuyNightSplint from "./BuyNightSplint.tsx";
import { Button } from "@/components/ui/button";

export default function BuyNightSplintPopup() {
  return (
    <DrawerDialog
      trigger={
        <Button size="lg" variant="default">
          Buy Now
        </Button>
      }
    >
      <DrawerDialogContent>
        <BuyNightSplint showImage={false} />
      </DrawerDialogContent>
    </DrawerDialog>
  );
}
