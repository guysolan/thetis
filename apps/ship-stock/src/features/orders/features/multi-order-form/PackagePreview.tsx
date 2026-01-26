import { Badge } from "@thetis/ui/badge";
import { Box, Weight } from "lucide-react";
import { useSelectItemsView } from "../../../items/api/selectItemsView";

interface PackageItem {
  item_total?: number;
  quantity_change?: number;
  item_price?: number;
  item_name?: string;
  item_id?: string;
  package_item_change_id?: number;
}

interface PackageInfo {
  package_id: string;
  package_item_change_id: number;
}

interface PackagePreviewProps {
  packageItems: PackageInfo[];
  orderItems: PackageItem[];
  borderColor?: string;
  showValue?: boolean;
}

const PackagePreview = ({
  packageItems,
  orderItems,
  borderColor = "border-gray-200",
  showValue = false,
}: PackagePreviewProps) => {
  const { data: itemsView } = useSelectItemsView();

  const totalValue = showValue
    ? orderItems.reduce((sum, item) => sum + (item.item_total || 0), 0)
    : 0;

  return (
    <div className="space-y-3">
      <div className="gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {packageItems.map((pkg, index) => {
          // Get items for this specific package
          const packageOrderItems = orderItems.filter(
            (item) =>
              item.package_item_change_id === pkg.package_item_change_id,
          );
          const packageTotal = packageOrderItems.reduce(
            (sum, item) => sum + (item.item_total || 0),
            0,
          );
          const isEmpty = packageOrderItems.length === 0;

          // Get package details from itemsView
          const selectedPackage = itemsView?.find(
            (item) => String(item.item_id) === pkg.package_id,
          );

          return (
            <div
              key={`package-${index}-${pkg.package_id}-${pkg.package_item_change_id}`}
              className={`p-3 rounded-sm border-2 ${borderColor} ${
                isEmpty
                  ? "bg-gray-100/50 border-dashed"
                  : "bg-gray-50/50 hover:bg-gray-100/50"
              } transition-colors`}
            >
              <div className="space-y-2">
                {/* Header with package number and price */}
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="font-medium text-xs">
                    Package {index + 1}
                  </Badge>
                  {showValue && packageTotal > 0 && (
                    <Badge
                      variant="secondary"
                      className="font-semibold text-xs"
                    >
                      ${packageTotal.toFixed(2)}
                    </Badge>
                  )}
                </div>

                {/* Package name if available */}
                {selectedPackage && (
                  <div className="font-medium text-gray-800 text-xs truncate">
                    {selectedPackage.item_name}
                  </div>
                )}

                {/* Package items list */}
                {!isEmpty && (
                  <div className="space-y-1">
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {packageOrderItems.map((item, itemIndex) => {
                        const itemDetails = itemsView?.find(
                          (i) => String(i.item_id) === item.item_id,
                        );
                        return (
                          <div
                            key={`package-${index}-item-${itemIndex}-${item.item_id}-${item.package_item_change_id}`}
                            className="text-gray-700 text-xs"
                          >
                            <div className="font-medium">
                              {itemDetails?.item_name ||
                                item.item_name ||
                                `Item ${item.item_id}`} ×{" "}
                              {Math.abs(item.quantity_change || 0)}
                            </div>
                            {showValue && item.item_total && (
                              <div className="mt-0.5 text-gray-600">
                                ${item.item_total.toFixed(2)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Package dimensions */}
                {selectedPackage && (
                  <div className="space-y-1">
                    {selectedPackage.height &&
                      selectedPackage.width &&
                      selectedPackage.depth && (
                      <div className="flex items-center gap-1 text-gray-600 text-xs">
                        <Box size={12} />
                        <span>
                          {selectedPackage.height} × {selectedPackage.width} ×
                          {" "}
                          {selectedPackage.depth} cm
                        </span>
                      </div>
                    )}
                    {selectedPackage.weight && selectedPackage.weight > 0 && (
                      <div className="flex items-center gap-1 text-gray-600 text-xs">
                        <Weight size={12} />
                        <span>{selectedPackage.weight} kg</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackagePreview;
