import { getLicensesForProjects } from "./internal/getLicensesForProjects";
import { getLineEndingValue, LineEnding } from "./lineEndings";
import { License } from "./models/license";

const SUFFIX = "-----------";
const CREDIT1 = "This file was generated with the generate-license-file npm package!";
const CREDIT2 = "https://www.npmjs.com/package/generate-license-file";

/**
 * Scans the project found at the given path and returns a string containing the licenses for all of the dependencies
 * @param pathToPackageJson A path to the package.json for the project
 * @optional @param lineEnding "crlf" or "lf". Will use the system default if omitted
 * @returns A promise that resolves to the license file text
 */
export async function getLicenseFileText(
  pathToPackageJson: string,
  lineEnding?: LineEnding,
): Promise<string>;

/**
 * Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects
 * @param pathsToPackageJsons Paths to the package.jsons for the projects
 * @optional @param lineEnding "crlf" or "lf". Will use the system default if omitted
 * @returns A promise that resolves to the license file text
 */
export async function getLicenseFileText(
  pathsToPackageJsons: string[],
  lineEnding?: LineEnding,
): Promise<string>;

export async function getLicenseFileText(
  pathsToPackageJsons: string[] | string,
  lineEnding?: LineEnding,
): Promise<string> {
  if (typeof pathsToPackageJsons === "string") {
    pathsToPackageJsons = [pathsToPackageJsons];
  }

  const EOL = getLineEndingValue(lineEnding);
  const credit = getCredit(EOL);

  const licenses: License[] = await getLicensesForProjects(pathsToPackageJsons);

  let licenseFile = credit + EOL + EOL;

  for (const license of licenses) {
    licenseFile += license.format(EOL) + EOL + EOL + SUFFIX + EOL + EOL;
  }

  licenseFile += credit + EOL;

  return licenseFile;
}

const getCredit = (EOL: string): string => CREDIT1 + EOL + CREDIT2;
