"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AmazonReportsDataTable({ data }) {
  return (
    <div className="p-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
