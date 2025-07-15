import { NextRequest, NextResponse } from 'next/server';
import { RedditService } from '@/lib/reddit';
import { AIService } from '@/lib/ai';
import { kv } from '@vercel/kv';

export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const redditService = new RedditService();
    const aiService = new AIService();

    // Rate limiting: max 3 replies per hour
    const hourKey = `replies_${new Date().getHours()}`;
    const currentHourReplies = await kv.get(hourKey) || 0;
    
    if (currentHourReplies >= 3) {
      await redditService.logActivity('Rate limit reached for this hour, skipping replies');
      return NextResponse.json({
        success: true,
        message: 'Rate limit reached',
        timestamp: new Date().toISOString(),
      });
    }

    let repliedCount = 0;
    const maxReplies = 3 - (currentHourReplies as number);

    // Get monitored posts that haven't been replied to yet
    const monitoredPosts = await redditService.getMonitoredPosts();
    
    for (const postId of monitoredPosts.slice(0, 5)) { // Check max 5 posts
      if (repliedCount >= maxReplies) break;

      try {
        // Check if we've already replied to this post
        const repliedKey = `replied_post_${postId}`;
        const alreadyReplied = await kv.get(repliedKey);
        
        if (alreadyReplied) continue;

        // Get post details
        const reddit = new (await import('snoowrap')).default({
          userAgent: process.env.REDDIT_USER_AGENT!,
          clientId: process.env.REDDIT_CLIENT_ID!,
          clientSecret: process.env.REDDIT_CLIENT_SECRET!,
          username: process.env.REDDIT_USERNAME!,
          password: process.env.REDDIT_PASSWORD!,
        });

        const post = await reddit.getSubmission(postId);
        
        // Generate reply
        const reply = await aiService.generateReply(
          post.title,
          post.selftext || '',
          post.subreddit.display_name
        );

        if (reply && reply.length > 50) {
          // Post the reply
          await redditService.replyToPost(postId, reply);
          
          // Mark as replied
          await kv.setex(repliedKey, 86400 * 7, 'true'); // 7 days
          
          // Update rate limit counter
          await kv.setex(hourKey, 3600, (currentHourReplies as number) + 1);
          
          repliedCount++;

          await redditService.logActivity(
            `Successfully replied to post "${post.title}" in r/${post.subreddit.display_name}`
          );

          // Log the reply for review
          await kv.lpush('ai_replies_log', JSON.stringify({
            timestamp: new Date().toISOString(),
            postId,
            postTitle: post.title,
            subreddit: post.subreddit.display_name,
            reply: reply.substring(0, 200) + (reply.length > 200 ? '...' : ''),
          }));
        }

      } catch (error) {
        console.error(`Error replying to post ${postId}:`, error);
        await redditService.logActivity(`Failed to reply to post ${postId}: ${error}`);
      }
    }

    await redditService.logActivity(
      `Reply cron completed: ${repliedCount} replies posted`
    );

    return NextResponse.json({
      success: true,
      replied: repliedCount,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in reply-to-posts cron:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}