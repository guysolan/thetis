export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  subreddit: {
    display_name: string;
  };
  author: {
    name: string;
  };
  created_utc: number;
  url: string;
  permalink: string;
}

export interface RedditComment {
  id: string;
  body: string;
  author: {
    name: string;
  };
  created_utc: number;
  permalink: string;
  link_title: string;
  link_id: string;
}

export interface AIAnalysis {
  isRelevant: boolean;
  confidence: number;
  topics: string[];
  reasoning: string;
}

export interface ReplyDecision {
  shouldReply: boolean;
  confidence: number;
  reasoning: string;
}

export interface ActivityLog {
  timestamp: string;
  activity: string;
}

export interface BotStats {
  processedPosts: number;
  processedComments: number;
  monitoredPosts: number;
  monitoredComments: number;
  repliesSent: number;
  lastActivity?: string;
}