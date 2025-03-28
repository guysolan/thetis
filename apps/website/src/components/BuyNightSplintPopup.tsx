"use client";

import { DrawerDialog, DrawerDialogContent } from "@thetis/ui/drawer-or-dialog";
import { Button } from "@/components/ui/button";
import BulkOrders from "./buy-button/BulkOrders.tsx";
import FreeAndSecure from "./buy-button/FreeAndSecure.tsx";
import BuyButtonVariants from "./products/buy-button/BuyButtonVariants.tsx";

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
        <div className="space-y-4 w-full text-left">
          <h3 className="font-semibold text-2xl lg:text-3xl">
            Achilles Tendon Rupture Splint
          </h3>
          <BuyButtonVariants />
        </div>
      </DrawerDialogContent>
    </DrawerDialog>
  );
}
