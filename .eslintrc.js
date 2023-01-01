module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jest": true,
		"node": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		// "plugin:sonarjs/recommended",
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "@babel/eslint-parser",
	"parserOptions": {
		"babelOptions": {
			"presets": ["@babel/preset-react"]
		},
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module",
		"requireConfigFile": false,
	},
	"plugins": [
		"react",
		// "sonarjs",
		"jsx-a11y",
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"@typescript-eslint/no-unused-vars": "off",
		// "sonarjs/no-identical-functions": ["error", 100]
	},
	"settings": {
		"react": {
			"createClass": "createReactClass", 
			"pragma": "React",  
			"version": "detect"//, 
		//"flowVersion": "0.53"
		}
	}
};