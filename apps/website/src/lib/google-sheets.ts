import type { SplintData } from "../types/splint";

// Mock data based on actual Google Sheets structure
const getMockSplintData = (region: "us" | "uk"): SplintData[] => {
    const price = region === "us" ? "89.99 USD" : "56.99 GBP";

    console.log(`getMockSplintData called with region: ${region}`);
    console.log(`Setting price to: ${price}`);

    return [
        {
            id: "TM-ATRNS-LR",
            title:
                "Achilles Tendon RUPTURE Night Splint, ONLY for COMPLETE Achilles tear - BEFORE PURCHASE: 1. Select SIZE & SIDE 2. Check with MEDICAL PROFESSIONAL (Large, Right)",
            description:
                "WHAT IT TREATS: Specifically designed for Achilles tendon rupture (complete tear). Holds the foot plantarflexed at 155 degrees for optimal healing. NOT suitable for Achilles Tendinitis, Achilles Tendinopathy, Plantar Fasciitis, or broken bones. \n\nWHY YOU NEED IT: Provides a more comfortable recovery from a torn Achilles tendon. Allows you to rest safely without your orthopaedic boot while keeping your foot in the necessary plantarflexed (tip-toes) position for healing, day and night.\n\nWHEN TO USE: Use instead of your orthopaedic boot only when resting (sitting or lying down). Not for walking or standing without crutches. If you had surgery, wait two weeks for wound healing and consult your surgeon before use.\n\nKEY FEATURES: Non-slip elastic straps with silicone for comfort and security. Secure booster strap around the ankle with zero-flex webbing prevents upward foot bending (dorsiflexion). Innovative elastic heel strap ensures security without touching the injured Achilles.\n\nUNIQUE DESIGN: Patented, lightweight, purpose-made device designed and manufactured in the UK by Achilles splint specialists, Thetis Medical. Developed with specialist Consultant Orthopaedic Foot and Ankle Surgeons. Clinician approved. The only dedicated lightweight splint for resting during Achilles rupture recovery.",
            availability: "in_stock",
            "availability date": "",
            "expiration date": "",
            link: "https://www.thetismedical.com/splint",
            "mobile link": "",
            "image link":
                "https://www.thetismedical.com/images/night_splint_bed_top_square.jpg",
            price: price,
            "sale price": "",
            "sale price effective date": "",
            "identifier exists": "yes",
            gtin: "5065005394009",
            mpn: "TM-ATRNS-LR",
            brand: "Thetis Medical",
            "product highlight":
                "Achilles rupture splint. Sleep without orthopedic boot. Comfortable Achilles tear recovery.",
            "product detail": "",
            "additional image link": "",
            condition: "new",
            adult: "no",
            color: "Green",
            size: "Large",
            "size type": "",
            "size system": "",
            gender: "unisex",
            material: "",
            pattern: "",
            "age group": "adult",
            multipack: "",
            "is bundle": "",
            "unit pricing measure": "",
            "unit pricing base measure": "",
            "energy efficiency class": "",
            "min energy efficiency class": "",
            "item group id": "TM-ATRNS",
            "sell on google quantity": "1000",
        },
        {
            id: "TM-ATRNS-LL",
            title:
                "Achilles Tendon RUPTURE Night Splint, ONLY for COMPLETE Achilles tear - BEFORE PURCHASE: 1. Select SIZE & SIDE 2. Check with MEDICAL PROFESSIONAL (Large, Left)",
            description:
                "WHAT IT TREATS: Specifically designed for Achilles tendon rupture (complete tear). Holds the foot plantarflexed at 155 degrees for optimal healing. NOT suitable for Achilles Tendinitis, Achilles Tendinopathy, Plantar Fasciitis, or broken bones. \n\nWHY YOU NEED IT: Provides a more comfortable recovery from a torn Achilles tendon. Allows you to rest safely without your orthopaedic boot while keeping your foot in the necessary plantarflexed (tip-toes) position for healing, day and night.\n\nWHEN TO USE: Use instead of your orthopaedic boot only when resting (sitting or lying down). Not for walking or standing without crutches. If you had surgery, wait two weeks for wound healing and consult your surgeon before use.\n\nKEY FEATURES: Non-slip elastic straps with silicone for comfort and security. Secure booster strap around the ankle with zero-flex webbing prevents upward foot bending (dorsiflexion). Innovative elastic heel strap ensures security without touching the injured Achilles.\n\nUNIQUE DESIGN: Patented, lightweight, purpose-made device designed and manufactured in the UK by Achilles splint specialists, Thetis Medical. Developed with specialist Consultant Orthopaedic Foot and Ankle Surgeons. Clinician approved. The only dedicated lightweight splint for resting during Achilles rupture recovery.",
            availability: "in_stock",
            "availability date": "",
            "expiration date": "",
            link: "https://www.thetismedical.com/splint",
            "mobile link": "",
            "image link":
                "https://www.thetismedical.com/images/night_splint_bed_top_square.jpg",
            price: price,
            "sale price": "",
            "sale price effective date": "",
            "identifier exists": "yes",
            gtin: "5065005394016",
            mpn: "TM-ATRNS-LL",
            brand: "Thetis Medical",
            "product highlight":
                "Achilles rupture splint. Sleep without orthopedic boot. Comfortable Achilles tear recovery.",
            "product detail": "",
            "additional image link": "",
            condition: "new",
            adult: "no",
            color: "Green",
            size: "Large",
            "size type": "",
            "size system": "",
            gender: "unisex",
            material: "",
            pattern: "",
            "age group": "adult",
            multipack: "",
            "is bundle": "",
            "unit pricing measure": "",
            "unit pricing base measure": "",
            "energy efficiency class": "",
            "min energy efficiency class": "",
            "item group id": "TM-ATRNS",
            "sell on google quantity": "1000",
        },
        {
            id: "TM-ATRNS-SR",
            title:
                "Achilles Tendon RUPTURE Night Splint, ONLY for COMPLETE Achilles tear - BEFORE PURCHASE: 1. Select SIZE & SIDE 2. Check with MEDICAL PROFESSIONAL (Small, Right)",
            description:
                "WHAT IT TREATS: Specifically designed for Achilles tendon rupture (complete tear). Holds the foot plantarflexed at 155 degrees for optimal healing. NOT suitable for Achilles Tendinitis, Achilles Tendinopathy, Plantar Fasciitis, or broken bones. \n\nWHY YOU NEED IT: Provides a more comfortable recovery from a torn Achilles tendon. Allows you to rest safely without your orthopaedic boot while keeping your foot in the necessary plantarflexed (tip-toes) position for healing, day and night.\n\nWHEN TO USE: Use instead of your orthopaedic boot only when resting (sitting or lying down). Not for walking or standing without crutches. If you had surgery, wait two weeks for wound healing and consult your surgeon before use.\n\nKEY FEATURES: Non-slip elastic straps with silicone for comfort and security. Secure booster strap around the ankle with zero-flex webbing prevents upward foot bending (dorsiflexion). Innovative elastic heel strap ensures security without touching the injured Achilles.\n\nUNIQUE DESIGN: Patented, lightweight, purpose-made device designed and manufactured in the UK by Achilles splint specialists, Thetis Medical. Developed with specialist Consultant Orthopaedic Foot and Ankle Surgeons. Clinician approved. The only dedicated lightweight splint for resting during Achilles rupture recovery.",
            availability: "in_stock",
            "availability date": "",
            "expiration date": "",
            link: "https://www.thetismedical.com/splint",
            "mobile link": "",
            "image link":
                "https://www.thetismedical.com/images/night_splint_bed_top_square.jpg",
            price: price,
            "sale price": "",
            "sale price effective date": "",
            "identifier exists": "yes",
            gtin: "5065005394023",
            mpn: "TM-ATRNS-SR",
            brand: "Thetis Medical",
            "product highlight":
                "Achilles rupture splint. Sleep without orthopedic boot. Comfortable Achilles tear recovery.",
            "product detail": "",
            "additional image link": "",
            condition: "new",
            adult: "no",
            color: "Green",
            size: "Small",
            "size type": "",
            "size system": "",
            gender: "unisex",
            material: "",
            pattern: "",
            "age group": "adult",
            multipack: "",
            "is bundle": "",
            "unit pricing measure": "",
            "unit pricing base measure": "",
            "energy efficiency class": "",
            "min energy efficiency class": "",
            "item group id": "TM-ATRNS",
            "sell on google quantity": "1000",
        },
        {
            id: "TM-ATRNS-SL",
            title:
                "Achilles Tendon RUPTURE Night Splint, ONLY for COMPLETE Achilles tear - BEFORE PURCHASE: 1. Select SIZE & SIDE 2. Check with MEDICAL PROFESSIONAL (Small, Left)",
            description:
                "WHAT IT TREATS: Specifically designed for Achilles tendon rupture (complete tear). Holds the foot plantarflexed at 155 degrees for optimal healing. NOT suitable for Achilles Tendinitis, Achilles Tendinopathy, Plantar Fasciitis, or broken bones. \n\nWHY YOU NEED IT: Provides a more comfortable recovery from a torn Achilles tendon. Allows you to rest safely without your orthopaedic boot while keeping your foot in the necessary plantarflexed (tip-toes) position for healing, day and night.\n\nWHEN TO USE: Use instead of your orthopaedic boot only when resting (sitting or lying down). Not for walking or standing without crutches. If you had surgery, wait two weeks for wound healing and consult your surgeon before use.\n\nKEY FEATURES: Non-slip elastic straps with silicone for comfort and security. Secure booster strap around the ankle with zero-flex webbing prevents upward foot bending (dorsiflexion). Innovative elastic heel strap ensures security without touching the injured Achilles.\n\nUNIQUE DESIGN: Patented, lightweight, purpose-made device designed and manufactured in the UK by Achilles splint specialists, Thetis Medical. Developed with specialist Consultant Orthopaedic Foot and Ankle Surgeons. Clinician approved. The only dedicated lightweight splint for resting during Achilles rupture recovery.",
            availability: "in_stock",
            "availability date": "",
            "expiration date": "",
            link: "https://www.thetismedical.com/splint",
            "mobile link": "",
            "image link":
                "https://www.thetismedical.com/images/night_splint_bed_top_square.jpg",
            price: price,
            "sale price": "",
            "sale price effective date": "",
            "identifier exists": "yes",
            gtin: "5065005394030",
            mpn: "TM-ATRNS-SL",
            brand: "Thetis Medical",
            "product highlight":
                "Achilles rupture splint. Sleep without orthopedic boot. Comfortable Achilles tear recovery.",
            "product detail": "",
            "additional image link": "",
            condition: "new",
            adult: "no",
            color: "Green",
            size: "Small",
            "size type": "",
            "size system": "",
            gender: "unisex",
            material: "",
            pattern: "",
            "age group": "adult",
            multipack: "",
            "is bundle": "",
            "unit pricing measure": "",
            "unit pricing base measure": "",
            "energy efficiency class": "",
            "min energy efficiency class": "",
            "item group id": "TM-ATRNS",
            "sell on google quantity": "1000",
        },
    ];
};

