import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    // Get stats from various KV stores
    const [
      processedPosts,
      processedComments,
      monitoredPosts,
      monitoredComments,
      recentLogs,
      repliesLog,
    ] = await Promise.all([
      kv.scard('processed_posts'),
      kv.scard('processed_comments'),
      kv.scard('monitored_posts'),
      kv.scard('monitored_comments'),
      kv.lrange('activity_log', 0, 0),
      kv.lrange('ai_replies_log', 0, -1),
    ]);

    // Get last activity timestamp
    let lastActivity = null;
    if (recentLogs && recentLogs.length > 0) {
      const latestLog = recentLogs[0] as string;
      const timestamp = latestLog.split(': ')[0];
      lastActivity = timestamp;
    }

    return NextResponse.json({
      success: true,
      processedPosts: processedPosts || 0,
      processedComments: processedComments || 0,
      monitoredPosts: monitoredPosts || 0,
      monitoredComments: monitoredComments || 0,
      repliesSent: repliesLog ? repliesLog.length : 0,
      lastActivity,
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}