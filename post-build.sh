#!/bin/bash

# Cloudflare Pages Post-Build Script
# Bu script build-dən sonra avtomatik işə düşür

echo "📦 Post-build: Copying static files..."

# Node script ilə static faylları kopyala
node copy-static.js

# Verify
if [ -d "dist/static" ]; then
    echo "✅ Static files copied successfully!"
    ls -la dist/static/
else
    echo "❌ Error: dist/static directory not found!"
    exit 1
fi

echo "✅ Post-build completed!"
