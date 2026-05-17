#!/usr/bin/env node
/**
 * optimize-images.mjs
 * ───────────────────
 * Два режима обработки:
 *
 *  ИКОНКИ (sout, measurements, suot, risks)
 *    — показываются как маленькие значки 96×96 px
 *    — сжимаем до 192×192 px (×2 для Retina), больше не нужно
 *
 *  СЕРТИФИКАТЫ (attestat, 2024, 2023, uvedomlenie)
 *    — показываются как превью 213×250 px
 *    — НО при клике открываются на весь экран и должны быть читаемы
 *    — сжимаем до 1400×1800 px (достаточно для чтения текста на любом мониторе)
 *    — это всё равно в разы меньше оригинала, но полностью читаемо
 *
 * fit: 'inside' — пропорции сохраняются, обрезки нет.
 *
 * Запуск:
 *   node scripts/optimize-images.mjs            — применить
 *   node scripts/optimize-images.mjs --dry-run  — только показать
 */

import sharp from 'sharp';
import fs    from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

const DRY_RUN   = process.argv.includes('--dry-run');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC    = path.resolve(__dirname, '..', 'public');

const IMAGES = [

  // ═══════════════════════════════════════════════════════════════════
  // ИКОНКИ УСЛУГ
  // Отображаются как маленькие значки 96×96 px на странице.
  // Пользователь их не открывает — 192×192 достаточно (Retina ×2).
  // ═══════════════════════════════════════════════════════════════════
  {
    type:     'icon',
    original: path.join(PUBLIC, 'sout.webp'),
    output:   path.join(PUBLIC, 'sout-opt.webp'),
    maxW: 192, maxH: 192, quality: 85,
  },
  {
    type:     'icon',
    original: path.join(PUBLIC, 'measurements.webp'),
    output:   path.join(PUBLIC, 'measurements-opt.webp'),
    maxW: 192, maxH: 192, quality: 85,
  },
  {
    type:     'icon',
    original: path.join(PUBLIC, 'suot.webp'),
    output:   path.join(PUBLIC, 'suot-opt.webp'),
    maxW: 192, maxH: 192, quality: 85,
  },
  {
    type:     'icon',
    original: path.join(PUBLIC, 'risks.webp'),
    output:   path.join(PUBLIC, 'risks-opt.webp'),
    maxW: 192, maxH: 192, quality: 85,
  },

  // ═══════════════════════════════════════════════════════════════════
  // СЕРТИФИКАТЫ
  // Показываются как превью, но при клике открываются на просмотр.
  // Нужно чтобы текст был читаем на полном экране (1920×1080 и выше).
  // 1400×1800 px — достаточно для чтения на любом мониторе,
  // при этом в 2-5 раз меньше оригиналов по весу.
  // ═══════════════════════════════════════════════════════════════════
  {
    type:     'certificate',
    original: path.join(PUBLIC, 'certificates', 'Аттестат аккредитации.jpg'),
    output:   path.join(PUBLIC, 'certificates', 'attestat.webp'),
    maxW: 1400, maxH: 1800, quality: 90,
  },
  {
    type:     'certificate',
    original: path.join(PUBLIC, 'certificates', '2024.webp'),
    output:   path.join(PUBLIC, 'certificates', '2024-opt.webp'),
    maxW: 1400, maxH: 1800, quality: 90,
  },
  {
    type:     'certificate',
    original: path.join(PUBLIC, 'certificates', '2023.webp'),
    output:   path.join(PUBLIC, 'certificates', '2023-opt.webp'),
    maxW: 1400, maxH: 1800, quality: 90,
  },
  {
    type:     'certificate',
    original: path.join(PUBLIC, 'certificates', 'Уведомление о внесение в реестр.jpg'),
    output:   path.join(PUBLIC, 'certificates', 'uvedomlenie.webp'),
    maxW: 1400, maxH: 1800, quality: 90,
  },
];

// ─── Функция обработки одного файла ────────────────────────────────────────

