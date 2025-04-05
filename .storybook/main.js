/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const config = {
  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: { fsCache: false } 
    },
  },
  framework:"@storybook/react-webpack5",
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  webpackFinal: async (config) => {
    // WEBPACK FOR JS FILES
    config.module.rules.push({
      test: /\.(js|jsx)$/,
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
    config.resolve.extensions.push('.js', '.jsx');
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

    return config;
  },

};
export default config;
