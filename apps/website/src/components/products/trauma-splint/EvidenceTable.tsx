import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "@thetis/ui/table";
import React from "react";

const evidenceData = [
  {
    type: "Plaster Cast",
    meanDays: 8.7,
    maxDays: 23,
  },
  {
    type: "Thetis splint",
    meanDays: 2.9,
    maxDays: 6,
  },
];

const EvidenceTable = () => {
  return (
    <Table>
      <TableHeader className="bg-primary/80 text-white uppercase">
        <TableRow>
          <TableHead className="font-semibold text-white" scope="col">
            Type
          </TableHead>
          <TableHead className="font-semibold text-white" scope="col">
            Mean Days A&E to Scan then Specialist
          </TableHead>
          <TableHead className="font-semibold text-white" scope="col">
            Maximum Days A&E to Scan then Specialist
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {evidenceData.map((item, index) => (
          <TableRow key={index}>
            <TableHead
              scope="row"
              className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap"
            >
              {item.type}
            </TableHead>
            <TableCell className="px-6 py-4 font-normal text-black">
              {item.meanDays}
            </TableCell>
            <TableCell className="px-6 py-4 font-normal text-black">
              {item.maxDays}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EvidenceTable;
