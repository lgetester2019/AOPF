#!/usr/bin/env node
/**
 * fix-text-contrast-only.mjs — запускать ПОСЛЕ fix-double-green.mjs
 * Меняет только text-green-600 (и светлее) → text-green-700
 * bg-, border- и всё остальное НЕ ТРОГАЕТ.
 */
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DRY_RUN   = process.argv.includes('--dry-run');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

const SKIP = new Set(['node_modules', '.next', '.git', 'dist', 'build', '.turbo', 'out']);
const EXTS = new Set(['.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.mdx']);

// green-700 = 5.02:1 ✅  green-600 = 3.30:1 ❌ — заменяем 50..600 на 700
const FIX_MAP = { '50':'700','100':'700','200':'700','300':'700','400':'700','500':'700','600':'700' };
const SHADE_ALT = Object.keys(FIX_MAP).join('|');

// Ловим ТОЛЬКО text-/placeholder-/decoration- классы, НЕ bg- и т.д.
const PATTERN = new RegExp(
  `((?:[\\w-]+:)*(?:text|placeholder|decoration)-green-)(${SHADE_ALT})(?=(?:\\/\\d+)?(?=[\\s"'\`{}[\\]>!]|$))`,
  'g'
);

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

console.log('\n╔══════════════════════════════════════════════════════╗');
console.log('║  Исправление контраста: text-green-600 → text-green-700  ║');
console.log('╚══════════════════════════════════════════════════════╝\n');
if (DRY_RUN) console.log('⚠️  Режим --dry-run: файлы НЕ изменяются.\n');

let totalMatches = 0, totalFiles = 0;

for (const file of walk(ROOT)) {
  const src = fs.readFileSync(file, 'utf8');
  if (!/(text|placeholder|decoration)-green-(50|100|200|300|400|500|600)/.test(src)) continue;
  PATTERN.lastIndex = 0;
  let count = 0;
  const fixed = src.replace(PATTERN, (m, prefix, shade) => {
    const to = FIX_MAP[shade];
    if (!to) return m;
    count++;
    return `${prefix}${to}`;
  });
  if (count > 0) {
    totalMatches += count; totalFiles++;
    const rel = path.relative(ROOT, file);
    if (!DRY_RUN) fs.writeFileSync(file, fixed, 'utf8');
    console.log(`  ${DRY_RUN?'👀':'✅'} ${rel}  (${count} замен)`);
  }
}

console.log('\n' + '─'.repeat(56));
if (totalMatches === 0) {
  console.log('\n  ✅ Всё уже в порядке, нечего менять.\n');
} else if (DRY_RUN) {
  console.log(`\n👀 Dry-run: ${totalMatches} замен в ${totalFiles} файлах.`);
  console.log('   node scripts/fix-text-contrast-only.mjs\n');
} else {
  console.log(`\n✅ Готово: ${totalMatches} замен в ${totalFiles} файлах.\n`);
  console.log('  git diff && npm run dev');
  console.log('  git add . && git commit -m "fix: text-green contrast WCAG AA"\n');
}
