import { resolveLicenses } from "./internal/resolveLicenses";
import { getLineEndingValue, LineEnding } from "./lineEndings";
import { License } from "./models/license";

const SUFFIX = "-----------";
const CREDIT1 = "This file was generated with the generate-license-file npm package!";
const CREDIT2 = "https://www.npmjs.com/package/generate-license-file";

export type GetLicenseFileTextOptions = {
  lineEnding?: LineEnding;
  replace?: Record<string, string>;
  exclude?: string[];
};

/**
 * Scans the project found at the given path and returns a string containing the licenses for all of the dependencies
 * @param pathToPackageJson A path to the package.json for the project
 * @optional @param lineEnding "crlf" or "lf". Will use the system default if omitted
 * @returns A promise that resolves to the license file text
 */
export async function getLicenseFileText(
  pathToPackageJson: string,
  options?: GetLicenseFileTextOptions,
): Promise<string>;

/**
 * Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects
 * @param pathsToPackageJsons Paths to the package.jsons for the projects
 * @optional @param lineEnding "crlf" or "lf". Will use the system default if omitted
 * @returns A promise that resolves to the license file text
 */
export async function getLicenseFileText(
  pathsToPackageJsons: string[],
  options?: GetLicenseFileTextOptions,
): Promise<string>;

export async function getLicenseFileText(
  pathsToPackageJsons: string[] | string,
  options?: GetLicenseFileTextOptions,
): Promise<string> {
  if (typeof pathsToPackageJsons === "string") {
    pathsToPackageJsons = [pathsToPackageJsons];
  }

  const EOL = getLineEndingValue(options?.lineEnding);
  const credit = getCredit(EOL);

  const licenses: License[] = await resolveLicenses(pathsToPackageJsons, options);

  const sortedLicenses = licenses.sort((a, b) => a.content.localeCompare(b.content));

  let licenseFile = credit + EOL + EOL;

  for (const license of sortedLicenses) {
    licenseFile += license.format(EOL) + EOL + EOL + SUFFIX + EOL + EOL;
  }

  licenseFile += credit + EOL;

  return licenseFile;
}

const getCredit = (EOL: string): string => CREDIT1 + EOL + CREDIT2;
