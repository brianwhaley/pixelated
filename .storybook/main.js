/** @type { import('@storybook/react-webpack5').StorybookConfig } */

import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  addons: [
    '@storybook/addon-controls',
    '@storybook/preset-scss',
],
  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: { fsCache: false } 
    },
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: [ /* "../dist", */ "../src" ],
  stories: [ "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)" ],

  webpackFinal: async (config) => {

    // WEBPACK FOR JS FILES
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env', 
            '@babel/preset-react'
          ],
        },
      },
    });
    config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx');

    // WEBPACK FOR CSS FILES
    /* config.module.rules.push({
      test: /\.(css)$/,
      use: {
        loader: "css-loader",
        options: {
          url: false,
          esModule: false
        }
      }
    })
    config.resolve.extensions.push('.css'); */

    // WEBPACK FOR LESS FILES
    config.module.rules.push({
      test: /\.(less)$/,
      use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: false } },
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
      ]
    })
    config.resolve.extensions.push('.less'); 

    // WEBPACK FOR IMAGE FILES
    /* config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      type: 'asset/resource',
      use: {
        loader: 'url-loader',
        options: {
            name: '[name].[ext]',
            outputPath: '../dist/images', // Output images to an 'images' folder in the Storybook build
            publicPath: '/images/', // Public URL path to access images
        },
      },
    }); */

    // ALIAS FOR ABSOLUTE PATH FOR IMAGES
    config.resolve.alias = {
      "/images": path.resolve(__dirname, "../dist/images"),
      "images": path.resolve(__dirname, "../dist/images"),
    };

    return config;
  },

};
export default config;
