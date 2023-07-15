import { getLicenseFileText } from "./getLicenseFileText";
import { AppendOption } from "./options/append";
import { ExcludeOption } from "./options/exclude";
import { LineEndingOption } from "./options/lineEnding";
import { IntersectionExpander } from "./options/optionsExpander";
import { ReplaceOption } from "./options/replace";
import { writeFileAsync } from "./utils/file.utils";

export type GetLicenseFileOptions = IntersectionExpander<
  LineEndingOption & ReplaceOption & ExcludeOption & AppendOption
>;

/**
 * Scans the project found at the given path and creates a license file at the given output location
 * @param pathToPackageJson A path to the package.json for the project
 * @param outputPath A file path for the resulting license file
 * @optional @param lineEnding "crlf" or "lf". Will use the system default if omitted
 */
export async function generateLicenseFile(
  pathToPackageJson: string,
  outputPath: string,
  options?: GetLicenseFileOptions,
): Promise<void>;

/**
 * Scans the projects found at the given paths and creates a license file at the given output location
 * @param pathsToPackageJsons Paths to the package.jsons for the projects
 * @param outputPath A file path for the resulting license file
 * @optional @param lineEnding "crlf" or "lf". Will use the system default if omitted
 */
export async function generateLicenseFile(
  pathsToPackageJsons: string[],
  outputPath: string,
  options?: GetLicenseFileOptions,
): Promise<void>;

export async function generateLicenseFile(
  pathsToPackageJsons: string[] | string,
  outputPath: string,
  options?: GetLicenseFileOptions,
): Promise<void> {
  if (typeof pathsToPackageJsons === "string") {
    pathsToPackageJsons = [pathsToPackageJsons];
  }

  const licenseFileText: string = await getLicenseFileText(pathsToPackageJsons, options);
  await writeFileAsync(outputPath, licenseFileText);
}
