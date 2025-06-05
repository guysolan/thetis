import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@thetis/ui/table";
import type { OrderView } from "../../../types";
import NumberFlow from "@number-flow/react";
const OrderTotal = ({
  order,
  showCarriage = true,
}: {
  order: OrderView;
  showCarriage?: boolean;
}) => {
  return (
    <Table>
      <TableBody>
        {showCarriage && (
          <TableRow className="border-t text-neutral-800">
            <TableHead>Carriage</TableHead>
            <TableCell className="w-1/6 font-medium text-right">
              <NumberFlow
                value={order.carriage ?? 0}
                format={{ style: "currency", currency: order.currency }}
              />
            </TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableHead className="text-neutral-900 text-lg">Total</TableHead>
          <TableCell className="w-1/6 font-medium text-neutral-900 text-lg text-right">
            <NumberFlow
              value={order.total_value ?? 0}
              format={{ style: "currency", currency: order.currency }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrderTotal;
