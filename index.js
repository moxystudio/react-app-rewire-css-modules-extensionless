'use strict';

const webpackRewire = require('./lib/webpack');
const jestRewire = require('./lib/jest');

module.exports = webpackRewire;
module.exports.webpack = webpackRewire;
module.exports.jest = jestRewire;
