# generate-license-file-webpack-plugin

Webpack plugin to generate a text file asset containing all of the licenses for your production third-party dependencies.

<a href="https://www.npmjs.com/package/generate-license-file-webpack-plugin">
  <img alt="npm" src="https://img.shields.io/npm/v/generate-license-file-webpack-plugin?logo=npm">
</a>

<a href="https://codecov.io/github/TobyAndToby/generate-license-file">
  <img alt="CodeCov" src="https://codecov.io/github/TobyAndToby/generate-license-file/branch/main/graph/badge.svg"/>
</a>

Based on the npm package [generate-licence-file](https://www.npmjs.com/package/generate-license-file).  
Currently supports Webpack v5.

## Usage

To use the default configuration, construct the plugin in your webpack plugins array:

```js
// webpack.config.js
const { LicenseFilePlugin } = require("generate-license-file-webpack-plugin");

module.exports = {
  plugins: [new LicenseFilePlugin()],
};
```

The plugin can be configured using the following options. Below shows the default values:

```js
// webpack.config.js
const { LicenseFilePlugin } = require("generate-license-file-webpack-plugin");

module.exports = {
  plugins: [
    new LicenseFilePlugin({
      outputFileName: "third-party-licenses.txt",
      outputFolder: "./", // Relative to your build output directory
      pathToPackageJson: "./package.json",
      isDev: false, // When true, uses placeholder content to reduce compilation time
      lineEnding: undefined, // Can be 'windows' or 'posix'. If omitted, the system default will be used
    }),
  ],
};
```

## Building the plugin yourself

```bash
npm install
npm run build
```

## License

generate-license-file-webpack-plugin is licensed under the [ISC License](./LICENSE.md).
