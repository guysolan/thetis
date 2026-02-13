import { Badge } from "@thetis/ui/badge";
import { Box, Weight } from "lucide-react";
import React from "react";

interface PackageDimensionsProps {
  selectedPackage: {
    height?: number | null;
    width?: number | null;
    depth?: number | null;
    weight?: number | null;
  };
}

const PackageDimensions = ({ selectedPackage }: PackageDimensionsProps) => {
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
