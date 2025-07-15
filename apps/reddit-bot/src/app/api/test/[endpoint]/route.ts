import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { endpoint: string } }
) {
  const { endpoint } = params;
  
  // Validate endpoint
  const validEndpoints = ['monitor-posts', 'monitor-comments', 'reply-to-posts'];
  if (!validEndpoints.includes(endpoint)) {
    return NextResponse.json(
      { error: 'Invalid endpoint' },
      { status: 400 }
    );
  }

  try {
    // Call the cron endpoint with proper authorization
    const cronUrl = new URL(`/api/cron/${endpoint}`, request.url);
    const response = await fetch(cronUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.CRON_SECRET}`,
      },
    });

    const result = await response.json();
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data: result,
    });

  } catch (error) {
    console.error(`Error testing ${endpoint}:`, error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}