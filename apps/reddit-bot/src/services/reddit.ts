import Snoowrap from 'snoowrap';
import { RedditAccount, AccountsConfig } from '../types/index.js';
import logger from '../utils/logger.js';

export class RedditService {
  private accounts: RedditAccount[];
  private redditInstances: (Snoowrap | null)[] = [];
  private accountStatus: boolean[] = [];
  private currentAccountIndex = 0;
  
  constructor(accountsConfig: AccountsConfig | null) {
    this.accounts = accountsConfig?.accounts || [];
    if (this.accounts.length > 0) {
      this.initializeRedditInstances();
    }
  }
  
  private initializeRedditInstances(): void {
    this.redditInstances = [];
    this.accountStatus = [];
    
    for (const [index, account] of this.accounts.entries()) {
      try {
        logger.info(`Testing account ${index + 1}: ${account.username}`);
        
        const reddit = new Snoowrap({
          userAgent: `RedditMonitor/1.0 by ${account.username}`,
          clientId: account.client_id,
          clientSecret: account.client_secret,
          username: account.username,
          password: account.password,
        });
        
        // Configure request delays to respect rate limits
        reddit.config({
          requestDelay: 1000,
          continueAfterRatelimitError: false,
          warnings: false,
        });
        
        this.redditInstances.push(reddit);
        this.accountStatus.push(true);
        logger.success(`✓ Account ${index + 1} ready: ${account.username}`);
        
      } catch (error) {
        logger.error(`✗ Account ${index + 1} failed: ${error}`);
        this.redditInstances.push(null);
        this.accountStatus.push(false);
      }
    }
    
    const successfulAuths = this.accountStatus.filter(status => status).length;
    logger.info(
      `Using ${successfulAuths} valid Reddit account(s) out of ${this.accounts.length} total accounts`
    );
    
    if (successfulAuths === 0) {
      throw new Error('No valid Reddit accounts available!');
    }
  }
  
  async testAuthentication(reddit: Snoowrap, username: string): Promise<boolean> {
    try {
      const me = await reddit.getMe();
      logger.success(`✓ Account authenticated: ${me.name}`);
      return true;
    } catch (error) {
      logger.error(`✗ Authentication failed for ${username}: ${error}`);
      return false;
    }
  }
  
  getActiveAccountCount(): number {
    return this.accountStatus.filter(status => status).length;
  }
  
  getCurrentAccountUsername(): string {
    if (this.accounts.length > 0 && this.currentAccountIndex < this.accounts.length) {
      return this.accounts[this.currentAccountIndex].username;
    }
    return 'None';
  }
  
  private getNextAccount(): Snoowrap | null {
    if (this.redditInstances.length === 0) {
      return null;
    }
    
    const startIndex = this.currentAccountIndex;
    
    while (true) {
      if (this.accountStatus[this.currentAccountIndex] && this.redditInstances[this.currentAccountIndex]) {
        const account = this.redditInstances[this.currentAccountIndex];
        const username = this.accounts[this.currentAccountIndex].username;
        logger.info(`Using account: ${username}`);
        
        this.currentAccountIndex = (this.currentAccountIndex + 1) % this.redditInstances.length;
        return account;
      }
      
      this.currentAccountIndex = (this.currentAccountIndex + 1) % this.redditInstances.length;
      
      if (this.currentAccountIndex === startIndex) {
        logger.error('No valid accounts available for operation');
        return null;
      }
    }
  }
  
  async testSubredditAccess(subredditName: string): Promise<boolean> {
    try {
      const reddit = this.getNextAccount();
      if (!reddit) {
        return false;
      }
      
      const subreddit = reddit.getSubreddit(subredditName);
      const info = await subreddit.fetch();
      
      logger.success(`Successfully connected to r/${info.display_name}`);
      
      // Test basic access
      try {
        const posts = await subreddit.getNew({ limit: 1 });
        if (posts.length > 0) {
          logger.success(`Can access posts in r/${subredditName}`);
        } else {
          logger.warn(`r/${subredditName} exists but has no posts`);
        }
      } catch (error) {
        logger.warn(`Limited access to r/${subredditName} posts: ${error}`);
      }
      
      return true;
      
    } catch (error: any) {
      const errorMsg = error.toString();
      if (errorMsg.includes('404')) {
        logger.error(`Subreddit r/${subredditName} not found (404)`);
      } else if (errorMsg.includes('403')) {
        logger.error(`Access denied to r/${subredditName} (403)`);
      } else if (errorMsg.includes('401')) {
        logger.error('Authentication failed (401)');
      } else {
        logger.error(`Error accessing subreddit: ${errorMsg}`);
      }
      return false;
    }
  }
  
