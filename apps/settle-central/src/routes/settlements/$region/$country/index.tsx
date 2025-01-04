import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { selectAmazonReportsQueryOptions } from "@/api/selectAmazonReportsByCountry";
import dayjs from "dayjs";
import { AmazonReport } from "@/components/AmazonReportById";
import AmazonSettlementCard from "@/components/AmazonSettlementCard";
import { CountryTabs } from "../../../../components/CountryTabs";
const AmazonFinancialReports = () => {
  const { region, country } = Route.useParams();
  const { reports } = Route.useLoaderData();

  return (
    <div>
      <CountryTabs country={country} />
      <div className="p-4">
        <h1 className="mb-4 font-bold text-2xl">
          Amazon {country} Settlements
        </h1>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports
            .sort((a, b) => dayjs(b.dataEndTime).diff(dayjs(a.dataEndTime)))
            .map((report) => (
              <AmazonSettlementCard
                key={report.reportId}
                region={region}
                country={country}
                report={report}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/settlements/$region/$country/")({
  component: AmazonFinancialReports,
  loader: async ({ context, params }) => {
    const reports = (await context.queryClient.ensureQueryData(
      selectAmazonReportsQueryOptions(params.country),
    )) as AmazonReport[];
    return { reports };
  },
});
