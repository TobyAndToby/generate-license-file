# Generate License File

A CLI to generate a text file containing all the licenses for your production 3rd-party dependencies.

<a href="https://www.npmjs.com/package/generate-license-file">
  <img alt="npm" src="https://img.shields.io/npm/v/generate-license-file?logo=npm">
</a>

<a href="https://codecov.io/github/TobyAndToby/generate-license-file">
  <img src="https://codecov.io/github/TobyAndToby/generate-license-file/branch/main/graph/badge.svg"/>
</a>

## Installation and Usage (CLI)

```
$ npm install generate-license-file -g

$ generate-license-file --input package.json --output 3rd-party-licenses.txt --eol posix
```

- Input: The package.json for the project you want to target
- Output: The file to be created
- Eol: Which line endings to use (optional)

If either required flag is omitted the CLI will prompt you for the inputs.

If you don't supply an input file, and the CLI is able to detect a package.json in the folder you run the command from, then it will allow you to run the command using the detected file.

To disable the spinner which appears in the terminal while the file is being generated you can also pass in the `--no-spinner` flag.

## Installation and Usage (Programmatic use)

```
$ npm install generate-license-file
```

```js
const generateLicenseFile = require("generate-license-file");

// Get licenses for the current project (assuming this file is on the same level as the package.json)
generateLicenseFile
  .getProjectLicenses("./package.json")
  .then(licenses => {
    // Do stuff with licenses...
  })
  .catch(error => {
    // Do stuff with error...
  });
```

```ts
import * as generateLicenseFile from "generate-license-file";

const licenses = await generateLicenseFile.getProjectLicenses("./package.json");
```
