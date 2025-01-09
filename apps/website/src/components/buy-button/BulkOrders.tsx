import React from "react";
import { Button } from "@thetis/ui/button";
import { ArrowRight } from "lucide-react";

const BulkOrders = () => {
  return (
    <Button asChild variant="ghost" size="lg" className="mx-auto">
      <a className="flex flex-row items-center gap-2" href="/wholesale">
        <span className="text-base underline underline-offset-2">
          For Bulk Orders Click Here
        </span>
        <ArrowRight size={20} />
      </a>
    </Button>
  );
};

export default BulkOrders;
