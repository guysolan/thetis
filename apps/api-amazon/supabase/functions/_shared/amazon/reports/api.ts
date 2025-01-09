import { callSellingPartnerAPI } from "../config.ts";
import * as pako from "https://deno.land/x/pako@v2.0.3/pako.js";
import { CountryCode } from "../marketplace-ids.ts";
import { marketplaces } from "../marketplace-ids.ts";

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

export async function getSettlementReports() {
    console.log("Getting Settlement Reports");
    const NA = await getSettlementReportsByRegion("NA");
    const EUR = await getSettlementReportsByRegion("EUR");

    return [
        ...NA.map((report) => ({ ...report, region: "NA" })),
        ...EUR.map((report) => ({ ...report, region: "EUR" })),
    ];
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

export async function getSettlementReportsByMarketplaces(
    region: "NA" | "EUR",
    marketplaceIds: string[],
) {
    const endpoint = "/reports/2021-06-30/reports";
    const initialParams: Record<string, string> = {
        reportTypes: "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2",
        marketplaceIds: marketplaceIds.join(","),
    };

    let reports: any[] = [];
    let nextToken: string | undefined;

    do {
        const queryParams = nextToken
            ? { nextToken, marketplaceIds: marketplaceIds.join(",") }
            : initialParams;

        const response = await callSellingPartnerAPI(
            region,
            endpoint,
            "GET",
            queryParams,
        );

        reports = reports.concat(response?.reports);
        nextToken = response.nextToken;
    } while (nextToken);

    return reports;
}

export async function getSettlementReportsByCountry(
    countryCode: CountryCode,
) {
    console.log(
        `Starting getSettlementReportsByCountry for country: ${countryCode}`,
    );
    console.log("Available marketplaces:", marketplaces);

    // Find the marketplace data for the given country code
    const marketplace = marketplaces.find((m) => m.country === countryCode);
    console.log("Found marketplace:", marketplace);

    if (!marketplace) {
        throw new Error(
            `Marketplace not found for country code: ${countryCode}`,
        );
    }

    console.log(`Getting reports for ${countryCode} of id ${marketplace.id}`);

    const endpoint = "/reports/2021-06-30/reports";
    const initialParams: Record<string, string> = {
        reportTypes: "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2",
        marketplaceIds: [marketplace.id],
    };
    console.log("Initial API parameters:", initialParams);

    let reports: any[] = [];
    let nextToken: string | undefined;
    let pageCount = 0;

    do {
        pageCount++;
        console.log(`Fetching page ${pageCount} of reports...`);

        // Only use nextToken by itself for subsequent requests
        const queryParams = nextToken ? { nextToken } : initialParams;
        console.log("Current query parameters:", queryParams);

        const response = await callSellingPartnerAPI(
            marketplace.region as "NA" | "EUR",
            endpoint,
            "GET",
            queryParams,
        );
        console.log(`Page ${pageCount} response:`, response);

        reports = reports.concat(response?.reports || []);
        console.log(`Total reports collected so far: ${reports.length}`);

        nextToken = response.nextToken;
        console.log("Next token:", nextToken?.substring(0, 10));
    } while (nextToken);

    console.log(`Completed fetching reports. Total reports: ${reports.length}`);
    return reports;
}
