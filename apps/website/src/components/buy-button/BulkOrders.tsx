import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@thetis/ui/cn";

const BulkOrders = () => {
  return (
    <a
      className={cn(
        buttonVariants({ variant: "ghost", size: "lg" }),
        "flex flex-row items-center gap-2",
      )}
      href="/order-wholesale"
    >
      <span className="text-base underline underline-offset-2">
        For Bulk Orders Click Here
      </span>
      <ArrowRight size={20} />
    </a>
  );
};

export default BulkOrders;
