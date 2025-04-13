import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "blaze-orange": {
          "50": "#fff8ec",
          "100": "#fff0d3",
          "200": "#ffdca5",
          "300": "#ffc26d",
          "400": "#ff9d32",
          "500": "#ff7f0a",
          "600": "#ff6600", //Base color
          "700": "#cc4902",
          "800": "#a1390b",
          "900": "#82310c",
          "950": "#461604",
        },
        gray: {
          "50": "E6E6E6",
          "100": "#DADADA",
          "150": "#CFCFCF",
          "200": "#C4C4C4",
          "250": "#B8B8B8",
          "300": "#ADADAD",
          "350": "#A2A2A2",
          "400": "#969696",
          "450": "#8B8B8B",
          "500": "#808080", // Base color
          "550": "#747474",
          "600": "#696969",
          "650": "#5E5E5E",
          "700": "#525252",
          "750": "#474747",
          "800": "#3C3C3C",
          "850": "#303030",
          "900": "#252525",
          "950": "#1A1A1A",
        },

        black: "#000000",
        white: "#ffffff",
        "blaze-one": "#FE623B",
        "dark-Gray": "#A9A9A9",
        "silver": "#A2AAAD",
        "space-gray": "#5E5E5E",
        "dark-blue-black": "#1D1D1F",
        "graphite": "#4A4B4D",
        "a-white": "#FBFBFD",
        "a-black": "#1D1D1F",
        "a-dark-gray": "#6E6E73",
        "a-blue":"#0071E3",
        "dark-Gray-9": "#D4D5D9",
        "star-gold":"#F0E6D2",
        slate: "#C2C9CD",

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
