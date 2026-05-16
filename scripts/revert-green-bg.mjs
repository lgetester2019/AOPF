#!/usr/bin/env node
/**
 * revert-green-bg.mjs
 * -------------------
 * Откатывает замены green-* в НЕтекстовых классах (bg-, border-, ring- и т.д.),
 * которые были сделаны предыдущим скриптом ошибочно.
 *
 * Запуск:
 *   node scripts/revert-green-bg.mjs
 *
 * Флаги:
 *   --dry-run   только показать что будет изменено, не трогать файлы
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DRY_RUN   = process.argv.includes('--dry-run');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

const SKIP_DIRS     = new Set(['node_modules', '.next', '.git', 'dist', 'build', '.turbo', '.cache', 'out']);
const SCAN_EXTENSIONS = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.mdx']);

// Только НЕтекстовые префиксы — именно их нужно откатить
const NON_TEXT_PREFIXES = [
  'bg-', 'border-', 'ring-', 'outline-',
  'shadow-', 'fill-', 'stroke-', 'divide-',
  'caret-', 'accent-',
  'from-', 'to-', 'via-',
];

// Карта того, что было заменено (700←600, итд.) — нужно развернуть
// green-600 → green-700 было заменой, теперь откатываем: green-700 → green-600
// (только для NON_TEXT_PREFIXES)
const REVERT_MAP = {
  '700': '600',   // 600 был заменён на 700 — откат
  // Если у вас были green-500 → 700 или green-400 → 700, добавьте:
  // '700': '600',  // уже есть выше — один ключ, один откат
};
// Дополнительно: если скрипт менял green-500/400/300 тоже (они тоже не проходили),
// добавьте строки ниже. Но скорее всего в проекте были только 600 и 700.

function buildRevertRegex() {
  const prefixAlt = NON_TEXT_PREFIXES
    .map(p => p.replace(/-/g, '\\-'))
    .join('|');

  const shadeAlt = Object.keys(REVERT_MAP).join('|');

  return new RegExp(
    `((?:[\\w:-]*(?:${prefixAlt}))green-)(${shadeAlt})(?=(\\/[0-9]+)?(?:[\\s"'\`}\\]>]|$))`,
    'g',
  );
}

function walkFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

console.log('\n🔄 Откат: возвращаем зелёные ФОНЫ и РАМКИ в исходное состояние...\n');
if (DRY_RUN) console.log('⚠️  Режим --dry-run: файлы изменены НЕ будут.\n');

const PATTERN = buildRevertRegex();
const files = walkFiles(PROJECT_ROOT);
let totalFixed = 0;
const changedFiles = [];

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  PATTERN.lastIndex = 0;

  let count = 0;
  const modified = original.replace(PATTERN, (match, prefix, shade) => {
    const revertTo = REVERT_MAP[shade];
    if (!revertTo) return match;
    count++;
    return `${prefix}green-${revertTo}`;
  });

  if (count > 0) {
    totalFixed += count;
    const rel = path.relative(PROJECT_ROOT, file);
    changedFiles.push({ rel, count });
    if (!DRY_RUN) fs.writeFileSync(file, modified, 'utf8');
    console.log(`  ${DRY_RUN ? '👀' : '✅'} ${rel}  (${count} откатов)`);
  }
}

console.log('\n' + '─'.repeat(60));
if (totalFixed === 0) {
  console.log('\n  Ничего не найдено для отката.\n');
} else if (DRY_RUN) {
  console.log(`\n👀 Dry-run: будет откачено ${totalFixed} замен в ${changedFiles.length} файлах.`);
  console.log('   Запустите без --dry-run для применения:\n');
  console.log('   node scripts/revert-green-bg.mjs\n');
} else {
  console.log(`\n✅ Откат завершён: исправлено ${totalFixed} вхождений в ${changedFiles.length} файлах.`);
  console.log('\n📋 Что дальше:\n');
  console.log('  1. Проверьте изменения:   git diff');
  console.log('  2. Запустите сайт:        npm run dev');
  console.log('  3. Убедитесь что зелёные фоны вернулись');
  console.log('  4. Запустите исправленный скрипт для текста:');
  console.log('     node scripts/fix-text-contrast-only.mjs\n');
}
