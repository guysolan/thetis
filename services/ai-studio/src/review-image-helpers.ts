import OpenAI from "openai";
import fs from "fs";
import path from "path";

export interface ReviewResult {
    imagePath: string;
    overallScore: number;
    accuracy: {
        score: number;
        feedback: string;
        issues: string[];
    };
    style: {
        score: number;
        feedback: string;
        consistency: string[];
    };
    patientFriendliness: {
        score: number;
        feedback: string;
        strengths: string[];
        improvements: string[];
    };
    recommendations: string[];
}

export async function reviewImage(
    openai: OpenAI,
    imagePath: string,
    context?: string,
): Promise<ReviewResult> {
    if (!fs.existsSync(imagePath)) {
        throw new Error(`Image not found: ${imagePath}`);
    }

    // Read image as base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");
    const mimeType = path.extname(imagePath).toLowerCase() === ".png"
        ? "image/png"
        : path.extname(imagePath).toLowerCase() === ".jpg" ||
                path.extname(imagePath).toLowerCase() === ".jpeg"
        ? "image/jpeg"
        : path.extname(imagePath).toLowerCase() === ".webp"
        ? "image/webp"
        : "image/png";

    // Build the review prompt
    const systemPrompt =
        `You are a CRITICAL expert medical educator and visual content reviewer specializing in patient education materials for Achilles tendon rupture recovery. Your role is to provide HONEST, DETAILED, and CONSTRUCTIVE feedback. Be thorough and critical - find issues, not just praise.

**IMPORTANT: Use the full scoring range (0-10). Most images should score 5-7, not 9-10. Only award 9-10 for truly exceptional images with zero issues. Be critical and specific.**

Review the image according to these criteria:

1. **Medical/Anatomical Accuracy** (0-10):
   - Is the anatomy correct? Look for errors in bone structure, muscle positioning, joint angles
   - Are exercise positions/postures accurate? Check for proper form, alignment, and technique
   - Are medical devices (boots, splints) shown correctly? Verify correct positioning, straps, angles
   - Are there any safety concerns or incorrect techniques that could mislead patients?
   - Does it match what's described in the course content exactly?
   - **Scoring guide:** 0-3 = Major errors, 4-6 = Minor issues or unclear, 7-8 = Mostly correct but has issues, 9-10 = Perfect accuracy

2. **Stylistic Consistency** (0-10):
   - Does it match the expected style for patient education? Is it too clinical or too casual?
   - Is it consistent with other course materials? Check colors, illustration style, character appearance
   - Is the visual style appropriate? Not too intimidating, not too cartoonish
   - Are colors, lighting, and composition professional and clear?
   - Are labels, arrows, and annotations clear and consistent?
   - **Scoring guide:** 0-3 = Major style issues, 4-6 = Inconsistent or unclear style, 7-8 = Mostly consistent but has issues, 9-10 = Perfect consistency

3. **Patient-Friendliness** (0-10):
   - Is the image clear and easy to understand? Could a patient follow this?
   - Would a patient find this helpful and reassuring? Or confusing/intimidating?
   - Is it free of unnecessary medical jargon in visuals? Are labels patient-friendly?
   - Does it show proper form/technique clearly? Can patients replicate this?
   - Is it encouraging and not intimidating? Appropriate tone?
   - Are key points highlighted? Is important information easy to find?
   - **Scoring guide:** 0-3 = Very confusing/intimidating, 4-6 = Somewhat unclear, 7-8 = Mostly clear but could improve, 9-10 = Perfectly clear and helpful

**CRITICAL INSTRUCTIONS:**
- Be SPECIFIC about issues - don't just say "good" or "needs improvement"
- Find AT LEAST 2-3 specific issues or areas for improvement for each image
- Compare against the course content context - does it match exactly?
- Look for inconsistencies, errors, unclear elements, or confusing aspects
- Provide actionable recommendations that would actually improve the image
- Use the full scoring range - don't default to high scores

Provide your review in JSON format with this structure:
{
  "overallScore": <number 0-10>,
  "accuracy": {
    "score": <number 0-10>,
    "feedback": "<detailed feedback>",
    "issues": ["<issue1>", "<issue2>"]
  },
  "style": {
    "score": <number 0-10>,
    "feedback": "<detailed feedback>",
    "consistency": ["<consistency note1>", "<consistency note2>"]
  },
  "patientFriendliness": {
    "score": <number 0-10>,
    "feedback": "<detailed feedback>",
    "strengths": ["<strength1>", "<strength2>"],
    "improvements": ["<improvement1>", "<improvement2>"]
  },
  "recommendations": ["<recommendation1>", "<recommendation2>"]
}`;

    const userPrompt =
        `Please review this image CRITICALLY for an Achilles tendon rupture recovery course.

${
            context
                ? `\n**Context from course content:**\n${context}\n\n**IMPORTANT:** Compare the image against this content. Does it match exactly? Are there discrepancies?`
                : ""
        }

**Review Focus - Be Critical:**
- **Content Match:** Does the image match the course content description EXACTLY? If content mentions "both X and Y" but image only shows X, that's a critical issue. Check for:
  - Missing boot types or mechanisms mentioned in content
  - Incomplete representations of concepts described
  - Contradictions between image and text
- **Accuracy:** Are there any discrepancies, errors, or missing elements? Wrong angles, incorrect anatomy, safety issues?
- **Clarity:** Is EVERYTHING clear? Are labels readable? Are arrows pointing correctly? Could a patient misunderstand anything?
- **Completeness:** If content describes multiple options/variations, does the image show them all or explain why only one is shown?
- **Issues:** Find SPECIFIC problems - wrong angles, unclear labels, confusing layout, missing information, style inconsistencies
- **Patient perspective:** Would a patient find this confusing? What questions might they have? What's unclear? If they have a different boot type than shown, would they be confused?
- **Improvements:** What SPECIFIC changes would make this better? Be detailed and actionable.

**Remember:** Most images have issues. Find them. Be thorough. Use the full scoring range. Provide detailed, specific feedback.

Return ONLY valid JSON, no additional text.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: userPrompt,
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${mimeType};base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            response_format: { type: "json_object" },
            temperature: 0.7, // Higher temperature for more varied, critical reviews
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No response from OpenAI");
        }

        const review = JSON.parse(content) as ReviewResult;
        review.imagePath = imagePath;

        return review;
    } catch (error: any) {
        console.error("\x1b[31mError during review:\x1b[0m", error.message);
        throw error;
    }
}

export function formatReview(review: ReviewResult): string {
    const lines: string[] = [];

    lines.push("\n" + "=".repeat(80));
    lines.push(
        `\x1b[1mIMAGE REVIEW: ${path.basename(review.imagePath)}\x1b[0m`,
    );
    lines.push("=".repeat(80));

    // Overall Score
    const overallColor = review.overallScore >= 8
        ? "\x1b[32m"
        : review.overallScore >= 6
        ? "\x1b[33m"
        : "\x1b[31m";
    lines.push(
        `\n\x1b[1mOverall Score:\x1b[0m ${overallColor}${review.overallScore}/10\x1b[0m`,
    );

    // Accuracy
    lines.push("\n" + "-".repeat(80));
    lines.push(
        `\x1b[1mMedical/Anatomical Accuracy:\x1b[0m ${review.accuracy.score}/10`,
    );
    lines.push(`\x1b[90m${review.accuracy.feedback}\x1b[0m`);
    if (review.accuracy.issues.length > 0) {
        lines.push("\n\x1b[31mIssues Found:\x1b[0m");
        review.accuracy.issues.forEach((issue) => {
            lines.push(`  • ${issue}`);
        });
    }

    // Style
    lines.push("\n" + "-".repeat(80));
    lines.push(`\x1b[1mStylistic Consistency:\x1b[0m ${review.style.score}/10`);
    lines.push(`\x1b[90m${review.style.feedback}\x1b[0m`);
    if (review.style.consistency.length > 0) {
        lines.push("\n\x1b[36mConsistency Notes:\x1b[0m");
        review.style.consistency.forEach((note) => {
            lines.push(`  • ${note}`);
        });
    }

    // Patient Friendliness
    lines.push("\n" + "-".repeat(80));
    lines.push(
        `\x1b[1mPatient-Friendliness:\x1b[0m ${review.patientFriendliness.score}/10`,
    );
    lines.push(`\x1b[90m${review.patientFriendliness.feedback}\x1b[0m`);
    if (review.patientFriendliness.strengths.length > 0) {
        lines.push("\n\x1b[32mStrengths:\x1b[0m");
        review.patientFriendliness.strengths.forEach((strength) => {
            lines.push(`  • ${strength}`);
        });
    }
    if (review.patientFriendliness.improvements.length > 0) {
        lines.push("\n\x1b[33mAreas for Improvement:\x1b[0m");
        review.patientFriendliness.improvements.forEach((improvement) => {
            lines.push(`  • ${improvement}`);
        });
    }

    // Recommendations
    if (review.recommendations.length > 0) {
        lines.push("\n" + "-".repeat(80));
        lines.push("\x1b[1mRecommendations:\x1b[0m");
        review.recommendations.forEach((rec, i) => {
            lines.push(`  ${i + 1}. ${rec}`);
        });
    }

    lines.push("\n" + "=".repeat(80) + "\n");

    return lines.join("\n");
}
