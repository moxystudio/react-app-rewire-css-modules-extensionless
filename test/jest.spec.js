'use strict';

const serializerPath = require('jest-serializer-path');
const rewireCssModulesExtensionless = require('..');

expect.addSnapshotSerializer(serializerPath);

const mockConfig = {
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'path/to/config/jest/babelTransform.js',
        '^.+\\.css$': 'path/to/config/jest/cssTransform.js',
        '^.+\\.(graphql)$': 'path/to/config/jest/graphqlTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json|graphql)$)': 'path/to/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
    ],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
    },
};

it('should modify the jest config correctly', () => {
    const result = rewireCssModulesExtensionless.jest(mockConfig);

    expect(result).toMatchSnapshot();
});

it('should allow usage with compose', () => {
    expect(rewireCssModulesExtensionless.jest(mockConfig))
    .toEqual(rewireCssModulesExtensionless.jest()(mockConfig));
});
