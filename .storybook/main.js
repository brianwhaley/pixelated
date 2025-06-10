/** @type { import('@storybook/react-webpack5').StorybookConfig } */

import path from 'path'; 
import { fileURLToPath } from 'url';
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

    // ALIAS FOR ABSOLUTE PATH FOR IMAGES
    config.resolve.alias = {
      "/images": path.resolve(__dirname, "../src/images"),
      "images": path.resolve(__dirname, "../src/images"),
    };

    return config;
  },

};
export default config;
