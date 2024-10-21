import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import { summariseSettlementReport } from "./reports.ts";

Deno.test("summariseSettlementReport", () => {
    const testReport = [
        {
            '"amount-type"': '"ItemFees"',
            '"amount-description"': '"Commission"',
            '"amount"': '"-8.64"',
        },
        {
            '"amount-type"': '"ItemFees"',
            '"amount-description"': '"ShippingChargeback"',
            '"amount"': '"-4.99"',
        },
        {
            '"amount-type"': '"ItemPrice"',
            '"amount-description"': '"Principal"',
            '"amount"': '"39.99"',
        },
    ];

    const result = summariseSettlementReport(testReport);

    assertEquals(result, {
        totalAmount: 26.36,
        amountTypeSum: {
            ItemFees: -13.63,
            ItemPrice: 39.99,
        },
    });
});
