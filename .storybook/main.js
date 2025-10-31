/** @type { import('@storybook/react-webpack5').StorybookConfig } */

import path from 'path'; 
import { fileURLToPath } from 'url';
import fs from 'fs';
import webpack from 'webpack';
// import { sharedRulesConfig } from "../webpack.config.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  addons: [
    // '@storybook/addon-controls', // consildated into main bundle as part of Storybook 9
    '@storybook/preset-scss',
],
  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: { fsCache: false } 
    },
    enableCrashReports: false,

  },
  features: {
    experimentalRSC: true,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: [ /* "../dist", */ "../src" ],
  stories: [ "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)" ],

  webpackFinal: async (config) => {

    // config.module.rules = sharedRulesConfig;

    config.module.rules.push(
      {
        test: /\.(js|jsx|mjs|cjs|mjsx|cjsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
          },
        },
      },
      {
        test: /\.(ts|tsx|mts|cts|mtsx|ctsx)$/,
        exclude: /node_modules/ ,
        use: 'ts-loader',
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/ ,
        use: 'sass-loader',
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png|svg|webp)$/,
        exclude: /node_modules/ ,
        type: 'asset/resource', 
        use: [ 'url-loader', 'file-loader' ],
      }
    );

    config.resolve.extensions.push('.js', '.jsx', '.mjs', '.cjs', '.mjsx', '.cjsx' );
    config.resolve.extensions.push('.ts', '.tsx', '.mts', '.cts', '.mtsx', '.ctsx' );
    config.resolve.extensions.push('.sass', '.scss');
    config.resolve.extensions.push('.bmp', '.gif', '.jpg', '.jpeg', '.png', '.svg', '.webp');

    // ALIASES
    // Prefer the compiled ESM build for imports that include ".js" extensions.
    // This makes Storybook load the same built files the server uses.
    config.resolve.alias = {
      "/images": path.resolve(__dirname, "../src/images"),
      "images": path.resolve(__dirname, "../src/images"),
      // Resolve the package import to the package's compiled dist folder
      '@brianwhaley/pixelated-components': path.resolve(__dirname, '../dist'),
    };

    // If source files import explicit `.js` relative paths (e.g. '../foo/bar.js'),
    // webpack will try to resolve them under `src`. Use NormalModuleReplacementPlugin
    // to rewrite such requests to the corresponding file under `dist/` when it exists.
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/\.js$/, function(resource) {
      try {
        const req = resource.request;
        if (!req || !req.startsWith('.')) return;
        const issuerContext = resource.context || '';
        const srcRoot = path.resolve(__dirname, '../src');
        if (!issuerContext.startsWith(srcRoot)) return;
        const absPath = path.resolve(issuerContext, req);
        if (!absPath.startsWith(srcRoot)) return;
        const rel = path.relative(srcRoot, absPath);
        const distPath = path.resolve(__dirname, '../dist', rel);
        if (fs.existsSync(distPath)) {
          resource.request = distPath;
        }
      } catch (e) {
        // ignore and let normal resolution continue
      }
    }));

    return config;
  },

};
export default config;
