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
      <h3 className="mb-4 font-semibold">Package Summary</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package</TableHead>
            <TableHead>Dimensions (cm)</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Weight (kg)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packageItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.item_name}</TableCell>
              <TableCell>
                {item.height} x {item.width} x {item.depth}
              </TableCell>
              <TableCell>{Math.abs(item.quantity)}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold">
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>{totalQuantity}</TableCell>
            <TableCell>{totalWeight.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PackageSummary;
