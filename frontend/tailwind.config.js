/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        extend: {
            border: {
                1: "1px",
            },
            height: {
                128: "512px",
            },
            width: {
                112: "448px",
                128: "512px",
                144: "576px",
            },
        },
    },

    plugins: [],
};
