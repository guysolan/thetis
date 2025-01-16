import { createFileRoute } from "@tanstack/react-router";
import { AmazonReport } from "@thetis/amazon/amazon-types";
import { ReportSearch } from "@/components/AmazonReportById";
import { selectAmazonReportByIdQueryOptions } from "@/api/getAmazonReportById";

export const Route = createFileRoute("/settlements/report")({
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      report: search.report as AmazonReport,
    };
  },
  loaderDeps: (opts) => opts.search,
  loader: async ({ context, deps }) => {
    const { report } = deps;
    const document = await context.queryClient.ensureQueryData(
      selectAmazonReportByIdQueryOptions({
        reportId: report.report_document_id,
        region: report.region,
      }),
    );
    console.log(document);
    return document;
  },
});
