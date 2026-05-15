#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];
const EXCLUDE_DIRS = ['node_modules', '.next', 'build', 'dist', '.git'];

async function walkDir(dir, fileList = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (EXCLUDE_DIRS.includes(entry.name)) continue;
            await walkDir(fullPath, fileList);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name);
            if (EXTENSIONS.includes(ext)) {
                fileList.push(fullPath);
            }
        }
    }
    return fileList;
}

function replaceWhatsapp(content) {
    let newContent = content;
    let changed = false;

    // Замена импортов: удаляем Whatsapp из списка импортов
    const importRegex = /import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g;
    newContent = newContent.replace(importRegex, (match, imports) => {
        if (imports.includes('Whatsapp')) {
            // Удаляем 'Whatsapp' из списка
            let newImports = imports.replace(/\s*Whatsapp\s*,?\s*/g, '');
            if (newImports.endsWith(',')) newImports = newImports.slice(0, -1);
            if (newImports.trim() === '') {
                return ''; // удаляем весь импорт
            }
            changed = true;
            return `import { ${newImports} } from 'lucide-react';`;
        }
        return match;
    });

    // Замена JSX-тегов <MessageCircle ... /> на <MessageCircle ... />
    if (/<\/?Whatsapp\b/.test(newContent)) {
        newContent = newContent.replace(/<\/?Whatsapp\b/g, (tag) => {
            changed = true;
            return tag.replace('Whatsapp', 'MessageCircle');
        });
    }

    return { newContent, changed };
}

async function main() {
    const dryRun = process.argv.includes('--dry') || process.argv.includes('--dry-run');
    const projectRoot = process.cwd();
    console.log(`📁 Корень проекта: ${projectRoot}`);

    const files = await walkDir(projectRoot);
    console.log(`📄 Найдено ${files.length} файлов для обработки`);

    let modifiedCount = 0;

    for (const filePath of files) {
        const originalContent = await fs.readFile(filePath, 'utf8');
        const { newContent, changed } = replaceWhatsapp(originalContent);
        if (changed) {
            modifiedCount++;
            if (!dryRun) {
                const backupPath = filePath + '.bak';
                await fs.writeFile(backupPath, originalContent, 'utf8');
                await fs.writeFile(filePath, newContent, 'utf8');
                console.log(`  ✓ Исправлен: ${path.relative(projectRoot, filePath)}`);
            } else {
                console.log(`  [DRY] Будет исправлен: ${path.relative(projectRoot, filePath)}`);
            }
        }
    }

    console.log(`\n✅ Готово! Обработано файлов: ${modifiedCount}`);
    if (dryRun) {
        console.log(`ℹ️ Это пробный запуск. Для реального исправления запустите без --dry`);
    } else {
        console.log(`ℹ️ Созданы бэкапы .bak. Проверьте изменения и удалите бэкапы командой: find . -name "*.bak" -delete`);
    }
}

main().catch(err => {
    console.error('❌ Ошибка:', err);
    process.exit(1);
});