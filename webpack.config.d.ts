declare const _default: {
    entry: string;
    mode: string;
    optimization: {
        minimize: boolean;
    };
    resolve: {
        extensions: string[];
        fallback: {
            fs: boolean;
            path: boolean;
        };
        alias: {
            "/images": string;
            images: string;
        };
    };
    externals: any[];
    module: {
        rules: ({
            test: RegExp;
            exclude: {
                or: string[];
            };
            use: {
                loader: string;
                options: {
                    presets: string[];
                };
            };
            type?: undefined;
            generator?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: string;
            type?: undefined;
            generator?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            use: (string | {
                loader: string;
                options: {};
            })[];
            type?: undefined;
            generator?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            type: string;
            use: string[];
            generator?: undefined;
        } | {
            test: RegExp;
            exclude: RegExp;
            type: string;
            generator: {
                filename: (pathData: any) => string;
            };
            use?: undefined;
        })[];
    };
    experiments: {
        outputModule: boolean;
    };
}[];
export default _default;
//# sourceMappingURL=webpack.config.d.ts.map