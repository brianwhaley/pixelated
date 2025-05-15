import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	// ...compat.extends("next/core-web-vitals", "next/typescript"),
	...compat.extends("next/typescript"),
	{
		rules: {
			'indent': ['error', 'tab'],
			'no-tabs': 'off', // allow only tabs
			"semi": ["error", "always"],
			"@next/next/no-img-element": "off",
			"@next/next/no-html-link-for-pages": "off",
		},
	},
	{ 
		ignores: [".next", "node-modules/*", "src/tests/*"]
	}
]; 

export default eslintConfig;