  async getSubredditPosts(
    subredditName: string, 
    postType: 'new' | 'hot' | 'rising' = 'new', 
    limit = 25
  ): Promise<Snoowrap.Submission[]> {
    try {
      const reddit = this.getNextAccount();
      if (!reddit) {
        return [];
      }
      
      const subreddit = reddit.getSubreddit(subredditName);
      
      switch (postType) {
        case 'new':
          return await subreddit.getNew({ limit });
        case 'hot':
          return await subreddit.getHot({ limit });
        case 'rising':
          return await subreddit.getRising({ limit });
        default:
          return await subreddit.getNew({ limit });
      }
      
    } catch (error) {
      logger.error(`Error getting ${postType} posts from r/${subredditName}: ${error}`);
      return [];
    }
  }
  
  async getPostComments(submission: Snoowrap.Submission, limit = 0): Promise<Snoowrap.Comment[]> {
    try {
      await submission.expandReplies({ limit, depth: 0 });
      return submission.comments as Snoowrap.Comment[];
    } catch (error) {
      logger.error(`Error getting comments from submission ${submission.id}: ${error}`);
      return [];
    }
  }
  
  async replyToPost(postId: string, replyText: string): Promise<boolean> {
    try {
      const reddit = this.getNextAccount();
      if (!reddit) {
        return false;
      }
      
      const submission = reddit.getSubmission(postId);
      await submission.reply(replyText);
      logger.success(`Successfully replied to post ${postId}`);
      return true;
      
    } catch (error) {
      logger.error(`Failed to reply to post ${postId}: ${error}`);
      return false;
    }
  }
  
  async replyToComment(commentId: string, replyText: string): Promise<boolean> {
    try {
      const reddit = this.getNextAccount();
      if (!reddit) {
        return false;
      }
      
      const comment = reddit.getComment(commentId);
      await comment.reply(replyText);
      logger.success(`Successfully replied to comment ${commentId}`);
      return true;
      
    } catch (error) {
      logger.error(`Failed to reply to comment ${commentId}: ${error}`);
      return false;
    }
  }
  
  async addAccount(account: RedditAccount): Promise<boolean> {
    try {
      const reddit = new Snoowrap({
        userAgent: `RedditMonitor/1.0 by ${account.username}`,
        clientId: account.client_id,
        clientSecret: account.client_secret,
        username: account.username,
        password: account.password,
      });
      
      reddit.config({
        requestDelay: 1000,
        continueAfterRatelimitError: false,
        warnings: false,
      });
      
      // Test authentication
      const isValid = await this.testAuthentication(reddit, account.username);
      if (!isValid) {
        return false;
      }
      
      // Add to lists
      this.accounts.push(account);
      this.redditInstances.push(reddit);
      this.accountStatus.push(true);
      
      return true;
      
    } catch (error) {
      logger.error(`Failed to add account: ${error}`);
      return false;
    }
  }
  
  removeAccount(index: number): boolean {
    if (index >= 0 && index < this.accounts.length) {
      const username = this.accounts[index].username;
      
      // Remove from all lists
      this.accounts.splice(index, 1);
      this.redditInstances.splice(index, 1);
      this.accountStatus.splice(index, 1);
      
      // Adjust current index if needed
      if (this.currentAccountIndex >= this.redditInstances.length && this.redditInstances.length > 0) {
        this.currentAccountIndex = 0;
      }
      
      logger.info(`Removed account: ${username}`);
      return true;
    }
    return false;
  }
}