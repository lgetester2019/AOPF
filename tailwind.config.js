module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Nunito"', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
