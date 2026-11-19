import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { pulse: "#246B4A", clay: "#C86B3C", parchment: "#F8F6F0" } } },
  plugins: [],
};
export default config;
