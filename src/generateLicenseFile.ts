import { getLicenseFileText } from "./getLicenseFileText";
import { LineEnding } from "./lineEndings";
import { writeFileAsync } from "./utils/file.utils";

/**
 * Scans the project found at the given path and creates a license file at the given output location
 * @param pathToPackageJson A path to the package.json for the project
 * @param outputPath A file path for the resulting license file
 * @optional @param lineEnding `"crlf"` or `"lf"`. Will use the system default if omitted
 */
export async function generateLicenseFile(
  pathToPackageJson: string,
  outputPath: string,
  lineEnding?: LineEnding
): Promise<void>;

/**
 * Scans the projects found at the given paths and creates a license file at the given output location
 * @param pathsToPackageJsons An array of paths to the package.json files for the projects
 * @param outputPath A file path for the resulting license file
 * @optional @param lineEnding `"crlf"` or `"lf"`. Will use the system default if omitted
 */
export async function generateLicenseFile(
  pathsToPackageJsons: string[],
  outputPath: string,
  lineEnding?: LineEnding
): Promise<void>;

export async function generateLicenseFile(
  pathsToPackageJsons: string[] | string,
  outputPath: string,
  lineEnding?: LineEnding
): Promise<void> {
  if (typeof pathsToPackageJsons === "string") {
    pathsToPackageJsons = [pathsToPackageJsons];
  }

  const licenseFileText: string = await getLicenseFileText(pathsToPackageJsons, lineEnding);
  await writeFileAsync(outputPath, licenseFileText);
}
