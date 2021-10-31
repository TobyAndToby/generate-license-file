# generate-license-file-webpack-plugin

Webpack plugin to create an asset file containing all the licenses for your production dependencies.  
Based on the npm package [generate-licence-file](https://www.npmjs.com/package/generate-license-file).  
Currently supports Webpack v5.

## Usage

To use the default configuration you only need to construct the plugin in your webpack plugins array:
```js
// webpack.config.js
{
  module.exports = {
    plugins: [
      new LicenseFilePlugin()
    ]
  }
}
```

The plugin can be configured using the following options. Below shows the default values:
```js
// webpack.config.js
{
  module.exports = {
    plugins: [
      new LicenseFilePlugin({
        outputFileName: 'third-party-licenses.txt',
        outputFolder: './', // Relative to your build output directory
        projectFolder: './', // Relative to your Webpack context directory
        isDev: false,
        lineEnding: 'posix', // '\n'
      })
    ]
  }
}
```

## Building the plugin yourself

```bash
npm install
npm run build
```

## License

### ISC

Copyright (c) 2021, Toby Bessant & Toby Smith

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
