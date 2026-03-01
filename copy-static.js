import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
      console.log(`Copied: ${entry.name}`);
    }
  }
}

console.log('📦 Copying static files...');
const publicStatic = join(__dirname, 'public', 'static');
const distStatic = join(__dirname, 'dist', 'static');

try {
  copyDir(publicStatic, distStatic);
  console.log('✅ Static files copied successfully!');
} catch (err) {
  console.error('❌ Error copying files:', err);
  process.exit(1);
}
