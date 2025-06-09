import globals from "globals";
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
// import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default [
	{
		files: ['**/*.{js,jsx,mjs,mjsx,cjs,cjsx,ts,tsx,mts,mtsx,cts,ctsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react: reactPlugin,
			// 'react-hooks': reactHooksPlugin,
			import: importPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
          	...tsPlugin.configs.recommended.rules,
          	...reactPlugin.configs.recommended.rules,
          	// ...reactHooksPlugin.configs.recommended.rules,
			"indent": ["error", "tab"],
			'no-tabs': 'off', // Optional: If you strictly want to allow only tabs
			"semi": ["error", "always"],
          	// '@typescript-eslint/explicit-function-return-type': 'off',
          	'@typescript-eslint/no-explicit-any': 'off',

		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{ 
		ignores: [
			".storybook/",
			"dist/", 
			"node_modules/", 
			"/*", 
			"!/src",
			"src/stories/",
			"src/tests/",
			"eslint.config.mjs",
			"webpack.config.js",
		],
	}
];
