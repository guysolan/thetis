import { marketplaces } from "../marketplace-ids.ts";
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

type AmazonReportById = {
    region: string;
    country: string;
    reportId: string;
};

export const getAmazonReportById = async (
    props: AmazonReportById,
) => {
    const { region, country, reportId } = props;

    const report = await getReportDocument(region as "NA" | "EUR", reportId);
    const { csvData, jsonData, summary } = await processAmazonReport(report);
    const marketplace = getMarketplaceByName(summary.marketplace_name);
    return {
        report,
        csvData,
        jsonData,
        summary: { ...summary, ...marketplace },
    };
};

const getMarketplaceByName = (name: string) => {
    const marketplace = marketplaces.find((m) =>
        m.country.toLowerCase() === name.toLowerCase()
    );
    if (!marketplace) {
        throw new Error(`No marketplace found for country: ${name}`);
    }
    return marketplace;
};
