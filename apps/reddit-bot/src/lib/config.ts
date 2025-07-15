export const BOT_CONFIG = {
  // Subreddits to monitor for relevant posts
  MONITORED_SUBREDDITS: [
    'AchillesInjuries',
    'physicaltherapy', 
    'sportsinjuries',
    'MedicalAdvice',
    'AskDocs',
    'orthopedics',
    'recovery',
    'running',
    'basketball',
    'tennis',
    'soccer',
    'FootballInjuries',
    'sportsmedicine',
    'physio',
  ],

  // Relevance thresholds for AI analysis
  RELEVANCE_THRESHOLD: 0.7,
  REPLY_THRESHOLD: 0.8,

  // Rate limiting settings
  MAX_REPLIES_PER_HOUR: 3,
  MAX_POSTS_PER_RUN: 5,
  MAX_COMMENTS_PER_POST_RUN: 10,

  // Keywords that indicate high relevance
  HIGH_RELEVANCE_KEYWORDS: [
    'achilles',
    'achilles tendon',
    'achilles rupture',
    'achilles tear',
    'sports injury',
    'tendon injury',
    'recovery equipment',
    'walking boot',
    'cam walker',
    'physical therapy',
    'rehabilitation',
    'ankle injury',
  ],

  // AI prompts configuration
  AI_PROMPTS: {
    ANALYSIS_TEMPERATURE: 0.3,
    REPLY_TEMPERATURE: 0.7,
    MAX_TOKENS_ANALYSIS: 500,
    MAX_TOKENS_REPLY: 300,
  },

  // Cron schedules (in Vercel cron format)
  CRON_SCHEDULES: {
    MONITOR_POSTS: '*/15 * * * *',    // Every 15 minutes
    MONITOR_COMMENTS: '*/10 * * * *',  // Every 10 minutes  
    REPLY_TO_POSTS: '*/30 * * * *',    // Every 30 minutes
  }
} as const;