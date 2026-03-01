# Cloudflare Pages Build Configuration

## Build Settings for Cloudflare Pages Dashboard

### Framework preset
**None** (ya da Custom)

### Build command
```
npm run build
```

### Build output directory
```
dist
```

### Root directory (optional)
```
/
```

### Environment variables (optional)
```
NODE_VERSION=20
```

## Alternative: Using wrangler.toml

Layihədə `wrangler.toml` faylı mövcuddur və avtomatik konfiqurasiya təmin edir.

## Troubleshooting

### Error: "Failed: error occurred while running deploy command"

**Həll 1: Node versiyasını yoxlayın**
- `.node-version` faylı mövcuddur (Node 20)
- Cloudflare Pages Node 20-ni dəstəkləyir

**Həll 2: Build komandası düzgündür**
- `npm run build` istifadə edin
- Shell komandaları əvəzinə Node.js script istifadə edilir

**Həll 3: Dependencies**
Bütün dependencies `package.json`-dadır və `npm install` avtomatik işləyir.

**Həll 4: Minimal konfiqurasiya**
```json
{
  "build": {
    "command": "npm install && npm run build",
    "publish": "dist"
  }
}
```

## Manual Deploy (if automatic fails)

```bash
# Local build
npm run build

# Check dist folder
ls -la dist/
ls -la dist/static/

# Deploy
wrangler pages deploy dist --project-name webapp
```

## Success Indicators

✅ Build output shows:
- `vite build` completed
- Static files copied
- `dist/` folder contains `_worker.js` and `static/`

✅ Deployment shows:
- Files uploaded successfully
- Deployment URL provided

## Common Issues

### Issue 1: "Module not found"
**Fix**: Ensure all dependencies in package.json

### Issue 2: "Build failed"
**Fix**: Check Node version (should be 20)

### Issue 3: "Static files not found"
**Fix**: Verify `dist/static/` exists after build
