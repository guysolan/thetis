import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";
import XMLViewer from "react-xml-viewer";
import { useAmazonReportByIdAsXML } from "@/api/downloadAmazonReportByIdAsXml";

const AmazonSettlementReport = () => {
  const { report } = Route.useSearch();
  const { countryCode, reportType } = Route.useParams();
  const {
    data: xmlData,
    isLoading,
    error,
  } = useAmazonReportByIdAsXML(report.reportDocumentId, countryCode);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <XMLViewer xml={xmlData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { ReportSearch } from "@/components/AmazonReportById";

export const Route = createFileRoute(
  "/settlements/$region/$country/xml",
)({
  component: AmazonSettlementReport,
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      report: (search.report as any) || "",
    };
  },
});
