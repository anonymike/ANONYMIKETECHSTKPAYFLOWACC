import { NextRequest, NextResponse } from 'next/server';

// In production, you would store this in a database
const paymentStatuses = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[v0] PayFlow Webhook received:', JSON.stringify(body, null, 2));

    // Extract the result from PayFlow webhook structure
    const event = body.event;
    const data = body.data;
    const transactionId = data?.transaction_id;
    const status = data?.status;

    console.log('[v0] PayFlow webhook details:', {
      event,
      transactionId,
      status,
    });

    if (transactionId) {
      // Store the payment status
      const paymentData: any = {
        status: status === 'completed' ? 'completed' : status || 'pending',
        resultCode: status === 'completed' ? 0 : 1,
        resultDesc:
          status === 'completed'
            ? 'Payment successful'
            : status === 'failed'
              ? 'Payment failed'
              : status === 'cancelled'
                ? 'Payment cancelled'
                : 'Payment pending',
        timestamp: new Date().toISOString(),
      };

      // Extract additional data if available
      if (data) {
        paymentData.data = {
          phone_number: data.phone_number,
          amount: data.amount,
          transaction_code: data.transaction_code,
          service_fee: data.service_fee,
          is_deposit: data.is_deposit,
          type: data.type,
        };
        console.log('[v0] Payment data:', paymentData.data);
      }

      paymentStatuses.set(transactionId, paymentData);
    }

    // Return success response to PayFlow
    // PayFlow expects a 200-299 status code to acknowledge receipt
    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Webhook processing error:', error);
    // Still return success to prevent PayFlow from retrying
    return NextResponse.json({ status: 'received' }, { status: 200 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const checkoutRequestId = request.nextUrl.searchParams.get('checkoutRequestId');

    if (!checkoutRequestId) {
      return NextResponse.json(
        { error: 'checkoutRequestId is required' },
        { status: 400 }
      );
    }

    const status = paymentStatuses.get(checkoutRequestId);

    if (!status) {
      return NextResponse.json({
        status: 'pending',
        message: 'Waiting for payment confirmation...',
      });
    }

    return NextResponse.json(status);
  } catch (error) {
    console.error('[v0] Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    );
  }
}
