const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "src", "app");
const blogDir = path.join(appDir, "blog", "posts");
const searchIndex = [];

function extractTextFromPage(content) {

    content = content.replace(/\{[^}]*\}/gs, " ");


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

                let schemaOrg = {};
                if (url === "/contacts") {
                    schemaOrg = {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Агентство Оценки Производственных Факторов",
                        "url": "https://aopf.ru",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Б. Сампсониевский пр., 64",
                            "addressLocality": "Санкт-Петербург",
                            "postalCode": "194044",
                            "addressCountry": "RU"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+7-812-923-68-67",
                            "email": "info.aopf@gmail.com"
                        }
                    };
                } else if (url === "/faq") {
                    schemaOrg = {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Что такое СОУТ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Специальная оценка условий труда (СОУТ) проводится в соответствии с 426-ФЗ для обеспечения безопасности работников."
                                }
                            }
                        ]
                    };
                } else if (url === "/services") {
                    schemaOrg = {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Специальная оценка условий труда (СОУТ)",
                        "provider": {
                            "@type": "Organization",
                            "name": "Агентство Оценки Производственных Факторов",
                            "url": "https://aopf.ru"
                        },
                        "areaServed": {
                            "@type": "City",
                            "name": "Санкт-Петербург"
                        },
                        "description": "Специальная оценка условий труда, производственный контроль, анализ воды и воздуха в Санкт-Петербурге."
                    };
                } else if (url === "/services/risk") {
                    schemaOrg = {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Оценка профессиональных рисков",
                        "provider": {
                            "@type": "Organization",
                            "name": "Агентство Оценки Производственных Факторов",
                            "url": "https://aopf.ru"
                        },
                        "areaServed": {
                            "@type": "City",
                            "name": "Санкт-Петербург"
                        },
                        "description": "Профессиональная оценка рисков для охраны труда в соответствии с 426-ФЗ."
                    };
                }
                
                searchIndex.push({ url, title, content: text });
            }
        }
    });
}

function addBlogPostsToIndex() {
    if (!fs.existsSync(blogDir)) return;

    const postFiles = fs.readdirSync(blogDir);
    postFiles.forEach((file) => {
        if (!file.endsWith(".md") && !file.endsWith(".mdx") && !file.endsWith(".tsx")) return;

        const fullPath = path.join(blogDir, file);
        const content = fs.readFileSync(fullPath, "utf-8");



        let title = "";
        let text = "";
        let schemaOrg = {};
        
        if (file.endsWith(".md") || file.endsWith(".mdx")) {

            const titleMatch = content.match(/title:\s*["'](.+?)["']/i);
            title = titleMatch ? titleMatch[1] : "";

            const bodyMatch = content.match(/---[\s\S]*?---([\s\S]*)/);
            text = bodyMatch ? bodyMatch[1].replace(/[#_*>\-\[\]\(\)!]/g, " ").trim() : "";
            schemaOrg = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "publisher": {
                    "@type": "Organization",
                    "name": "Агентство Оценки Производственных Факторов",
                    "url": "https://aopf.ru"
                },
                "description": text.length > 160 ? text.substring(0, 157) + "..." : text
            };
        } else if (file.endsWith(".tsx")) {

            const extracted = extractTextFromPage(content);
            title = extracted.title;
            text = extracted.text;
            schemaOrg = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": title,
                "publisher": {
                    "@type": "Organization",
                    "name": "Агентство Оценки Производственных Факторов",
                    "url": "https://aopf.ru"
                },
                "description": text.length > 160 ? text.substring(0, 157) + "..." : text
            };
        }

        if (title || text) {

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
