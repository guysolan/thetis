import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    selectAmazonReportsQueryOptions,
    useAmazonReports,
} from "@/features/amazon/api/selectAmazonReports";

const AmazonFinancialReports = () => {
    const { countryCode } = Route.useParams();
    const settlements = Route.useLoaderData();
    console.log(settlements);
    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-2xl">
                Amazon Financial Reports
            </h1>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Object.values(settlements).map((settlement) => (
                    <Card key={settlement?.date}>
                        <CardHeader>
                            <CardTitle>
                                Settlement Report - {settlement?.date}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {
                                    /*       {settlement?.flatFile && (
                                    <DownloadAmazonSettlementReport
                                        countryCode={countryCode}
                                        reportId={settlement?.flatFile
                                            .reportDocumentId}
                                    />
                                )}
                                {settlement?.flatFileV2 && (
                                    <DownloadAmazonSettlementReport
                                        countryCode={countryCode}
                                        reportId={settlement?.flatFileV2
                                            .reportDocumentId}
                                    />
                                )}*/
                                }
                                {
                                    /* <AmazonReportById
                                    countryCode={countryCode}
                                    reportId={settlement?.flatFileV2?.reportDocumentId}
                                /> */
                                }
                                <Button asChild>
                                    <Link
                                        to="/finances/amazon/settlements/$countryCode/$reportId"
                                        params={{
                                            countryCode,
                                            reportId: settlement?.flatFileV2
                                                .reportDocumentId,
                                        }}
                                        search={settlement.xml}
                                    >
                                        Open Summary
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link
                                        to="/finances/amazon/settlements/$countryCode/$reportId/xml"
                                        params={{
                                            countryCode,
                                            reportId: settlement?.xml
                                                .reportDocumentId,
                                        }}
                                        search={(settlement as any).xml}
                                    >
                                        View XML
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export const Route = createFileRoute(
    "/finances/amazon/settlements/$countryCode/",
)({
    component: AmazonFinancialReports,
    loader: async ({ context, params }) => {
        return context.queryClient.ensureQueryData(
            selectAmazonReportsQueryOptions(params.countryCode),
        );
    },
});
