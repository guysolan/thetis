import { selectAmazonReportsFromDbQueryOptions } from "../../api/selectAmazonReportsFromDb";
import AmazonReportsDataTable from "@/components/data-table";
import { createFileRoute } from "@tanstack/react-router";
import { selectAmazonReportsQueryOptions } from "../../api/selectAmazonReports";
import { objectKeysToSnakeCase } from "../../lib/utils";

export const Route = createFileRoute("/settlements/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const reports = await context.queryClient.ensureQueryData(
      selectAmazonReportsQueryOptions(),
    );

    const processedReports = objectKeysToSnakeCase(reports);

    const saved = await context.queryClient.ensureQueryData(
      selectAmazonReportsFromDbQueryOptions(),
    );

    const savedReports = saved.map((saved) => ({
      ...saved,
      is_saved: true,
    }));

    const savedReportIds = savedReports.map((saved) => saved.report_id);

    const unprocessedReports = processedReports.filter(
      (r) => !savedReportIds.includes(r.report_id),
    );

    const unsavedReports = unprocessedReports.map((r) => ({
      ...r,
      is_saved: false,
      settlement_start_date: r.data_start_time,
      settlement_end_date: r.data_end_time,
    }));

    const data = [...unsavedReports, ...savedReports];

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
