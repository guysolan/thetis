import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";
import { summariseSettlementReport } from "../reports.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

// Helper function to read and parse JSON files
async function readJsonFile(filePath: string) {
    const data = await Deno.readTextFile(filePath);
    return JSON.parse(data);
}

// Helper function to compare specific fields in processed summary with expected summary
function compareSpecificFields(
    processedSummary: any,
    summaryData: any,
    fields: string[],
) {
    fields.forEach((field) => {
        assertEquals(
            processedSummary[field],
            summaryData[field],
            field.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to spaced words
        );
    });
}

// Test for beginning balance and sales
Deno.test("verify beginning balance and sales", async () => {
    const summaryPath = join(__dirname, "13.09.2024", "summary.json");
    const summaryData = await readJsonFile(summaryPath);

    const v2Path = join(__dirname, "13.09.2024", "v2.json");
    const v2Data = await readJsonFile(v2Path);

    const processedSummary = summariseSettlementReport(v2Data);

    compareSpecificFields(processedSummary, summaryData, [
        "beginningBalance",
        "sales",
    ]);
});

// Test for product charges
Deno.test("verify product charges", async () => {
    const summaryPath = join(__dirname, "13.09.2024", "summary.json");
    const summaryData = await readJsonFile(summaryPath);

    const v2Path = join(__dirname, "13.09.2024", "v2.json");
    const v2Data = await readJsonFile(v2Path);

    const processedSummary = summariseSettlementReport(v2Data);

    compareSpecificFields(processedSummary, summaryData, ["productCharges"]);
});

// Test for account reserve level and net proceeds
Deno.test("verify account reserve level and net proceeds", async () => {
    const summaryPath = join(__dirname, "13.09.2024", "summary.json");
    const summaryData = await readJsonFile(summaryPath);

    const v2Path = join(__dirname, "13.09.2024", "v2.json");
    const v2Data = await readJsonFile(v2Path);

    const processedSummary = summariseSettlementReport(v2Data);

    compareSpecificFields(processedSummary, summaryData, [
        "accountReserveLevel",
        "netProceeds",
    ]);
});
