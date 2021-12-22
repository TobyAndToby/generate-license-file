import { getProjectLicensesInternal } from "./internal/getProjectLicensesInternal";
import { ILicense } from "./models/license";

/**
 * @param pathToPackageJson A path to the package.json for the project
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(pathToPackageJson: string): Promise<ILicense[]> {
  return getProjectLicensesInternal(pathToPackageJson);
}
