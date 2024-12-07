import React from "react";
import dayjs from "dayjs";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@thetis/ui/card";
import { supabase } from "@/lib/supabase";
import { Button } from "@thetis/ui/button";
import { selectAmazonReportByIdQueryOptions } from "../../../features/amazon/api/getAmazonReportById";

const AmazonSettlementReport = () => {
  const { region } = Route.useParams();
  const { report } = Route.useSearch();

  const { jsonData } = Route.useLoaderData();
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
          <CardDescription>Current Time: {dayjs().toString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(report[0] || {}).map((key) => (
                  <TableHead key={key}>{key.replaceAll('"', "")}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {jsonData?.map((row) => (
                <TableRow key={row.reportDocumentId}>
                  {Object.values(row)?.map((value, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {
                        (typeof value === "string"
                          ? value.replaceAll('"', "").replaceAll("\\", "")
                          : value) as string
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() =>
              supabase.functions.invoke("google-upload-amazon-report", {
                body: {
                  reportDocumentId: report?.reportDocumentId,
                  region,
                },
              })
            }
          >
            Add to Google Drive
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

import { ReportSearch } from "@/features/amazon/components/AmazonReportById";

export const Route = createFileRoute("/settlements/$region/report")({
  component: AmazonSettlementReport,
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      report: (search.report as any) || "",
    };
  },
  loaderDeps: (opts) => opts.search.report,
  loader: async ({ context, params, deps }) => {
    const report = deps;
    const { jsonData } = await context.queryClient.ensureQueryData(
      selectAmazonReportByIdQueryOptions(
        report.reportDocumentId,
        params.region,
      ),
    );
    return {
      jsonData,
    };
  },
});
