# PayFlow Integration Setup Guide

This guide explains how to set up and configure your PayFlow integration for M-Pesa STK Push payments.

## Overview

This application uses the PayFlow API to handle M-Pesa STK Push payments. PayFlow provides a unified payment gateway that simplifies M-Pesa integration compared to direct M-Pesa APIs.

### Base URL
All API endpoints are relative to: `https://payflow.top/api/v2/`

## Prerequisites

1. A PayFlow merchant account
2. API Key and API Secret from your PayFlow dashboard
3. A Payment Account ID configured in your PayFlow account
4. A webhook endpoint URL (provided by your hosting)

## Environment Variables

Add these environment variables to your `.env.local` file:

```
# PayFlow API Credentials
PAYFLOW_API_KEY=your_api_key_here
PAYFLOW_API_SECRET=your_api_secret_here
PAYFLOW_PAYMENT_ACCOUNT_ID=your_payment_account_id_here

# Application URL (for webhooks)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Getting Your Credentials

1. Log in to your [PayFlow Dashboard](https://payflow.top)
2. Navigate to **Settings → API Keys**
3. Copy your **API Key** and **API Secret**
4. Go to **Settings → Payment Accounts** to find your **Payment Account ID**

## API Integration

### 1. Initiating Payment (STK Push)

**Endpoint:** `POST /payments/initiate`

**Request:**
```json
{
  "payment_account_id": 123,
  "phone": "254712345678",
  "amount": 1000,
  "reference": "ORDER123",
  "description": "Payment for order",
  "callback_url": "https://your-domain.com/api/mpesa/callback"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "TXN123456",
    "status": "pending"
  }
}
```

### 2. Webhook Handler

PayFlow sends webhook notifications when payment status changes. The webhook is received at `/api/mpesa/callback` and expects:

**Request Headers:**
```
Content-Type: application/json
X-Webhook-Event: payment.updated
X-Webhook-Source: PayFlow
User-Agent: PayFlow-Webhook/1.0
```

**Request Body:**
```json
{
  "event": "payment.updated",
  "timestamp": "2024-01-15 14:30:45",
  "data": {
    "transaction_id": 123,
    "checkout_request_id": "ws_CO_15012024143045",
    "merchant_request_id": "ws_MR_15012024143045",
    "status": "completed",
    "amount": 1000,
    "phone_number": "254712345678",
    "transaction_code": "QAB12CD34E",
    "transaction_date": "20240115143045",
    "result_code": 0,
    "result_desc": "The service request is processed successfully",
    "payment_link_id": 5,
    "service_fee": 10.00,
    "is_deposit": false,
    "type": "PAYMENT"
  }
}
```

**Expected Response:**
Your webhook endpoint must respond with HTTP 200-299 status code:
```json
{
  "status": "received"
}
```

**Payment Status Values:**
- `pending` - Payment initiated, waiting for customer confirmation
- `completed` - Payment successful - funds received
- `failed` - Payment failed - customer cancelled or insufficient funds
- `cancelled` - Payment was cancelled by customer

## Webhook Configuration

### Setting Up Webhooks in PayFlow Dashboard

1. Log in to your [PayFlow Dashboard](https://payflow.top)
2. Navigate to **Settings → Webhook/Callback URL Settings**
3. Enter your webhook endpoint: `https://your-domain.com/api/mpesa/callback`
4. Enable webhook notifications
5. Save and test your configuration

### Webhook Security Best Practices

1. **Always use HTTPS** for your webhook endpoint in production
2. **Validate webhook payload** before processing
3. **Handle duplicate webhooks** gracefully (use transaction_id for idempotency)
4. **Process webhooks asynchronously** - respond immediately (within 5 seconds)
5. **Implement retry logic** - PayFlow will retry failed webhooks up to 3 times
6. **Log all webhook deliveries** for debugging and auditing

### Webhook Retry Logic

- **Maximum retries:** 3 attempts
- **Retry window:** 24 hours from original webhook
- **Failed webhooks:** Visible in PayFlow dashboard

## API Error Handling

PayFlow uses standard HTTP status codes:

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API credentials |
| 404 | Not Found - Resource not found |
| 405 | Method Not Allowed |
| 500 | Internal Server Error |

### Common Error Messages

- **Insufficient service balance** - Top up your account to cover transaction fees
- **Invalid payment account ID** - Check your Payment Account ID in dashboard
- **Invalid payment account ID** - Verify the payment account is active
- **Transaction not found** - Check that all required parameters are provided
- **Missing required parameter** - Ensure all required fields are included

## Testing

### Test Credentials

PayFlow provides a sandbox environment for testing. Use your sandbox API keys from the PayFlow dashboard.

### Test Phone Numbers

In sandbox mode, you can use any phone number in the format: `254XXXXXXXXX`

For testing webhook delivery, PayFlow provides a webhook testing tool in your dashboard.

## Production Deployment

### Before Going Live

1. ✅ Switch to production API keys
2. ✅ Update `NEXT_PUBLIC_APP_URL` to your production domain
3. ✅ Configure production webhook URL in PayFlow dashboard
4. ✅ Test end-to-end payment flow
5. ✅ Set up error monitoring and logging
6. ✅ Implement request signature verification (coming soon in PayFlow)
7. ✅ Enable HTTPS for webhook endpoint

### Monitoring

Monitor these metrics in your PayFlow dashboard:
- Total webhooks sent
- Success and failure rates
- Recent delivery logs
- Error messages for failed deliveries

## Troubleshooting

### Payment Not Processing

1. Verify API Key and API Secret are correct
2. Check Payment Account ID is valid and active
3. Confirm phone number format: `254XXXXXXXXX` (11 digits)
4. Check account balance covers transaction fees
5. Review API response for specific error message

### Webhooks Not Received

1. Verify webhook URL is HTTPS in production
2. Check firewall/WAF allows PayFlow IP addresses
3. Ensure webhook endpoint responds with 200-299 status code
4. Check PayFlow dashboard for failed deliveries
5. Review application logs for webhook processing errors

### "Invalid API credentials" Error

1. Verify API Key is not truncated
2. Verify API Secret is not truncated
3. Confirm credentials are from the correct PayFlow account
4. Check you're using the correct environment (sandbox vs production)

## API Reference

### Required Headers for All Requests

```
X-API-Key: your_api_key
X-API-Secret: your_api_secret
Content-Type: application/json
```

### Payment Status Endpoints

**Check Payment Status:**
```
GET /payments/{transaction_id}
```

**List Transactions:**
```
GET /payments?limit=50&offset=0
```

## Support

For support with PayFlow integration:

1. Check the [PayFlow Documentation](https://payflow.top/docs)
2. Review your PayFlow dashboard for error logs
3. Contact PayFlow support via your dashboard

## Code Examples

### Frontend - Initiate Payment

```javascript
async function initiatePayment(phone, amount) {
  const response = await fetch('/api/mpesa/stk-push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phoneNumber: phone,
      amount: amount,
      accountReference: 'ORDER123',
      transactionDesc: 'Payment for order'
    })
  });
  
  return response.json();
}
```

### Backend - Handle Webhook

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Validate webhook is from PayFlow
  const event = body.event;
  const transactionId = body.data?.transaction_id;
  const status = body.data?.status;
  
  // Process payment status
  if (status === 'completed') {
    // Update database, send confirmation, etc.
  }
  
  // Respond immediately to acknowledge receipt
  return NextResponse.json({ status: 'received' });
}
```
