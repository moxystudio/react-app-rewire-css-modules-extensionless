'use strict';

const createRewire = () => (config) => {
    delete config.transform['^.+\\.css$'];
    config.moduleNameMapper = config.moduleNameMapper || {};
    config.moduleNameMapper['\\.css$'] = require.resolve('identity-obj-proxy');

    return config;
};

module.exports = (...args) => {
    if (args[0] && args[0].transform) {
        const [config, env, options] = args;

        return createRewire(options)(config, env);
    }

    return createRewire(args[0]);
};
