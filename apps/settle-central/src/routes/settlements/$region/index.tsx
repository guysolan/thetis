import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { selectAmazonReportsQueryOptions } from "@/features/amazon/api/selectAmazonReports";
import dayjs from "dayjs";
import { AmazonReport } from "@/features/amazon/components/AmazonReportById";
import AmazonSettlementCard from "@/features/amazon/components/AmazonSettlementCard";
const AmazonFinancialReports = () => {
  const { region } = Route.useParams();
  const { reports } = Route.useLoaderData();

  return (
    <div className="p-4">
      <h1 className="mb-4 font-bold text-2xl">Amazon {region} Settlements</h1>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reports
          .sort((a, b) => dayjs(b.dataEndTime).diff(dayjs(a.dataEndTime)))
          .map((report) => (
            <AmazonSettlementCard
              key={report.reportId}
              region={region}
              report={report}
            />
          ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/settlements/$region/")({
  component: AmazonFinancialReports,
  loader: async ({ context, params }) => {
    const reports = (await context.queryClient.ensureQueryData(
      selectAmazonReportsQueryOptions(params.region),
    )) as AmazonReport[];
    return { reports };
  },
});
