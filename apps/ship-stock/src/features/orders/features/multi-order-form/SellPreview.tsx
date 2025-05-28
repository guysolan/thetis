import type { PricedOrderItem } from "./schema";
import PackagePreview from "./PackagePreview";
import { useSelectItemsView } from "../../../items/api/selectItemsView";

interface SellPreviewProps {
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
  packageItems: Array<{
    package_id: string;
    package_item_change_id: number;
  }>;
  mode: "package" | "direct";
}

const SellPreview = ({ orderItems, packageItems, mode }: SellPreviewProps) => {
  const { data: itemsView } = useSelectItemsView();

  // Calculate total value
  const totalValue = orderItems.reduce((sum, item) => {
    return (
      sum + (item.item_total || item.quantity_change * (item.item_price || 0))
    );
  }, 0);

  // Debug logging
  console.log("🔍 SellPreview Debug:", {
    mode,
    packageItemsCount: packageItems.length,
    orderItemsCount: orderItems.length,
    packageItems,
    orderItems,
  });

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">Sale Order Summary</p>

      {mode === "package" ? (
        <PackagePreview
          packageItems={packageItems}
          orderItems={orderItems}
          showValue={true}
        />
      ) : (
        <div className="space-y-3">
          <div className="space-y-2">
            {orderItems.slice(0, 6).map((item, index) => {
              const itemDetails = itemsView?.find(
                (i) => String(i.item_id) === (item.item_id || item.package_id),
              );
              return (
                <div
                  key={`${item.item_id || item.package_id}-${index}`}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded text-sm"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {itemDetails?.item_name ||
                        item.item_name ||
                        `Item ${item.item_id || item.package_id}`}{" "}
                      × {Math.abs(item.quantity_change)}
                    </div>
                    {item.item_price && (
                      <div className="mt-1 text-gray-600 text-xs">
                        ${item.item_price} each
                      </div>
                    )}
                  </div>
                  {item.item_total && (
                    <div className="font-semibold text-green-600">
                      ${item.item_total.toFixed(2)}
                    </div>
                  )}
                </div>
              );
            })}
            {orderItems.length > 6 && (
              <div className="py-2 text-gray-500 text-sm text-center">
                +{orderItems.length - 6} more item
                {orderItems.length - 6 !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {totalValue > 0 && (
            <div className="pt-3 border-gray-200 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 text-sm">
                  Order Total:
                </span>
                <span className="font-semibold text-green-600 text-lg">
                  ${totalValue.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellPreview;
