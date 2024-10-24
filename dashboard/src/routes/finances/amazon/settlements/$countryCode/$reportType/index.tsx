import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    selectAmazonReportsQueryOptions,
    useAmazonReports,
} from "@/features/amazon/api/selectAmazonReports";
import dayjs from "dayjs";
import { AmazonReport } from "@/features/amazon/components/AmazonReportById";


type ReportType =
    | "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2"
    | "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE"
    | "GET_V2_SETTLEMENT_REPORT_DATA_XML";

const AmazonFinancialReports = () => {
    const { countryCode, reportType } = Route.useParams();
    const {reports} = Route.useLoaderData();
    return (
        <div className="p-4">
            <h1 className="mb-4 font-bold text-2xl">
                Amazon Financial Reports
            </h1>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {reports
                    .sort((a, b) =>
                        dayjs(b.dataEndTime).diff(dayjs(a.dataEndTime))
                    )
                    .map((report) => (
                        <Card key={report.reportId}>
                            <CardHeader>
                                <CardTitle>
                                    Settlement Report -{" "}
                                    {dayjs(report.dataEndTime).format(
                                        "YYYY-MM-DD",
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {reportType === "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE" && <Button asChild>
                                        <Link
                                            to="/finances/amazon/settlements/$countryCode/$reportType/table"
                                            params={{
                                                countryCode: countryCode,
                                                reportType: reportType,
                                            }}
                                            search={{ report: report }}
                                        >
                                            Open Table
                                        </Link>
                                    </Button>}
                                    {reportType === "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2" && <Button asChild>
                                        <Link
                                            to="/finances/amazon/settlements/$countryCode/$reportType/table"
                                            params={{
                                                countryCode: countryCode,
                                                reportType: reportType,
                                            }}
                                            search={{ report: report }}
                                        >
                                            Open Table
                                        </Link>
                                    </Button>}
                                     {reportType === "GET_V2_SETTLEMENT_REPORT_DATA_XML" && <Button asChild>
                                        <Link
                                            to="/finances/amazon/settlements/$countryCode/$reportType/summary"
                                            params={{
                                                countryCode: countryCode,
                                                reportType: reportType,
                                            }}
                                            search={{ report: report }}
                                        >
                                            Open Summary
                                        </Link>
                                    </Button>}
                                     {reportType === "GET_V2_SETTLEMENT_REPORT_DATA_XML" && <Button variant="secondary" asChild>
                                        <Link
                                            to="/finances/amazon/settlements/$countryCode/$reportType/xml"
                                            params={{
                                                countryCode: countryCode,
                                                reportType: reportType,
                                            }}
                                            search={{ report: report }}
                                        >
                                            Open Raw
                                        </Link>
                                    </Button>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export const Route = createFileRoute(
    "/finances/amazon/settlements/$countryCode/$reportType/",
)({
    component: AmazonFinancialReports,
    loader: async ({ context, params }) => {
        const reports = (await context.queryClient.ensureQueryData(
            selectAmazonReportsQueryOptions(params.countryCode, params.reportType),
        )) as AmazonReport[];
        return { reports };
    },
});
