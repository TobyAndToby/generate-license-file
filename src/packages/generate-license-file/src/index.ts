/* istanbul ignore file */
export { generateLicenseFile } from "./lib/generateLicenseFile";
export type { GenerateLicenseFileOptions } from "./lib/generateLicenseFile";
export { getLicenseFileText } from "./lib/getLicenseFileText";
export type { GetLicenseFileTextOptions } from "./lib/getLicenseFileText";
export { getProjectLicenses } from "./lib/getProjectLicenses";
export type { GetProjectLicensesOptions } from "./lib/getProjectLicenses";
export type { LineEnding } from "./lib/lineEndings";
export type { ILicense } from "./lib/models/license";

// The following is included to ensure that Nx doesn't remove "commander"
// as a dependency from packages/generate-license-file/package.json.
//
// This is necessary because the @nx/dependency-checks eslint rule will
// remove commander if the generate-license-file package never imports from it directly.
//
// This approach was chosen over using the ignoredDependencies config option
// to insure that the same eslint rule continues to catch when the commander
// version falls out of sync with the @commander-js/extra-typings version.
import type { Command as _Command } from "commander";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _UnusedCommand = _Command;
