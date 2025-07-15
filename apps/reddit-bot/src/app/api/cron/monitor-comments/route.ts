import { NextRequest, NextResponse } from 'next/server';
import { RedditService } from '@/lib/reddit';
import { AIService } from '@/lib/ai';

export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const redditService = new RedditService();
    const aiService = new AIService();

    // Get monitored posts
    const monitoredPosts = await redditService.getMonitoredPosts();
    let processedComments = 0;
    let relevantComments = 0;

    for (const postId of monitoredPosts.slice(0, 10)) { // Process max 10 posts per run
      try {
        const comments = await redditService.getPostComments(postId);
        
        for (const comment of comments) {
          if (!comment.body || comment.body === '[deleted]' || comment.body === '[removed]') {
            continue;
          }

          // Skip if already processed
          if (await redditService.isProcessed(comment.id, 'comment')) {
            continue;
          }

          // Analyze if we should reply to this comment
          const shouldReply = await aiService.shouldReplyToComment(
            comment.body,
            `Post: ${comment.link_title}`
          );

          await redditService.logActivity(
            `Analyzed comment in post "${comment.link_title}": ${shouldReply.shouldReply ? 'SHOULD REPLY' : 'SKIP'} (confidence: ${shouldReply.confidence})`
          );

          if (shouldReply.shouldReply && shouldReply.confidence > 0.8) {
            await redditService.addMonitoredComment(comment.id);
            relevantComments++;
            
            await redditService.logActivity(
              `Added comment to reply queue: "${comment.body.substring(0, 100)}..."`
            );
          }

          // Mark as processed
          await redditService.markAsProcessed(comment.id, 'comment');
          processedComments++;
        }
      } catch (error) {
        console.error(`Error processing comments for post ${postId}:`, error);
        await redditService.logActivity(`Error processing comments for post ${postId}: ${error}`);
      }
    }

    await redditService.logActivity(
      `Monitor comments completed: ${processedComments} comments processed, ${relevantComments} marked for replies`
    );

    return NextResponse.json({
      success: true,
      processed: processedComments,
      relevant: relevantComments,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in monitor-comments cron:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}