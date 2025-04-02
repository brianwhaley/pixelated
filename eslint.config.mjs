import react from "eslint-plugin-react"; 
import globals from "globals";

export default [
  {
    files: ['src/**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      react,
    },
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
    rules: {
      'indent': ['error', 'tab'],
      'no-tabs': 'off' // Optional: If you strictly want to allow only tabs
    },
  },
];