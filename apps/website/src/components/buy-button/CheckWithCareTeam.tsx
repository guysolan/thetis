import React from "react";
import { Button } from "@thetis/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@thetis/ui/dialog";

const CheckWithCareTeam = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Check with care team before buying</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Check with care team before buying</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Please check with your care team before buying.
        </DialogDescription>
        <p>
          Some surgeons may not approve the splint for use in the home. Please
          check with your care team before buying.
        </p>
        <p>
          We understand that sleeping is hard and that is why we build the
          product. We also have growing evidence to show the the splint is safe.
        </p>

        <p>
          Please show your surgeon our website and the{" "}
          <a href="/evidence">evidence</a>{" "}
          we have. Sadly, some surgeons may not approve the splint for use in
          the home. Please check with your care team before buying.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CheckWithCareTeam;
