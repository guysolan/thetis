import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import { OrderView } from "../../../types";

const PackageSummary = ({ items }: { items: OrderView["items"] }) => {
  const packageItems = items.filter((item) => item.item_type === "package");
  if (!packageItems.length) return <></>;

  const totalQuantity = packageItems.reduce(
    (sum, item) => sum + Math.abs(item.quantity),
    0,
  );
  const totalWeight = packageItems.reduce(
    (sum, item) => sum + item.weight * Math.abs(item.quantity),
    0,
  );

  return (
    <div className="mb-8">
      <h3 className="mb-4 font-semibold text-black">Package Summary</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Package</TableHead>
            <TableHead className="text-black">Dimensions (cm)</TableHead>
            <TableHead className="text-black">Quantity</TableHead>
            <TableHead className="text-black">Weight (kg)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-black">{item.item_name}</TableCell>
              <TableCell className="text-black">
                {item.height} x {item.width} x {item.depth}
              </TableCell>
              <TableCell className="text-black">
                {Math.abs(item.quantity)}
              </TableCell>
              <TableCell className="text-black">{item.weight}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold">
            <TableCell className="text-black" colSpan={2}>
              Total
            </TableCell>
            <TableCell className="text-black">{totalQuantity}</TableCell>
            <TableCell className="text-black">
              {totalWeight.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PackageSummary;
