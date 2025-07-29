const { heroui } = require('@heroui/theme');


/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js"
    ],
    theme: {
    },
    darkMode: "class",
    plugins: [heroui()],
}