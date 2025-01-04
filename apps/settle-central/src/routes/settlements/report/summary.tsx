import React from "react";
import dayjs from "dayjs";
import { createFileRoute } from "@tanstack/react-router";
import { Route as ReportRoute } from "../report";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";

import AmazonReportById from "@/components/AmazonReportById";
const AmazonSettlementReport = () => {
  const { summary } = ReportRoute.useLoaderData();

  return (
    <div className="p-4 w-full max-w-[1000px]">
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
          <CardDescription>Current Time: {dayjs().toString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <AmazonReportById summary={summary} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/settlements/report/summary")({
  component: AmazonSettlementReport,
});
