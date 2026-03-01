#!/bin/bash

# Cloudflare Pages Deploy Script

echo "🚀 BDU Tələbə Köməkçisi - Cloudflare Pages Deploy"
echo "================================================"

# 1. Build layihəsi
echo "📦 Build edilir..."
npm run build

# 2. _routes.json düzəlt
echo "📝 _routes.json düzəldilir..."
cat > dist/_routes.json << 'ROUTES'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/static/*"]
}
ROUTES

# 3. dist strukturunu yoxla
echo "📂 dist strukturu:"
ls -la dist/
echo ""
ls -la dist/static/

echo ""
echo "✅ Build tamamlandı!"
echo ""
echo "🌐 Deploy etmək üçün:"
echo "   wrangler pages deploy dist --project-name webapp"
echo ""
echo "⚠️  Əvvəlcə Cloudflare API key quraşdırın:"
echo "   Deploy tab-a keçin və API key əlavə edin"
