import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import storybook from "eslint-plugin-storybook";



export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    // extends: ["js/recommended"],
    languageOptions: { 
      globals: {
        ...globals.browser,
        __dirname: true
      }
    },
    plugins: { js, react, storybook }, 
  },
  {
    settings: {
      react: {
        version: "detect"
      },
    },
  },
  // js.configs.flat.recommended,
  react.configs.flat.recommended,
  ...storybook.configs["flat/recommended"],
  globalIgnores(["dist/*", "node-modules/*", "src/tests/*"])
]);