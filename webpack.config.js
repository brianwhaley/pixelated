
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const baseConfig = {
    mode: 'development',
    optimization: {
        minimize: false
    },
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.cjs', '.mjsx', '.cjsx', '.ts', '.tsx', '.mts', '.cts', '.mtsx', '.ctsx', '.json'],
        alias: {
            "/images": path.resolve(__dirname, "../src/images"),
            "images": path.resolve(__dirname, "../src/images"),
        },
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};

export const sharedRulesConfig = [
    {
        test: /\.(js|jsx|mjs|cjs|mjsx|cjsx)$/,
        exclude: /node_modules/ ,
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
        use: 'sass-loader',
    },
    {
        test: /\.(bmp|gif|jpg|jpeg|png|svg|webp)$/,
        exclude: /node_modules/ ,
        type: 'asset/resource', 
        use: [ 'url-loader', 'file-loader' ],
    },
];

export default [
    {
        ...baseConfig,
        module: { 
            rules: [
                sharedRulesConfig, 
                {
                    test: /\.(css)$/,
                    exclude: /node_modules/ ,
                    use: [ 
                        "style-loader", 
                        {
                            loader: "css-loader",
                            options: { url: false, modules: false }, // Disable url() resolution
                        }
                    ],
                },
            ]
        } ,
        name: 'client',
        entry: './src/index.client.js',
        target: 'web',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'index.client.js',
            libraryTarget: 'module',
            // library: 'pixelated',
            // umdNamedDefine: true,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts', '.json'],
            fallback: { "fs": false, "path": false },
            alias: {
                "/images": path.resolve(__dirname, "../src/images"),
                "images": path.resolve(__dirname, "../src/images"),
            },
        },
        experiments: {
            outputModule: true,
        },
    },
    {
        ...baseConfig,
        module: { 
            rules: [
                sharedRulesConfig, 
                {
                    test: /\.(css)$/,
                    exclude: /node_modules/ ,
                    use: [ 
                        "style-loader", 
                        {
                            loader: "css-loader",
                            options: { url: false, modules: false }, // Disable url() resolution
                        }
                    ],
                },
            ]
        } ,
        name: 'server',
        entry: './src/index.server.js',
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'index.server.js',
            libraryTarget: 'commonjs2',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts', '.json'],
            alias: {
                "/images": path.resolve(__dirname, "../src/images"),
                "images": path.resolve(__dirname, "../src/images"),
            },
        },
        externalsPresets: {
            node: true, // ignore built-in modules like path, fs, etc. 
        },
    },
];

