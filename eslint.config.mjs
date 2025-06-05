import react from "eslint-plugin-react"; 
import globals from "globals";
import json from "@eslint/json";

export default [
	{
		files: ['**/*.{js,jsx,mjs,mjsx,cjs,cjsx,ts,tsx,mts,mtsx,cts,ctsx}'],
		languageOptions:{
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals:{
				...globals.browser,
			},
		},
		plugins: {
			react,
		},
		rules: {
			"indent": ["error", "tab"],
			'no-tabs': 'off', // Optional: If you strictly want to allow only tabs
			"semi": ["error", "always"]
		},
	},
	{
		files: ["**/*.json"],
		language: "json/json",
		plugins: {
			json,
		},
		rules: {
			'indent': ['error', 'tab'],
			'no-tabs': 'off', // Optional: If you strictly want to allow only tabs
			"json/no-duplicate-keys": "error",
		},
	},
];
