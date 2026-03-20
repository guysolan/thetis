import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { loadEnv, resolveCredentialsPath } from "./load-env.js";

loadEnv();

const propertyId = process.env.GA4_PROPERTY_ID;
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!propertyId) {
	console.error("Missing GA4_PROPERTY_ID in .env");
	process.exit(1);
}

if (!credentialsPath) {
	console.error("Missing GOOGLE_APPLICATION_CREDENTIALS in .env");
	process.exit(1);
}

// Resolve to absolute path so it works when run from any cwd
process.env.GOOGLE_APPLICATION_CREDENTIALS = resolveCredentialsPath(credentialsPath);

const analyticsDataClient = new BetaAnalyticsDataClient();
const property = `properties/${propertyId}`;

// Last 30 days
const endDate = new Date();
const startDate = new Date();
startDate.setDate(startDate.getDate() - 30);
const dateRange = {
	startDate: startDate.toISOString().slice(0, 10),
	endDate: endDate.toISOString().slice(0, 10),
};

async function runReport(
	title: string,
	request: Parameters<BetaAnalyticsDataClient["runReport"]>[0],
) {
	console.log("\n" + "=".repeat(60));
	console.log(title);
	console.log("=".repeat(60));

	const [response] = await analyticsDataClient.runReport(request);

	if (!response.rows?.length) {
		console.log("(no data)");
		return;
	}

	const dimensionHeaders = response.dimensionHeaders?.map((h) => h.name) ?? [];
	const metricHeaders = response.metricHeaders?.map((h) => h.name) ?? [];
	const headers = [...dimensionHeaders, ...metricHeaders];

	// Print as markdown table
	console.log("| " + headers.join(" | ") + " |");
	console.log("| " + headers.map(() => "---").join(" | ") + " |");

	for (const row of response.rows) {
		const dims = row.dimensionValues?.map((v) => v.value ?? "") ?? [];
		const metrics = row.metricValues?.map((v) => v.value ?? "") ?? [];
		console.log("| " + [...dims, ...metrics].join(" | ") + " |");
	}
}

async function main() {
	console.log(`\nGA4 Report — Property ${propertyId}`);
	console.log(`Date range: ${dateRange.startDate} to ${dateRange.endDate}`);

	try {
		// 1. Top pages by views
		await runReport("Top 20 pages by page views", {
			property,
			dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
			dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
			metrics: [
				{ name: "screenPageViews" },
				{ name: "sessions" },
				{ name: "engagementRate" },
			],
			limit: 20,
			orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
		});

		// 2. Traffic by channel
		await runReport("Traffic by channel (session default channel group)", {
			property,
			dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
			dimensions: [{ name: "sessionDefaultChannelGroup" }],
			metrics: [
				{ name: "sessions" },
				{ name: "activeUsers" },
				{ name: "screenPageViews" },
				{ name: "engagementRate" },
			],
			orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
		});

		// 3. Top events (includes conversions)
		await runReport("Top 20 events", {
			property,
			dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
			dimensions: [{ name: "eventName" }],
			metrics: [{ name: "eventCount" }],
			limit: 20,
			orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
		});

		// 4. Overview totals
		await runReport("Overview (last 30 days)", {
			property,
			dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
			metrics: [
				{ name: "activeUsers" },
				{ name: "sessions" },
				{ name: "screenPageViews" },
				{ name: "engagementRate" },
				{ name: "conversions" },
			],
		});

		// 5. Conversions by landing page (which pages drive purchases?)
		await runReport("Conversions by landing page", {
			property,
			dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
			dimensions: [{ name: "landingPage" }],
			metrics: [
				{ name: "sessions" },
				{ name: "conversions" },
				{ name: "engagementRate" },
			],
			limit: 15,
			orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
		});

		console.log("\n");
	} catch (err) {
		console.error("Error:", err);
		process.exit(1);
	}
}

main();
