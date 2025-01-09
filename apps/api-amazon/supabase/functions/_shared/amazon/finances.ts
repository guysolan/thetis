import { callSellingPartnerAPI } from "./config.ts";

export async function getMonthlyFinancialReport(
    region: "NA" | "EUR",
    year: number,
    month: number,
): Promise<any> {
    // Validate month
    if (month < 1 || month > 12) {
        throw new Error("Invalid month. Must be between 1 and 12.");
    }

    // Calculate start and end dates
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    // Format dates for API request
    const postedAfter = startDate.toISOString();
    const postedBefore = endDate.toISOString();

    console.log(
        `Fetching financial report for ${year}-${
            month.toString().padStart(2, "0")
        }`,
    );

    console.log(`Date range: ${postedAfter} to ${postedBefore}`);

    const params = {
        postedAfter,
        postedBefore,
    };

    try {
        const response = await callSellingPartnerAPI(
            region,
            "/finances/2024-06-19/transactions",
            "GET",
            params,
        );

        return response;
    } catch (error) {
        console.error("Error fetching financial report:", error);
        throw error;
    }
}
