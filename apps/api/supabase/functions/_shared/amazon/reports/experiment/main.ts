import { convertCommaDecimalsInJson, generateSummary } from "./utils.ts";

import { logAnalysis } from "./logger.ts";

async function processReports(folderName: string) {
    // Get Data
    const dataFilePath = `../${folderName}/v2.json`;
    const readData = await Deno.readTextFile(dataFilePath);
    const parsedData = JSON.parse(readData);
    const convertedData = convertCommaDecimalsInJson(parsedData);
    const summary = generateSummary(convertedData);
    // Get Answers
    const summaryFilePath = `../${folderName}/summary.json`;
    const readSummary = await Deno.readTextFile(summaryFilePath);
    const parsedSummary = JSON.parse(readSummary);

    logAnalysis(summary, parsedSummary);
}

await processReports("13.09.2024");

await processReports("11.10.2024");

await processReports("18.10.2024");

await processReports("15.11.2024");

await processReports("08.11.2024");
