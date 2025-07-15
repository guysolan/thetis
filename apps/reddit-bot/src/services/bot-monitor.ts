import fs from 'fs/promises';
import path from 'path';
import { differenceInMinutes, differenceInHours, formatDistance } from 'date-fns';
import PQueue from 'p-queue';
import Snoowrap from 'snoowrap';
import { BotConfig, BotStats, ProcessedItem } from '../types/index.js';
import { RedditService } from './reddit.js';
import { AIAnalyzer } from './ai-analyzer.js';
import logger from '../utils/logger.js';

export class BotMonitor {
  private config: BotConfig;
  private redditService: RedditService;
  private aiAnalyzer: AIAnalyzer;
  private processedPosts: Set<string> = new Set();
  private processedComments: Set<string> = new Set();
  private monitoringStartTime: Date | null = null;
  private lastReplyTime: Date | null = null;
  private stats: BotStats = {
    posts_checked: 0,
    comments_checked: 0,
    ai_replies: 0,
    errors: 0,
    rate_limited: 0
  };
  private isMonitoring = false;
  private queue: PQueue;
  
  constructor(config: BotConfig, redditService: RedditService, aiAnalyzer: AIAnalyzer) {
    this.config = config;
    this.redditService = redditService;
    this.aiAnalyzer = aiAnalyzer;
    this.queue = new PQueue({ concurrency: 3, interval: 1000, intervalCap: 3 });
  }
  
  async initialize(): Promise<void> {
    await this.loadProcessedItems();
    await this.loadLastReplyTime();
    this.createLogFiles();
  }
  
  private async createLogFiles(): Promise<void> {
    const logFiles = [
      this.config.posts_log_file,
      this.config.comments_log_file,
      this.config.replies_log_file,
      this.config.analysis_log_file
    ];
    
    for (const file of logFiles) {
      try {
        await fs.access(file);
      } catch {
        await fs.writeFile(file, '', 'utf-8');
      }
    }
  }
  
  private async loadProcessedItems(): Promise<void> {
    try {
      // Load processed posts
      try {
        const postsData = await fs.readFile(this.config.processed_posts_file, 'utf-8');
        const posts = postsData.split('\n').filter(id => id.trim());
        posts.forEach(id => this.processedPosts.add(id));
        logger.info(`Loaded ${this.processedPosts.size} previously processed posts`);
      } catch (error) {
        logger.debug('No processed posts file found');
      }
      
      // Load processed comments
      try {
        const commentsData = await fs.readFile(this.config.processed_comments_file, 'utf-8');
        const comments = commentsData.split('\n').filter(id => id.trim());
        comments.forEach(id => this.processedComments.add(id));
        logger.info(`Loaded ${this.processedComments.size} previously processed comments`);
      } catch (error) {
        logger.debug('No processed comments file found');
      }
    } catch (error) {
      logger.error('Error loading processed items:', error);
    }
  }
  
  private async saveProcessedItems(): Promise<void> {
    try {
      await fs.writeFile(
        this.config.processed_posts_file,
        Array.from(this.processedPosts).join('\n'),
        'utf-8'
      );
      
      await fs.writeFile(
        this.config.processed_comments_file,
        Array.from(this.processedComments).join('\n'),
        'utf-8'
      );
    } catch (error) {
      logger.error('Error saving processed items:', error);
    }
  }
  
  private async addProcessedPost(postId: string): Promise<void> {
    this.processedPosts.add(postId);
    await fs.appendFile(this.config.processed_posts_file, `${postId}\n`, 'utf-8');
  }
  
  private async addProcessedComment(commentId: string): Promise<void> {
    this.processedComments.add(commentId);
    await fs.appendFile(this.config.processed_comments_file, `${commentId}\n`, 'utf-8');
  }
  
  private async loadLastReplyTime(): Promise<void> {
    try {
      const data = await fs.readFile(this.config.rate_limit_file, 'utf-8');
      if (data.trim()) {
        this.lastReplyTime = new Date(data.trim());
        logger.info(`Loaded last reply time: ${this.lastReplyTime.toISOString()}`);
      }
    } catch (error) {
      logger.debug('No last reply time file found');
    }
  }
  
  private async saveLastReplyTime(): Promise<void> {
    this.lastReplyTime = new Date();
    await fs.writeFile(this.config.rate_limit_file, this.lastReplyTime.toISOString(), 'utf-8');
  }
  
