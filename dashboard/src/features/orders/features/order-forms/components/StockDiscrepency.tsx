import { useFormContext } from "react-hook-form";
import { useStocktakeDiscrepancy } from "../features/stocktake-form/useStocktakeDiscrepency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StocktakeDiscrepancy = () => {
  const { control, setValue } = useFormContext();
  const discrepancies = useStocktakeDiscrepancy(control, setValue);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Before</TableHead>
          <TableHead>After</TableHead>
          <TableHead>Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discrepancies.map((discrepancy) => (
          <TableRow key={discrepancy.id}>
            <TableCell>{discrepancy.quantity_before}</TableCell>
            <TableCell>{discrepancy.quantity_after}</TableCell>
            <TableCell>{discrepancy.quantity_change}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StocktakeDiscrepancy;
