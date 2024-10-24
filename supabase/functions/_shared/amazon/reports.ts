import { callSellingPartnerAPI } from "./config.ts";
import { type CountryCode, marketplaces } from "./marketplace-ids.ts";
import * as pako from "https://deno.land/x/pako@v2.0.3/pako.js";

type ReportType =
    | "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2"
    | "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE"
    | "GET_V2_SETTLEMENT_REPORT_DATA_XML";

const processMarketplaces = (marketplaces: string[], currency: string) => {
    console.log(marketplaces, currency);
    if (marketplaces.length && marketplaces[0]) {
        console.log("marketplaces[0]");
        return marketplaces[0];
    } else if (marketplaces[1]) {
        console.log("marketplaces[1]");
        return marketplaces[1];
    } else if (currency === "CAD") {
        console.log("Amazon.ca");
        return "Amazon.ca";
    }
    return "";
};

const marketplaceToLocation = (marketplace: string) => {
    switch (marketplace) {
        case "Amazon.ca":
            return "CA";
        case "Amazon.de":
            return "DE";
        case "Amazon.es":
            return "ES";
        case "Amazon.fr":
            return "FR";
        case "Amazon.it":
            return "IT";
        case "Amazon.co.uk":
            return "GB";
        case "Amazon.in":
            return "IN";
        case "Amazon.jp":
            return "JP";
        case "Amazon.com":
            return "US";
        default:
            return "UNKNOWN";
    }
};

export async function getSettlementReportsByRegion(
    region: "NA" | "EUR",
) {
    const selectedMarketplaces = marketplaces.filter((m) =>
        m?.region === region
    );

    const endpoint = "/reports/2021-06-30/reports";
    const initialParams: Record<string, string> = {
        reportTypes: "GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE",
    };

    let reports = [];
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

// Example usage
export const getAllSettlementDataByCountryAndReportType = async (
    countryCode: CountryCode,
    reportType: ReportType,
) => {
    const reports = await getAllSettlementReports(
        countryCode,
        reportType,
    );

    return reports;
};

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
            `"${value.trim()?.replace(/"/g, "")}"`
        ).join(",");
        csvContent += csvLine + "\n";
    }

    return csvContent;
}

