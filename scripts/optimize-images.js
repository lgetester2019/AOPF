// scripts/optimize-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// --- НАСТРОЙКИ КАЧЕСТВА ---
const jpegQuality = 75;          // Качество для JPG (0-100)
const pngQuality = 80;           // Качество для PNG (0-100)
// -------------------------

// Функция для рекурсивного поиска всех файлов в папке public
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

// Функция для оптимизации изображения в зависимости от его формата
async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const isJpeg = ext === '.jpg' || ext === '.jpeg';
    const isPng = ext === '.png';

    if (!isJpeg && !isPng) {
        return; // Пропускаем файлы, не являющиеся JPG или PNG
    }

    console.log(`Обработка: ${filePath}`);
    try {
        let pipeline = sharp(filePath);
        if (isJpeg) {
            pipeline = pipeline.jpeg({ quality: jpegQuality, progressive: true });
        } else if (isPng) {
            pipeline = pipeline.png({ quality: pngQuality, compressionLevel: 9 });
        }
        await pipeline.toFile(filePath + '.tmp');
        fs.renameSync(filePath + '.tmp', filePath);
    } catch (error) {
        console.error(`Ошибка при обработке ${filePath}:`, error);
    }
}

async function main() {
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
        console.error(`Папка public не найдена по пути: ${publicDir}`);
        return;
    }

    const allFiles = getAllFiles(publicDir);
    console.log(`Найдено файлов для проверки: ${allFiles.length}`);

    // Фильтруем только картинки, которые будем обрабатывать
    const imagesToOptimize = allFiles.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
    });

    console.log(`Начинаем оптимизацию ${imagesToOptimize.length} изображений...`);

    // Обрабатываем изображения по одному, чтобы не перегружать систему
    for (const file of imagesToOptimize) {
        await optimizeImage(file);
    }

    console.log('✅ Оптимизация завершена!');
}

main().catch(console.error);
