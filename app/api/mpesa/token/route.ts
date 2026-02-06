import { NextResponse } from 'next/server';

export async function POST() {
  const apiKey = process.env.PAYFLOW_API_KEY;
  const apiSecret = process.env.PAYFLOW_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.error('[v0] Missing PayFlow credentials:', {
      hasApiKey: !!apiKey,
      hasApiSecret: !!apiSecret,
    });
    return NextResponse.json(
      { error: 'Missing PayFlow credentials' },
      { status: 500 }
    );
  }

  console.log('[v0] PayFlow credentials configured:', {
    apiKeyPrefix: apiKey.substring(0, 10) + '...',
  });

  return NextResponse.json({
    apiKey,
    apiSecret,
  });
}