  private isRateLimited(): boolean {
    if (!this.lastReplyTime) return false;
    const hoursDiff = differenceInHours(new Date(), this.lastReplyTime);
    return hoursDiff < this.config.rate_limit_hours;
  }
  
  private getTimeUntilNextReply(): string {
    if (!this.lastReplyTime) return 'Ready';
    const nextReplyTime = new Date(this.lastReplyTime.getTime() + this.config.rate_limit_hours * 3600000);
    return formatDistance(nextReplyTime, new Date(), { addSuffix: true });
  }
  
  async startMonitoring(subreddit: string): Promise<void> {
    // Test subreddit access first
    logger.info(`Testing access to r/${subreddit}...`);
    if (!await this.redditService.testSubredditAccess(subreddit)) {
      throw new Error(`Cannot access subreddit r/${subreddit}`);
    }
    
    this.isMonitoring = true;
    this.monitoringStartTime = new Date();
    logger.info(`Monitoring started at: ${this.monitoringStartTime.toISOString()}`);
    
    // Main monitoring loop
    while (this.isMonitoring) {
      try {
        await this.checkSubreddit(subreddit);
        
        // Wait for the next check
        logger.info(`Waiting ${this.config.check_interval_minutes} minutes before next check...`);
        await new Promise(resolve => setTimeout(resolve, this.config.check_interval_minutes * 60 * 1000));
        
      } catch (error) {
        logger.error('Error in monitoring loop:', error);
        this.stats.errors++;
        await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30s on error
      }
    }
  }
  
  stopMonitoring(): void {
    this.isMonitoring = false;
    logger.info('Monitoring stopped');
    this.saveProcessedItems();
  }
  
  private async checkSubreddit(subreddit: string): Promise<void> {
    logger.info(`Checking subreddit r/${subreddit}...`);
    
    // Check posts
    await this.checkPosts(subreddit);
    
    // Check comments
    await this.checkComments(subreddit);
    
    // Log stats
    logger.info(`Stats: ${JSON.stringify(this.stats)}`);
  }
  
  private async checkPosts(subreddit: string): Promise<void> {
    logger.info('Checking new posts...');
    
    const allSubmissions: Snoowrap.Submission[] = [];
    
    // Get posts from different sources
    const [newPosts, hotPosts, risingPosts] = await Promise.all([
      this.redditService.getSubredditPosts(subreddit, 'new', 25),
      this.redditService.getSubredditPosts(subreddit, 'hot', 15),
      this.redditService.getSubredditPosts(subreddit, 'rising', 10)
    ]);
    
    // Combine and deduplicate
    const seenIds = new Set<string>();
    for (const posts of [newPosts, hotPosts, risingPosts]) {
      for (const post of posts) {
        if (!seenIds.has(post.id)) {
          seenIds.add(post.id);
          allSubmissions.push(post);
        }
      }
    }
    
    logger.info(`Found ${allSubmissions.length} unique posts to check`);
    
    // Sort by creation time (newest first)
    allSubmissions.sort((a, b) => b.created_utc - a.created_utc);
    
    let newPostsFound = 0;
    
    for (const submission of allSubmissions.slice(0, this.config.max_posts_per_check)) {
      if (!this.isMonitoring) break;
      
      const postCreatedTime = new Date(submission.created_utc * 1000);
      
      // Skip posts created before monitoring started
      if (this.monitoringStartTime && postCreatedTime <= this.monitoringStartTime) {
        const ageMinutes = differenceInMinutes(new Date(), postCreatedTime);
        logger.debug(`Skipping post created before monitoring: "${submission.title.substring(0, 50)}..." (${ageMinutes}m old)`);
        continue;
      }
      
      // Skip already processed posts
      if (this.processedPosts.has(submission.id)) {
        continue;
      }
      
      // Process this post
      await this.addProcessedPost(submission.id);
      this.stats.posts_checked++;
      newPostsFound++;
      
      const ageMinutes = differenceInMinutes(new Date(), postCreatedTime);
      logger.info(`Found NEW post (${ageMinutes}m old): "${submission.title.substring(0, 50)}..."`);
      
      // Log the post
      await this.logMonitoredPost(submission);
      
      // Analyze with AI
      await this.analyzeAndReply(submission, 'post');
    }
    
    logger.info(`Posts check complete: ${this.stats.posts_checked} checked, ${newPostsFound} new`);
  }
  
