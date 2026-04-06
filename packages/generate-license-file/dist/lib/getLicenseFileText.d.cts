import { AppendOption } from "./options/append.cjs";
import { ExcludeOption } from "./options/exclude.cjs";
import { LineEndingOption } from "./options/lineEnding.cjs";
import { OmitVersionsOption } from "./options/omitVersions.cjs";
import { IntersectionExpander } from "./options/optionsExpander.cjs";
import { ReplaceOption } from "./options/replace.cjs";

//#region src/lib/getLicenseFileText.d.ts
type GetLicenseFileTextOptions = IntersectionExpander<LineEndingOption & ReplaceOption & ExcludeOption & AppendOption & OmitVersionsOption>;
/**
 * Scans the project found at the given path and returns a string containing the licenses for all of the dependencies
 * @param pathToPackageJson A path to the package.json for the project
 * @param options Additional options for the license text generation
 * @returns A promise that resolves to the license file text
 */
declare function getLicenseFileText(pathToPackageJson: string, options?: GetLicenseFileTextOptions): Promise<string>;
/**
 * Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects
 * @param pathsToPackageJsons Paths to the package.jsons for the projects
 * @param options Additional options for the license text generation
 * @returns A promise that resolves to the license file text
 */
declare function getLicenseFileText(pathsToPackageJsons: string[], options?: GetLicenseFileTextOptions): Promise<string>;
//#endregion
export { GetLicenseFileTextOptions, getLicenseFileText };