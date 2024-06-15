/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            border: {
                1: "1px",
            },
            height: {
                128: "512px",
            },
        },
    },
    plugins: [],
};
