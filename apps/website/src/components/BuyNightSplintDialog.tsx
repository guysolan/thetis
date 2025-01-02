"use client";

import { Dialog, DialogContent, DialogTrigger } from "@thetis/ui/dialog";
import BuyNightSplint from "./BuyNightSplint.tsx";
import { Button } from "@/components/ui/button";

export default function BuyNightSplintDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="default">
          Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <BuyNightSplint showImage={false} />
      </DialogContent>
    </Dialog>
  );
}
