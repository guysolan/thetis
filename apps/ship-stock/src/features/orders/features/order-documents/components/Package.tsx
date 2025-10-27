import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { OrderView } from "../../../types";
import { Badge } from "@thetis/ui/badge";
import { BoxIcon, Weight } from "lucide-react";
import { useSelectItemChanges } from "../../../api/selectItemChanges";

interface PackageProps {
  packageItemChangeId: string;
  items: OrderView["items"];
  index: number;
}

const Package = ({ packageItemChangeId, items, index }: PackageProps) => {
  const { data: itemChange } = useSelectItemChanges(packageItemChangeId);

  if (!itemChange) return null;

  const packageDetails = itemChange.items;

  if (!packageDetails) return null;

  return (
    <section className="mt-8">
      <div className="space-y-2">
        <h2 className="mb-4 font-semibold text-lg">
          Package {index + 1}
        </h2>
        <div className="flex gap-2">
          {packageDetails.height &&
            packageDetails.width &&
            packageDetails.depth && (
            <Badge
              className="gap-x-2 space-x-2 px-3 py-1.5"
              variant="outline"
            >
              <BoxIcon size={16} />
              {packageDetails.height} × {packageDetails.width} ×{" "}
              {packageDetails.depth}
            </Badge>
          )}
          {packageDetails.weight && (
            <Badge className="gap-x-2 space-x-2 px-3 py-1.5" variant="outline">
              <Weight size={16} />
              {packageDetails.weight} kg
            </Badge>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Item</TableHead>
            <TableHead className="text-black">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items
            .filter((item) => item.quantity < 0)
            .map((item) => (
              <TableRow key={item.item_id}>
                <TableCell className="text-black">{item.item_name}</TableCell>
                <TableCell className="text-black">
                  {Math.abs(item.quantity)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
};
export default Package;
