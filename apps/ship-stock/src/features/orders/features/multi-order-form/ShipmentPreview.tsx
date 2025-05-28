import type { PricedOrderItem } from "./schema";
import PackagePreview from "./PackagePreview";
import { useSelectItemsView } from "../../../items/api/selectItemsView";

interface ShipmentPreviewProps {
  fromItems: Array<{
    item_type: "product" | "part";
    item_id: string;
    quantity_change: number;
    item_name?: string;
    package_item_change_id?: number;
  }>;
  toItems: Array<{
    item_type: "product" | "part";
    item_id: string;
    quantity_change: number;
    item_name?: string;
    package_item_change_id?: number;
  }>;
  packageItems: Array<{
    package_id: string;
    package_item_change_id: number;
  }>;
  mode: "package" | "direct";
}

const ShipmentPreview = ({
  fromItems,
  toItems,
  packageItems,
  mode,
}: ShipmentPreviewProps) => {
  const { data: itemsView } = useSelectItemsView();

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">Shipment Summary</p>

      {mode === "package" ? (
        <div className="space-y-4">
          {fromItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-red-200 rounded-full w-3 h-3" />
                <p className="font-medium text-red-700 text-sm">
                  From Location
                </p>
              </div>
              <PackagePreview
                packageItems={packageItems}
                orderItems={fromItems}
                borderColor="border-red-200"
              />
            </div>
          )}
          {toItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-green-200 rounded-full w-3 h-3" />
                <p className="font-medium text-green-700 text-sm">
                  To Location
                </p>
              </div>
              <PackagePreview
                packageItems={packageItems}
                orderItems={toItems}
                borderColor="border-green-200"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {fromItems.length > 0 && (
              <div className="bg-red-50 p-4 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-red-400 rounded-full w-3 h-3" />
                  <p className="font-medium text-red-800 text-sm">
                    From Location
                  </p>
                </div>
                <div className="space-y-2">
                  {fromItems.slice(0, 3).map((item, index) => {
                    const itemDetails = itemsView?.find(
                      (i) => String(i.item_id) === item.item_id,
                    );
                    return (
                      <div
                        key={`from-${item.item_id}-${index}`}
                        className="text-sm"
                      >
                        <div className="font-medium text-red-900">
                          {itemDetails?.item_name ||
                            item.item_name ||
                            `Item ${item.item_id}`}{" "}
                          × {Math.abs(item.quantity_change)}
                        </div>
                      </div>
                    );
                  })}
                  {fromItems.length > 3 && (
                    <div className="text-red-600 text-xs">
                      +{fromItems.length - 3} more item
                      {fromItems.length - 3 !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              </div>
            )}
            {toItems.length > 0 && (
              <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-400 rounded-full w-3 h-3" />
                  <p className="font-medium text-green-800 text-sm">
                    To Location
                  </p>
                </div>
                <div className="space-y-2">
                  {toItems.slice(0, 3).map((item, index) => {
                    const itemDetails = itemsView?.find(
                      (i) => String(i.item_id) === item.item_id,
                    );
                    return (
                      <div
                        key={`to-${item.item_id}-${index}`}
                        className="text-sm"
                      >
                        <div className="font-medium text-green-900">
                          {itemDetails?.item_name ||
                            item.item_name ||
                            `Item ${item.item_id}`}{" "}
                          × {Math.abs(item.quantity_change)}
                        </div>
                      </div>
                    );
                  })}
                  {toItems.length > 3 && (
                    <div className="text-green-600 text-xs">
                      +{toItems.length - 3} more item
                      {toItems.length - 3 !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentPreview;
