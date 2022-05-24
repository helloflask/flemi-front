const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            slate: colors.slate,
            red: colors.red,
            green: colors.emerald,
            purple: colors.violet,
            yellow: colors.amber,
            pink: colors.fuchsia,
        },
        maxWidth: {
            "50%": "50%",
            "60%": "60%",
        },
        fontSize: {
            sm: ".75rem",
        },
    },
};
