import React from "react";
import { useStocktakeDiscrepancy } from "../hooks/useStocktakeDiscrepency";
import NumberCell from '../../../components/NumberCell';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useSelectItemsView } from '../../items/api/selectItemsView';
import { ItemView } from '../../items/types';

export const StocktakeDiscrepancy: React.FC = () => {
	const {data: itemsView} = useSelectItemsView();
  const stockTakeDiscrepancy = useStocktakeDiscrepancy();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Before</TableHead>
          <TableHead>After</TableHead>
          <TableHead>Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stockTakeDiscrepancy.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{itemsView?.find((i:ItemView) =>String(i.item_id) === String(item.id))?.item_name}</TableCell>
            <NumberCell value={item.quantity_before} />
            <NumberCell value={item.quantity_after} />
            <NumberCell value={item.quantity_change} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StocktakeDiscrepancy;