import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAmazonReportByIdAsCSV } from "../api/downloadAmazonReportByIdAsCsv";
import { CSVDownload, CSVLink } from "react-csv";
import { buttonVariants } from "@thetis/ui/button";

const DownloadAmazonSettlementReport = (
    { countryCode, reportId }: { countryCode: string; reportId: string },
) => {
    const { data: csvData } = useAmazonReportByIdAsCSV(
        reportId,
        countryCode,
    );
    return (
        <>
            <CSVLink
                data={csvData}
                className={buttonVariants({ variant: "default" })}
            >
                Download CSV
            </CSVLink>
            <CSVDownload
                data={csvData}
                target="_blank"
                className="sr-only"
            />
        </>
    );
};

export default DownloadAmazonSettlementReport;
