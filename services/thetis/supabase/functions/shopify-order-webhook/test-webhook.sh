#!/bin/bash

# Test script for Shopify webhook
# Usage: ./test-webhook.sh [local|production] [order_id] [email] [supabase_url] [webhook_secret]

ENV=${1:-local}
ORDER_ID=${2:-123456789}
EMAIL=${3:-test@example.com}
SUPABASE_URL=${4:-}
WEBHOOK_SECRET=${5:-}

if [ "$ENV" = "local" ]; then
  URL="http://127.0.0.1:54321/functions/v1/shopify-order-webhook"
  # Local Supabase requires anon key for auth (default demo key)
  ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
else
  if [ -z "$SUPABASE_URL" ]; then
    echo "Enter your Supabase project URL (e.g., https://xxxxx.supabase.co):"
    read SUPABASE_URL
  fi
  URL="$SUPABASE_URL/functions/v1/shopify-order-webhook"
  ANON_KEY=""
fi

if [ -z "$WEBHOOK_SECRET" ]; then
  echo "Enter your SHOPIFY_WEBHOOK_SECRET:"
  read -s WEBHOOK_SECRET
fi

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

echo ""
echo "Testing webhook..."
echo "URL: $URL"
echo "Order ID: $ORDER_ID"
echo "Email: $EMAIL"
echo ""

# Build headers
HEADERS=(
  -H "Content-Type: application/json"
  -H "x-shopify-hmac-sha256: $SIGNATURE"
  -H "x-shopify-webhook-id: test-webhook-$ORDER_ID"
  -H "x-shopify-topic: orders/paid"
)

# Add Authorization header for local testing
if [ "$ENV" = "local" ] && [ -n "$ANON_KEY" ]; then
  HEADERS+=(-H "Authorization: Bearer $ANON_KEY")
fi

# Send webhook
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL" \
  "${HEADERS[@]}" \
  -d "$ORDER_PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "HTTP Status: $HTTP_CODE"
echo "Response:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Webhook test successful!"
else
  echo "❌ Webhook test failed"
fi
