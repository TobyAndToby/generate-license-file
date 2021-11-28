import { License } from "../models/license";
import { doesFileExist, doesFolderExist, readFileAsync } from "../utils/file.utils";
import { getProject, Project } from "../utils/licence.utils";

const UTF8 = "utf-8";

export async function getProjectLicensesInternal(path: string): Promise<License[]> {
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
    console.error(error.message);
    return Promise.reject();
  }
}
