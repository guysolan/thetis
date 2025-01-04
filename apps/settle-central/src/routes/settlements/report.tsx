import { createFileRoute } from "@tanstack/react-router";

import { ReportSearch } from "@/components/AmazonReportById";
import { selectAmazonReportByIdQueryOptions } from "@/api/getAmazonReportById";

export const Route = createFileRoute("/settlements/report")({
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      report: (search.report as any) || "",
      region: search.region || "EUR",
      country: search.country || "US",
    };
  },
  loaderDeps: (opts) => opts.search,
  loader: async ({ context, deps }) => {
    const { report, region, country } = deps;
    const document = await context.queryClient.ensureQueryData(
      selectAmazonReportByIdQueryOptions({
        reportId: report.reportDocumentId,
        region: region,
        country: country,
      }),
    );
    console.log(document);
    return document;
  },
});
