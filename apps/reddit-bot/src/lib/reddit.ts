import Snoowrap from 'snoowrap';
import { kv } from '@vercel/kv';

export class RedditService {
  private reddit: Snoowrap;

  constructor() {
    this.reddit = new Snoowrap({
      userAgent: process.env.REDDIT_USER_AGENT!,
      clientId: process.env.REDDIT_CLIENT_ID!,
      clientSecret: process.env.REDDIT_CLIENT_SECRET!,
      username: process.env.REDDIT_USERNAME!,
      password: process.env.REDDIT_PASSWORD!,
    });
  }

  async getNewPosts(subreddits: string[], limit = 10) {
    const allPosts = [];
    
    for (const subreddit of subreddits) {
      try {
        const posts = await this.reddit.getSubreddit(subreddit).getNew({ limit });
        allPosts.push(...posts);
      } catch (error) {
        console.error(`Error fetching posts from r/${subreddit}:`, error);
      }
    }
    
    return allPosts;
  }

  async getPostComments(postId: string) {
    try {
      const submission = await this.reddit.getSubmission(postId);
      await submission.expandReplies({ limit: 100, depth: 2 });
      return submission.comments;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      return [];
    }
  }

  async replyToPost(postId: string, reply: string) {
    try {
      const submission = await this.reddit.getSubmission(postId);
      const response = await submission.reply(reply);
      return response;
    } catch (error) {
      console.error(`Error replying to post ${postId}:`, error);
      throw error;
    }
  }

  async replyToComment(commentId: string, reply: string) {
    try {
      const comment = await this.reddit.getComment(commentId);
      const response = await comment.reply(reply);
      return response;
    } catch (error) {
      console.error(`Error replying to comment ${commentId}:`, error);
      throw error;
    }
  }

  async isProcessed(itemId: string, type: 'post' | 'comment'): Promise<boolean> {
    const key = `processed_${type}s`;
    const processed = await kv.sismember(key, itemId);
    return processed === 1;
  }

  async markAsProcessed(itemId: string, type: 'post' | 'comment'): Promise<void> {
    const key = `processed_${type}s`;
    await kv.sadd(key, itemId);
  }

  async getMonitoredPosts(): Promise<string[]> {
    const posts = await kv.smembers('monitored_posts');
    return posts as string[];
  }

  async addMonitoredPost(postId: string): Promise<void> {
    await kv.sadd('monitored_posts', postId);
  }

  async getMonitoredComments(): Promise<string[]> {
    const comments = await kv.smembers('monitored_comments');
    return comments as string[];
  }

  async addMonitoredComment(commentId: string): Promise<void> {
    await kv.sadd('monitored_comments', commentId);
  }

  async logActivity(activity: string): Promise<void> {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${activity}`;
    await kv.lpush('activity_log', logEntry);
    // Keep only last 1000 entries
    await kv.ltrim('activity_log', 0, 999);
  }
}