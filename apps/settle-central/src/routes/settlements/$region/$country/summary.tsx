import React from "react";
import dayjs from "dayjs";
import { createFileRoute } from "@tanstack/react-router";

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
  const { summary } = Route.useLoaderData();

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

import { ReportSearch } from "@/components/AmazonReportById";
import { selectAmazonReportByIdQueryOptions } from "@/api/getAmazonReportById";

export const Route = createFileRoute("/settlements/$region copy/summary")({
  component: AmazonSettlementReport,
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      report: (search.report as any) || "",
    };
  },
  loaderDeps: (opts) => opts.search.report,
  loader: async ({ context, params, deps }) => {
    const report = deps;
    const document = await context.queryClient.ensureQueryData(
      selectAmazonReportByIdQueryOptions(
        report.reportDocumentId,
        params.region,
      ),
    );
    console.log(document);
    return {
      summary: document.summary,
    };
  },
});
