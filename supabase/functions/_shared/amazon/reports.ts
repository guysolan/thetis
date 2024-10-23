import { callSellingPartnerAPI } from "./config.ts";
import { type CountryCode, marketplaces } from "./marketplace-ids.ts";
import * as pako from "https://deno.land/x/pako@v2.0.3/pako.js";

type ReportType =
    | "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2"
    | "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE"
    | "GET_V2_SETTLEMENT_REPORT_DATA_XML";

export async function getAllSettlementReports(
    countryCode: CountryCode,
    reportType: ReportType,
) {
    const marketplace = marketplaces.find((m) => m.country === countryCode);

    if (!marketplace) {
        throw new Error(
            `Marketplace not found for country code: ${countryCode}`,
        );
    }

    const endpoint = "/reports/2021-06-30/reports";
    const params: Record<string, string> = {
        reportTypes: reportType,
        marketplaceIds: marketplace.id,
        // Optionally, you can specify other filters like processingStatuses or pageSize
    };

    let reports = [];
    let nextToken: string | undefined;

    do {
        const response = await callSellingPartnerAPI(
            marketplace.region as "NA" | "EUR",
            endpoint,
            "GET",
            nextToken ? { nextToken } : params,
        );

        reports = reports.concat(response.reports);
        nextToken = response.nextToken;
    } while (nextToken);

    return reports;
}

// Example usage
export const getAllSettlementData = async () => {
    const USReports = await getAllSettlementReports(
        "US",
        "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2",
    );
    const UKReports = await getAllSettlementReports(
        "UK",
        "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2",
    );
    // Process reports as needed
    return {
        "Amazon US": USReports,
        "Amazon UK": UKReports,
    };
};

// Example usage
export const getSettlementDataByCountry = async (
    countryCode: CountryCode,
) => {
    const flatFile = await getAllSettlementReports(
        countryCode,
        "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE",
    );
    const flatFileV2 = await getAllSettlementReports(
        countryCode,
        "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2",
    );
    const xml = await getAllSettlementReports(
        countryCode,
        "GET_V2_SETTLEMENT_REPORT_DATA_XML",
    );
    // Process reports as needed
    return groupReportsByStartDate(flatFile, flatFileV2, xml);
};

export const groupReportsByStartDate = (
    flatFile: any[],
    flatFileV2: any[],
    xml: any[],
) => {
    try {
        const allReports = [...flatFile, ...flatFileV2, ...xml];

        return allReports.reduce((grouped, report) => {
            const { dataStartTime } = report;
            // Format the startDate as YYYY-MM-DD
            const dateKey = new Date(dataStartTime).toISOString().split("T")[0];

            if (!grouped[dateKey]) {
                grouped[dateKey] = {
                    date: dateKey,
                    flatFile: null,
                    flatFileV2: null,
                    xml: null,
                };
            }

            if (flatFile.includes(report)) {
                grouped[dateKey].flatFile = report;
            } else if (flatFileV2.includes(report)) {
                grouped[dateKey].flatFileV2 = report;
            } else if (xml.includes(report)) {
                grouped[dateKey].xml = report;
            }

            return grouped;
        }, {});
    } catch (error) {
        console.error("Error grouping reports by start date:", error);
        throw error;
    }
};

export async function getReportDocument(
    countryCode: CountryCode,
    reportId: string,
): Promise<string> {
    const marketplace = marketplaces.find((m) => m.country === countryCode);

    if (!marketplace) {
        throw new Error(
            `Marketplace not found for country code: ${countryCode}`,
        );
    }

    const endpoint = `/reports/2021-06-30/documents/${reportId}`;

    try {
        const response = await callSellingPartnerAPI(
            marketplace.region as "NA" | "EUR",
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

        let documentContent;
        if (compressionAlgorithm === "GZIP") {
            const buffer = await documentResponse.arrayBuffer();
            const decompressed = new TextDecoder("utf-8").decode(
                pako.inflate(new Uint8Array(buffer)),
            );
            documentContent = decompressed;
        } else {
            documentContent = await documentResponse.text();
        }

        return documentContent;
    } catch (error) {
        console.error("Error fetching report document:", error);
        throw error;
    }
}

export function convertToCSV(
    content: string,
    delimiter: string = "\t",
): string {
    const lines = content.trim().split("\n");
    const headers = lines[0].split(delimiter);

    let csvContent = headers.map((header) => `"${header.trim()}"`).join(",") +
        "\n";

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(delimiter);
        const csvLine = values.map((value) =>
            `"${value.trim().replace(/"/g, '""')}"`
        ).join(",");
        csvContent += csvLine + "\n";
    }

    return csvContent;
}

