#!/bin/bash

# Quick test script for Shopify webhook
# Usage: ./test-webhook-now.sh [webhook_secret]

WEBHOOK_SECRET=${1:-}

if [ -z "$WEBHOOK_SECRET" ]; then
  echo "Usage: ./test-webhook-now.sh [webhook_secret]"
  echo ""
  echo "Get your webhook secret from:"
  echo "Shopify Admin → Settings → Notifications → Webhooks → Click your webhook → Copy signing secret"
  exit 1
fi

SUPABASE_URL="https://pohosrfblmcmpxixlrjk.supabase.co"
URL="$SUPABASE_URL/functions/v1/shopify-order-webhook"
ORDER_ID=123456789
EMAIL="test@example.com"

# Create test order payload
ORDER_PAYLOAD=$(cat <<EOF
{
  "id": $ORDER_ID,
  "order_number": 1001,
  "email": "$EMAIL",
  "customer": {
    "id": 12345,
    "email": "$EMAIL",
    "first_name": "Test",
    "last_name": "User"
  },
  "line_items": [
    {
      "id": 111111,
      "product_id": 9846187786568,
      "variant_id": 123456,
      "title": "Standard Course",
      "quantity": 1,
      "price": "99.00"
    }
  ],
  "financial_status": "paid",
  "created_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
)

# Calculate HMAC signature
SIGNATURE=$(echo -n "$ORDER_PAYLOAD" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" -binary | base64)

echo "Testing webhook..."
echo "URL: $URL"
echo "Order ID: $ORDER_ID"
echo "Email: $EMAIL"
echo ""

# Send webhook
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "x-shopify-hmac-sha256: $SIGNATURE" \
  -H "x-shopify-webhook-id: test-webhook-$ORDER_ID" \
  -H "x-shopify-topic: orders/paid" \
  -d "$ORDER_PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "HTTP Status: $HTTP_CODE"
echo "Response:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Webhook test successful!"
  echo ""
  echo "Check the database:"
  echo "  SELECT * FROM enrollments WHERE shopify_customer_email = 'test@example.com';"
  echo "  SELECT * FROM webhook_events ORDER BY created_at DESC LIMIT 5;"
else
  echo "❌ Webhook test failed"
  echo ""
  echo "Common issues:"
  echo "  - HTTP 401: Check webhook secret is correct"
  echo "  - HTTP 404: Function not deployed or URL wrong"
  echo "  - HTTP 500: Check Supabase function logs"
fi
