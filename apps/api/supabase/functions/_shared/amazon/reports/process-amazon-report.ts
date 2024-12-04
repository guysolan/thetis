import { getReportDocument, summariseSettlementReport } from "./reports.ts";

export function tsvToCsv(tsv: string): string {
    const lines = tsv.trim().split("\n");
    const headers = lines[0].split("\t");

    // Escape special characters and wrap fields in quotes if necessary
    const escapeField = (field: string) => {
        if (
            field.includes('"') || field.includes(",") || field.includes("\n")
        ) {
            return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
    };

    const csvLines = lines.map((line) =>
        line.split("\t").map(escapeField).join(",")
    );

    return csvLines.join("\n");
}

export function tsvToJson(tsv: string): any[] {
    const lines = tsv.trim().split("\n");
    const headers = lines[0].split("\t").map((header) => header.trim());

    return lines.slice(1).map((line) => {
        const values = line.split("\t");
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index]?.trim() || "";
            return obj;
        }, {} as Record<string, string>);
    });
}

export const reportToJson = async (report: string) => {
    const csvData = tsvToCsv(report);
    const jsonData = tsvToJson(csvData);
    return jsonData;
};

export const processAmazonReport = async (report: string) => {
    const csvData = tsvToCsv(report);
    const jsonData = tsvToJson(report);
    const summary = summariseSettlementReport(jsonData);
    return { csvData, jsonData, summary };
};

// Update getAmazonReportById function to use tsvToJson
export const getAmazonReportById = async (
    region: string,
    reportId: string,
) => {
    const report = await getReportDocument(region as "NA" | "EUR", reportId);
    const { csvData, jsonData, summary } = await processAmazonReport(report);
    return { report, csvData, jsonData, summary };
};

export const v2ToJson = async (report: string) => {
};
