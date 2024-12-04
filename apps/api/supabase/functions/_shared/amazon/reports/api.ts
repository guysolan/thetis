import { callSellingPartnerAPI } from "../config.ts";
import * as pako from "https://deno.land/x/pako@v2.0.3/pako.js";

export async function getSettlementReportsByRegion(
    region: "NA" | "EUR",
) {
    const endpoint = "/reports/2021-06-30/reports";
    const initialParams: Record<string, string> = {
        reportTypes: "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2",
    };

    let reports: any[] = [];
    let nextToken: string | undefined;

    do {
        // Determine which query parameters to use for the API call
        const queryParams = nextToken
            ? { nextToken } // Use only the nextToken for subsequent requests
            : initialParams; // Use initial parameters for the first request

        // Call the API with the appropriate query parameters
        const response = await callSellingPartnerAPI(
            region,
            endpoint,
            "GET",
            queryParams,
        );

        // Add the received reports to our collection
        reports = reports.concat(response?.reports);

        // Update the nextToken for the next iteration
        nextToken = response.nextToken;

        // The loop continues as long as there's a nextToken,
        // indicating more pages of results are available
    } while (nextToken);

    return reports;
}

export async function getReportDocument(
    region: "NA" | "EUR",
    reportId: string,
): Promise<string> {
    const endpoint = `/reports/2021-06-30/documents/${reportId}`;

    try {
        const response = await callSellingPartnerAPI(
            region,
            endpoint,
            "GET",
        );

        console.log("Report document:", response);

        if (!response.url) {
            throw new Error("Report document URL not found in the response");
        }

        const { url, compressionAlgorithm } = response;

        // Fetch the document content from the URL
        const documentResponse = await fetch(url);
        if (!documentResponse.ok) {
            throw new Error(
                `Failed to fetch report document: ${documentResponse.statusText}`,
            );
        }

        let documentContent: string;
        if (compressionAlgorithm === "GZIP") {
            const buffer = await documentResponse.arrayBuffer();
            const uint8Array = new Uint8Array(buffer);
            const inflated = pako.inflate(uint8Array);
            documentContent = new TextDecoder("utf-8").decode(
                new Uint8Array(inflated as ArrayBufferLike),
            );
        } else {
            documentContent = await documentResponse.text();
        }

        return documentContent;
    } catch (error) {
        console.error("Error fetching report document:", error);
        throw error;
    }
}
