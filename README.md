# react-app-rewire-css-modules-extensionless

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/react-app-rewire-css-modules-extensionless
[npm-image]:https://img.shields.io/npm/v/react-app-rewire-css-modules-extensionless.svg
[downloads-image]:https://img.shields.io/npm/dm/react-app-rewire-css-modules-extensionless.svg
[travis-url]:https://travis-ci.org/moxystudio/react-app-rewire-css-modules-extensionless
[travis-image]:https://img.shields.io/travis/moxystudio/react-app-rewire-css-modules-extensionless/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/react-app-rewire-css-modules-extensionless
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-app-rewire-css-modules-extensionless/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-app-rewire-css-modules-extensionless
[david-dm-image]:https://img.shields.io/david/moxystudio/react-app-rewire-css-modules-extensionless.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-app-rewire-css-modules-extensionless?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-app-rewire-css-modules-extensionless.svg

Adds CSS modules for CRA apps without requiring the `.modules.css` extension, using [`react-app-rewired`](https://github.com/timarney/react-app-rewired).

This rewire is similar to [`react-app-rewire-css-modules`](https://github.com/codebandits/react-app-rewire-css-modules) with two differences:

- Doesn't require `.modules.css` extension for CSS files in `src/` the source folder.
- Doesn't force you to install and use the `sass-loader`
- Setups jest


## Installation

```sh
$ npm install --save-dev react-app-rewire-css-modules-extensionless
```


## Usage

In the `config-overrides.js` you created for `react-app-rewired` add this code:

```js
module.exports = {
    webpack: (config, env) => {
        config = require('react-app-rewire-css-modules-extensionless').webpack(config, env, { /* options */ });
        // The line below is equivalent
        // config = require('react-app-rewire-css-modules-extensionless')(config, env, { /* options */ });

        // You may apply other rewires as well

        return config;
    },
    jest: (config) => {
        config = require('react-app-rewire-css-modules-extensionless').jest(config);

        // You may apply other rewires as well

        return config;
    },
};
```

If you are using the `compose` utility of `react-app-rewired`:

```js
const { compose } = require('react-app-rewired');

module.exports = {
    webpack: compose(
        require('react-app-rewire-css-modules-extensionless').webpack({ /* options */ })
        // The line below is equivalent
        require('react-app-rewire-css-modules-extensionless')({ /* options */ })
        // ... other rewires
    ),
    jest: compose(
        require('react-app-rewire-css-modules-extensionless').jest()
        // ... other rewires
    ),
};
```

Available options:

| Name   | Description   | Type     | Default |
| ------ | ------------- | -------- | ------- |
| test | The loader test pattern | string/RegExp | `/\.css$/` |
| include | The loader include condition | string/Array/RegExp/Function | *src folder* |
| exclude | The loader exclude condition | string/Array/RegExp/Function | |
| localIdentName | The localIdentName option to pass to the `css-loader` | string | `[hash:base64:5]!` for production, `[name]__[local]___[hash:base64:5]!` otherwise |

If you modify `include` and `exclude` to point to packages in `node_modules`, it's advised to use `fs.realpathSync` so that it plays well with packages linked with `npm link`. Alternatively, you may disable [`resolve.symlinks`](https://webpack.js.org/configuration/resolve/#resolve-symlinks) in your webpack configuration.


## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```


## License

[MIT License](http://opensource.org/licenses/MIT)
