import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";
import eslint from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

import parser from '@typescript-eslint/parser';

export default defineConfig([
  { 
    files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx}"], 
    languageOptions: { 
      /* parser, 
      parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
              jsx: true,
            },
          }, */
      globals: globals.browser 
    }, 
    plugins: {
			// pluginJs, pluginReact, pluginNext, tseslint
      '@next/next': pluginNext,
		},
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      // ...tseslint.configs.strictTypeChecked,
      // ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      ...pluginNext.configs.recommended.rules,
      // ...pluginNext.configs['core-web-vitals'].rules,
      'indent': ['error', 'tab'],
      'no-tabs': 'off', // Optional: If you strictly want to allow only tabs
      "semi": ["error", "always"],
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
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