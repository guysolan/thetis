import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Check which models are available for vision analysis
 */

async function checkModels() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error("GOOGLE_GENERATIVE_AI_API_KEY not set");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Try to list models using the REST API directly
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
        );
        const data = await response.json();

        if (data.models) {
            console.log("Available models:");
            data.models.forEach((model: any) => {
                console.log(`- ${model.name}`);
                if (model.supportedGenerationMethods) {
                    console.log(
                        `  Methods: ${
                            model.supportedGenerationMethods.join(", ")
                        }`,
                    );
                }
            });
        } else {
            console.log("Response:", JSON.stringify(data, null, 2));
        }
    } catch (error: any) {
        console.error("Error listing models:", error.message);
    }

    // Also try some common model names
    const modelsToTry = [
        "models/gemini-1.5-flash",
        "models/gemini-1.5-pro",
        "models/gemini-1.5-flash-latest",
        "models/gemini-1.5-pro-latest",
        "models/gemini-2.0-flash-exp",
        "models/gemini-pro-vision",
        "gemini-1.5-flash",
        "gemini-1.5-pro",
    ];

    console.log("\nTesting model availability:");
    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            // Just test if we can create the model instance
            console.log(`✓ ${modelName} - model instance created`);
        } catch (error: any) {
            console.log(`✗ ${modelName} - ${error.message.split("\n")[0]}`);
        }
    }
}

checkModels().catch(console.error);
