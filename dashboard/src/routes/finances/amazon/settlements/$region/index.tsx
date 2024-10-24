import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectAmazonReportsQueryOptions } from "@/features/amazon/api/selectAmazonReports";
import dayjs from "dayjs";
import { AmazonReport } from "@/features/amazon/components/AmazonReportById";
import { supabase } from "../../../../../lib/supabase";

const AmazonFinancialReports = () => {
  const { region } = Route.useParams();
  const { reports } = Route.useLoaderData();
  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon Financial Reports</h1>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reports
          .sort((a, b) => dayjs(b.dataEndTime).diff(dayjs(a.dataEndTime)))
          .map((report) => (
            <Card key={report.reportId}>
              <CardHeader>
                <CardTitle>
                  Settlement Report -{" "}
                  {dayjs(report.dataEndTime).format("YYYY-MM-DD")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button asChild>
                    <Link
                      to="/finances/amazon/settlements/$region/summary"
                      params={{
                        region: region,
                      }}
                      search={{ report: report }}
                    >
                      Open Summary
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link
                      to="/finances/amazon/settlements/$region/report"
                      params={{
                        region: region,
                      }}
                      search={{ report: report }}
                    >
                      Open Table
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      supabase.functions.invoke("save-amazon-report", {
                        body: {
                          report: report,
                          region: region,
                        },
                      });
                    }}
                  >
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/finances/amazon/settlements/$region/")({
  component: AmazonFinancialReports,
  loader: async ({ context, params }) => {
    const reports = (await context.queryClient.ensureQueryData(
      selectAmazonReportsQueryOptions(
        params.region,
      ),
    )) as AmazonReport[];
    return { reports };
  },
});
