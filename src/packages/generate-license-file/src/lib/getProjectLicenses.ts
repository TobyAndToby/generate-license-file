import { resolveLicenses } from "./internal/resolveLicenses";
import { ILicense } from "./models/license";

export type GetProjectLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

/**
 * Scans the project found at the given path and returns an array of objects each
 * containing the details of an identified license and the dependencies it pertains to.
 * @param pathToPackageJson A path to the package.json for the project
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(
  pathToPackageJson: string,
  options?: GetProjectLicensesOptions,
): Promise<ILicense[]> {
  return resolveLicenses([pathToPackageJson], options);
}
