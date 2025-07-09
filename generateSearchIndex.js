const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "src", "app");
const blogDir = path.join(appDir, "blog", "posts"); // Путь к блогам — подкорректируй если нужно
const searchIndex = [];

function extractTextFromPage(content) {
    // Убираем JSX внутри фигурных скобок (включая многострочные)
    content = content.replace(/\{[^}]*\}/gs, " ");

    // Ищем <h1> и <p> в тексте, вырезаем HTML-теги
    const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";

    const paragraphs = [...content.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(
        (m) => m[1].replace(/<[^>]+>/g, "").trim()
    );

    const text = [title, ...paragraphs].filter(Boolean).join(". ");
    return { title, text };
}

function walkApp(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        // Пропускаем admin и blog
        if (stat.isDirectory()) {
            if (file.toLowerCase() === "admin" || file.toLowerCase() === "blog") return;
            walkApp(fullPath);
        } else if (file === "page.tsx" || file === "page.jsx") {
            const content = fs.readFileSync(fullPath, "utf-8");
            const { title, text } = extractTextFromPage(content);

            if (title || text) {
                let url = fullPath
                    .replace(appDir, "")
                    .replace(/\\/g, "/")
                    .replace(/\/page\.tsx?$/, "");

                if (!url) url = "/";

                searchIndex.push({ url, title, content: text });
            }
        }
    });
}

function addBlogPostsToIndex() {
    if (!fs.existsSync(blogDir)) return;

    const postFiles = fs.readdirSync(blogDir);
    postFiles.forEach((file) => {
        if (!file.endsWith(".md") && !file.endsWith(".mdx") && !file.endsWith(".tsx")) return; // Поддержка разных форматов

        const fullPath = path.join(blogDir, file);
        const content = fs.readFileSync(fullPath, "utf-8");

        // Простейший пример извлечения title из frontmatter (если md/mdx)
        // или из JSX (если .tsx)
        let title = "";
        let text = "";

        if (file.endsWith(".md") || file.endsWith(".mdx")) {
            // Предполагаем, что в md в первой строке title: "..."
            const titleMatch = content.match(/title:\s*["'](.+?)["']/i);
            title = titleMatch ? titleMatch[1] : "";
            // Для текста — вырезаем весь markdown без frontmatter
            const bodyMatch = content.match(/---[\s\S]*?---([\s\S]*)/);
            text = bodyMatch ? bodyMatch[1].replace(/[#_*>\-\[\]\(\)!]/g, " ").trim() : "";
        } else if (file.endsWith(".tsx")) {
            // Если блог в tsx, извлечь как обычную страницу
            const extracted = extractTextFromPage(content);
            title = extracted.title;
            text = extracted.text;
        }

        if (title || text) {
            // Формируем URL для блога, например: /blog/slug без расширения
            const slug = file.replace(/\.(md|mdx|tsx)$/, "");
            const url = "/blog/" + slug;

            searchIndex.push({ url, title, content: text });
        }
    });
}

walkApp(appDir);
addBlogPostsToIndex();

const outputDir = path.join(__dirname, "public", "search");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
    path.join(outputDir, "searchIndex.json"),
    JSON.stringify(searchIndex, null, 2),
    "utf-8"
);

console.log("Search index generated:", searchIndex.length, "pages/posts");
