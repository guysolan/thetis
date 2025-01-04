import { docs_v1 } from "npm:googleapis";

export function generateAmazonReportContent(
    summary: any,
): docs_v1.Schema$BatchUpdateDocumentRequest {
    console.log("Generating Amazon report content...");
    console.log("Summary:", JSON.stringify(summary, null, 2));

    const requests: docs_v1.Schema$Request[] = [
        {
            insertText: {
                location: { index: 1 },
                text: "Amazon Settlement Report\n\n",
            },
        },
        {
            insertText: {
                endOfSegmentLocation: {},
                text: "Settlement Details\n\n",
            },
        },
    ];

    // Add settlement details
    const settlementDetails = [
        { key: "Settlement ID", value: summary.settlementId },
        {
            key: "Start Date",
            value: new Date(summary.settlementStartDate).toLocaleString(),
        },
        {
            key: "End Date",
            value: new Date(summary.settlementEndDate).toLocaleString(),
        },
        {
            key: "Deposit Date",
            value: new Date(summary.depositDate).toLocaleString(),
        },
        { key: "Currency", value: summary.currency },
    ];

    settlementDetails.forEach((detail) => {
        requests.push({
            insertText: {
                endOfSegmentLocation: {},
                text: `${detail.key}: ${detail.value}\n`,
            },
        });
    });

    // Add marketplaces
    requests.push({
        insertText: {
            endOfSegmentLocation: {},
            text: "\nMarketplaces\n",
        },
    });

    summary.marketplaces.filter(Boolean).forEach((marketplace: string) => {
        requests.push({
            insertText: {
                endOfSegmentLocation: {},
                text: `• ${marketplace}\n`,
            },
        });
    });

    // Add summary section
    requests.push({
        insertText: {
            endOfSegmentLocation: {},
            text: "\nSummary\n",
        },
    });

    // Insert summary items
    Object.entries(summary.summary).forEach(([key, value]) => {
        const formattedKey = key.replace(/([A-Z])/g, " $1").trim();
        requests.push({
            insertText: {
                endOfSegmentLocation: {},
                text: `${formattedKey}: ${summary.currency} ${
                    (value as number).toFixed(2)
                }\n`,
            },
        });
    });

    // Insert total amount
    requests.push({
        insertText: {
            endOfSegmentLocation: {},
            text: `\nTotal Amount: ${summary.currency} ${
                summary.totalAmount.toFixed(2)
            }\n`,
        },
    });

    return { requests };
}
