import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { selectAmazonReportsQueryOptions } from "@/features/amazon/api/selectAmazonReports";
import dayjs from "dayjs";
import { AmazonReport } from "@/features/amazon/components/AmazonReportById";
import { supabase } from "@/lib/supabase";
import { useSaveAmazonReport } from "@/features/amazon/api/saveAmazonReport";
import { useDownloadedAmazonReports } from "../api/selectDownloadedAmazonReports";
import { Check, FileCheck } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {useDownloadFile} from "../api/useDownloadFile";

const AmazonSettlementCard = (
    { region, report }: { region: string; report: AmazonReport },
) => {
    const { mutate: downloadFile } = useDownloadFile();
    const { mutate: saveReport, isPending: isSavingReport } =
        useSaveAmazonReport();
    const { data: downloadedReports } = useDownloadedAmazonReports();
    const downloaded = downloadedReports?.find((r) =>
        r.report_id === report.reportId
    );
    return (
        <Card key={report.reportId}>
            <CardHeader>
                <CardTitle>
                    Settlement Report -{" "}
                    {dayjs(report.dataEndTime).format("YYYY-MM-DD")}
                </CardTitle>
                {downloaded && (
                    <CardDescription>
                        {downloaded.storage_path}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    <Separator />
                    <Link
                        to="/finances/amazon/settlements/$region/summary"
                        params={{
                            region: region,
                        }}
                        search={{ report: report }}
                        className="flex justify-between items-center py-1 w-full text-zinc-700 hover:underline"
                    >
                        Open Summary <span className="ml-2">→</span>
                    </Link>
                    <Separator />

                    <Link
                        to="/finances/amazon/settlements/$region/report"
                        params={{
                            region: region,
                        }}
                        search={{ report: report }}
                        className="flex justify-between items-center py-1 w-full text-zinc-700 hover:underline"
                    >
                        Open Table <span className="ml-2">→</span>
                    </Link>
                    <Separator />
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
                {downloaded
                    ? (
                        <>
                            <Button
                                variant="default"
                                onClick={() =>
                                    downloadFile(
                                        {path: downloaded.storage_path},
                                    )}
                            >
                                Download
                            </Button>
                        </>
                    )
                    : (
                        <Button
                            variant="default"
                            onClick={() => {
                                saveReport({
                                    report: report,
                                    region: region,
                                });
                            }}
                        >
                            {isSavingReport ? "Saving..." : "Save"}
                        </Button>
                    )}
            </CardFooter>
        </Card>
    );
};

export default AmazonSettlementCard;
