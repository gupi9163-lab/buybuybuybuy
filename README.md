# BDU Tələbə Köməkçisi 🎓

## Layihə Haqqında
BDU Tələbə Köməkçisi - Bakı Dövlət Universiteti tələbələri üçün akademik hesablama vasitəsi. PWA (Progressive Web App) texnologiyası ilə hazırlanmışdır və internetə daxil olmadan da işləyir.

## 🌐 URL-lər
- **Development URL**: https://3000-itqzvydsxcmcjdico8wy1-5634da27.sandbox.novita.ai
- **GitHub Repository**: https://github.com/gupi9163-lab/buybuybuybuy

## ✨ Əsas Funksiyalar

### ✅ Hazır olan funksiyalar:
1. **Semestr Bal Hesablama**
   - Seminar balları (maksimum 9)
   - Kollekvium balları (maksimum 4)
   - Sərbəst iş balı (0-10)
   - Davamiyyət balı (saat və qayıb əsasında avtomatik hesablanır)
   - Düstur: (seminar orta×0.4 + kollekvium orta×0.6)×3 + davamiyyət + sərbəst iş

2. **ÜOMG Hesablama**
   - Fənn sayı və kredit əsasında
   - Düstur: (bal₁×kredit₁ + bal₂×kredit₂ + ... + balₙ×kreditₙ) / (kredit₁ + kredit₂ + ... + kreditₙ)

3. **Kəsr Pulu Hesablama (25%)**
   - İllik ödəniş və fənnin kredit sayı əsasında
   - Düstur: ((illik ödəniş/60)×kredit sayı)/4 + 1

4. **Yaş Hesablayıcı**
   - Doğum tarixinə əsasən:
     - Yaşınız
     - Neçə gün yaşadığınız
     - Növbəti ad gününüzə qalan günlər

5. **Lüğət Bölməsi**
   - Akademik terminlərin izahı
   - İlk termin: "Mühazirə - Müəllimin keçdiyi dərs"

6. **Məlumat Bölməsi**
   - Faydalı akademik məlumatlar
   - "Əlaçı olmaq üçün bütün fənnlər 91+ olmalıdır"

7. **Sürətli Linklər**
   - BDU rəsmi web saytı
   - SemsLogin akademik portalı
   - BDU WhatsApp, Instagram, Telegram kanalları
   - Tələbə chat qrupu

### 🚀 PWA Xüsusiyyətləri:
- ✅ Offline işləmə (Service Worker)
- ✅ Ana ekrana quraşdırma butonu
- ✅ Mobil tətbiq kimi istifadə
- ✅ Manifest.json və ikonlar

### 💚 WhatsApp Reklam Banneri:
- ✅ Səhifənin yuxarısında sabit banner
- ✅ "ən ucuz sərbəst iş hazırlanması"
- ✅ +994559406018 nömrəsinə birbaşa əlaqə

## 🏗️ Texnologiyalar
- **Backend**: Hono Framework
- **Frontend**: HTML, TailwindCSS, JavaScript
- **PWA**: Service Worker, Manifest
- **Deployment**: Cloudflare Pages
- **Build Tool**: Vite

## 📂 Layihə Strukturu
```
webapp/
├── src/
│   └── index.tsx          # Hono backend
├── public/
│   └── static/
│       ├── app.js         # Frontend JavaScript
│       ├── styles.css     # CSS stilləri
│       ├── sw.js          # Service Worker
│       ├── manifest.json  # PWA manifest
│       ├── icon-192.png   # PWA ikonu 192x192
│       └── icon-512.png   # PWA ikonu 512x512
├── dist/                  # Build çıxışı
├── package.json
├── vite.config.ts
├── wrangler.jsonc         # Cloudflare konfiqurasiyası
└── ecosystem.config.cjs   # PM2 konfiqurasiyası
```

## 🎨 Dizayn Xüsusiyyətləri
- Responsive dizayn (mobil və desktop)
- Gradient rənglər və hover effektləri
- Font Awesome ikonları
- TailwindCSS utility classları
- Smooth keçidlər və animasiyalar

## 📱 İstifadə Təlimatı

### Quraşdırma:
1. Sayta daxil olun
2. "Tətbiqi Quraşdırın" düyməsini basın
3. Ana ekrana əlavə edin
4. İnternetə daxil olmadan istifadə edin

### Hesablama:
1. Ana səhifədə istədiyiniz hesablayıcını seçin
2. Tələb olunan məlumatları daxil edin
3. "Hesabla" düyməsini basın
4. Nəticənizi görün

## 🚀 Development

### Local işlətmə:
```bash
npm install
npm run build
pm2 start ecosystem.config.cjs
```

### Cloudflare Pages deploy:
```bash
npm run build
wrangler pages deploy dist --project-name webapp
```

## 📊 Bal Dərəcələndirmə Sistemi
- 50+ bal: 🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅
- 45-49 bal: 🔥 ÇOX YAXŞI 📊
- 41-44 bal: 💣 YAXŞI 📈
- 36-40 bal: 🫂 KAFİ 📉
- 26-35 bal: 🎭 ZƏİF 📴
- 0-25 bal: 🗿 YAXŞI OLACAQ 🆒
- 0 bal: ⚠️ 0 BAL ⚠️

## 🔧 Növbəti Addımlar
- Lüğət bölməsinə daha çox termin əlavə edilə bilər
- Məlumat bölməsinə daha çox faydalı məlumatlar əlavə edilə bilər
- İstifadəçi parametrlərinin yerli saxlanması (LocalStorage)
- Daha çox hesablayıcı funksiyaları

## 📞 Əlaqə
- **WhatsApp**: +994559406018
- **Instagram**: @desespere_etoile
- **GitHub**: gupi9163-lab

## 🎓 BDU Linkləri
- [BDU Rəsmi Web Saytı](https://bdu.edu.az)
- [SemsLogin Portal](https://semslogin.bdu.edu.az)
- [BDU WhatsApp Kanal](https://whatsapp.com/channel/0029Va85Ls85q08WyYoGeJ3r)
- [BDU Instagram](https://www.instagram.com/bdu_eduaz)
- [BDU Telegram](https://t.me/bdu_eduaz)
- [Tələbə Chat Qrupu](https://t.me/+WUKxtnDjo2E5YTcy)

---

**Status**: ✅ Aktiv
**Son yeniləmə**: 01.03.2026
**Versiya**: 1.0.0
