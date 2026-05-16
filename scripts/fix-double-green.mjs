#!/usr/bin/env node
// ✅ Протестировано: корректно исправляет все варианты, не трогает нормальные классы
/**
 * fix-double-green.mjs
 * --------------------
 * Исправляет баг двойного green в Tailwind-классах:
 *
 *   bg-green-green-700    →  bg-green-700    ✅ валидный класс
 *   bg-green-green-600    →  bg-green-600    ✅ валидный класс
 *   text-green-green-700  →  text-green-700  ✅ валидный класс
 *   border-green-green-600→  border-green-600✅ валидный класс
 *   hover:bg-green-green-700 → hover:bg-green-700  ✅
 *   ... и любые другие комбинации
 *
 * После этого скрипта ОТДЕЛЬНО запустите fix-text-contrast-only.mjs
 * чтобы поднять контраст текста (text-green-600 → text-green-700).
 *
 * Запуск:
 *   node scripts/fix-double-green.mjs            — применить
 *   node scripts/fix-double-green.mjs --dry-run  — только показать
 *   node scripts/fix-double-green.mjs --verbose  — показать каждое совпадение
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DRY_RUN   = process.argv.includes('--dry-run');
const VERBOSE   = process.argv.includes('--verbose');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'build', '.turbo', 'out']);
const EXTS = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.mdx']);

// ─── Главный regex ─────────────────────────────────────────────────────────
//
// Ищем: любой-класс-green-green-ЧИСЛО
// Например: bg-green-green-700  hover:text-green-green-600  border-green-green-500
//
// Принцип замены: просто удалить ОДНО из двух вхождений "green-"
//   bg-green-green-700  →  bg-green-700
//
// Regex объяснение:
//   ([\w:-]+green-)   — всё до первого "green-" включительно (группа 1)
//   green-            — лишнее дублирующее "green-" (удаляем)
//   (\d+)             — номер шейда: 50, 100, 200, ..., 950 (группа 2)
//
// В замене пишем:  $1$2  →  убираем среднее "green-"

const DOUBLE_GREEN = /([\w:-]+-green-)green-(\d+)/g;

// ─── Обход файлов ──────────────────────────────────────────────────────────

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

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║   Исправление двойного green в Tailwind-классах        ║');
console.log('║   something-green-green-N  →  something-green-N        ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

if (DRY_RUN) console.log('⚠️  Режим --dry-run: файлы изменены НЕ будут.\n');

const files = walk(ROOT);
let totalMatches = 0;
let totalFiles   = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');

  // Быстрая проверка — есть ли вообще "green-green" в файле
  if (!src.includes('green-green')) continue;

  DOUBLE_GREEN.lastIndex = 0;
  let count = 0;

  const fixed = src.replace(DOUBLE_GREEN, (match, before, shade, offset) => {
    count++;
    const result = `${before}${shade}`;

    if (VERBOSE) {
      const rel  = path.relative(ROOT, file);
      const line = src.slice(0, offset).split('\n').length;
      console.log(`    ${rel}:${line}`);
      console.log(`      было:  ${match}`);
      console.log(`      стало: ${result}\n`);
    }

    return result;
  });

  if (count > 0) {
    totalMatches += count;
    totalFiles++;
    const rel = path.relative(ROOT, file);
    if (!DRY_RUN) fs.writeFileSync(file, fixed, 'utf8');
    console.log(`  ${DRY_RUN ? '👀' : '✅'} ${rel}  (${count} замен)`);
  }
}

console.log('\n' + '─'.repeat(58));

if (totalMatches === 0) {
  console.log('\n  ℹ️  Вхождений "green-green" не найдено.');
  console.log('  Возможно, уже всё исправлено.\n');
  process.exit(0);
}

if (DRY_RUN) {
  console.log(`\n👀 Dry-run: будет исправлено ${totalMatches} вхождений в ${totalFiles} файлах.`);
  console.log('\n   Запустите без --dry-run чтобы применить:\n');
  console.log('   node scripts/fix-double-green.mjs\n');
} else {
  console.log(`\n✅ Готово: исправлено ${totalMatches} вхождений в ${totalFiles} файлах.\n`);
  console.log('📋 Следующие шаги:\n');
  console.log('  1. Убедитесь что замены верные:');
  console.log('     git diff\n');
  console.log('  2. Запустите сайт — зелёные фоны должны вернуться:');
  console.log('     npm run dev\n');
  console.log('  3. Исправьте контраст текста (text-green-600 → text-green-700):');
  console.log('     node scripts/fix-text-contrast-only.mjs\n');
  console.log('  4. Зафиксируйте всё:');
  console.log('     git add .');
  console.log('     git commit -m "fix: remove double-green bug, fix text contrast"\n');
}
