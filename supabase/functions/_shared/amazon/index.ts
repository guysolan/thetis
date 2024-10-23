import { convertCsvToJson } from "../utils/convertCsvToJson.ts";

import {
    convertToCSV,
    getReportDocument,
    getReportDocumentAsCSV,
    summariseSettlementReport,
} from "./reports.ts";
export { getReportDocumentAsCSV };

export const getAmazonReportById = async (
    countryCode: string,
    reportId: string,
) => {
    const report = await getReportDocument(countryCode, reportId);

    const csv = await convertToCSV(report);

    const jsonData = convertCsvToJson(csv);

    const summary = summariseSettlementReport(jsonData);

    return { report, csv, summary };
};
