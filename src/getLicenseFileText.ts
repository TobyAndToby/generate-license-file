import * as os from "os";
import { LineEnding } from "./generateLicenseFile";
import { getProjectLicensesInternal } from "./internal/getProjectLicensesInternal";
import { License } from "./models/license";

const SUFFIX = "-----------";
const FOOTER =
  "This file was generated with generate-license-file! https://www.npmjs.com/package/generate-license-file";

/**
 * Scans the project found at the given path and returns a string containing the licenses for all the dependencies
 * @param pathToPackageJson A path to the package.json for the project
 * @optional @param lineEnding "windows" or "posix". Will use the system default if omitted
 * @returns A promise that resolves to the license file text
 */
export async function getLicenseFileText(
  pathToPackageJson: string,
  lineEnding?: LineEnding
): Promise<string> {
  const EOL = getLineEnding(lineEnding);
  const licenses: License[] = await getProjectLicensesInternal(pathToPackageJson);
  let licenseFile = "";

  for (const license of licenses) {
    licenseFile += license.format(EOL) + EOL + EOL + SUFFIX + EOL + EOL;
  }

  licenseFile += FOOTER + EOL;
  return licenseFile;
}

function getLineEnding(lineEndings?: LineEnding): string {
  switch (lineEndings) {
    case "windows":
      return "\r\n";
    case "posix":
      return "\n";
    default:
      return os.EOL;
  }
}
