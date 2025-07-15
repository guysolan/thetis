import { NextRequest, NextResponse } from 'next/server';
import { RedditService } from '@/lib/reddit';
import { AIService } from '@/lib/ai';
import { BOT_CONFIG } from '@/lib/config';

export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const redditService = new RedditService();
    const aiService = new AIService();

    // Get new posts from monitored subreddits
    const posts = await redditService.getNewPosts(BOT_CONFIG.MONITORED_SUBREDDITS, BOT_CONFIG.MAX_POSTS_PER_RUN);
    let processedCount = 0;
    let relevantCount = 0;

    for (const post of posts) {
      // Skip if already processed
      if (await redditService.isProcessed(post.id, 'post')) {
        continue;
      }

      // Analyze post relevance
      const analysis = await aiService.analyzePost(
        post.title,
        post.selftext || '',
        post.subreddit.display_name
      );

      await redditService.logActivity(
        `Analyzed post "${post.title}" in r/${post.subreddit.display_name}: ${analysis.isRelevant ? 'RELEVANT' : 'NOT RELEVANT'} (confidence: ${analysis.confidence})`
      );

      // If relevant, add to monitoring and mark for potential replies
      if (analysis.isRelevant && analysis.confidence > BOT_CONFIG.RELEVANCE_THRESHOLD) {
        await redditService.addMonitoredPost(post.id);
        relevantCount++;
        
        await redditService.logActivity(
          `Added relevant post to monitoring: "${post.title}" (topics: ${analysis.topics.join(', ')})`
        );
      }

      // Mark as processed
      await redditService.markAsProcessed(post.id, 'post');
      processedCount++;
    }

    await redditService.logActivity(
      `Monitor posts completed: ${processedCount} processed, ${relevantCount} relevant found`
    );

    return NextResponse.json({
      success: true,
      processed: processedCount,
      relevant: relevantCount,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in monitor-posts cron:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}