/**
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cva"],
  printWidth: 120,
  tabWidth: 4,
};

export default config;
