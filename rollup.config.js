import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel';

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: 'dist/pkg-main.js',
        format: "cjs",
        exports: 'named',
        sourcemap: true,
      },
      {
        file: 'dist/pkg-module.js',  
        format: "es",
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      postcss({
          extensions: ['.css'],
          modules: false,
      }),
      uglify(),
      babel(),
      commonjs(),
    ],
  }
];