export function summariseSettlementReport(report: any[]) {
    const settlementInfo = report[0];
    const [settlementStartDate, settlementEndDate, depositDate] = [
        "settlement-start-date",
        "settlement-end-date",
        "deposit-date",
    ]
        .map((key) => settlementInfo[key]);

    const totalAmount = parseFloat(
        settlementInfo["total-amount"] || "0",
    );
    const currency = settlementInfo["currency"];

    const summary: Record<string, number> = {
        sales: 0,
        salesOther: 0,
        salesProductCharges: 0,
        salesShipping: 0,
        refunds: 0,
        refundedSales: 0,
        refundedExpenses: 0,
        expenses: 0,
        expensedPromoRebates: 0,
        expensedFbaFees: 0,
        expensedCostOfAdvertising: 0,
        expensedAmazonFees: 0,
        accountReserveLevel: 0,
        previousReserveAmount: 0,
        other: 0,
        FBAFulfilmentFee: 0,
        Commission: 0,
        netProceeds: Number(totalAmount.toFixed(2)),
    };

    const transactionTypes = new Set<string>();
    const marketplaces = new Set<string>();
    const feeTypes = new Set<string>();
    const promotionTypes = new Set<string>();
    const directPaymentTypes = new Set<string>();

    for (const item of report) {
        const amount = parseFloat(item["direct-payment-amount"] || "0") +
            parseFloat(item["total-amount"] || "0") +
            parseFloat(item["order-fee-amount"] || "0") +
            parseFloat(item["other-amount"] || "0") +
            parseFloat(item["order-amount"] || "0") +
            parseFloat(item["order-fee-amount"] || "0") +
            parseFloat(item["shipment-fee-amount"] || "0") +
            parseFloat(item["item-related-fee-amount"] || "0") +
            parseFloat(item["promotion-amount"] || "0") +
            parseFloat(item["price-amount"] || "0");

        const amountType = item["transaction-type"];
        const priceType = item["price-type"];
        const feeType = item["item-related-fee-type"];

        switch (amountType) {
            case "Order":
                if (priceType === "Principal") {
                    // TODO - Sales needs some extra handling beyond just productCharges but I don't know what
                    summary.sales += amount;
                    summary.salesProductCharges += amount;
                } else if (priceType === "Shipping") {
                    summary.sales += amount;
                    summary.salesShipping += amount;
                }
                break;
            case "Refund":
                if (priceType === "Principal") {
                    summary.refundedSales += amount;
                }
                summary.refunds += amount;
                break;
            case "RefundCommission":
                summary.refunds += amount;
                break;
            case "RefundShipping":
                summary.refundedSales += amount;
                summary.refunds += amount;
                break;
            case "PromotionRebate":
                summary.expenses += amount;
                summary.promoRebates += amount;
                break;

            case "Current Reserve Amount":
                summary.currentReserveAmount = amount;
                break;
            case "Previous Reserve Amount Balance":
                summary.previousReserveAmount = amount;
                break;
            case "Liquidations":
                summary.liquidations += amount;
                break;
            case "REVERSAL_REIMBURSEMENT":
                summary.reversalReimbursements += amount;
                break;
            default:
                console.log(
                    `Unhandled transaction type: ${amountType} ${feeType} ${priceType} ${amount}`,
                );
                break;
        }

        // Collect unique values
        transactionTypes.add(item["transaction-type"]);
        marketplaces.add(item["marketplace-name"]);
        feeTypes.add(item["shipment-fee-type"]);
        feeTypes.add(item["order-fee-type"]);
        feeTypes.add(item["item-related-fee-type"]);
        promotionTypes.add(item["promotion-type"]);
        directPaymentTypes.add(item["direct-payment-type"]);
    }

    summary.expenses = summary.promoRebates + summary.fbaFees +
        summary.costOfAdvertising + summary.amazonFees;

    const marketplace = processMarketplaces(
        Array.from(marketplaces),
        currency,
    );
    const location = marketplaceToLocation(marketplace);

    return {
        settlementId: settlementInfo["settlement-id"],
        settlementStartDate,
        settlementEndDate,
        depositDate,
        totalAmount: summary.netProceeds,
        currency,
        marketplace,
        location,
        summary: Object.fromEntries(
            Object.entries(summary).map((
                [key, value],
            ) => [key, Number(value.toFixed(2))]),
        ),
        metadata: {
            transactionTypes: Array.from(transactionTypes),
            marketplaces: Array.from(marketplaces),
            feeTypes: Array.from(feeTypes),
            promotionTypes: Array.from(promotionTypes),
            directPaymentTypes: Array.from(directPaymentTypes),
        },
        sampleData: report.slice(0, 5).map((item) => ({
            orderId: item["order-id"],
            merchantOrderId: item["merchant-order-id"],
            adjustmentId: item["adjustment-id"],
            shipmentId: item["shipment-id"],
            fulfillmentId: item["fulfillment-id"],
            postedDate: item["posted-date"],
            orderItemCode: item["order-item-code"],
            merchantOrderItemId: item["merchant-order-item-id"],
            merchantAdjustmentItemId: item["merchant-adjustment-item-id"],
            sku: item["sku"],
            quantityPurchased: parseInt(item["quantity-purchased"] || "0"),
            priceType: item["price-type"],
            priceAmount: parseFloat(item["price-amount"] || "0"),
            miscFeeAmount: parseFloat(item["misc-fee-amount"] || "0"),
            otherFeeAmount: parseFloat(item["other-fee-amount"] || "0"),
            otherFeeReasonDescription: item["other-fee-reason-description"],
            promotionId: item["promotion-id"],
            promotionAmount: parseFloat(item["promotion-amount"] || "0"),
            otherAmount: parseFloat(item["other-amount"] || "0"),
        })),
    };
}
