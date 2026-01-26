import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        console.error("No API key");
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        .listModels();
    // Wait, listModels is not on the model instance, it's on the client or something?
    // Actually in the SDK it might be different.
}
