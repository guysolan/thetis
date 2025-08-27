import { Badge } from "@thetis/ui/badge";
import { useSelectItemsView } from "../../items/api/selectItemsView";

const PackageItemsBadges = ({ packageItems }) => {
  const { data: itemsView } = useSelectItemsView();

  return (
    <div className="space-y-2">
      {packageItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {packageItems.map((item) => {
            const itemDetails = itemsView?.find(
              (i) => String(i.item_id) === item.item_id,
            );
            return (
              <Badge key={item.item_id} variant="secondary" className="gap-x-1">
                {itemDetails?.item_name} × {Math.abs(item.quantity_change)}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PackageItemsBadges;
