
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    {
        entry: './src/index.js',
        mode: 'development',
        optimization: {
            minimize: false
        },
        resolve: {
            extensions: ['.js', '.jsx', '.mjs', '.cjs', '.mjsx', '.cjsx', '.ts', '.tsx', '.mts', '.cts', '.mtsx', '.ctsx', '.json'],
            fallback: { "fs": false, "path": false },
            alias: {
                "/images": path.resolve(__dirname, "../src/images"),
                "images": path.resolve(__dirname, "../src/images"),
            },
        },
        externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        module: { 
            rules: [
                {
                    test: /\.(js|jsx|mjs|cjs|mjsx|cjsx)$/,
                    exclude: { or: [
                        path.resolve(__dirname, "node_modules"),
                        path.resolve(__dirname, "src/data"),
                        path.resolve(__dirname, "src/stories"),
                        path.resolve(__dirname, "src/tests"),
                    ]} ,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
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
                    use:  [
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {},
                    }],
                },
                {
                    test: /\.(bmp|gif|jpg|jpeg|png|svg|webp)$/,
                    exclude: /node_modules/ ,
                    type: 'asset/resource', 
                    use: [ 'url-loader', 'file-loader' ],
                },
                {
                    test: /\.(css)$/,
                    exclude: /node_modules/,
                    type: 'asset/resource',
                    generator: {
                        filename: (pathData) => {
                            return path.relative(path.resolve(__dirname, 'src'), pathData.filename);
                        },
                    },
                },
            ]
        } ,
        experiments: {
            outputModule: true,
        },
    }
];

