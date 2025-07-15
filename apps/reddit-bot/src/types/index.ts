import { z } from 'zod';

// Reddit Account Schema
export const RedditAccountSchema = z.object({
  client_id: z.string().min(1),
  client_secret: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  api_key: z.string().min(1).describe('Google Gemini API key'),
});

export type RedditAccount = z.infer<typeof RedditAccountSchema>;

// Bot Configuration Schema
export const BotConfigSchema = z.object({
  subreddit: z.string().default('AskReddit'),
  topic_filter: z.string().default('Achilles tendon injuries, rupture, recovery, medical advice, pain, surgery'),
  check_interval_minutes: z.number().min(1).max(60).default(2),
  test_mode: z.boolean().default(true),
  rate_limit_hours: z.number().min(0.5).max(24).default(2),
  max_posts_per_check: z.number().min(1).max(100).default(25),
  max_comments_per_check: z.number().min(1).max(500).default(100),
  
  // File paths
  posts_log_file: z.string().default('monitored_posts.txt'),
  comments_log_file: z.string().default('monitored_comments.txt'),
  replies_log_file: z.string().default('ai_replies.txt'),
  analysis_log_file: z.string().default('ai_analysis_log.txt'),
  processed_posts_file: z.string().default('processed_posts.txt'),
  processed_comments_file: z.string().default('processed_comments.txt'),
  rate_limit_file: z.string().default('last_reply_time.txt'),
});

export type BotConfig = z.infer<typeof BotConfigSchema>;

// Accounts Configuration Schema
export const AccountsConfigSchema = z.object({
  version: z.string().default('1.0'),
  description: z.string().default('Reddit Bot Multiple Accounts Configuration'),
  accounts: z.array(RedditAccountSchema),
});

export type AccountsConfig = z.infer<typeof AccountsConfigSchema>;

// Medical Content Interface
export interface MedicalContent {
  thetis_splint: string;
  achilles_recovery: string;
  faqs: string;
}

// Bot Statistics
export interface BotStats {
  posts_checked: number;
  comments_checked: number;
  ai_replies: number;
  errors: number;
  rate_limited: number;
}

// Post/Comment Processing
export interface ProcessedItem {
  id: string;
  timestamp: Date;
}

// AI Analysis Result
export interface AIAnalysisResult {
  should_reply: boolean;
  response: string;
  keywords_found?: string[];
}

// Reddit Post/Comment Types
export interface RedditPost {
  id: string;
  title: string;
  selftext?: string;
  author: {
    name: string;
  } | null;
  created_utc: number;
  permalink: string;
  subreddit: {
    display_name: string;
  };
}

export interface RedditComment {
  id: string;
  body: string;
  author: {
    name: string;
  } | null;
  created_utc: number;
  link_id: string;
  parent_id: string;
  permalink: string;
}