import { WriteStream } from "fs";
import * as os from "os";
import { ILicense } from "./models/license.interface";
import console from "./utils/console.utils";
import {
  createWriteStream,
  doesFileExist,
  doesFolderExist,
  readFileAsync
} from "./utils/file.utils";
import { getProject, Project } from "./utils/licence.utils";

const BULLET: string = " - ";
const PREFIX: string = "The following NPM package may be included in this product:";
const PREFIX_PLURAL: string = "The following NPM packages may be included in this product:";
const MIDFIX: string = "This package contains the following license and notice below:";
const MIDFIX_PLURAL: string = "These packages each contain the following license and notice below:";
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
  const licenses: ILicense[] = await getProjectLicenses(path);
  const stream: WriteStream = createWriteStream(outputPath);

  const EOL = getLineEnding(lineEnding);

  stream.once("open", () => {
    for (const license of licenses) {
      const hasMultipleDeps: boolean = license.dependencies.length > 1;
      stream.write(hasMultipleDeps ? PREFIX_PLURAL : PREFIX);
      stream.write(EOL);
      stream.write(EOL);

      for (const dep of license.dependencies) {
        stream.write(BULLET);
        stream.write(dep);
        stream.write(EOL);
      }

      stream.write(EOL);
      stream.write(hasMultipleDeps ? MIDFIX_PLURAL : MIDFIX);
      stream.write(EOL);
      stream.write(EOL);

      stream.write(license.content.trim());

      stream.write(EOL);
      stream.write(EOL);
      stream.write(SUFFIX);
      stream.write(EOL);
      stream.write(EOL);
    }

    stream.end(FOOTER);
  });
}

/**
 * @param path Directory containing the project's package.json (relative or absolute).
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(path: string): Promise<ILicense[]> {
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

    const licences: ILicense[] = [];
    for (const [license, dependencies] of dependencyLicenses) {
      licences.push({
        content: license,
        dependencies
      });
    }
    return licences;
  } catch (error) {
    console.error(error.message);
    return Promise.reject();
  }
}

function getLineEnding(lineEndings?: LineEnding) {
  switch (lineEndings) {
    case "windows":
      return "\r\n";
    case "posix":
      return "\n";
    default:
      return os.EOL;
  }
}
