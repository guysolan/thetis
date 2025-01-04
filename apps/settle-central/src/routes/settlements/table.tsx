import { selectAmazonReportsFromDbQueryOptions } from "../../api/selectAmazonReportsFromDb";
import AmazonReportsDataTable from "@/components/data-table";
import { createFileRoute } from "@tanstack/react-router";
import { selectAmazonReportsQueryOptions } from "../../api/selectAmazonReports";
import { objectKeysToSnakeCase } from "../../lib/utils";

export const Route = createFileRoute("/settlements/table")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const reports = await context.queryClient.ensureQueryData(
      selectAmazonReportsQueryOptions(),
    );

    const processedReports = objectKeysToSnakeCase(reports);

    const saved = await context.queryClient.ensureQueryData(
      selectAmazonReportsFromDbQueryOptions(),
    );

    const data = [
      ...processedReports.map((r) => ({
        ...r,
        is_saved: false,
        settlement_start_date: r.data_start_time,
      })),
      ...saved.map((s) => ({ ...s, is_saved: true })),
    ];

    return data.sort((a, b) => {
      return (
        new Date(a.settlement_start_date).getTime() -
        new Date(b.settlement_start_date).getTime()
      );
    });
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <AmazonReportsDataTable data={data} />;
}
