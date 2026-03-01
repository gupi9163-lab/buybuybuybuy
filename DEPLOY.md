# Cloudflare Pages Deploy Təlimatı

## 📋 Tələblər
1. Cloudflare hesabı
2. Cloudflare API Token

## 🔑 Cloudflare API Token əldə etmək

### 1. Cloudflare Dashboard-a daxil olun
- https://dash.cloudflare.com/

### 2. API Token yaradın
1. Sağ yuxarıdan profilinizə basın
2. "API Tokens" seçin
3. "Create Token" düyməsinə basın
4. "Edit Cloudflare Workers" template-ini seçin
5. Və ya "Custom Token" yaradın bu icazələrlə:
   - **Account** → Cloudflare Pages → Edit
   - **Zone** → DNS → Edit (əgər custom domain istifadə edirsinizsə)

### 3. Token-i kopyalayın və saxlayın

## 🚀 Deploy Addımları

### Metod 1: Wrangler CLI (Tövsiyə edilir)

```bash
# 1. Layihəni build edin
npm run build

# 2. Wrangler ilə login
npx wrangler login

# 3. Pages project yaradın (yalnız ilk dəfə)
npx wrangler pages project create webapp

# 4. Deploy edin
npx wrangler pages deploy dist --project-name webapp
```

### Metod 2: Deploy Script ilə

```bash
# Build və hazırlıq
./deploy.sh

# Deploy
npx wrangler pages deploy dist --project-name webapp
```

### Metod 3: GitHub Pages automatik deploy

Cloudflare Dashboard-dan:
1. Pages → Create a project
2. Connect to Git → GitHub repository seçin
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and Deploy

## 🔧 Environment Variables (əgər lazımdırsa)

Cloudflare Dashboard → Pages → Settings → Environment Variables

## 📱 PWA Test

Deploy-dan sonra:
1. Saytınızı mobil brauzerinizdə açın
2. "Tətbiqi Quraşdırın" butonuna basın
3. Ana ekrana əlavə edin
4. İnterneti söndürün və tətbiqi açın - işləməlidir!

## 🌐 Custom Domain (İstəyə görə)

1. Cloudflare Dashboard → Pages → Custom domains
2. Add custom domain
3. DNS qeydlərini konfiqurasiya edin

## ⚠️ Problemlər və Həllər

### Problem: Static fayllar yüklənmir
**Həll**: `npm run build` yenidən işlədin, `dist/static/` qovluğunun olduğunu yoxlayın

### Problem: PWA offline işləmir
**Həll**: Service Worker qeydiyyatdan keçdiyini yoxlayın (Developer Tools → Application → Service Workers)

### Problem: Wrangler authentication xətası
**Həll**: `npx wrangler login` və ya API token ilə authentication

## 📊 Deploy Status

Deploy-dan sonra alacağınız URL-lər:
- **Production**: `https://webapp.pages.dev`
- **Preview**: `https://[branch].webapp.pages.dev`

## 🔄 Yeniləmələr

Yeni dəyişikliklər üçün:
```bash
git add .
git commit -m "Yeniləmə mesajı"
git push origin main

# Manual deploy
npm run build
npx wrangler pages deploy dist --project-name webapp
```

## 📞 Kömək

Problemlərlə qarşılaşsanız:
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