  private async checkComments(subreddit: string): Promise<void> {
    logger.info('Checking comments...');
    
    // Get recent posts to check their comments
    const recentPosts = await this.redditService.getSubredditPosts(subreddit, 'hot', 15);
    const newPosts = await this.redditService.getSubredditPosts(subreddit, 'new', 10);
    
    const allPosts = [...recentPosts, ...newPosts];
    const seenPostIds = new Set<string>();
    const uniquePosts: Snoowrap.Submission[] = [];
    
    for (const post of allPosts) {
      if (!seenPostIds.has(post.id)) {
        seenPostIds.add(post.id);
        uniquePosts.push(post);
      }
    }
    
    let commentsChecked = 0;
    let newCommentsFound = 0;
    
    // Process comments from each post
    await this.queue.addAll(
      uniquePosts.map(submission => async () => {
        if (!this.isMonitoring || commentsChecked >= this.config.max_comments_per_check) return;
        
        const comments = await this.redditService.getPostComments(submission);
        
        for (const comment of comments) {
          if (!this.isMonitoring || commentsChecked >= this.config.max_comments_per_check) break;
          if (!comment.author || !comment.body) continue;
          
          commentsChecked++;
          
          const commentCreatedTime = new Date(comment.created_utc * 1000);
          
          // Skip comments created before monitoring started
          if (this.monitoringStartTime && commentCreatedTime <= this.monitoringStartTime) {
            continue;
          }
          
          // Skip already processed comments
          if (this.processedComments.has(comment.id)) {
            continue;
          }
          
          // Skip bot comments
          const authorName = comment.author.name.toLowerCase();
          if (['automoderator', 'bot', 'moderator'].some(bot => authorName.includes(bot))) {
            continue;
          }
          
          // Process this comment
          await this.addProcessedComment(comment.id);
          this.stats.comments_checked++;
          newCommentsFound++;
          
          const ageMinutes = differenceInMinutes(new Date(), commentCreatedTime);
          logger.info(`Found NEW comment (${ageMinutes}m old) by ${comment.author.name}: "${comment.body.substring(0, 50)}..."`);
          
          // Log the comment
          await this.logMonitoredComment(comment, submission);
          
          // Analyze with AI
          await this.analyzeAndReply(comment, 'comment');
        }
      })
    );
    
    logger.info(`Comments check complete: ${commentsChecked} checked, ${newCommentsFound} new`);
  }
  
  private async analyzeAndReply(
    item: Snoowrap.Submission | Snoowrap.Comment, 
    itemType: 'post' | 'comment'
  ): Promise<void> {
    // Prepare content for analysis
    let contentText: string;
    let itemId: string;
    let permalink: string;
    
    if (itemType === 'post') {
      const post = item as Snoowrap.Submission;
      contentText = `Title: ${post.title}\nContent: ${post.selftext || 'No text content'}`;
      itemId = post.id;
      permalink = `https://www.reddit.com${post.permalink}`;
    } else {
      const comment = item as Snoowrap.Comment;
      contentText = comment.body;
      itemId = comment.id;
      permalink = `https://www.reddit.com${comment.permalink}`;
    }
    
    // Analyze with AI
    const analysisResult = await this.aiAnalyzer.analyzeContent(
      contentText, 
      itemType, 
      this.config.topic_filter
    );
    
    // Log the AI analysis
    await this.logAIAnalysis(
      itemType,
      itemId,
      contentText,
      analysisResult.should_reply,
      analysisResult.response,
      permalink
    );
    
    if (analysisResult.should_reply) {
      logger.info(`AI decided to reply: ${analysisResult.response.substring(0, 100)}...`);
      
      // Check keywords
      const keywordCheck = this.aiAnalyzer.checkKeywordsInResponse(
        analysisResult.response,
        this.config.topic_filter
      );
      
      if (!keywordCheck.should_reply) {
        logger.warn('AI response lacks required keywords');
        await this.logAIReply(itemType, itemId, contentText, true, analysisResult.response, false, 'NO_KEYWORDS');
        return;
      }
      
      // Check rate limiting
      if (this.isRateLimited()) {
        const timeRemaining = this.getTimeUntilNextReply();
        logger.warn(`Rate limited: Cannot reply ${timeRemaining}`);
        this.stats.rate_limited++;
        await this.logAIReply(itemType, itemId, contentText, true, analysisResult.response, false, 'RATE_LIMITED');
        return;
      }
      
      // Reply based on mode
      if (this.config.test_mode) {
        logger.info(`[TEST MODE] Would reply to ${itemType}: ${analysisResult.response.substring(0, 100)}...`);
        this.stats.ai_replies++;
        await this.logAIReply(itemType, itemId, contentText, true, analysisResult.response, false, 'SIMULATED');
      } else {
        // Live mode - actually reply
        try {
          const success = itemType === 'post'
            ? await this.redditService.replyToPost(itemId, analysisResult.response)
            : await this.redditService.replyToComment(itemId, analysisResult.response);
          
          if (success) {
            logger.success(`Successfully replied to ${itemType}`);
            this.stats.ai_replies++;
            await this.saveLastReplyTime();
            await this.logAIReply(itemType, itemId, contentText, true, analysisResult.response, true, 'SUCCESS');
          } else {
            throw new Error('Reply failed');
          }
        } catch (error) {
          logger.error(`Failed to reply to ${itemType}: ${error}`);
          this.stats.errors++;
          await this.logAIReply(itemType, itemId, contentText, true, analysisResult.response, false, 'FAILED');
        }
      }
    } else {
      logger.info('AI decided not to reply');
      await this.logAIReply(itemType, itemId, contentText, false, analysisResult.response, false, 'NO_REPLY');
    }
  }
  
