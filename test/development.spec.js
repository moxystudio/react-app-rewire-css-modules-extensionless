'use strict';

const serializerPath = require('jest-serializer-path');
const rewireCssModulesExtensionless = require('..');

expect.addSnapshotSerializer(serializerPath);

const mockConfig = {
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

it('should modify the webpack config correctly', () => {
    const result = rewireCssModulesExtensionless(mockConfig, 'development');

    expect(result.module.rules).toMatchSnapshot();
});

it('should override the default include / exclude', () => {
    const result = rewireCssModulesExtensionless(mockConfig, 'development', {
        include: 'foo',
        exclude: 'bar',
    });

    expect(result.module.rules).toMatchSnapshot();
});

it('should pass options to the css loader', () => {
    const result = rewireCssModulesExtensionless(mockConfig, 'development', {
        camelCase: 'dashes',
        localIdentName: 'foo-[hash:base64:5]!',
    });

    expect(result.module.rules).toMatchSnapshot();
});

it('should allow usage with compose', () => {
    expect(rewireCssModulesExtensionless(mockConfig, 'development'))
    .toEqual(rewireCssModulesExtensionless()(mockConfig, 'development'));

    expect(rewireCssModulesExtensionless(mockConfig, 'development', { camelCase: 'dashes' }))
    .toEqual(rewireCssModulesExtensionless({ camelCase: 'dashes' })(mockConfig, 'development'));
});
