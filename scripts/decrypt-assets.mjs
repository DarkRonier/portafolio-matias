/**
 * Descifra los assets de src/assets/private/ y los coloca en src/assets/images/
 * para que Vite los incluya en la build. Se ejecuta en GitHub Actions durante el deploy.
 *
 * Uso:
 *   PRIVATE_ASSETS_KEY="tu-clave-secreta" npm run decrypt-assets
 */
import { createHash, createDecipheriv } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, dirname, extname } from 'node:path';

const SOURCE_DIR = 'src/assets/private';
const TARGET_DIR = 'src/assets/images';

const key = process.env.PRIVATE_ASSETS_KEY
  ? createHash('sha256').update(process.env.PRIVATE_ASSETS_KEY).digest()
  : null;

if (!key) {
  console.warn('⚠️  PRIVATE_ASSETS_KEY no está definida. Se omitirá el descifrado de assets privados.');
  process.exit(0);
}

if (!existsSync(SOURCE_DIR)) {
  console.log('No existe', SOURCE_DIR, '→ no hay assets privados para descifrar.');
  process.exit(0);
}

function* walkEncrypted(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkEncrypted(fullPath);
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.enc') {
      yield fullPath;
    }
  }
}

function decryptText(text) {
  const [ivHex, authTagHex, encryptedBase64] = text.split(':');
  if (!ivHex || !authTagHex || !encryptedBase64) {
    throw new Error('Formato de archivo cifrado inválido');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encrypted = Buffer.from(encryptedBase64, 'base64');

  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}

let count = 0;

for (const sourcePath of walkEncrypted(SOURCE_DIR)) {
  const relPath = relative(SOURCE_DIR, sourcePath);
  // Quitar la extensión .enc para recuperar el nombre original (ej. foto.png.enc → foto.png)
  const originalPath = relPath.replace(/\.enc$/i, '');
  const targetPath = join(TARGET_DIR, originalPath);

  mkdirSync(dirname(targetPath), { recursive: true });

  const encryptedText = readFileSync(sourcePath, 'utf8');
  const decrypted = decryptText(encryptedText);
  writeFileSync(targetPath, decrypted);

  console.log(`🔓 ${relPath} → ${targetPath}`);
  count++;
}

if (count === 0) {
  console.log('No se encontraron archivos .enc para descifrar en', SOURCE_DIR);
} else {
  console.log(`\n✅ ${count} asset(s) descifrado(s).`);
}
