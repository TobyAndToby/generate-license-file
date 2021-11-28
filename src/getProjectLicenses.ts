import { getProjectLicensesInternal } from "./internal/getProjectLicensesInternal";
import { ILicense } from "./models/license";

/**
 * @param path Directory containing the project's package.json (relative or absolute).
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(path: string): Promise<ILicense[]> {
  return getProjectLicensesInternal(path);
}
