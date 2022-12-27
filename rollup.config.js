import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
// import { uglify } from "rollup-plugin-uglify";

// const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.js',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'named',
        preserveModules: true // Keep directory structure and files
        // sourcemap: false,
      }
    ],
    preserveModules: true,
    plugins: [
      babel(),
      commonjs(),
      image(),
      json(),
      peerDepsExternal(),
      postcss({
        extensions: ['.css']
        // extract: "./src/css/",
        // minimize: true,
        // modules: true,
      }),
      resolve()
      // uglify(),
    ]
  }
]
