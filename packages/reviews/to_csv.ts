#!/usr/bin/env -S deno run --allow-read --allow-write

// Import acorn from esm.sh
import * as acorn from "https://esm.sh/acorn@8.11.3";

/**
 * Script to robustly convert patients.ts review data to CSV format using AST parsing
 */

function stripTypeAnnotation(ts: string): string {
    // Remove the type annotation from the export
    let js = ts.replace(
        /export const patients: Review\[\] = /,
        "const patients = ",
    );
    // Remove all import and export type lines
    js = js.split("\n").filter((line) =>
        !line.trim().startsWith("import") &&
        !line.trim().startsWith("export type")
    ).join("\n");
    return js;
}

function extractReviewsFromAST(ast: any): any[] {
    // Find the VariableDeclaration for 'patients'
    for (const node of ast.body) {
        if (
            node.type === "VariableDeclaration" &&
            node.declarations[0].id.name === "patients"
        ) {
            // The array expression is the init of the declaration
            const arr = node.declarations[0].init;
            if (arr.type === "ArrayExpression") {
                // Each element is an ObjectExpression
                return arr.elements
                    .filter((el: any) => el && el.type === "ObjectExpression")
                    .map((el: any) => {
                        const obj: any = {};
                        for (const prop of el.properties) {
                            if (prop.type === "Property") {
                                const key = prop.key.name || prop.key.value;
                                let value = prop.value;
                                if (value.type === "Literal") {
                                    obj[key] = value.value;
                                } else if (value.type === "TemplateLiteral") {
                                    obj[key] = value.quasis.map((q: any) =>
                                        q.value.cooked
                                    ).join("");
                                } else if (value.type === "ArrayExpression") {
                                    obj[key] = value.elements.map((e: any) =>
                                        e.value
                                    );
                                } else if (value.type === "ObjectExpression") {
                                    obj[key] = {};
                                    for (const subprop of value.properties) {
                                        if (subprop.type === "Property") {
                                            const subkey = subprop.key.name ||
                                                subprop.key.value;
                                            obj[key][subkey] =
                                                subprop.value.value;
                                        }
                                    }
                                } else if (value.type === "Identifier") {
                                    obj[key] = value.name;
                                } else {
                                    // fallback: try to JSON.stringify
                                    try {
                                        obj[key] = JSON.stringify(value);
                                    } catch {
                                        obj[key] = "";
                                    }
                                }
                            }
                        }
                        return obj;
                    });
            }
        }
    }
    return [];
}

function convertToCSVFormat(reviews: any[]): string {
    const fieldnames = [
        "Product ID",
        "Customer ID",
        "Heading",
        "Body",
        "Rating",
        "Customer Name",
        "Customer Location",
        "Customer Avatar",
        "Created At",
        "Updated At",
        "Store Reply",
        "Store Replied At",
        "Customer Media 1",
        "Customer Media 2",
    ];

    const lines = [fieldnames.join(",")];

    reviews.forEach((review, i) => {
        const customerId = `patient_${String(i + 1).padStart(6, "0")}`;
        const rating = review.stars || "5";
        let dateStr = review.date;
        if (dateStr && !dateStr.endsWith("T00:00:00.000Z")) {
            dateStr = `${dateStr}T00:00:00.000Z`;
        }

        const row = [
            "", // Product ID
            customerId,
            review.title || "",
            review.body || "",
            rating,
            review.name || "",
            "", // Customer Location
            "", // Customer Avatar
            dateStr || "",
            dateStr || "",
            "", // Store Reply
            "", // Store Replied At
            "", // Customer Media 1
            "", // Customer Media 2
        ].map((val) => {
            const v = String(val);
            return v.includes(",") || v.includes("\n")
                ? `"${v.replace(/"/g, '""')}"`
                : v;
        });

        lines.push(row.join(","));
    });

    return lines.join("\n");
}

async function main() {
    const patientsTsPath = new URL(
        "../../apps/website/src/components/reviews/content/patients.ts",
        import.meta.url,
    );
    const csvOutputPath = new URL("./customer_reviews.csv", import.meta.url);

    console.log(`Reading patients data from: ${patientsTsPath.pathname}`);

    const content = await Deno.readTextFile(patientsTsPath.pathname);
    const jsContent = stripTypeAnnotation(content);

    // Parse with acorn
    const ast = acorn.parse(jsContent, {
        ecmaVersion: 2020,
        sourceType: "module",
    });
    const reviews = extractReviewsFromAST(ast);

    console.log(`Found ${reviews.length} reviews`);

    const csv = convertToCSVFormat(reviews);
    await Deno.writeTextFile(csvOutputPath.pathname, csv);

    console.log(`Wrote ${reviews.length} reviews to ${csvOutputPath.pathname}`);
}

if (import.meta.main) main();
