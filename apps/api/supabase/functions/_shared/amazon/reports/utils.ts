interface SettlementReportSummary {
    settlementId: string;
    settlementStartDate: string;
    settlementEndDate: string;
    depositDate: string;
    totalAmount: number;
    currency: string;
    marketplace: string;
    location: string;
    amountTypeSum: Record<string, number>;
    summary: Record<string, number>;
    metadata: {
        transactionTypes: string[];
        marketplaces: string[];
        feeTypes: string[];
        promotionTypes: string[];
        directPaymentTypes: string[];
    };
    sampleData: any[];
}

const processMarketplaces = (marketplaces: string[], currency: string) => {
    console.log(marketplaces, currency);
    if (marketplaces.length && marketplaces[0]) {
        console.log("marketplaces[0]");
        return marketplaces[0];
    }
    if (marketplaces[1]) {
        console.log("marketplaces[1]");
        return marketplaces[1];
    }
    if (currency === "CAD") {
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

export function convertToCSV(content: string, delimiter = "\t"): string {
    const lines = content.trim().split("\n");
    const headers = lines[0].split(delimiter);

    let csvContent = `${
        headers.map((header) => `"${header.trim()}"`).join(",")
    }\n`;

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(delimiter);
        const csvLine = values.map((value) =>
            `"${value.trim()?.replace(/"/g, "")}"`
        ).join(",");
        csvContent += `${csvLine}\n`;
    }

    return csvContent;
}

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

export function summariseSettlementReport(
    report: any[],
): SettlementReportSummary {
    const settlementInfo = report[0];
    const [settlementStartDate, settlementEndDate, depositDate] = [
        "settlement-start-date",
        "settlement-end-date",
        "deposit-date",
    ]
        .map((key) => settlementInfo[key]);

    const totalAmount = Number.parseFloat(
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
        const amount = Number.parseFloat(item["direct-payment-amount"] || "0") +
            Number.parseFloat(item["total-amount"] || "0") +
            Number.parseFloat(item["order-fee-amount"] || "0") +
            Number.parseFloat(item["other-amount"] || "0") +
            Number.parseFloat(item["order-amount"] || "0") +
            Number.parseFloat(item["order-fee-amount"] || "0") +
            Number.parseFloat(item["shipment-fee-amount"] || "0") +
            Number.parseFloat(item["item-related-fee-amount"] || "0") +
            Number.parseFloat(item["promotion-amount"] || "0") +
            Number.parseFloat(item["price-amount"] || "0");

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
        amountTypeSum: Object.fromEntries(
            Object.entries(summary).map((
                [key, value],
            ) => [key, Number(value.toFixed(2))]),
        ),
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
            quantityPurchased: Number.parseInt(
                item["quantity-purchased"] || "0",
            ),
            priceType: item["price-type"],
            priceAmount: Number.parseFloat(item["price-amount"] || "0"),
            miscFeeAmount: Number.parseFloat(item["misc-fee-amount"] || "0"),
            otherFeeAmount: Number.parseFloat(item["other-fee-amount"] || "0"),
            otherFeeReasonDescription: item["other-fee-reason-description"],
            promotionId: item["promotion-id"],
            promotionAmount: Number.parseFloat(item["promotion-amount"] || "0"),
            otherAmount: Number.parseFloat(item["other-amount"] || "0"),
        })),
    };
}

export function convertCommaDecimalsInJson(obj: any): any {
    if (typeof obj === "string") {
        // Check if the string is a number with a comma or dot, allowing for a negative sign
        if (/^-?\d+[,.]\d+$/.test(obj)) {
            return Number.parseFloat(obj.replace(",", "."));
        }
        // Check if the string is a numeric zero
        if (/^-?0$/.test(obj)) {
            return 0;
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(convertCommaDecimalsInJson);
    }
    if (typeof obj === "object" && obj !== null) {
        const convertedObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                convertedObj[key] = convertCommaDecimalsInJson(obj[key]);
            }
        }
        return convertedObj;
    }
    return obj;
}

export function sumObjectValues(obj: Record<string, number>): number {
    if (!obj) {
        return 0;
    }
    const values = Object.values(obj).map(
        (v_value) => Number(v_value) as number,
    );
    return sumValues(values);
}

export function sumValues(
    values: (number | string | undefined | null)[],
): number {
    return values
        .map((v_value) =>
            typeof v_value === "string"
                ? Number.parseFloat(v_value)
                : (v_value ?? 0)
        )
        .filter((v_value): v_value is number => Number.isFinite(v_value))
        .reduce((v_acc, v_value) => v_acc + v_value, 0);
}

export function convertStringsToNumbers(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertStringsToNumbers);
    }
    for (const key in obj) {
        if (typeof obj[key] === "string") {
            const v_value = obj[key];
            // Check if the string is a valid date or longer than 6 characters
            if (v_value?.length > 6) {
                continue;
            }
            const v_num = Number.parseFloat(v_value);
            if (!Number.isNaN(v_num)) {
                obj[key] = v_num;
            }
        }
    }
    return obj;
}
