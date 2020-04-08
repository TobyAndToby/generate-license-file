import { promisify } from "util";
import glob from "glob";
import { readFileAsync, doesFileExist } from "./utils/file.utils";
import { ILicense } from "./models/license.interface";

const globAsync: (pattern: string, options?: glob.IOptions) => Promise<string[]> = promisify(glob);
const UTF8: string = "utf-8";

export async function getProjectLicenses(path: string): Promise<ILicense[]> {

  try {
    const dependencyLicenses: Map<string, ILicense> = new Map<string, ILicense>();

    if (!await doesFileExist(path)) {
      throw new Error("Cannot find file " + path);
    }

    const file: string = await readFileAsync(path, { encoding: UTF8 });
    const packageJson: any = JSON.parse(file);

    const dependencies: string[] = packageJson.dependencies ?? [];

    for (const dep in dependencies) {
      if (dependencies.hasOwnProperty(dep)) {
        const licenseFiles: string[] = await findLicenses(dep);
          for(const license of licenseFiles) {
            const content: string = await readFileAsync(license, { encoding: UTF8 });

            if (!dependencyLicenses.has(content)) {
              dependencyLicenses.set(content, {
                dependencies: [],
                content
              });
            }

            const foundLicence: ILicense | undefined = dependencyLicenses.get(content);
            foundLicence?.dependencies.push(dep);
          }
        }
    }

    return Array.from(dependencyLicenses.values());
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
}

async function findLicenses(packageName: string): Promise<string[]> {
  return globAsync(`node_modules/${packageName}/**/LICEN{S,C}E*`, { nocase: true });
}

(async () => {
	const licenses: ILicense[] = await getProjectLicenses("./package.json");
})();
