import { OrderView } from "../../../types";
import Package from "./Package";

const PackageSummary = ({ items }: { items: OrderView["items"] }) => {
  // Get unique package_item_change_ids
  console.log("package summary", items);
  const uniquePackageIds = Array.from(
    new Set(
      items
        ?.map((item) => item.package_item_change_id)
        ?.filter((id): id is string => id !== undefined),
    ),
  );

  // Group items by package_item_change_id
  const packageGroups = uniquePackageIds?.reduce(
    (groups, packageId) => {
      groups[packageId] = items?.filter(
        (item) => item.package_item_change_id === packageId,
      );
      return groups;
    },
    {} as Record<string, OrderView["items"]>,
  );
  console.log("package summary", packageGroups);

  return (
    <>
      {Object.entries(packageGroups).map(
        ([packageItemChangeId, groupItems], index) => (
          <Package
            key={packageItemChangeId}
            packageItemChangeId={packageItemChangeId}
            items={groupItems}
            index={index}
          />
        ),
      )}
    </>
  );
};

export default PackageSummary;
