import { callSellingPartnerAPI } from "./config.ts";

async function createReport(region: "NA" | "EUR"): Promise<string> {
    const endpoint = "/reports/2021-06-30/reports";
    const method = "POST";
    const params = {
        reportType: "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2",
        dataStartTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString(),
        dataEndTime: new Date().toISOString(),
    };

    const response = await callSellingPartnerAPI(
        region,
        endpoint,
        method,
        params,
    );
    return response.reportId;
}

async function getReportDocument(
    region: "NA" | "EUR",
    reportId: string,
): Promise<string> {
    const endpoint = `/reports/2021-06-30/reports/${reportId}`;
    const method = "GET";

    while (true) {
        const response = await callSellingPartnerAPI(region, endpoint, method);
        if (response.processingStatus === "DONE") {
            return response.reportDocumentId;
        }
        await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait 30 seconds before checking again
    }
}

async function downloadReport(
    region: "NA" | "EUR",
    reportDocumentId: string,
): Promise<Uint8Array> {
    const endpoint = `/reports/2021-06-30/documents/${reportDocumentId}`;
    const method = "GET";

    const response = await callSellingPartnerAPI(region, endpoint, method);
    const documentResponse = await fetch(response.url);
    return new Uint8Array(await documentResponse.arrayBuffer());
}

export async function getAndDownloadReport(
    region: "NA" | "EUR",
): Promise<Uint8Array> {
    console.log(`Starting report generation for region: ${region}`);

    const reportId = await createReport(region);
    console.log(`Report created with ID: ${reportId}`);

    const reportDocumentId = await getReportDocument(region, reportId);
    console.log(`Report document ready with ID: ${reportDocumentId}`);

    const reportData = await downloadReport(region, reportDocumentId);
    console.log(`Report downloaded, size: ${reportData.length} bytes`);

    return reportData;
}
