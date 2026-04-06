import { AppendOption } from "./options/append.cjs";
import { ExcludeOption } from "./options/exclude.cjs";
import { LineEndingOption } from "./options/lineEnding.cjs";
import { OmitVersionsOption } from "./options/omitVersions.cjs";
import { IntersectionExpander } from "./options/optionsExpander.cjs";
import { ReplaceOption } from "./options/replace.cjs";

//#region src/lib/generateLicenseFile.d.ts
type GenerateLicenseFileOptions = IntersectionExpander<LineEndingOption & ReplaceOption & ExcludeOption & AppendOption & OmitVersionsOption>;
/**
 * Scans the project found at the given path and creates a license file at the given output location
 * @param pathToPackageJson A path to the package.json for the project
 * @param outputPath A file path for the resulting license file
 * @param options Additional options for the license file generation
 */
declare function generateLicenseFile(pathToPackageJson: string, outputPath: string, options?: GenerateLicenseFileOptions): Promise<void>;
/**
 * Scans the projects found at the given paths and creates a license file at the given output location
 * @param pathsToPackageJsons Paths to the package.jsons for the projects
 * @param outputPath A file path for the resulting license file
 * @param options Additional options for the license file generation
 */
declare function generateLicenseFile(pathsToPackageJsons: string[], outputPath: string, options?: GenerateLicenseFileOptions): Promise<void>;
//#endregion
export { GenerateLicenseFileOptions, generateLicenseFile };