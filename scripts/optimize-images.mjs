#!/usr/bin/env node
/**
 * optimize-images.mjs
 * -------------------
 * Сжимает изображения, найденные Lighthouse как проблемные.
 * Создаёт оптимизированные копии — оригиналы НЕ удаляет.
 *
 * Запуск:
 *   node scripts/optimize-images.mjs
 *
 * После запуска обновите src в компонентах (скрипт подскажет что менять).
 */

import sharp  from 'sharp';
import fs     from 'fs';
import path   from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC    = path.resolve(__dirname, '..', 'public');

// ─── Список изображений из Lighthouse-отчёта ──────────────────────────────
//
//  original     — путь к исходному файлу в /public
//  output       — путь к оптимизированному файлу (новое имя, всегда .webp)
//  displayW     — ширина отображения на экране (из Lighthouse boundingRect)
//  displayH     — высота отображения на экране
//  multiplier   — множитель для Retina/2x экранов (обычно 2)
//  quality      — качество WebP (80 = хорошо, заметно не хуже оригинала)

const IMAGES = [
  {
    // sout.webp: 4932×4912px, 1.6 МБ → показывается 96×96px
    original: path.join(PUBLIC, 'sout.webp'),
    output:   path.join(PUBLIC, 'sout-opt.webp'),
    displayW: 96,
    displayH: 96,
    multiplier: 2,
    quality: 85,
  },
  {
    // measurements.webp: 3463×3456px, 688 КБ → показывается 96×96px
    original: path.join(PUBLIC, 'measurements.webp'),
    output:   path.join(PUBLIC, 'measurements-opt.webp'),
    displayW: 96,
    displayH: 96,
    multiplier: 2,
    quality: 85,
  },
  {
    // Аттестат аккредитации.jpg: 1452×1700px, 931 КБ → показывается 213×250px
    original: path.join(PUBLIC, 'certificates', 'Аттестат аккредитации.jpg'),
    output:   path.join(PUBLIC, 'certificates', 'attestat.webp'),
    displayW: 213,
    displayH: 250,
    multiplier: 2,
    quality: 85,
  },
  {
    // 2024.webp: 1180×1389px, 452 КБ → показывается 213×250px
    original: path.join(PUBLIC, 'certificates', '2024.webp'),
    output:   path.join(PUBLIC, 'certificates', '2024-opt.webp'),
    displayW: 213,
    displayH: 250,
    multiplier: 2,
    quality: 85,
  },
  {
    // 2023.webp: 1140×1340px, 435 КБ → показывается 213×250px
    original: path.join(PUBLIC, 'certificates', '2023.webp'),
    output:   path.join(PUBLIC, 'certificates', '2023-opt.webp'),
    displayW: 213,
    displayH: 250,
    multiplier: 2,
    quality: 85,
  },
  {
      // suot.webp: 3435×3428px, 414 КБ → показывается 96×96px
      original: path.join(PUBLIC, 'suot.webp'),
      output:   path.join(PUBLIC, 'suot-opt.webp'),
      displayW: 96, displayH: 96, multiplier: 2, quality: 85,
  },
  {
      // risks.webp: 3387×3370px, 412 КБ → показывается 96×96px
      original: path.join(PUBLIC, 'risks.webp'),
      output:   path.join(PUBLIC, 'risks-opt.webp'),
      displayW: 96, displayH: 96, multiplier: 2, quality: 85,
  },
  {
      // Уведомление о внесении в реестр.jpg: 1700×1996px, 339 КБ → показывается 213×250px
      original: path.join(PUBLIC, 'certificates', 'Уведомление о внесение в реестр.jpg'),
      output:   path.join(PUBLIC, 'certificates', 'uvedomlenie.webp'),
      displayW: 213, displayH: 250, multiplier: 2, quality: 85,
  },
];

// ─── Функция сжатия ────────────────────────────────────────────────────────

async function optimizeImage(cfg) {
  const { original, output, displayW, displayH, multiplier, quality } = cfg;

  if (!fs.existsSync(original)) {
    console.warn(`  ⚠️  Файл не найден, пропускаем: ${original}`);
    return null;
  }

  const targetW = displayW * multiplier;  // для Retina: 96 × 2 = 192px
  const targetH = displayH * multiplier;

  const before = fs.statSync(original).size;

  await sharp(original)
    .resize(targetW, targetH, {
      fit: 'cover',          // обрезать по центру если нужно
      withoutEnlargement: true,  // не увеличивать если оригинал меньше
    })
    .webp({ quality })
    .toFile(output);

  const after = fs.statSync(output).size;
  const saved = ((1 - after / before) * 100).toFixed(0);

  return { before, after, saved };
}

// ─── Запуск ────────────────────────────────────────────────────────────────

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║          Оптимизация изображений для aopf.ru             ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const replacements = [];  // для инструкции в конце

for (const cfg of IMAGES) {
  const name = path.basename(cfg.original);
  process.stdout.write(`  Обрабатываю: ${name} ... `);

  try {
    const result = await optimizeImage(cfg);
    if (result) {
      const { before, after, saved } = result;
      console.log(`✅ ${kb(before)} КБ → ${kb(after)} КБ  (−${saved}%)`);
      replacements.push({
        from: '/' + path.relative(PUBLIC, cfg.original).replace(/\\/g, '/'),
        to:   '/' + path.relative(PUBLIC, cfg.output).replace(/\\/g, '/'),
      });
    }
  } catch (err) {
    console.log(`❌ Ошибка: ${err.message}`);
  }
}

function kb(bytes) {
  return Math.round(bytes / 1024);
}

// ─── Инструкция что менять в коде ─────────────────────────────────────────

if (replacements.length > 0) {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║   Теперь замените пути в коде (Ctrl+Shift+R в PyCharm)  ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  for (const { from, to } of replacements) {
    console.log(`  Найти:   ${from}`);
    console.log(`  Заменить: ${to}`);
    console.log();
  }

  console.log('─'.repeat(58));
  console.log('\n📋 Как заменить в PyCharm:');
  console.log('   Ctrl+Shift+R → вставить строку из "Найти" → вставить "Заменить"');
  console.log('   → Replace All\n');

  console.log('📋 Или запустите авто-замену путей:');
  console.log('   node scripts/update-image-paths.mjs\n');
}
