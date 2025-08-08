#!/bin/bash

# Generate NextAuth Secret
echo "Generating NextAuth Secret..."
echo "Copy this value for NEXTAUTH_SECRET:"
echo ""

if command -v openssl &> /dev/null; then
    openssl rand -base64 32
else
    echo "OpenSSL not found. Use this online generator instead:"
    echo "https://generate-secret.vercel.app/32"
fi

echo ""
echo "Add this to your Vercel environment variables as NEXTAUTH_SECRET"
