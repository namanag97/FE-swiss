import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.tsx"],
    rules: {
      // Ban inline style={{}} on DOM elements — use CSS classes or Tailwind instead.
      // Set to "warn" during migration; switch to "error" once fully clean.
      "react/forbid-dom-props": ["warn", { forbid: [
        { propName: "style", message: "Use CSS classes or Tailwind utilities instead of inline style={{}}. See src/styles/ for available classes." }
      ] }],
    },
  },
];

export default eslintConfig;
