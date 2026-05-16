#!/usr/bin/env node
/**
 * fix-green-contrast.mjs
 * ----------------------
 * Находит все классы Tailwind green-*, которые не проходят
 * проверку контраста WCAG AA (4.5:1 на белом фоне),
 * и заменяет их на минимально тёмный вариант, который проходит.
 *
 * Запуск из корня проекта:
 *   node scripts/fix-green-contrast.mjs
 *
 * Флаги:
 *   --dry-run   только показать что будет изменено, не трогать файлы
 *   --verbose   показывать каждое найденное совпадение
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ─── Настройки ─────────────────────────────────────────────────────────────

const DRY_RUN  = process.argv.includes('--dry-run');
const VERBOSE  = process.argv.includes('--verbose');

const __dirname   = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');   // корень проекта

// Папки, которые пропускаем при обходе
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', '.turbo', '.cache', 'out']);

// Расширения файлов, в которых ищем классы
const SCAN_EXTENSIONS = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.mdx']);

// Префиксы Tailwind, к которым применяется цвет
const COLOR_PREFIXES = [
  'text-', 'bg-', 'border-', 'ring-', 'outline-',
  'decoration-', 'divide-', 'caret-', 'accent-',
  'fill-', 'stroke-', 'shadow-',
  'from-', 'to-', 'via-',
  'placeholder-',
];

// Порог контраста WCAG AA для обычного текста
const MIN_CONTRAST = 4.5;
const BG_WHITE = '#ffffff';

// ─── Цвета Tailwind CSS v3 — green ─────────────────────────────────────────

const GREEN = {
  50:  '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
};

const SHADE_NUMBERS = Object.keys(GREEN).map(Number); // [50,100,...,950]

// ─── Математика контраста ───────────────────────────────────────────────────

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function linearize(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrast(fg, bg) {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const bright = Math.max(L1, L2);
  const dark   = Math.min(L1, L2);
  return (bright + 0.05) / (dark + 0.05);
}

// ─── Строим таблицу: какой shade нужно заменить и на что ───────────────────

/**
 * replacementMap: { '600': '700', '500': '700', ... }
 * Для каждого shade, который не проходит 4.5:1,
 * находим минимально тёмный shade, который проходит.
 */
const contrastByShade = {};
const replacementMap  = {};   // shade (string) → replacement shade (string)

for (const num of SHADE_NUMBERS) {
  const hex = GREEN[num];
  contrastByShade[num] = contrast(hex, BG_WHITE);
}

for (const num of SHADE_NUMBERS) {
  if (contrastByShade[num] < MIN_CONTRAST) {
    const darkerOptions = SHADE_NUMBERS.filter(n => n > num);
    for (const darker of darkerOptions) {
      if (contrastByShade[darker] >= MIN_CONTRAST) {
        replacementMap[String(num)] = String(darker);
        break;
      }
    }
  }
}

// ─── Вывод таблицы контраста ────────────────────────────────────────────────

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║   Контраст Tailwind green-* на белом фоне (норма ≥ 4.5:1)   ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

for (const num of SHADE_NUMBERS) {
  const hex  = GREEN[num];
  const c    = contrastByShade[num];
  const ok   = c >= MIN_CONTRAST;
  const repl = replacementMap[String(num)];
  const tag  = ok
    ? '✅ проходит  '
    : `❌ не проходит → заменить на green-${repl ?? '???'}`;

  console.log(
    `  green-${String(num).padEnd(4)}  ${hex}   ${c.toFixed(2).padStart(4)}:1   ${tag}`,
  );
}

const failingShades = Object.keys(replacementMap);

if (failingShades.length === 0) {
  console.log('\n✅ Все оттенки green проходят проверку. Скрипт завершён.\n');
  process.exit(0);
}

console.log(`\nБудут заменены: ${failingShades.map(s => `green-${s}`).join(', ')}\n`);
if (DRY_RUN) {
  console.log('⚠️  Режим --dry-run: файлы изменены НЕ будут.\n');
}

