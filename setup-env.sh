#!/bin/bash

# Setup script for Google Sheets environment variables
echo "Setting up Google Sheets environment variables..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    touch .env
fi

# Add the properly formatted private key and other variables
cat >> .env << 'EOF'

# Google Sheets Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL="google-shopping-data-reader@thetis-website-465612.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNgcKgycIlb2Gv
mS6q/RKy9bmxica0qN3EPAE+UklWNoH8suTFmvB4PbgVPle6Efrhm4Y/t0isE/hR
raa0QjuoGJi2zdB8+Vc1UEcATxx7LvVulJ7g+8nrxtQElQ3wT3yDMiJtfueyaNdt
fCWtHyMVvnp7LJ5Jv2TR3NRQIS9Zb1/jZbAvOQybIoZM+iPfXnPJVUM9jHOvhT2B
7R1eJbmg5lsYO2LrS3qKbYtEGpjmynD411Zuu+GsgXRAwdwCQJtHRKXvNOBH/99c
SuTy0n0Gigy1qWZT6Xv+Y/wKA+p3P0LxqcdwX9XBz3yb9gvdoMEcyzaHOX1IOqEp
YYHDd7nfAgMBAAECggEADbUVWaAw1kpi8PworrheokKIS51C/GiJvOhmX3/MQHc2
SGKuUQ06nj/k+BXGct92z8w4h3t0L3Yi3rUpz2WI5ndtiD6behqE2fDW1jXF/Tlu
nseZqVa3azCXPQ8BdQFNmXqjQpEaZz4IUIHdXs9wNFJrh60RichoXc8lojVJxo9B
QGafFApBwjo2i5nGeZcuUJnMcGV5aZ3ktHrCVJxp/mr+qw8ngN3/fES2RNDCptyc
lFu83yByDVAvNAYgQFggzLvMgdoEn/G9z1MrFO3pho1aUOwBwW8mjNUYRFuAzOJY
gGIUSFOOYc9bxXxtuCmwz8CUdaK4/EhJtlfttHhaEQKBgQDwwHCXQZpNx8X5C6QZ
tdMUPLEJF/fU0Ng8JbdGZSFrMcSnyb3QxNvVJITHuJbY1r2gCDWhhPnEso65wuJx
s185E6pUoGoDfcVgh371FBLV2EdaMWsMKPaymSC+rBPUBFdRx2Lb8rxOqP9k7O/W
Rks6fQw3JKkWApnEOvY/1FYJuwKBgQDahdveF4MngjHBWTYPRmC0op2bbbxWde1T
/aRwIh+tuf7toe8moGTtiFU7FLoW1jGMcS3f2RaSFAO4fQOXX9dwXMveHVWNOVw+
CWhHAbYZoBhnHCNVl/C359c5OLR6/74L8cm2IqQIZyWUm8PEVYEeN/foplmrOYde
ZcDL2NXMLQKBgHB516Ay2/4eqRUzJRWF5vl7aVJQSk64y20+SaOvt6827yNckzun
3PR1PTt5t6/Sk4DilPvC/lWw/hE3RUfNf11RHLCwyRacecwhQWUKXcpeYud2Uwa5
VJgYBj5Ocm0JIipotnz/qI4vUjI6p8o5yQeoSD6y9/P6fxA4Y7dqYk/lAoGBAI5n
NQTiJaIVgf8R99y0bEjKwBKNzHI7n1FgtUwtsJ8x2iNZp9NwKtVwRrqdozdGljuD
dfWuLrs7N8F+Fl0LJAYhMumoDBxgCPCUiNPdFaJVZhGrkIsy3Le76dFsVpDhICQA
iQacRHEFZsQVTdogLmhW6MM/xKeEcebeQGmXAJxxAoGBAN2Yk3XesTvnAzDqY7OA
4rAd7qWmJUAYGMdB4re0fQk5Y8Oh+gzANVKqAzVG2CikGyeZsJ5NtQG54EbRi8wW
nyZcnSJIDFS3SU8a1/Yk9h1/7mBVWQETE7GRQ516MtlkG+I8n5GowyBwtIoW15a5
GuZZ8GMXZSVUTlDJwEhh9ODc
-----END PRIVATE KEY-----"

# Google Sheets IDs (you'll need to add these)
GOOGLE_SHEET_ID_US="your-us-sheet-id-here"
GOOGLE_SHEET_ID_UK="your-uk-sheet-id-here"
EOF

echo "Environment variables added to .env file"
echo ""
echo "Next steps:"
echo "1. Add your actual Google Sheets IDs to GOOGLE_SHEET_ID_US and GOOGLE_SHEET_ID_UK"
echo "2. Restart your development server"
echo "3. The private key is now properly formatted with actual newlines" 