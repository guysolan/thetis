import React from "react";
import { Button } from "@thetis/ui/button";
import { ArrowRight } from "lucide-react";

const BulkOrders = () => {
  return (
    <Button asChild variant="ghost" size="lg" className="mx-auto">
      <a className="flex flex-row items-center gap-2" href="/bulk-orders">
        <span>For Bulk Orders Click Here</span>
        <ArrowRight size={16} />
      </a>
    </Button>
  );
};

export default BulkOrders;
