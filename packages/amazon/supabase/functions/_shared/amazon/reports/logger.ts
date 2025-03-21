import { Summary } from "./types.ts";

function compareValues(
    in_label: string,
    in_expected: number,
    in_actual: number,
) {
    try {
        if (in_expected === undefined || typeof in_expected !== "number") {
            console.log(
                in_label,
                "Skipped comparison as expected value is not a valid number.",
            );
            return;
        }

        const v_difference = Math.abs(in_expected - in_actual);
        const v_isMatch = v_difference < 0.01; // Allow for small floating point differences

        console.log(
            `${in_label}: Expected: £${in_expected.toFixed(2)} | Actual: £${
                in_actual.toFixed(2)
            } ${v_isMatch ? "✅" : "❌"}`,
        );
    } catch (e) {
        console.log(in_label, in_actual, "error:", e);
    }
}

export function logAnalysis(
    summary: Summary,
    expectedValues: { [key: string]: number },
) {
    console.log(
        `\n\n\n\nSettlement ID: ${summary.settlement_id}`,
    );

    console.log(
        `Marketplace Name: ${summary.marketplace_name}`,
    );

    console.log(
        `Settlement Start Date: ${summary.settlement_start_date}`,
    );

    console.log(
        `Settlement End Date: ${summary.settlement_end_date}`,
    );

    console.log(
        `Deposit Date: ${summary.deposit_date}`,
    );

    compareValues(
        "\n\nNet Proceeds",
        expectedValues.netProceeds,
        summary.net_proceeds,
    );

    compareValues(
        "\n\nBeginning Balance",
        expectedValues.beginningBalance,
        summary.beginning_balance,
    );

    compareValues(
        "\n\nSales",
        expectedValues.sales,
        summary.sales.total,
    );

    compareValues(
        "- Product Charges",
        expectedValues.productCharges,
        summary.sales.product_charges,
    );

    compareValues(
        "- Tax",
        expectedValues.tax,
        summary.sales.tax,
    );

    compareValues(
        "- Shipping",
        expectedValues.shipping,
        summary.sales.shipping,
    );

    compareValues(
        "- Other",
        expectedValues.other,
        summary.sales.other,
    );

    compareValues(
        "\n\nRefunds:",
        expectedValues.refunds,
        summary.refunds.total,
    );
    compareValues(
        "- Refunded Expenses:",
        expectedValues.refundedExpenses,
        summary.refunds.refunded_expenses,
    );
    compareValues(
        "- Refunded Sales:",
        expectedValues.refundedSales,
        summary.refunds.refunded_sales,
    );

    compareValues(
        "\n\nExpenses",
        expectedValues.expenses,
        summary.expenses.total,
    );

    compareValues(
        "- Amazon Fees",
        expectedValues.amazonFees,
        summary.expenses.amazon_fees,
    );

    compareValues(
        "- Cost of Advertising",
        expectedValues.costOfAdvertising,
        summary.expenses.cost_of_advertising,
    );

    compareValues(
        "- FBA Fees",
        expectedValues.fbaFees,
        summary.expenses.fba_fees,
    );

    compareValues(
        "- Promo Shipping",
        expectedValues.promoRebates,
        summary.expenses.promo_rebates,
    );

    compareValues(
        "\n\nAccount Reserve Level",
        expectedValues.accountReserveLevel,
        summary.account_reserve_level,
    );
}
