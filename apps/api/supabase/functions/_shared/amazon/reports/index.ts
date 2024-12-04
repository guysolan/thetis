import { getReportDocument } from "./api.ts";
import { generateSummary } from "./main.ts";
import { convertStringsToNumbers, tsvToCsv, tsvToJson } from "./utils.ts";

export const processAmazonReport = async (report: string) => {
    const csvData = tsvToCsv(report);
    const jsonData = tsvToJson(report);
    const tsData = convertStringsToNumbers(jsonData);
    const summary = generateSummary(tsData);
    return { csvData, jsonData, summary };
};

export const getAmazonReportById = async (
    region: string,
    reportId: string,
) => {
    const report = await getReportDocument(region as "NA" | "EUR", reportId);
    const { csvData, jsonData, summary } = await processAmazonReport(report);
    return { report, csvData, jsonData, summary };
};
