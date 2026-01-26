import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Load environment variables from .env file in the services/ai-studio directory
 */
export function loadEnv(): void {
    // Get the directory of the current file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    // Path to .env file in services/ai-studio directory
    const envPath = join(__dirname, "..", ".env");
    
    try {
        const envContent = readFileSync(envPath, "utf-8");
        const lines = envContent.split("\n");
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // Skip empty lines and comments
            if (!trimmedLine || trimmedLine.startsWith("#")) {
                continue;
            }
            
            // Parse KEY=VALUE format
            const match = trimmedLine.match(/^([^=]+)=(.*)$/);
            if (match) {
                const [, key, value] = match;
                // Remove quotes if present
                const cleanValue = value.replace(/^["']|["']$/g, "");
                
                // Only set if not already set (allows override from system env)
                if (!process.env[key]) {
                    process.env[key] = cleanValue;
                }
            }
        }
    } catch (error: any) {
        // .env file doesn't exist or can't be read - that's okay, use system env vars
        if (error.code !== "ENOENT") {
            console.warn(`Warning: Could not load .env file: ${error.message}`);
        }
    }
}
