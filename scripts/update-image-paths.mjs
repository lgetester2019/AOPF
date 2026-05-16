#!/usr/bin/env node
/**
 * update-image-paths.mjs
 * ----------------------
 * Заменяет пути к изображениям в коде на оптимизированные версии.
 * Запускать ПОСЛЕ optimize-images.mjs
 *
 * Запуск:
 *   node scripts/update-image-paths.mjs
 *   node scripts/update-image-paths.mjs --dry-run
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DRY_RUN   = process.argv.includes('--dry-run');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'public', 'out']);
const EXTS = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.mdx']);

// Карта замен: старый путь → новый путь
// Ключ — точная строка которая встречается в src="..." или url(...)
const PATH_MAP = [
  ['/sout.webp',         '/sout-opt.webp'],
  ['/risks.webp',  '/risks-opt.webp'],
  ['/certificates/Уведомление о внесение в реестр.jpg', '/certificates/uvedomlenie.webp'],
  ['/measurements.webp', '/measurements-opt.webp'],
  // Аттестат — кириллица в пути, заменяем оба варианта (raw и encoded)
  [
    '/certificates/Аттестат аккредитации.jpg',
    '/certificates/attestat.webp',
  ],
  [
    '/certificates/%D0%90%D1%82%D1%82%D0%B5%D1%81%D1%82%D0%B0%D1%82%20%D0%B0%D0%BA%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%B0%D1%86%D0%B8%D0%B8.jpg',
    '/certificates/attestat.webp',
  ],
  ['/certificates/2024.webp', '/certificates/2024-opt.webp'],
  ['/certificates/2023.webp', '/certificates/2023-opt.webp'],
];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (EXTS.has(path.extname(e.name))) out.push(p);
  }
  return out;
}

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║         Обновление путей к изображениям в коде           ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');
if (DRY_RUN) console.log('⚠️  Режим --dry-run: файлы НЕ изменяются.\n');

const files = walk(ROOT);
let totalChanges = 0;
let totalFiles   = 0;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;
  let fileChanges = 0;

  for (const [from, to] of PATH_MAP) {
    if (src.includes(from)) {
      const count = (src.split(from).length - 1);
      src = src.split(from).join(to);
      fileChanges += count;
      changed = true;
    }
  }

  if (changed) {
    totalChanges += fileChanges;
    totalFiles++;
    const rel = path.relative(ROOT, file);
    if (!DRY_RUN) fs.writeFileSync(file, src, 'utf8');
    console.log(`  ${DRY_RUN ? '👀' : '✅'} ${rel}  (${fileChanges} замен)`);
  }
}

console.log('\n' + '─'.repeat(58));
if (totalChanges === 0) {
  console.log('\n  ℹ️  Старых путей не найдено — возможно, уже заменены.\n');
} else if (DRY_RUN) {
  console.log(`\n👀 Dry-run: ${totalChanges} замен в ${totalFiles} файлах.`);
  console.log('   node scripts/update-image-paths.mjs\n');
} else {
  console.log(`\n✅ Готово: ${totalChanges} замен в ${totalFiles} файлах.\n`);
  console.log('📋 Следующие шаги:\n');
  console.log('  Соберите и проверьте:');
  console.log('    npm run build && npm run start\n');
  console.log('  Затем запустите Lighthouse на http://localhost:3000\n');
  console.log('  Зафиксируйте:');
  console.log('    git add .');
  console.log('    git commit -m "perf: optimize images, reduce ~5 MB payload"\n');
}
