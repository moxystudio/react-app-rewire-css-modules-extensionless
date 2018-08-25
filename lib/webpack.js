'use strict';

const path = require('path');
const cloneDeep = require('lodash.clonedeep');

const getChildrenRules = (loader) => loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
    let result;
    const rules = Array.isArray(rulesSource) ? rulesSource : getChildrenRules(rulesSource);

    rules.some((rule, index) => (
        result = ruleMatcher(rule) ? { index, rules } : findIndexAndRules(getChildrenRules(rule), ruleMatcher))
    );

    return result;
};

const findRule = (rulesSource, ruleMatcher) => {
    const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);

    return rules[index];
};

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
    const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);

    rules.splice(index, 0, value);
};

const cssRuleMatcher = (rule) => rule.test && String(rule.test) === String(/\.css$/);
const cssLoaderRuleMatcher = (rule) => rule.loader && rule.loader.indexOf(`${path.sep}css-loader${path.sep}`) !== -1;

const createRewire = (options) => (config, env) => {
    options = {
        include: path.resolve('src'),
        exclude: undefined,
        camelCase: undefined,
        localIdentName: env === 'production' ? '[hash:base64:5]!' : '[name]__[local]___[hash:base64:5]!',
        test: /\.css$/,
        ...options,
    };

    const cssRule = findRule(config.module.rules, cssRuleMatcher);
    const cssModulesRule = cloneDeep(cssRule);
    const cssModulesRuleCssLoader = findRule(cssModulesRule, cssLoaderRuleMatcher);

    cssModulesRule.include = options.include;
    cssModulesRule.exclude = options.exclude;
    cssModulesRule.test = options.test;
    cssModulesRuleCssLoader.options.modules = true;
    cssModulesRuleCssLoader.options.camelCase = options.camelCase;
    cssModulesRuleCssLoader.options.localIdentName = options.localIdentName;

    addBeforeRule(config.module.rules, cssRuleMatcher, cssModulesRule);

    return config;
};

module.exports = (...args) => {
    if (args[0] && args[0].module) {
        const [config, env, options] = args;

        return createRewire(options)(config, env);
    }

    return createRewire(args[0]);
};
