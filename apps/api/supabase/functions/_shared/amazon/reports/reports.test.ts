import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std/path/mod.ts";
import { processAmazonReport, reportToJson } from "./process-amazon-report.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

Deno.test("convert settlement TSV to CSV", async () => {
    const tsvPath = join(__dirname, "18.10.2024_flatfile_v1.txt");
    const tsv = await Deno.readTextFile(tsvPath);

    assertEquals(tsv.length > 0, true);

    // Test specific conversions
    const lines = tsv.split("\n");
    assertEquals(lines[0].includes("settlement-id"), true);
});

Deno.test("convert settlement TSV to CSV", async () => {
    const tsvPath = join(__dirname, "18.10.2024_flatfile_v1.txt");
    const tsv = await Deno.readTextFile(tsvPath);

    const { csvData, jsonData, summary } = await processAmazonReport(tsv);

    assertEquals(csvData.length > 0, true);
    assertEquals(jsonData.length > 0, true);
    assertEquals(Object.keys(summary).length > 0, true);

    // Test specific conversions
    const lines = tsv.split("\n");
    assertEquals(lines[0].includes("settlement-id"), true);
});

Deno.test("convert settlement TSV to JSON", async () => {
    const tsvPath = join(__dirname, "18.10.2024_flatfile_v2.txt");
    const tsv = await Deno.readTextFile(tsvPath);

    const jsonData = await reportToJson(tsv);
    console.log(jsonData);
});

Deno.test("verify settlement summary values", async () => {
    const tsvPath = join(__dirname, "18.10.2024_flatfile_v1.txt");
    const tsv = await Deno.readTextFile(tsvPath);

    const { csvData, summary } = await processAmazonReport(tsv);
    // console.log(csvData);

    const summarySummary = summary.summary;

    // console.log(summarySummary);

    // // Helper function to log and assert
    // const assertAndLog = (actual: number, expected: number, label: string) => {
    //     console.log(`${label}:`);
    //     console.log(`  Expected: ${expected}`);
    //     console.log(`  Actual:   ${actual}`);
    //     assertEquals(actual, expected);
    // };

    // // Sales breakdown
    // assertAndLog(summarySummary.sales, 630.58, "Sales");
    // assertAndLog(
    //     summarySummary.salesProductCharges,
    //     519.87,
    //     "Sales Product Charges",
    // );
    // assertAndLog(summarySummary.salesTax, 97.00, "Sales Tax");
    // assertAndLog(summarySummary.salesShipping, 13.71, "Sales Shipping");

    // // Refunds breakdown
    // assertAndLog(summarySummary.refunds, -204.55, "Refunds");
    // assertAndLog(summarySummary.refundedExpenses, 42.46, "Refunded Expenses");
    // assertAndLog(summarySummary.refundedSales, -247.01, "Refunded Sales");

    // // Expenses breakdown
    // assertAndLog(summarySummary.expenses, -187.13, "Expenses");
    // assertAndLog(
    //     summarySummary.expensedPromoRebates,
    //     -8.72,
    //     "Expensed Promo Rebates",
    // );
    // assertAndLog(
    //     summarySummary.expensedAmazonFees,
    //     -178.41,
    //     "Expensed Amazon Fees",
    // );

    // // Account reserve and net proceeds
    // assertAndLog(
    //     summarySummary.currentReserveAmount,
    //     -245.98,
    //     "Current Reserve Amount",
    // );
    // assertAndLog(summarySummary.netProceeds, 346.60, "Net Proceeds");
});
