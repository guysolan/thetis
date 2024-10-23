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
} from "@/components/ui/card";
import AmazonReportById from "@/features/amazon/components/AmazonReportById";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
const AmazonSettlementReport = () => {
  const search = Route.useSearch();
  const { countryCode, reportId } = Route.useParams();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
          <CardDescription>
            Current Time: {dayjs().toString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <AmazonReportById countryCode={countryCode} reportId={reportId} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() =>
              supabase.functions.invoke("google-upload-amazon-report", {
                body: {
                  reportId,
                  countryCode,
                },
              })}
          >
            Add to Google Drive
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export const Route = createFileRoute(
  "/finances/amazon/settlements/$countryCode/$reportId",
)({
  component: AmazonSettlementReport,
});
