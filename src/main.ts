import * as fs from "fs";
import { init, ModuleInfos } from "license-checker";
import { EOL } from "os";
import { promisify } from "util";
import { ILicense } from "./models/license.interface";
import { doesFileExist, doesFolderExist, readFileAsync } from "./utils/file.utils";

const BULLET: string = " - ";
const PREFIX: string = "The following NPM package may be included in this product:" + EOL + EOL;
const PREFIX_PLURAL: string =
  "The following NPM packages may be included in this product:" + EOL + EOL;
const MIDFIX: string =
  EOL + "This package contains the following license and notice below:" + EOL + EOL;
const MIDFIX_PLURAL: string =
  EOL + "These packages each contain the following license and notice below:" + EOL + EOL;
const SUFFIX: string = EOL + EOL + "-----------" + EOL + EOL;
const FOOTER: string =
  "This file was generated with generate-license-file! https://www.npmjs.com/package/generate-license-file";

const initAsync = promisify(init);
const UTF8 = "utf-8";

/**
 * Scans the project found at the given path and creates a license file at the given output location
 * @param path A path to a directory containing a package.json
 * @param outputPath A file path for the resulting license file
 */
export async function generateLicenseFile(path: string, outputPath: string): Promise<void> {
  const licenses: ILicense[] = await getProjectLicenses(path);
  const stream: fs.WriteStream = fs.createWriteStream(outputPath, {
    encoding: UTF8,
    flags: "w+"
  });

  stream.once("open", () => {
    for (const license of licenses) {
      const hasMultipleDeps: boolean = license.dependencies.length > 1;
      stream.write(hasMultipleDeps ? PREFIX_PLURAL : PREFIX);

      for (const dep of license.dependencies) {
        stream.write(BULLET);
        stream.write(dep);
        stream.write(EOL);
      }

      stream.write(hasMultipleDeps ? MIDFIX_PLURAL : MIDFIX);

      stream.write(license.content.trim());

      stream.write(SUFFIX);
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
    const dependencyLicenses: Map<string, ILicense> = new Map<string, ILicense>();

    if (!(await doesFolderExist(path))) {
      throw new Error("Cannot find directory " + path);
    }

    const file: ModuleInfos = await initAsync({
      start: path,
      production: true
    });

    for (const [dependencyName, dependencyValue] of Object.entries(file)) {
      if (dependencyValue.licenseFile) {
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
          dependencyLicenses.set(license, {
            content: license,
            dependencies: []
          });
        }

        dependencyLicenses.get(license)?.dependencies.push(dependencyName);
      }
    }

    return Array.from(dependencyLicenses.values());
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
}