export async function getReportDocumentAsCSV(
    reportId: string,
    countryCode: CountryCode,
): Promise<string> {
    const documentContent = await getReportDocument(reportId, countryCode);
    return convertToCSV(documentContent);
}

export async function getReportDocumentAsXML(
    reportId: string,
    countryCode: CountryCode,
): Promise<string> {
    const documentContent = await getReportDocument(reportId, countryCode);
    return documentContent;
}

export function summariseSettlementReport(report: any[]) {
    const settlementInfo = report[0];
    const settlementStartDate = settlementInfo['"settlement-start-date"'];

    console.log("settlementStartDate:", settlementStartDate);
    const settlementEndDate = settlementInfo['"settlement-end-date"'];
    const depositDate = settlementInfo['"deposit-date"'];
    const totalAmount = parseFloat(
        settlementInfo['"total-amount"'].replace(/"/g, ""),
    );
    const currency = settlementInfo['"currency"'].replace(/"/g, "");

    const amountTypeSum: Record<string, number> = {};
    const transactionTypes: Set<string> = new Set();
    const marketplaces: Set<string> = new Set();

    for (const item of report) {
        const amount = parseFloat(item['"amount"'].replace(/"/g, ""));
        let amountType = item['"amount-type"'].replace(/"/g, "");
        const transactionType = item['"transaction-type"'].replace(/"/g, "");
        const marketplace = item['"marketplace-name"'].replace(/"/g, "");

        // Format specific amount types
        if (amountType.startsWith("FBA Customer Returns Fee")) {
            amountType = "FBA Customer Returns Fee";
        } else if (amountType === "other-transaction") {
            amountType = "Other Transaction";
        } else {
            // Remove any remaining parentheses and their contents
            amountType = amountType.replace(/\s*\([^)]*\)/g, "").trim();
        }

        if (amountTypeSum[amountType]) {
            amountTypeSum[amountType] += amount;
        } else {
            amountTypeSum[amountType] = amount;
        }

        transactionTypes.add(transactionType);
        marketplaces.add(marketplace);
    }

    const filteredAmountTypeSum = Object.fromEntries(
        Object.entries(amountTypeSum)
            .filter(([key, value]) => key !== "" && value !== null)
            .map(([key, value]) => [key, Number(value.toFixed(2))]),
    );

    // Calculate summary values
    const sales = filteredAmountTypeSum["ItemPrice"] || 0;
    const refunds = filteredAmountTypeSum["Refund"] || 0;
    const fees = Object.entries(filteredAmountTypeSum)
        .filter(([key]) => key.includes("Fee") || key.includes("Commission"))
        .reduce((sum, [, value]) => sum + value, 0);
    const tax = filteredAmountTypeSum["Tax"] || 0;
    const shipping = filteredAmountTypeSum["Shipping"] || 0;
    const otherTransactions = filteredAmountTypeSum["Other Transaction"] || 0;

    return {
        settlementId: settlementInfo['"settlement-id"'].replace(/"/g, ""),
        settlementStartDate: settlementStartDate,
        settlementEndDate: settlementEndDate,
        depositDate: depositDate,
        totalAmount: Number(totalAmount.toFixed(2)),
        currency,
        transactionTypes: Array.from(transactionTypes),
        marketplaces: Array.from(marketplaces),
        amountTypeSum: filteredAmountTypeSum,
        summary: {
            sales,
            refunds,
            fees,
            tax,
            shipping,
            otherTransactions,
            netProceeds: Number(totalAmount.toFixed(2)),
        },
    };
}
