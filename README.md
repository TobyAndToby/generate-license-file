# Generate License File

A CLI and code library to generate a text file containing all of the licenses for your production third-party dependencies.

<a href="https://www.npmjs.com/package/generate-license-file">
  <img alt="npm" src="https://img.shields.io/npm/v/generate-license-file?logo=npm">
</a>

<a href="https://codecov.io/github/TobyAndToby/generate-license-file">
  <img src="https://codecov.io/github/TobyAndToby/generate-license-file/branch/main/graph/badge.svg"/>
</a>

## Installation and Usage (CLI)

```
$ npm install generate-license-file --save-dev

$ npx generate-license-file --input package.json --output third-party-licenses.txt --overwrite
```

| Argument       | Description                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--input`      | Absolute or relative path to the package.json for the project.                                                                                                    |
| `--output`     | Absolute or relative path for the generated output file.                                                                                                          |
| `--overwrite`  | (optional) Allows the CLI to overwrite existing output files. If this option is not provided and the output file already exists, you will be prompted to confirm. |
| `--eol`        | (optional) Specify the line endings used in the output file. Accepted values are `crlf` or `lf`. If no value is provided your system default will be used.        |
| `--ci`         | (optional) Stops the CLI from prompting the user for inputs and instead exits with a non-zero exit code.                                                          |
| `--no-spinner` | (optional) Disable the CLI spinner while the output file is being generated.                                                                                      |
| `--version`    | (optional) Print the installed generate-license-file version.                                                                                                     |

If either the `--input` or `--output` are omitted the CLI will prompt you for their values.

For a full description of the CLI arguments and their usages please see the relevant [docs page](https://generate-license-file.js.org/docs/intro).

## Installation and Usage (Library API)

```
$ npm install generate-license-file --save-dev
```

#### TypeScript

```ts
import { generateLicenseFile, getLicenseFileText, getProjectLicenses } from "generate-license-file";

// Generate the license file and write it to disk.
await generateLicenseFile("./package.json", "./third-party-licenses.txt");

// Generate the license file content and return it as a string.
const licenseFileText: string = await getLicenseFileText("./package.json");

// Get an array of objects each containing the details of an
// identified license and the dependencies it pertains to.
const licenses: ILicense[] = await getProjectLicenses("./package.json");
```

For a full description of the library API and example usages please see the relevant [docs page](https://generate-license-file.js.org/docs/library).

## Advanced Configuration (beta)

Advanced configuration of the generated output can be done using a configuration file. In addition to the basic CLI arguments, a configuration file allows you to specify appendices, exclusions, and replacements.

```jsonc
{
  // Default config - can be passed in via config and/or CLI
  "inputs": ["./package.json"],
  "output": "./third-party-licenses.txt",
  "lineEnding": "lf",

  // Paths to any file's whose content will be appended to the end of the generated file.
  "append": ["./additional-content.txt"],

  // Substitute the given packages output with the content in the respective file.
  "replace": {
    "replaced-package@4.33.1": "./bespoke-license.txt"
  },

  // Exclude any packages from the output.
  "exclude": ["my-package@1.2.0"]
}
```

# License

generate-license-file is licensed under the [ISC License](./LICENSE.md).
