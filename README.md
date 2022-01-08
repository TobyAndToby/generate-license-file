# Generate License File

A CLI and code library to generate a text file containing all the licenses for your production third-party dependencies.

<a href="https://www.npmjs.com/package/generate-license-file">
  <img alt="npm" src="https://img.shields.io/npm/v/generate-license-file?logo=npm">
</a>

<a href="https://codecov.io/github/TobyAndToby/generate-license-file">
  <img src="https://codecov.io/github/TobyAndToby/generate-license-file/branch/main/graph/badge.svg"/>
</a>

## Installation and Usage (CLI)

```
$ npm install generate-license-file -g

$ generate-license-file --input package.json --output third-party-licenses.txt --overwrite
```

| Argument       | Description                                                                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--input`      | Absolute or relative path to the package.json for the project.                                                                                                          |
| `--output`     | Absolute or relative location for the output licenses file.                                                                                                             |
| `--overwrite`  | (optional) Allow the overwriting of existing output files.<br> If this option is not provided and the output file already exists, you will be prompted to confirm.             |
| `--eol`        | (optional) Specify the line endings used in the output file.<br> Accepted values are `windows` or `posix`.<br> If no value is provided your system default will be used. |
| `--no-spinner` | (optional) Disable the CLI spinner while the output file is being generated.                                                                                            |

If either the `--input` or `--output` are omitted the CLI will prompt you for their values.

## Installation and Usage (programmatic use)

```
$ npm install generate-license-file
```
#### TypeScript
```ts
import { getProjectLicenses } from "generate-license-file";

// Get an array of licenses for the current project's production dependencies.
const licenses: ILicense[] = await getProjectLicenses("./package.json");
```
#### JavaScript
```js
const generateLicenseFile = require("generate-license-file");

// Get an array of licenses for the current project's production dependencies.
generateLicenseFile
  .getProjectLicenses("./package.json")
  .then(licenses => {
    // Do stuff with licenses...
  })
  .catch(error => {
    // Do stuff with error...
  });
```

# License

generate-license-file is licensed under the [ISC License](./LICENSE.md).
