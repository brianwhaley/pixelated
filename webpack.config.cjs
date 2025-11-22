const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Entry points for client and server bundles, plus global CSS/SCSS
// Only JS entries for Webpack output
// Only emit per-component files, no global index.js or index.css
const entries = {};
glob.sync('./src/components/**/*.{ts,tsx,js,jsx}', {
  ignore: [
    './src/components/pagebuilder/documentation/**',
    './src/components/**/*.test.*',
    './src/components/**/*.stories.*',
    './src/components/**/*.d.ts'
  ]
}).forEach(file => {
  const name = file.replace('./src/', '').replace(/\.[tj]sx?$/, '');
  entries[name] = file;
});

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  experiments: {
    outputModule: true,
  },
  mode: 'development',
  devtool: false, // Disable eval and source maps for readable output
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: { type: 'module' },
    module: true,
    environment: { module: true },
    chunkFormat: 'module', // Ensure ES module output
    chunkLoading: false,   // No runtime chunk loading
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
    minimize: false,
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
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
      },
      {
        test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png|svg|webp)$/,
        use: 'null-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
    alias: {
      '/images': path.resolve(__dirname, 'src/images'),
      'images': path.resolve(__dirname, 'src/images'),
    },
    fallback: {
      fs: false,
      path: false,
      process: false,
    },
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    next: 'next',
  },
  // No minification for now
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    // Removed MiniCssExtractPlugin; using style-loader for CSS injection
    new CopyWebpackPlugin({
      patterns: [
        // Copy all JS/TS/CSS/SCSS files from components, preserving structure and formatting
        { from: 'src/components/**/*.{js,jsx,ts,tsx,css,scss}', to: 'components/[path][name][ext]', context: 'src/components', transform(content, absoluteFrom) { return content.toString(); } },
        // Copy global CSS/SCSS as before
        { from: 'src/css/pixelated.global.css', to: 'css/pixelated.global.css' },
        { from: 'src/css/pixelated.grid.scss', to: 'css/pixelated.grid.scss' },
        // Copy index.js and index.server.js from src to dist, preserving formatting and ensuring no minification
        { from: 'src/index.js', to: 'index.js', transform(content) { return content.toString(); } },
        { from: 'src/index.server.js', to: 'index.server.js', transform(content) { return content.toString(); } },
        // Ignore license files
        { from: '**/LICENSE*', to: '', noErrorOnMissing: true, globOptions: { ignore: ['**/LICENSE*'] } },
      ],
    }),
  ],
};
