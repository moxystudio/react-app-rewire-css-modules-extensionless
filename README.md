# react-app-rewire-css-modules-extensionless

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

[npm-url]:https://npmjs.org/package/react-app-rewire-css-modules-extensionless
[npm-image]:http://img.shields.io/npm/v/react-app-rewire-css-modules-extensionless.svg
[downloads-image]:http://img.shields.io/npm/dm/react-app-rewire-css-modules-extensionless.svg
[travis-url]:https://travis-ci.org/moxystudio/react-app-rewire-css-modules-extensionless
[travis-image]:http://img.shields.io/travis/moxystudio/react-app-rewire-css-modules-extensionless/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/react-app-rewire-css-modules-extensionless
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-app-rewire-css-modules-extensionless/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-app-rewire-css-modules-extensionless
[david-dm-image]:https://img.shields.io/david/moxystudio/react-app-rewire-css-modules-extensionless.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-app-rewire-css-modules-extensionless?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-app-rewire-css-modules-extensionless.svg
[greenkeeper-image]:https://badges.greenkeeper.io/moxystudio/react-app-rewire-css-modules-extensionless.svg
[greenkeeper-url]:https://greenkeeper.io

Adds CSS modules for CRA apps without requiring the `.modules.css` extension, using [`react-app-rewired`](https://github.com/timarney/react-app-rewired).


## Installation

`$ npm install --save-dev eslint react-app-rewire-css-modules-extensionless`


## Usage

In the `config-overrides.js` you created for `react-app-rewired` add this code:

```js
module.exports = (config, env) => {
    config = require('react-app-rewire-css-modules-extensionless')(config, env, { /* options */ });

    // You may apply other rewires as well

    return config;
}
```

If you are using the `compose` utility of `react-app-rewired`:

```js
const { compose } = require('react-app-rewired');

module.exports = compose(
    require('react-app-rewire-css-modules-extensionless')({ /* options */ })
    // ... other rewires
)
```

Available options:


| Name   | Description   | Type     | Default |
| ------ | ------------- | -------- | ------- |
| include | The loader include condition | string/Array/RegExp/Function | *src folder* |
| exclude | The loader exclude condition | string/Array/RegExp/Function | |
| localIdentName | The localIdentName option to pass to the `css-loader` | string | `[hash:base64:5]!` for production, `[name]__[local]___[hash:base64:5]!` otherwise |


## Usage with Storybook

When using `@storybooks/storybook` with CRA via `getstorybook`, create a `.storybook/webpack.config.js` file and add this code:

```js
module.exports = (config, env) => {
    require('react-app-rewire-css-modules-extensionless')(config, env, { /* options */ })
};
```


## Tests

`$ npm test`   
`$ npm test -- --watch` during development


## License

[MIT License](http://opensource.org/licenses/MIT)
