import { Summary } from "./types.ts";
import { sumObjectValues, sumValues } from "./utils.ts";

interface AmazonSettlementRecord {
    "settlement-id": string;
    "settlement-start-date": string;
    "settlement-end-date": string;
    "deposit-date": string;
    "total-amount": number;
    currency: string;
    "transaction-type": string;
    "order-id": string;
    "merchant-order-id": string;
    "adjustment-id": string;
    "shipment-id": string;
    "marketplace-name": string;
    "amount-type": string;
    "amount-description": string;
    amount: number;
    "fulfillment-id": string;
    "posted-date": string;
    "posted-date-time": string;
    "order-item-code": string;
    "merchant-order-item-id": string;
    "merchant-adjustment-item-id": string;
    sku: string;
    "quantity-purchased": string;
    "promotion-id": string;
    // ... other fields exist but not needed for this analysis
}

const getMetadata = (in_data: AmazonSettlementRecord[]) => {
    if (!in_data || in_data.length === 0) {
        return null;
    }

    const v_firstRecord = in_data[0];
    const v_secondRecord = in_data[1];

    return {
        settlement_id: v_firstRecord["settlement-id"],
        settlement_start_date: v_firstRecord["settlement-start-date"],
        settlement_end_date: v_firstRecord["settlement-end-date"],
        deposit_date: v_firstRecord["deposit-date"],
        net_proceeds: v_firstRecord["total-amount"],
        marketplace_name: v_secondRecord["marketplace-name"],
    };
};

function getAmountByField(
    data: AmazonSettlementRecord[],
    field: keyof AmazonSettlementRecord,
    matchValue: string,
): number {
    let v_totalAmount = 0;

    for (const record of data) {
        if (record[field] === matchValue) {
            const v_amount = record.amount || 0;
            if (!Number.isNaN(v_amount)) {
                v_totalAmount += v_amount;
            }
        }
    }

    return v_totalAmount;
}

function getTotalAmount(data: AmazonSettlementRecord[]): number {
    let v_totalAmount = 0;

    for (const record of data) {
        const v_amount = record["total-amount"] || 0;
        if (!Number.isNaN(v_amount)) {
            v_totalAmount += v_amount;
        }
    }

    return v_totalAmount;
}

function getCurrency(data: AmazonSettlementRecord[]): string {
    for (const record of data) {
        if (record?.currency !== "") {
            return record?.currency || "GBP";
        }
    }
    return "GBP";
}

function analyzeSettlementReport(data: AmazonSettlementRecord[]) {
    // Remove records with specific amount descriptions
    const filteredData = data.filter((record) => {
        const v_amountDesc = record["amount-description"];
        return v_amountDesc !== "Previous Reserve Amount Balance" &&
            v_amountDesc !== "Current Reserve Amount";
    });

    const summary = new Map<string, Map<string, Map<string, number>>>();

    // Process each record
    for (const record of filteredData) {
        const transType = record["transaction-type"];
        const amountType = record["amount-type"];
        const amountDesc = record["amount-description"];
        const amount = record.amount || 0;

        // Initialize nested maps if they don't exist
        if (!summary.has(transType)) {
            summary.set(transType, new Map());
        }
        const transTypeMap = summary.get(transType)!;

        if (!transTypeMap.has(amountType)) {
            transTypeMap.set(amountType, new Map());
        }
        const amountTypeMap = transTypeMap.get(amountType)!;

        // Sum up the amounts
        const currentAmount = amountTypeMap.get(amountDesc) || 0;
        amountTypeMap.set(amountDesc, currentAmount + amount);
    }

    // Convert to readable format
    const result: Record<string, Record<string, Record<string, number>>> = {};

    for (const [transType, transTypeMap] of summary) {
        result[transType] = {};

        for (const [amountType, amountTypeMap] of transTypeMap) {
            result[transType][amountType] = {};

            for (const [amountDesc, total] of amountTypeMap) {
                result[transType][amountType][amountDesc] = Number.parseFloat(
                    total.toFixed(2),
                );
            }
        }
    }

    return {
        summary: result,
    };
}

export function calculateRefunds(analysis: any) {
    const v_promotion = analysis.summary.Refund?.Promotion || {};
    const v_itemPrice = analysis.summary.Refund?.ItemPrice || {};
    const v_itemWithheldTax = analysis.summary.Refund?.ItemWithheldTax || {};
    const v_itemFees = analysis.summary.Refund?.ItemFees || {};

    // Calculate Refunded Expenses
    const v_refundedExpenses = sumValues(Object.values(v_itemFees)) +
        (v_promotion.Shipping || 0);

    // Calculate Refunded Sales
    const v_refundedSales = sumValues(Object.values(v_itemPrice)) +
        sumValues(Object.values(v_itemWithheldTax)) +
        (v_promotion.TaxDiscount || 0);

    return {
        total: v_refundedSales + v_refundedExpenses,
        refunded_expenses: v_refundedExpenses,
        refunded_sales: v_refundedSales,
    };
}

export function calculateSales(analysis: any, euro?: boolean) {
    const order = analysis.summary.Order;
    const product_charges = order?.ItemPrice?.Principal || 0;
    const tax = euro ? 0 : order?.ItemPrice?.Tax || 0;
    const shipping = order?.ItemPrice?.Shipping || 0;
    const inventory_reimbursements =
        analysis.summary["other-transaction"]?.["FBA Inventory Reimbursement"]
            ?.REVERSAL_REIMBURSEMENT || 0;
    const total = sumValues([
        product_charges,
        tax,
        shipping,
        inventory_reimbursements,
    ]);
    return { total, product_charges, tax, shipping, inventory_reimbursements };
}

function calculateAmazonFees(analysis: any) {
    const v_refundFees = Object.values(analysis.summary?.Order?.ItemFees || {});
    const v_totalRefundFees = sumValues(v_refundFees as number[]);
    return v_totalRefundFees;
}

export function calculateExpenses(analysis: any, euro?: boolean) {
    const amazon_fees = calculateAmazonFees(analysis);
    const promo_rebates = analysis.summary.Order.Promotion?.Shipping;
    const fba_fees = euro ? 0 : sumObjectValues(
        analysis.summary?.["other-transaction"]?.["other-transaction"],
    );
    const inventory_reimbursements = sumObjectValues(
        analysis.summary["other-transaction"]?.["FBA Inventory Reimbursement"],
    );

    console.log(inventory_reimbursements);

    const total = sumValues([
        amazon_fees,
        promo_rebates,
        fba_fees,
        // inventory_reimbursements,
    ]);
    return { total, amazon_fees, promo_rebates, fba_fees };
}

export function generateSummary(data: any): Summary {
    const currency = getCurrency(data);
    const euro = currency === "EUR";
    const analysis = analyzeSettlementReport(data);

    // console.log("\n\n Analysis \n\n");
    // console.log(analysis);
    // console.log("\n\n Analysis \n\n");

    return {
        ...getMetadata(data),
        sales: calculateSales(analysis, euro),
        refunds: calculateRefunds(analysis),
        expenses: calculateExpenses(analysis, euro),
        account_reserve_level: getAmountByField(
            data,
            "amount-description",
            "Current Reserve Amount",
        ),
        beginning_balance: getAmountByField(
            data,
            "amount-description",
            "Previous Reserve Amount Balance",
        ),
        net_proceeds: getTotalAmount(data),
    } as Summary;
}
