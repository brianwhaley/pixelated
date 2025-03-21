declare module '@brianwhaley/pixelated-components';

declare module '*.md' {
    const value: string;
    export default value;
}

declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}
