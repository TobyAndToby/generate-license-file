import * as os from "os";
import { ILicense, License } from "./models/license";
import console from "./utils/console.utils";
import { doesFileExist, doesFolderExist, readFileAsync, writeFileAsync } from "./utils/file.utils";
import { getProject, Project } from "./utils/licence.utils";

const SUFFIX: string = "-----------";
const FOOTER: string =
  "This file was generated with generate-license-file! https://www.npmjs.com/package/generate-license-file";

const UTF8 = "utf-8";

/**
 * Used to specifiy which line endings to use in the generated file
 *
 * `windows` = "\r\n"
 *
 * `posix` = "\n"
 */
export type LineEnding = "windows" | "posix";

/**
 * Scans the project found at the given path and creates a license file at the given output location
 * @param path A path to a directory containing a package.json
 * @param outputPath A file path for the resulting license file
 * @optional @param lineEnding "windows" or "posix". Will use the system default if omitted
 */
export async function generateLicenseFile(
  path: string,
  outputPath: string,
  lineEnding?: LineEnding
): Promise<void> {
  const licenseFileText: string = await getLicenseFileText(path, lineEnding);
  await writeFileAsync(outputPath, licenseFileText, { encoding: UTF8 });
}

/**
 * Scans the project found at the given path and returns a string containing the licenses for all the dependencies
 * @param path A path to a directory containing a package.json
 * @optional @param lineEnding "windows" or "posix". Will use the system default if omitted
 * @returns A promise that resolves to the license file text
 */
export async function getLicenseFileText(path: string, lineEnding?: LineEnding): Promise<string> {
  const EOL = getLineEnding(lineEnding);
  const licenses: License[] = await getProjectLicensesInternal(path);
  let licenseFile = "";

  for (const license of licenses) {
    licenseFile += license.format(EOL) + EOL + EOL + SUFFIX + EOL + EOL;
  }

  licenseFile += FOOTER + EOL;
  return licenseFile;
}

/**
 * @param path Directory containing the project's package.json (relative or absolute).
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(path: string): Promise<ILicense[]> {
  return getProjectLicensesInternal(path);
}

async function getProjectLicensesInternal(path: string): Promise<License[]> {
  try {
    const dependencyLicenses: Map<string, string[]> = new Map<string, string[]>();

    if (!(await doesFolderExist(path))) {
      throw new Error("Cannot find directory " + path);
    }

    const project: Project = await getProject({
      start: path,
      production: true
    });

    for (const [dependencyName, dependencyValue] of Object.entries(project)) {
      if (!!dependencyValue.licenseFile) {
        let license: string = "";

        if (await doesFileExist(dependencyValue.licenseFile)) {
          license = await readFileAsync(dependencyValue.licenseFile, { encoding: UTF8 });
        } else {
          // If we cannot find the license text, we use the license type as a fallback
          const { licenses } = dependencyValue;
          if (typeof licenses !== "undefined" && licenses.length > 0) {
            license = `(${typeof licenses === "string" ? licenses : licenses[0]})`;
          }
        }

        if (!dependencyLicenses.has(license)) {
          dependencyLicenses.set(license, []);
        }

        dependencyLicenses.get(license)?.push(dependencyName);
      }
    }

    const licences: License[] = [];
    for (const [license, dependencies] of dependencyLicenses) {
      licences.push(new License(license, dependencies));
    }
    return licences;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return Promise.reject();
  }
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
