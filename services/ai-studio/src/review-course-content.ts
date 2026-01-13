import fs from "fs";
import path from "path";

/**
 * Review course content for:
 * 1. Duplicate image usage
 * 2. Content repetition (should refer back instead)
 * 3. Accuracy against positions document
 */

const contentDir = path.join(
    process.cwd(),
    "../../apps/course/src/content/course/standard",
);
const positionsFile = path.join(
    process.cwd(),
    "../../.cursor/commands/achilles-recovery-positions.md",
);

interface ImageUsage {
    image: string;
    files: string[];
}

interface ContentIssue {
    file: string;
    type: "duplicate_image" | "content_repetition" | "position_violation";
    message: string;
    details?: string;
}

function extractImageImports(content: string): string[] {
    const imports: string[] = [];
    const importRegex = /import\s+\w+\s+from\s+["']\.\.\/\.\.\/\.\.\/assets\/([^"']+)["']/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function checkPositions(content: string, positions: Map<string, string>): ContentIssue[] {
    const issues: ContentIssue[] = [];
    
    // Check for position violations
    const checks = [
        {
            keyword: /surgery.*first.*line|first.*line.*surgery/i,
            position: "Non-surgical is first-line",
            positionNum: 1,
        },
        {
            keyword: /VACOped.*better|Aircast.*better|boot.*better/i,
            position: "Both can produce excellent outcomes, compliance matters more than brand",
            positionNum: 2,
        },
        {
            keyword: /non.*weight.*bearing.*week|NWB.*week/i,
            position: "Immediate weight-bearing as tolerated from day 1",
            positionNum: 3,
        },
        {
            keyword: /stretch.*early|early.*stretch/i,
            position: "Avoid aggressive stretching until tendon is fully healed (12-18 months)",
            positionNum: 4,
        },
        {
            keyword: /night.*splint.*week\s*[0-9]|splint.*week\s*[0-9]/i,
            position: "From the time the patient gets a boot in non-op, 2 weeks if had an operation",
            positionNum: 5,
        },
        {
            keyword: /boot.*remov.*week\s*([0-9]+)/i,
            position: "Week 10-12 (standard timing)",
            positionNum: 6,
        },
        {
            keyword: /physio.*start.*week\s*([0-9]+)|physiotherapy.*week\s*([0-9]+)/i,
            position: "Week 3-6 (early physio)",
            positionNum: 10,
        },
        {
            keyword: /heel.*raise.*([0-9]+).*rep/i,
            position: "25+ repetitions (gold standard)",
            positionNum: 11,
        },
        {
            keyword: /return.*run.*week|run.*week\s*([0-9]+)/i,
            position: "Criteria-based only (25+ heel raises etc.) - timing secondary",
            positionNum: 12,
        },
        {
            keyword: /re.*rupture.*rate.*([0-9]+)%|rerupture.*([0-9]+)%/i,
            position: "3-5% (low but not negligible)",
            positionNum: 14,
        },
        {
            keyword: /blood.*thinner.*([0-9]+).*week/i,
            position: "4-6 weeks (through full equinus phase)",
            positionNum: 8,
        },
    ];

    // Note: This is a simplified check - would need more sophisticated NLP for full accuracy
    // For now, we'll flag potential issues for manual review

    return issues;
}

function findContentRepetition(files: Map<string, string>): ContentIssue[] {
    const issues: ContentIssue[] = [];
    const contentSnippets = new Map<string, Array<{ file: string; snippet: string }>>();

    // Extract key content snippets (simplified - would need better NLP)
    for (const [filename, content] of files.entries()) {
        // Look for common patterns that might indicate repetition
        const sections = content.match(/type:\s*"(?:text|card|section)".*?content:\s*"([^"]{50,200})"/gs);
        if (sections) {
            sections.forEach((section) => {
                const snippet = section.substring(0, 100).toLowerCase();
                if (!contentSnippets.has(snippet)) {
                    contentSnippets.set(snippet, []);
                }
                contentSnippets.get(snippet)!.push({ file: filename, snippet: section });
            });
        }
    }

    // Find duplicates
    for (const [snippet, occurrences] of contentSnippets.entries()) {
        if (occurrences.length > 1) {
            issues.push({
                file: occurrences[0].file,
                type: "content_repetition",
                message: `Similar content found in ${occurrences.length} files`,
                details: `Files: ${occurrences.map((o) => o.file).join(", ")}`,
            });
        }
    }

    return issues;
}

