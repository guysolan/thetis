import type { PricedOrderItem } from "./schema";
import PackagePreview from "./PackagePreview";

interface BuyPreviewProps {
  orderItems: Array<{
    item_type: "product" | "part" | "package" | "stocktake";
    item_id?: string;
    package_id?: string;
    quantity_change: number;
    item_price?: number;
    item_total?: number;
    item_name?: string;
    package_item_change_id?: number;
    package_items?: PricedOrderItem[];
  }>;
  producedItems: PricedOrderItem[];
  consumedItems: PricedOrderItem[];
  packageItems: Array<{
    package_id: string;
    package_item_change_id: number;
  }>;
  mode: "package" | "direct";
}

const BuyPreview = ({
  orderItems,
  producedItems,
  consumedItems,
  packageItems,
  mode,
}: BuyPreviewProps) => {
  // Calculate total value from order items
  const totalValue = orderItems.reduce((sum, item) => {
    return (
      sum + (item.item_total || item.quantity_change * (item.item_price || 0))
    );
  }, 0);

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">Purchase Order Summary</p>

      {mode === "package" ? (
        <PackagePreview
          packageItems={packageItems}
          orderItems={orderItems}
          showValue={true}
        />
      ) : (
        <div className="space-y-3">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {orderItems.length > 0 && (
              <div className="bg-blue-50 p-3 border border-blue-200 rounded-lg">
                <p className="mb-1 font-medium text-blue-800 text-sm">
                  Purchasing
                </p>
                <p className="font-semibold text-blue-900 text-lg">
                  {orderItems.length}
                </p>
                <p className="text-blue-600 text-xs">
                  item{orderItems.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
            {producedItems.length > 0 && (
              <div className="bg-green-50 p-3 border border-green-200 rounded-lg">
                <p className="mb-1 font-medium text-green-800 text-sm">
                  Producing
                </p>
                <p className="font-semibold text-green-900 text-lg">
                  {producedItems.length}
                </p>
                <p className="text-green-600 text-xs">
                  item{producedItems.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
            {consumedItems.length > 0 && (
              <div className="bg-orange-50 p-3 border border-orange-200 rounded-lg">
                <p className="mb-1 font-medium text-orange-800 text-sm">
                  Consuming
                </p>
                <p className="font-semibold text-orange-900 text-lg">
                  {consumedItems.length}
                </p>
                <p className="text-orange-600 text-xs">
                  item{consumedItems.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {totalValue > 0 && (
        <div className="pt-3 border-gray-200 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 text-sm">
              Order Total:
            </span>
            <span className="font-semibold text-blue-600 text-lg">
              ${totalValue.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPreview;
