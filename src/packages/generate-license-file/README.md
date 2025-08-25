# Generate License File

A CLI and code library to generate a text file containing all of the licenses for your production third-party dependencies.

<a href="https://www.npmjs.com/package/generate-license-file">
  <img alt="npm" src="https://img.shields.io/npm/v/generate-license-file?logo=npm">
</a>

<a href="https://codecov.io/github/TobyAndToby/generate-license-file">
  <img src="https://codecov.io/github/TobyAndToby/generate-license-file/branch/main/graph/badge.svg"/>
</a>

## Installation and Usage (CLI)

```bash
npm install generate-license-file --save-dev

npx generate-license-file --input package.json --output third-party-licenses.txt --overwrite
```

| Argument       | Description                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--input`      | Absolute or relative path to the package.json for the project.                                                                                                    |
| `--output`     | Absolute or relative path for the generated output file.                                                                                                          |
| `--overwrite`  | (optional) Allows the CLI to overwrite existing output files. If this option is not provided and the output file already exists, you will be prompted to confirm. |
| `--eol`        | (optional) Specify the line endings used in the output file. Accepted values are `crlf` or `lf`. If no value is provided your system default will be used.        |
| `--ci`         | (optional) Stops the CLI from prompting the user for inputs and instead exits with a non-zero exit code.                                                          |
| `--no-spinner` | (optional) Disable the CLI spinner while the output file is being generated.                                                                                      |
| `--config`     | (optional) Specify the path to a generate-license-file config file at a non-standard location.                                                                    |
| `--version`    | (optional) Print the installed generate-license-file version.                                                                                                     |

If either the `--input` or `--output` are omitted the CLI will prompt you for their values.

For a full description of the CLI arguments and their usages please see the relevant [docs page](https://generate-license-file.js.org/docs/intro).

## Installation and Usage (Library API)

```bash
npm install generate-license-file --save-dev
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

## Advanced Configuration

Advanced configuration of the generated output can be done using a configuration file. In addition to the basic CLI arguments, a configuration file allows you to specify appendices, exclusions, and replacements.

Config files can be called either `.glf` or `.generatelicensefile` and can be customised using the following options:

- File name can optionally end with `rc`
- Can be in a `./.config` directory (no longer needs the `.` prefix on the file name)
- Have the following file extensions: `.json`, `jsonc`, `.json5`, `.yaml`, `.yml`, `.js`, `.cjs`

E.g. `.glf.json`, `.glfrc.yml`, `.generatelicensefile.jsonc`, `.config/glf.js`, and more.

```jsonc
{
  // Default config - can be passed in via config and/or CLI
  "inputs": ["./package.json"],
  "output": "./third-party-licenses.txt",
  "lineEnding": "lf",

  // Paths to any file's whose content will be appended to the end of the generated file.
  "append": ["./additional-content.txt"],

  // Substitute the given packages license with the content in the respective file.
  "replace": {
    "replaced-package@4.33.1": "./bespoke-license.txt",
    "another-replaced-package": "./bespoke-license-2.txt"
  },

  // Exclude any packages from the output.
  "exclude": ["your-package", "my-package@1.2.0", "/.*prettier.*/i"],

  // Omit the version number in the output file
  "omitVersions": false
}
```

If you want to call your config file something else then you can pass it to the CLI via the `--config` argument:

```bash
npx generate-license-file --config ./my-config.json
```

# Contributing and Building From Source

generate-license-file is an NX Monorepo. We have aliased common commands in the scripts section of the `src/package.json` to make working with the project easier.

Each package in the monorepo (under `src/packages/`) contains a README with further information. The main library and CLI is under `packages/generate-license-file`.

```bash
# cwd: src/

npm run lint

npm run test  # unit tests

npm run test:e2e  # e2e tests

npm run build  # will build all packages into src/dist/[package name]
```

# License

generate-license-file is licensed under the [ISC License](./LICENSE.md).
