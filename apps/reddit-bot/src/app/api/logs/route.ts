import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    // Get recent activity logs
    const logs = await kv.lrange('activity_log', 0, 49); // Get last 50 logs
    
    const formattedLogs = logs.map((log) => {
      const [timestamp, ...activityParts] = (log as string).split(': ');
      return {
        timestamp,
        activity: activityParts.join(': '),
      };
    });

    return NextResponse.json({
      success: true,
      logs: formattedLogs,
    });

  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}