async function optimizeOne({ type, original, output, maxW, maxH, quality }) {
  const name = path.basename(original);

  if (!fs.existsSync(original)) {
    console.warn(`  ⚠️  Файл не найден, пропускаем:\n     ${original}`);
    return false;
  }

  const meta   = await sharp(original).metadata();
  const origW  = meta.width  ?? '?';
  const origH  = meta.height ?? '?';
  const before = fs.statSync(original).size;
  const label  = type === 'icon' ? '🔷 Иконка' : '📄 Сертификат';

  if (DRY_RUN) {
    console.log(`  ${label}: ${name}`);
    console.log(`    оригинал:  ${origW}×${origH} px  |  ${kb(before)} КБ`);
    console.log(`    сжать до:  вписать в ${maxW}×${maxH} px  (fit: inside, без обрезки)`);
    console.log(`    качество:  ${quality}/100  →  выход: ${path.basename(output)}`);
    return true;
  }

  // Ключевой параметр: fit:'inside' — вписать целиком, не обрезая
  await sharp(original)
    .resize(maxW, maxH, {
      fit:              'inside',  // ← вписать БЕЗ обрезки
      withoutEnlargement: true,   // ← не увеличивать маленькие изображения
    })
    .webp({ quality })
    .toFile(output);

  const after   = fs.statSync(output).size;
  const resMeta = await sharp(output).metadata();
  const savedPc = Math.round((1 - after / before) * 100);

  console.log(`  ${label}: ${name}`);
  console.log(`    оригинал:  ${origW}×${origH} px  |  ${kb(before)} КБ`);
  console.log(`    результат: ${resMeta.width}×${resMeta.height} px  |  ${kb(after)} КБ  (−${savedPc}%)`);
  console.log(`    файл:      ${path.basename(output)}`);
  return true;
}

function kb(bytes) { return Math.round(bytes / 1024); }

// ─── Запуск ─────────────────────────────────────────────────────────────────

const icons = IMAGES.filter(i => i.type === 'icon');
const certs = IMAGES.filter(i => i.type === 'certificate');

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║        Оптимизация изображений  (fit: inside, без обрезки)   ║');
console.log('╠══════════════════════════════════════════════════════════════╣');
console.log(`║  🔷 Иконки (${icons.length} шт.)      — до 192×192 px   (только для страницы)  ║`);
console.log(`║  📄 Сертификаты (${certs.length} шт.)  — до 1400×1800 px (читаемы при клике) ║`);
console.log('╚══════════════════════════════════════════════════════════════╝\n');

if (DRY_RUN) console.log('⚠️  Режим --dry-run: файлы НЕ изменяются.\n');

let ok = 0, fail = 0;

console.log('── Иконки ──────────────────────────────────────────────────────\n');
for (const img of icons) {
  const res = await optimizeOne(img).catch(err => {
    console.error(`  ❌ ${path.basename(img.original)}: ${err.message}`);
    return false;
  });
  res ? ok++ : fail++;
  console.log();
}

console.log('── Сертификаты ─────────────────────────────────────────────────\n');
for (const img of certs) {
  const res = await optimizeOne(img).catch(err => {
    console.error(`  ❌ ${path.basename(img.original)}: ${err.message}`);
    return false;
  });
  res ? ok++ : fail++;
  console.log();
}

console.log('─'.repeat(64));

if (DRY_RUN) {
  console.log(`\n👀 Dry-run завершён. Будет обработано: ${ok} файлов.\n`);
  console.log('   Запустите без --dry-run чтобы применить:\n');
  console.log('   node scripts/optimize-images.mjs\n');
} else {
  console.log(`\n✅ Готово! Обработано: ${ok} файлов${fail ? `  |  ошибок: ${fail}` : ''}.\n`);
  console.log('📋 Следующие шаги:\n');
  console.log('  1. Проверьте сайт — откройте и кликните на каждый сертификат:');
  console.log('     npm run dev\n');
  console.log('  2. Соберите production:');
  console.log('     npm run build && npm run start\n');
  console.log('  3. Зафиксируйте:');
  console.log('     git add public/');
  console.log('     git commit -m "perf: re-optimize images, readable certs, no cropping"\n');
}
