import { Badge } from "@thetis/ui/badge";
import { Box, Weight } from "lucide-react";
import React from "react";
import { Item } from "../../items/types";

const PackageDimensions = ({
  selectedPackage,
}: { selectedPackage: Item["Row"] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {selectedPackage.height &&
        selectedPackage.width &&
        selectedPackage.depth && (
        <Badge variant="default" className="gap-x-2">
          <Box size={16} />
          {selectedPackage.height} × {selectedPackage.width} ×{" "}
          {selectedPackage.depth} cm
        </Badge>
      )}
      {selectedPackage.weight && selectedPackage.weight > 0 && (
        <Badge variant="default" className="gap-x-2">
          <Weight size={16} />
          {selectedPackage.weight} kg
        </Badge>
      )}
    </div>
  );
};

export default PackageDimensions;