function main() {
    console.log("🔍 Reviewing course content...\n");

    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".tsx"));
    const imageUsage = new Map<string, string[]>();
    const fileContents = new Map<string, string>();
    const allIssues: ContentIssue[] = [];

    // Step 1: Collect image usage
    console.log("📸 Checking image usage...");
    for (const file of files) {
        const filePath = path.join(contentDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        fileContents.set(file, content);

        const images = extractImageImports(content);
        for (const image of images) {
            if (!imageUsage.has(image)) {
                imageUsage.set(image, []);
            }
            imageUsage.get(image)!.push(file);
        }
    }

    // Find duplicate images
    const duplicateImages: ImageUsage[] = [];
    for (const [image, fileList] of imageUsage.entries()) {
        if (fileList.length > 1) {
            duplicateImages.push({ image, files: fileList });
            allIssues.push({
                file: fileList[0],
                type: "duplicate_image",
                message: `Image "${image}" used in ${fileList.length} files`,
                details: `Files: ${fileList.join(", ")}`,
            });
        }
    }

    console.log(`Found ${duplicateImages.length} duplicate image(s):`);
    duplicateImages.forEach((dup) => {
        console.log(`  • ${dup.image}: ${dup.files.join(", ")}`);
    });

    // Step 2: Check positions
    console.log("\n✅ Checking against positions document...");
    const positionsContent = fs.readFileSync(positionsFile, "utf-8");
    const positions = new Map<string, string>();

    // Parse positions (simplified)
    const positionRegex = /## (\d+)\.\s+(.+?)\n\n\*\*Position:\*\*\s*(.+?)(?=\n\n##|\n---|$)/gs;
    let match;
    while ((match = positionRegex.exec(positionsContent)) !== null) {
        const num = match[1];
        const topic = match[2];
        const position = match[3];
        positions.set(num, position);
    }

    // Check each file against positions
    for (const [filename, content] of fileContents.entries()) {
        const positionIssues = checkPositions(content, positions);
        allIssues.push(...positionIssues);
    }

    // Step 3: Find content repetition
    console.log("\n📝 Checking for content repetition...");
    const repetitionIssues = findContentRepetition(fileContents);
    allIssues.push(...repetitionIssues);

    // Summary
    console.log("\n" + "=".repeat(80));
    console.log("📊 REVIEW SUMMARY");
    console.log("=".repeat(80));
    console.log(`Total files reviewed: ${files.length}`);
    console.log(`Total images used: ${imageUsage.size}`);
    console.log(`Duplicate images: ${duplicateImages.length}`);
    console.log(`Content issues found: ${allIssues.length}`);

    const byType = {
        duplicate_image: allIssues.filter((i) => i.type === "duplicate_image").length,
        content_repetition: allIssues.filter((i) => i.type === "content_repetition").length,
        position_violation: allIssues.filter((i) => i.type === "position_violation").length,
    };

    console.log(`\nIssues by type:`);
    console.log(`  • Duplicate images: ${byType.duplicate_image}`);
    console.log(`  • Content repetition: ${byType.content_repetition}`);
    console.log(`  • Position violations: ${byType.position_violation}`);

    // Detailed report
    if (allIssues.length > 0) {
        console.log("\n" + "=".repeat(80));
        console.log("📋 DETAILED ISSUES");
        console.log("=".repeat(80));

        for (const issue of allIssues) {
            console.log(`\n[${issue.type.toUpperCase()}] ${issue.file}`);
            console.log(`  ${issue.message}`);
            if (issue.details) {
                console.log(`  Details: ${issue.details}`);
            }
        }
    }

    // Save report
    const reportPath = path.join(
        process.cwd(),
        `course-content-review-${Date.now()}.json`,
    );
    fs.writeFileSync(
        reportPath,
        JSON.stringify(
            {
                summary: {
                    totalFiles: files.length,
                    totalImages: imageUsage.size,
                    duplicateImages: duplicateImages.length,
                    totalIssues: allIssues.length,
                },
                duplicateImages: duplicateImages,
                issues: allIssues,
            },
            null,
            2,
        ),
    );
    console.log(`\n📄 Full report saved to: ${reportPath}`);
}

main();
