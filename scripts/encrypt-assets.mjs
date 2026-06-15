/**
 * Cifra las imágenes reales de src/assets/images/ y las guarda en src/assets/private/.
 * Las imágenes originales se ignoran por git; solo los archivos .enc se suben al repo público.
 *
 * Uso:
 *   PRIVATE_ASSETS_KEY="tu-clave-secreta" npm run encrypt-assets
 */
import { createHash, randomBytes, createCipheriv } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, extname } from 'node:path';

const SOURCE_DIR = 'src/assets/images';
const TARGET_DIR = 'src/assets/private';
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

const key = process.env.PRIVATE_ASSETS_KEY
  ? createHash('sha256').update(process.env.PRIVATE_ASSETS_KEY).digest()
  : null;

if (!key) {
  console.error('Error: definí la variable de entorno PRIVATE_ASSETS_KEY antes de cifrar.');
  process.exit(1);
}

function* walkImages(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkImages(fullPath);
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

function encryptBuffer(plaintext) {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('base64')}`;
}

let count = 0;

for (const sourcePath of walkImages(SOURCE_DIR)) {
  const relPath = relative(SOURCE_DIR, sourcePath);
  const targetPath = join(TARGET_DIR, `${relPath}.enc`);

  mkdirSync(dirname(targetPath), { recursive: true });

  const plaintext = readFileSync(sourcePath);
  const encrypted = encryptBuffer(plaintext);
  writeFileSync(targetPath, encrypted, 'utf8');

  console.log(`🔒 ${relPath} → ${targetPath}`);
  count++;
}

if (count === 0) {
  console.log('No se encontraron imágenes para cifrar en', SOURCE_DIR);
} else {
  console.log(`\n✅ ${count} imagen(es) cifrada(s). Recordá commitear src/assets/private/ y mantener PRIVATE_ASSETS_KEY en GitHub Secrets.`);
}
