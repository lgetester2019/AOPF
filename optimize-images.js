// scripts/optimize-images.mjs
// Запускать командой: node scripts/optimize-images.mjs

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const imagesToOptimize = [
  {
    input: path.join(publicDir, 'certificates', 'Аттестат аккредитации.jpg'),
    output: path.join(publicDir, 'certificates', 'attestat-akkreditacii.webp'),
    width: 460,   // немного больше чем показывается (212px) — для экранов с высоким DPI
    quality: 80,
  },
  {
    input: path.join(publicDir, 'sout.webp'),
    output: path.join(publicDir, 'sout-opt.webp'),
    width: 300,   // немного больше чем показывается (96px) — для экранов с высоким DPI
    quality: 80,
  },
  {
    input: path.join(publicDir, 'measurements.webp'),
    output: path.join(publicDir, 'measurements-opt.webp'),
    width: 300,
    quality: 80,
  },
];

for (const img of imagesToOptimize) {
  try {
    await sharp(img.input)
      .resize(img.width)
      .webp({ quality: img.quality })
      .toFile(img.output);
    console.log(`✅ Готово: ${path.basename(img.output)}`);
  } catch (err) {
    console.error(`❌ Ошибка с ${img.input}:`, err.message);
  }
}

console.log('\n✅ Все изображения оптимизированы!');
console.log('Не забудьте обновить пути к изображениям в коде (см. ШАГ 1.3)');