import { resolveLicenses } from "./internal/resolveLicenses";
import { getLineEndingCharacters } from "./lineEndings";
import { License } from "./models/license";
import { AppendOption } from "./options/append";
import { ExcludeOption } from "./options/exclude";
import { LineEndingOption } from "./options/lineEnding";
import { IntersectionExpander } from "./options/optionsExpander";
import { ReplaceOption } from "./options/replace";
import { readFile } from "./utils/file.utils";
import { prepareContentForOutput } from "./utils/string.utils";

const SUFFIX = "-----------";
const CREDIT1 = "This file was generated with the generate-license-file npm package!";
const CREDIT2 = "https://www.npmjs.com/package/generate-license-file";

export type GetLicenseFileTextOptions = IntersectionExpander<
  LineEndingOption & ReplaceOption & ExcludeOption & AppendOption
>;

/**
 * Scans the project found at the given path and returns a string containing the licenses for all of the dependencies
 * @param pathToPackageJson A path to the package.json for the project
 * @param options Additional options for the license text generation
 * @returns A promise that resolves to the license file text
 */
export async function getLicenseFileText(
  pathToPackageJson: string,
  options?: GetLicenseFileTextOptions,
): Promise<string>;

/**
 * Scans the projects found at the given paths and returns a string containing the licenses for all the dependencies across all the projects
 * @param pathsToPackageJsons Paths to the package.jsons for the projects
 * @param options Additional options for the license text generation
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

  const EOL = getLineEndingCharacters(options?.lineEnding);
  const credit = getCredit(EOL);

  const licenses: License[] = await resolveLicenses(pathsToPackageJsons, options);

  const sortedLicenses = licenses.sort((a, b) => a.content.localeCompare(b.content));

  let licenseFile = credit + EOL + EOL;

  for (const license of sortedLicenses) {
    licenseFile += license.format(EOL) + EOL + EOL + SUFFIX + EOL + EOL;
  }

  for (const appendixFilePath of options?.append ?? []) {
    const appendixContent = await readFile(appendixFilePath, { encoding: "utf-8" });
    const formattedAppendixContent = prepareContentForOutput(appendixContent, EOL);
    licenseFile += formattedAppendixContent + EOL + EOL + SUFFIX + EOL + EOL;
  }

  licenseFile += credit + EOL;

  return licenseFile;
}

const getCredit = (EOL: string): string => CREDIT1 + EOL + CREDIT2;
