import { getLicensesInternal } from "./internal/getProjectLicensesInternal";
import { ILicense } from "./models/license";

export async function getLicenses(pathToPackageJson: string): Promise<ILicense[]>;
export async function getLicenses(pathsToPackageJsons: string[]): Promise<ILicense[]>;

/**
 * @param pathsToPackageJson Paths to the package.json for the project
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getLicenses(pathsToPackageJson: string | string[]): Promise<ILicense[]> {
  if (typeof pathsToPackageJson === "string") {
    pathsToPackageJson = [pathsToPackageJson];
  }

  return getLicensesInternal(pathsToPackageJson);
}
