import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        dropshadow: {
          "0%, 100%": { filter: "drop-shadow(0px 0.5rem 0.5rem rgba(255,255,255,0.5));" },
          "25%": { filter: "drop-shadow(0px 0.5rem 0.5rem rgba(102,215,209,0.5));" },
          "50%": { filter: "drop-shadow(0px 0.5rem 0.5rem rgba(253,82,0,0.5));" },
          "75%": { filter: "drop-shadow(0px 0.5rem 0.5rem rgba(215,247,91,0.5));" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
