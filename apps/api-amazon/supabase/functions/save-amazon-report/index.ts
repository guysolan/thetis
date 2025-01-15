import { serve } from "http/server.ts";

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "../_shared/cors.ts";

import { getAmazonReportById } from "../_shared/amazon/reports/index.ts";

import { doppio } from "../_shared/doppio/index.ts";
import {
    uploadFileContent,
    uploadFileFromUrl,
} from "../_shared/supabase/storage.ts";
import { supabase } from "../_shared/supabase/config.ts";
import { marketplaces } from "../_shared/amazon/marketplace-ids.ts";

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }
    try {
        const body = await req.json();

        const { report, region, country } = body;

        const { csvData, summary } = await getAmazonReportById(
            { region: region, reportId: report.report_document_id },
        );

        const reportId = report.reportId;
        const marketplaceName = summary.marketplace_name;

        console.log(marketplaceName);

        const date = summary.deposit_date.split("T")[0];

        const location = marketplaces.find(
            (m) => m.name.toLowerCase() === marketplaceName.toLowerCase(),
        )?.country;

        console.log(location);

        // You might need to validate or process the request here
        const pdf = await doppio(
            `https://tax.thetismedical.com/settlements/report/summary?report=${
                encodeURIComponent(JSON.stringify(report))
            }`,
        );

        const fileName = `${location}/${date} (${reportId})`;

        // Upload PDF to Supabase Storage
        const savedPdf = await uploadFileFromUrl(
            pdf.documentUrl,
            "amazon-reports",
            `${fileName}.pdf`,
            "application/pdf",
        );

        const savedCsv = await uploadFileContent(
            "amazon-reports",
            `${fileName}.csv`,
            csvData,
            "application/csv",
        );

        console.log(summary);

        const { data: dbData, error: dbError } = await supabase.from(
            "amazon_reports",
        )
            .insert({
                report_id: report.report_id,
                storage_path: fileName,
                settlement_id: summary.settlement_id,
                region: summary.region,
                country: summary.country,
                marketplace_name: summary.marketplace_name,
                currency: summary.currency,
                settlement_start_date: summary.settlement_start_date,
                settlement_end_date: summary.settlement_end_date,
                deposit_date: summary.deposit_date,
                net_proceeds: summary.net_proceeds,
                beginning_balance: summary.beginning_balance,
                account_reserve_level: summary.account_reserve_level,
                sales_total: summary.sales.total,
                sales_product_charges: summary.sales.product_charges,
                sales_tax: summary.sales.tax,
                sales_shipping: summary.sales.shipping,
                sales_inventory_reimbursements:
                    summary.sales.inventory_reimbursements,
                sales_other: summary.sales.other,
                refunds_total: summary.refunds.total,
                refunds_refunded_sales: summary.refunds.refunded_sales,
                refunds_refunded_expenses: summary.refunds.refunded_expenses,
                expenses_total: summary.expenses.total,
                expenses_fba_fees: summary.expenses.fba_fees,
                expenses_amazon_fees: summary.expenses.amazon_fees,
                expenses_promo_rebates: summary.expenses.promo_rebates,
                expenses_cost_of_advertising:
                    summary.expenses.cost_of_advertising,
            })
            .select()
            .single();
        if (dbError) throw dbError;

        return new Response(
            JSON.stringify({ pdf: savedPdf, csv: savedCsv.path, db: dbData }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
                status: 200,
            },
        );
    } catch (e) {
        console.error("Error processing request:", e);
        return new Response(
            JSON.stringify({
                error: "Error processing request",
                details: e instanceof Error ? e.message : String(e),
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
});