// ─── Обход файлов ───────────────────────────────────────────────────────────

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

/**
 * Строим одно регулярное выражение, которое ловит:
 *
 *   [любые-модификаторы:]ПРЕФИКС-green-SHADE[/opacity]
 *
 * Примеры совпадений:
 *   text-green-600
 *   hover:text-green-600
 *   md:hover:text-green-600
 *   bg-green-600/50
 *   border-green-500
 *
 * Группы:
 *   1 — всё до shade-числа (включая префикс)
 *   2 — число shade (600, 500, ...)
 *   3 — хвост (/opacity или ничего) + граница
 */
function buildRegex() {
  const prefixAlt = COLOR_PREFIXES
    .map(p => p.replace(/-/g, '\\-'))
    .join('|');

  const shadeAlt = failingShades.join('|');

  // Граница: после числа должен быть пробел, кавычка, конец строки,
  // закрывающая скобка или слеш opacity — но не ещё одна цифра.
  return new RegExp(
    `((?:[\\w:-]*(?:${prefixAlt}))green-)(${shadeAlt})(?=(\/[0-9]+)?(?:[\\s"'\`}\\]>]|$))`,
    'g',
  );
}

const PATTERN = buildRegex();

// ─── Поиск и замена ─────────────────────────────────────────────────────────

console.log('🔍 Сканирую файлы...\n');

const allFiles = walkFiles(PROJECT_ROOT);
let totalMatches = 0;
const changedFiles = [];

for (const file of allFiles) {
  const original = fs.readFileSync(file, 'utf8');

  // Сбрасываем lastIndex перед каждым файлом
  PATTERN.lastIndex = 0;

  let fileMatches = 0;
  const modified = original.replace(PATTERN, (match, prefix, shade, _suffix, offset) => {
    const replacement = replacementMap[shade];
    if (!replacement) return match;   // на всякий случай
    fileMatches++;

    if (VERBOSE) {
      const rel = path.relative(PROJECT_ROOT, file);
      // Найдём номер строки
      const lineNum = original.slice(0, offset).split('\n').length;
      console.log(`    ${rel}:${lineNum}  ${match} → ${prefix}green-${replacement}`);
    }
    return `${prefix}green-${replacement}`;
  });

  if (fileMatches > 0) {
    totalMatches += fileMatches;
    const rel = path.relative(PROJECT_ROOT, file);
    changedFiles.push({ rel, count: fileMatches });

    if (!DRY_RUN) {
      fs.writeFileSync(file, modified, 'utf8');
    }
    console.log(`  ${DRY_RUN ? '👀' : '✅'} ${rel}  (${fileMatches} замен)`);
  }
}

// ─── Итог ───────────────────────────────────────────────────────────────────

console.log('\n' + '─'.repeat(64));

if (totalMatches === 0) {
  console.log('\n✅ Проблемных классов green-* в проекте не найдено.\n');
  console.log('   Возможно, цвет задан через кастомный CSS или inline-стили.');
  console.log('   Поищите вручную: Ctrl+Shift+F → #00a63e или color: green\n');
  process.exit(0);
}

if (DRY_RUN) {
  console.log(`\n👀 Dry-run: найдено ${totalMatches} замен в ${changedFiles.length} файлах.`);
  console.log('   Запустите без --dry-run, чтобы применить изменения:\n');
  console.log('   node scripts/fix-green-contrast.mjs\n');
} else {
  console.log(`\n✅ Готово! Исправлено ${totalMatches} вхождений в ${changedFiles.length} файлах.\n`);
  console.log('📋 Что делать дальше:\n');
  console.log('  1. Проверьте изменения визуально:');
  console.log('     git diff\n');
  console.log('  2. Запустите сайт локально и убедитесь, что вид не испортился:');
  console.log('     npm run dev\n');
  console.log('  3. Зафиксируйте изменения:');
  console.log('     git add .');
  console.log('     git commit -m "fix: improve green color contrast for WCAG AA compliance"\n');
}
