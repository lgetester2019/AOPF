module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}", // пути к твоим файлам, где используешь классы tailwind
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Nunito"', 'sans-serif'], // <== Заменим стандартный sans
            },
        },
    },
    plugins: [],
}
