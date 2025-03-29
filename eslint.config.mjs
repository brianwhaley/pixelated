import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
// import tseslint from "typescript-eslint";

export default defineConfig([
  { 
    files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx}"], 
    languageOptions: { globals: globals.browser }, 
    plugins: {
			pluginJs, pluginReact, pluginNext, tseslint
		},
    extends: [
    ],
    /* rules: {
      ...globals.browser.recommended,
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended,
      ...pluginNext.configs.recommended.rules,
      ...tseslint.configs.recommended.rules
    }, */
  },
    globalIgnores(["node-modules/*", "src/tests/*"])
]);