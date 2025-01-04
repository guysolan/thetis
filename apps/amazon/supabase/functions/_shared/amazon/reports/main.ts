import { Summary } from "./types.ts";
import { sumObjectValues, sumValues } from "./utils.ts";
import dayjs from "dayjs";

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

    // Convert dates to YYYY-MM-DD format
    const convertToISO = (dateStr: string) => {
        if (!dateStr) return null;

        // Handle dates in format "DD.MM.YYYY" or "DD.MM.YYYY HH:mm:ss UTC"
        const v_match = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})/);
        if (v_match) {
            const [_, v_day, v_month, v_year] = v_match;
            return `${v_year}-${v_month}-${v_day}`;
        }

        return dateStr;
    };

    return {
        settlement_id: v_firstRecord["settlement-id"],
        settlement_start_date: convertToISO(
            v_firstRecord["settlement-start-date"],
        ),
        settlement_end_date: convertToISO(v_firstRecord["settlement-end-date"]),
        deposit_date: convertToISO(v_firstRecord["deposit-date"]),
        net_proceeds: v_firstRecord["total-amount"],
        marketplace_name: v_secondRecord["marketplace-name"],
    };
};

function getAmountByField(
    data: AmazonSettlementRecord[],
    field: keyof AmazonSettlementRecord,
    matchValue: string,
): number | null {
    let v_totalAmount = 0;

    for (const record of data) {
        if (record[field] === matchValue) {
            const v_amount = record.amount || 0;
            if (!Number.isNaN(v_amount)) {
                v_totalAmount += v_amount;
            }
        }
    }

    // Return null if the total amount is not a valid number
    return Number.isFinite(v_totalAmount) ? v_totalAmount : null;
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
                const v_amount = typeof total === "number" ? total : 0;
                result[transType][amountType][amountDesc] = Number(
                    v_amount.toFixed(2),
                );
            }
        }
    }

    return {
        summary: result,
    };
}

export function calculateRefunds(analysis: any) {
    const itemPrice = analysis.summary.Refund?.ItemPrice || {};

    const refundPromotionTaxDiscount =
        analysis.summary.Refund?.Promotion?.TaxDiscount || 0;
    const refundPromotionShipping =
        analysis.summary.Refund?.Promotion?.Shipping || 0;

    const itemWithheldTaxTotal = sumObjectValues(
        analysis.summary.Refund?.ItemWithheldTax || {},
    );

    const refundedSalesTotal = sumValues(
        [
            itemPrice.Principal,
            itemPrice.Tax,
            itemPrice.Shipping,
            itemPrice.ShippingTax,
            itemWithheldTaxTotal,
            refundPromotionTaxDiscount,
        ],
    );

    const refundItemFees = sumObjectValues(
        analysis.summary.Refund?.ItemFees || {},
    );

    const restockingFee = itemPrice?.RestockingFee || 0;
    // Calculate Refunded Expenses
    const refundedExpensesTotal = refundItemFees + restockingFee +
        refundPromotionShipping;

    return {
        total: refundedSalesTotal + refundedExpensesTotal,
        refunded_expenses: refundedExpensesTotal,
        refunded_sales: refundedSalesTotal,
    };
}

export function calculateSales(analysis: any, euro?: boolean) {
    const order = analysis.summary.Order;
    const item_price_total = sumObjectValues(order?.ItemPrice || {});

    // ItemPrice
    const product_charges = order?.ItemPrice?.Principal || 0;
    const tax = order?.ItemPrice?.Tax || 0;
    const shipping = order?.ItemPrice?.Shipping || 0;
    const shippingTax = order?.ItemPrice?.ShippingTax || 0;
    const promotionTaxDiscount = order?.Promotion?.TaxDiscount || 0;

    // Item withheld tax
    const item_withheld_tax = sumObjectValues(
        order?.ItemWithheldTax || {},
    );

    // Other
    const other = sumObjectValues(
        analysis.summary?.Liquidations?.ItemPrice || {},
    );

    const inventory_reimbursements =
        analysis.summary["other-transaction"]?.["FBA Inventory Reimbursement"]
            ?.REVERSAL_REIMBURSEMENT || 0;

    const taxTotal = sumValues([
        tax,
        item_withheld_tax,
        promotionTaxDiscount,
        shippingTax,
    ]);

    const total = sumValues([
        item_price_total,
        item_withheld_tax,
        other,
        inventory_reimbursements,
        promotionTaxDiscount,
    ]);

    return {
        total,
        product_charges,
        other,
        tax: taxTotal,
        shipping,
        inventory_reimbursements,
    };
}

function calculateAmazonFees(analysis: any) {
    const liquidationFees =
        sumObjectValues(analysis.summary?.Liquidations?.ItemFees) ?? 0;
    const refundFees = sumObjectValues(analysis.summary?.Order?.ItemFees || {});
    return liquidationFees + refundFees;
}

export function calculateExpenses(analysis: any, euro?: boolean) {
    const amazon_fees = calculateAmazonFees(analysis) ?? 0;
    const promo_rebates = analysis.summary?.Order?.Promotion?.Shipping ?? 0;
    const cost_of_advertising = sumObjectValues(
        analysis.summary?.ServiceFee?.["Cost of Advertising"],
    ) ?? 0;
    const fba_fees = euro ? 0 : sumObjectValues(
        analysis.summary?.["other-transaction"]?.["other-transaction"],
    ) ?? 0;
    const inventory_reimbursements = sumObjectValues(
        analysis.summary["other-transaction"]?.["FBA Inventory Reimbursement"],
    ) ?? 0;

    const total = sumValues([
        amazon_fees,
        promo_rebates,
        cost_of_advertising,
        fba_fees,
        // inventory_reimbursements,
    ]);
    return { total, amazon_fees, cost_of_advertising, promo_rebates, fba_fees };
}

export function generateSummary(data: any): Summary {
    const currency = getCurrency(data);
    const euro = currency === "EUR";
    const analysis = analyzeSettlementReport(data);

    return {
        ...getMetadata(data),
        currency: currency,
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
    } as Summary;
}