  private async logMonitoredPost(submission: Snoowrap.Submission): Promise<void> {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | POST | r/${submission.subreddit.display_name} | ID: ${submission.id} | Author: ${submission.author?.name || 'deleted'} | Title: ${submission.title} | URL: https://www.reddit.com${submission.permalink}\n`;
    await fs.appendFile(this.config.posts_log_file, logEntry, 'utf-8');
  }
  
  private async logMonitoredComment(comment: Snoowrap.Comment, submission: Snoowrap.Submission): Promise<void> {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | COMMENT | r/${submission.subreddit.display_name} | Comment ID: ${comment.id} | Post ID: ${submission.id} | Author: ${comment.author?.name || 'deleted'} | Post Title: ${submission.title} | Comment: ${comment.body}\n`;
    await fs.appendFile(this.config.comments_log_file, logEntry, 'utf-8');
  }
  
  private async logAIReply(
    contentType: string,
    contentId: string,
    originalText: string,
    aiDecision: boolean,
    aiResponse: string,
    replied: boolean,
    status: string
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const mode = this.config.test_mode ? 'TEST_MODE' : 'LIVE_MODE';
    const logEntry = `${timestamp} | ${contentType.toUpperCase()} | ID: ${contentId} | MODE: ${mode} | AI Decision: ${aiDecision ? 'YES' : 'NO'} | Replied: ${replied} | Status: ${status} | Original: ${originalText.substring(0, 100)}... | AI Response: ${aiResponse.substring(0, 200)}...\n`;
    await fs.appendFile(this.config.replies_log_file, logEntry, 'utf-8');
  }
  
  private async logAIAnalysis(
    contentType: string,
    contentId: string,
    originalContent: string,
    shouldReply: boolean,
    aiResponse: string,
    permalink: string
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const mode = this.config.test_mode ? 'TEST_MODE' : 'LIVE_MODE';
    
    const logEntry = `
${'='.repeat(80)}
TIMESTAMP: ${timestamp}
MODE: ${mode}
TYPE: ${contentType.toUpperCase()}
CONTENT ID: ${contentId}
REDDIT PERMALINK: ${permalink}

ORIGINAL CONTENT:
${originalContent}

AI DECISION: ${shouldReply ? 'YES REPLY NEEDED' : 'NO REPLY NEEDED'}

GENERATED REPLY:
${shouldReply ? aiResponse : 'N/A'}

${'='.repeat(80)}
`;
    
    await fs.appendFile(this.config.analysis_log_file, logEntry, 'utf-8');
  }
  
  getStats(): BotStats {
    return { ...this.stats };
  }
  
  getRateLimitStatus(): { isLimited: boolean; timeRemaining: string } {
    return {
      isLimited: this.isRateLimited(),
      timeRemaining: this.getTimeUntilNextReply()
    };
  }
}