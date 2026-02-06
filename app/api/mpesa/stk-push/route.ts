import { NextRequest, NextResponse } from 'next/server';

interface STKPushRequest {
  phoneNumber: string;
  amount: string;
  accountReference: string;
  transactionDesc: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: STKPushRequest = await request.json();
    let { phoneNumber, amount, accountReference, transactionDesc } = body;

    // Validate input
    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { error: 'Phone number and amount are required' },
        { status: 400 }
      );
    }

    // Format phone number for PayFlow API (remove + and ensure it starts with 254)
    phoneNumber = phoneNumber.replace(/^\+/, '').replace(/^0/, '254');
    if (!phoneNumber.startsWith('254')) {
      phoneNumber = '254' + phoneNumber;
    }

    const apiKey = process.env.PAYFLOW_API_KEY;
    const apiSecret = process.env.PAYFLOW_API_SECRET;
    const paymentAccountId = process.env.PAYFLOW_PAYMENT_ACCOUNT_ID;

    if (!apiKey || !apiSecret || !paymentAccountId) {
      console.error('[v0] Missing PayFlow configuration:', {
        hasApiKey: !!apiKey,
        hasApiSecret: !!apiSecret,
        hasPaymentAccountId: !!paymentAccountId,
      });
      return NextResponse.json(
        { error: 'Missing PayFlow configuration' },
        { status: 500 }
      );
    }

    console.log('[v0] PayFlow Config loaded:', {
      apiKeyPrefix: apiKey.substring(0, 10) + '...',
      paymentAccountId,
    });

    // Prepare PayFlow STK push request - match exact PayFlow documentation format
    const stkPushRequest = {
      payment_account_id: parseInt(paymentAccountId),
      phone: phoneNumber,
      amount: Math.floor(parseFloat(amount)),
      reference: accountReference || 'ANONYMIKETECH',
      description: transactionDesc || 'Payment for goods and services',
    };

    console.log('[v0] PayFlow STK Push Request:', JSON.stringify(stkPushRequest, null, 2));
    console.log('[v0] API Key prefix:', apiKey.substring(0, 15) + '...');
    console.log('[v0] Payment Account ID:', paymentAccountId);

    // Use correct endpoint with .php extension as per PayFlow documentation
    const endpoint = 'https://payflow.top/api/v2/stkpush.php';

    try {
      console.log('[v0] Calling PayFlow endpoint:', endpoint);
      const stkResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey,
          'X-API-Secret': apiSecret,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkPushRequest),
      });

      console.log('[v0] Response Status:', stkResponse.status);
      const responseText = await stkResponse.text();
      console.log('[v0] Response Text:', responseText.substring(0, 500));

      // Parse response
      let stkData: any;
      try {
        stkData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('[v0] Failed to parse PayFlow response:', {
          error: parseError,
          responseText: responseText.substring(0, 500),
        });
        return NextResponse.json(
          {
            error: 'Invalid response from PayFlow API. Response was not JSON.',
          },
          { status: 502 }
        );
      }

      console.log('[v0] Parsed PayFlow response:', stkData);

      // Check response success status
      if (stkData.success === true || stkData.success === 'true') {
        return NextResponse.json({
          success: true,
          checkoutRequestId:
            stkData.data?.transaction_id ||
            stkData.transaction_id ||
            stkData.id ||
            'payment_' + Date.now(),
          responseCode: stkResponse.status,
          responseDescription: stkData.message || 'STK push sent successfully',
          message: stkData.message || 'STK push sent successfully. Check your phone for the prompt.',
        });
      } else {
        console.error('[v0] PayFlow API returned error:', stkData);
        return NextResponse.json(
          {
            error: stkData.message || 'PayFlow API request failed',
          },
          { status: 400 }
        );
      }
    } catch (fetchError) {
      console.error('[v0] Failed to call PayFlow API:', fetchError);
      return NextResponse.json(
        {
          error: 'Failed to connect to PayFlow API. Check your network and API credentials.',
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('[v0] PayFlow STK Push error:', error);
    return NextResponse.json(
      { error: 'Failed to process STK push request' },
      { status: 500 }
    );
  }
}