export async function getSplintData(
    region: "us" | "uk" = "us",
): Promise<SplintData[]> {
    const sheetId = region === "us"
        ? "1vTazj-qdD5S5VWdjB1epNwQ9Y66RQu-gqZWsdrBb2bY" // US sheet ID
        : "1RmRBaMtftsddPPIbz3mAjBp9RidRlSCZxdSDTwbilTA"; // UK sheet ID

    console.log(`Attempting to fetch data for region: ${region}`);
    console.log(`Sheet ID: ${sheetId}`);

    // Check if required environment variables are set
    const clientEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY;

    console.log(`Client email: ${clientEmail ? "Set" : "Not set"}`);
    console.log(`Private key: ${privateKey ? "Set" : "Not set"}`);

    // If credentials are not configured, return mock data
    if (!clientEmail || !privateKey) {
        console.log(
            "Google Sheets credentials not configured, using mock data",
        );
        return getMockSplintData(region);
    }

    try {
        // Handle private key properly for newer Node.js versions
        let processedPrivateKey = privateKey;
        if (processedPrivateKey) {
            // Remove quotes if present
            processedPrivateKey = processedPrivateKey.replace(
                /^["']|["']$/g,
                "",
            );
            // Replace literal \n with actual newlines
            processedPrivateKey = processedPrivateKey.replace(/\\n/g, "\n");

            // Ensure the private key has the proper format
            if (!processedPrivateKey.includes("-----BEGIN PRIVATE KEY-----")) {
                console.log("Invalid private key format, using mock data");
                return getMockSplintData(region);
            }
        }

        console.log("Setting up Google Auth...");
        const { google } = await import("googleapis");
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: processedPrivateKey,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        console.log("Creating sheets client...");
        const sheets = google.sheets({ version: "v4", auth });

        console.log(`Fetching data from sheet: ${sheetId}`);
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: "A:AI",
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            console.log("No data found in sheet, using mock data");
            return getMockSplintData(region);
        }

        console.log(`Found ${rows.length} rows in sheet`);
        const header = rows[0] as (keyof SplintData)[];
        const data: SplintData[] = rows.slice(1).map((row) => {
            const rowData = {} as SplintData;
            header.forEach((key, index) => {
                rowData[key] = row[index];
            });
            return rowData;
        });

        console.log(`Processed ${data.length} splint records`);
        return data;
    } catch (error) {
        console.error("Error fetching from Google Sheets:", error);
        console.log("Falling back to mock data");
        return getMockSplintData(region);
    }
}
