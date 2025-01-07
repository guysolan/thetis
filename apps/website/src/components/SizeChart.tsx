import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "@thetis/ui/table";
const sizes = {
  EU: 42,
  UK: 8,
  "US Men": 9,
  "US Women": 10.5,
};
import React from "react";

const SizeChart = () => {
  return (
    <Table>
      <TableHeader className="bg-primary text-white uppercase">
        <TableRow>
          <TableHead className="font-semibold text-base text-white" scope="col">
            Location
          </TableHead>
          <TableHead className="font-semibold text-base text-white" scope="col">
            Small
          </TableHead>
          <TableHead className="font-semibold text-base text-white" scope="col">
            Large
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(sizes).map(([key, val], i) => (
          <TableRow key={val}>
            <TableHead
              scope="row"
              className="px-6 py-4 font-semibold text-base text-gray-800 whitespace-nowrap"
            >
              {key}
            </TableHead>
            <TableCell className="px-6 py-4 font-normal text-base text-black">
              &lt; {val}
            </TableCell>
            <TableCell className="px-6 py-4 font-normal text-base text-black">
              &ge; {val}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SizeChart;
