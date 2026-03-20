import { readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadEnv(): void {
	const envPath = join(__dirname, "..", ".env");
	try {
		const content = readFileSync(envPath, "utf-8");
		for (const line of content.split("\n")) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith("#")) continue;
			const match = trimmed.match(/^([^=]+)=(.*)$/);
			if (match) {
				const [, key, value] = match;
				const clean = value.replace(/^["']|["']$/g, "").trim();
				if (!process.env[key]) process.env[key] = clean;
			}
		}
	} catch {
		// Use system env
	}
}

export function resolveCredentialsPath(relativePath: string): string {
	const analyticsDir = join(__dirname, "..");
	return resolve(analyticsDir, relativePath.replace(/^\.\//, ""));
}
