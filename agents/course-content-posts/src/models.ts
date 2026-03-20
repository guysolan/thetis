import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gemini = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function callOpenAI(
  prompt: string,
  options?: { imagePath?: string; model?: string },
): Promise<string> {
  const model = options?.model || "gpt-4o";
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "user", content: [] as OpenAI.Chat.ChatCompletionContentPart[] },
  ];

  if (options?.imagePath) {
    try {
      const imageBuffer = readFileSync(options.imagePath);
      const base64 = imageBuffer.toString("base64");
      const ext = options.imagePath.split(".").pop()?.toLowerCase();
      const mime =
        ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
      (messages[0].content as OpenAI.Chat.ChatCompletionContentPart[]).push(
        {
          type: "image_url",
          image_url: { url: `data:${mime};base64,${base64}` },
        },
        { type: "text", text: prompt },
      );
    } catch {
      (messages[0].content as OpenAI.Chat.ChatCompletionContentPart[]).push({
        type: "text",
        text: prompt,
      });
    }
  } else {
    (messages[0].content as OpenAI.Chat.ChatCompletionContentPart[]).push({
      type: "text",
      text: prompt,
    });
  }

  const res = await openai.chat.completions.create({
    model,
    messages,
    max_tokens: 4096,
  });
  return res.choices[0]?.message?.content?.trim() || "";
}

export async function callGemini(
  prompt: string,
  options?: { imagePath?: string },
): Promise<string> {
  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
  const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

  if (options?.imagePath) {
    try {
      const imageBuffer = readFileSync(options.imagePath);
      const base64 = imageBuffer.toString("base64");
      const ext = options.imagePath.split(".").pop()?.toLowerCase();
      const mime = ext === "png" ? "image/png" : "image/jpeg";
      parts.push({ inlineData: { mimeType: mime, data: base64 } });
    } catch {
      // fall through
    }
  }
  parts.push({ text: prompt });

  const result = await model.generateContent(parts);
  const response = result.response;
  return response.text()?.trim() || "";
}

export async function callAnthropic(
  prompt: string,
  options?: { imagePath?: string },
): Promise<string> {
  const message: Anthropic.MessageCreateParams = {
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    messages: [{ role: "user", content: [] as Anthropic.MessageParam["content"] }],
  };

  if (options?.imagePath) {
    try {
      const imageBuffer = readFileSync(options.imagePath);
      const base64 = imageBuffer.toString("base64");
      const ext = options.imagePath.split(".").pop()?.toLowerCase();
      const mime = ext === "png" ? "image/png" : "image/jpeg";
      (message.messages[0].content as Anthropic.ContentBlockParam[]).push(
        {
          type: "image",
          source: { type: "base64", media_type: mime as "image/png" | "image/jpeg", data: base64 },
        },
        { type: "text", text: prompt },
      );
    } catch {
      (message.messages[0].content as Anthropic.ContentBlockParam[]).push({
        type: "text",
        text: prompt,
      });
    }
  } else {
    (message.messages[0].content as Anthropic.ContentBlockParam[]).push({
      type: "text",
      text: prompt,
    });
  }

  const res = await anthropic.messages.create(message);
  const textBlock = res.content.find((b) => b.type === "text");
  return textBlock && "text" in textBlock ? textBlock.text.trim() : "";
}
