'use strict';

const serializerPath = require('jest-serializer-path');
const rewireCssModulesExtensionless = require('..');

expect.addSnapshotSerializer(serializerPath);

const mockDevelopmentConfig = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    { options: {}, loader: 'path/to/eslint-loader/index.js' },
                ],
                include: 'path/to/src',
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: 'path/to/url-loader/index.js',
                        options: {},
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: 'path/to/src',
                        loader: 'path/to/babel-loader/lib/index.js',
                        options: {},
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'path/to/style-loader/index.js',
                            {
                                loader: 'path/to/css-loader/index.js',
                                options: { importLoaders: 1 },
                            },
                            {
                                loader: 'path/to/postcss-loader/lib/index.js',
                                options: {},
                            },
                        ],
                    },
                    {
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        loader: 'path/to/file-loader/dist/cjs.js',
                        options: { name: 'static/media/[name].[hash:8].[ext]' },
                    },
                ],
            },
        ],
    },
};

const mockProductionConfig = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    { options: {}, loader: 'path/to/eslint-loader/index.js' },
                ],
                include: 'path/to/src',
            },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: 'path/to/url-loader/index.js',
                        options: {},
                    },
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: 'path/to/src',
                        loader: 'path/to/babel-loader/lib/index.js',
                        options: {},
                    },
                    {
                        test: /\.css$/,
                        loader: [
                            {
                                loader: 'path/to/extract-text-webpack-plugin/dist/loader.js',
                                options: {},
                            },
                            {
                                loader: 'path/to/style-loader/index.js',
                                options: {},
                            },
                            {
                                loader: 'path/to/css-loader/index.js',
                                options: {
                                    importLoaders: 1,
                                    minimize: true,
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'path/to/postcss-loader/lib/index.js',
                                options: {},
                            },
                        ],
                    },
                    {
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        loader: 'path/to/file-loader/dist/cjs.js',
                        options: { name: 'static/media/[name].[hash:8].[ext]' },
                    },
                ],
            },
        ],
    },
};

it('should modify the webpack config correctly for development', () => {
    const result = rewireCssModulesExtensionless(mockDevelopmentConfig, 'development');

    expect(result).toMatchSnapshot();
});

it('should modify the webpack config correctly for production', () => {
    const result = rewireCssModulesExtensionless(mockProductionConfig, 'production');

    expect(result).toMatchSnapshot();
});

it('should override the default test / include / exclude', () => {
    const result = rewireCssModulesExtensionless.webpack(mockDevelopmentConfig, 'development', {
        test: 'css',
        include: 'foo',
        exclude: 'bar',
    });

    expect(result.module.rules).toMatchSnapshot();
});

it('should pass options to the css loader', () => {
    const result = rewireCssModulesExtensionless.webpack(mockDevelopmentConfig, 'development', {
        camelCase: 'dashes',
        localIdentName: 'foo-[hash:base64:5]!',
    });

    expect(result.module.rules).toMatchSnapshot();
});

it('should allow usage with compose', () => {
    expect(rewireCssModulesExtensionless.webpack(mockDevelopmentConfig, 'development'))
    .toEqual(rewireCssModulesExtensionless.webpack()(mockDevelopmentConfig, 'development'));

    expect(rewireCssModulesExtensionless.webpack(mockDevelopmentConfig, 'development', { camelCase: 'dashes' }))
    .toEqual(rewireCssModulesExtensionless.webpack({ camelCase: 'dashes' })(mockDevelopmentConfig, 'development'));
});
