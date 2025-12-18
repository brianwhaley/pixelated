import globals from "globals";
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
// import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import a11yPlugin from 'eslint-plugin-jsx-a11y';

export default [
	{
		// files: ['**/*.{js,jsx,mjs,mjsx,cjs,cjsx,ts,tsx,mts,mtsx,cts,ctsx}'],
		files: ['**/*.*{js,jsx,ts,tsx}'],
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
			import: importPlugin,
			'jsx-a11y': a11yPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,
			...a11yPlugin.configs.recommended.rules,
			"indent": ["error", "tab"],
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
			"scripts/",
			"coverage/",
			"storybook-static/",
			"/*", 
			"!/src",
			"src/stories/",
			"src/tests/",
			"*.config.*",
			"**/*example*",
			"**/*Example*",
		],
	}
];
