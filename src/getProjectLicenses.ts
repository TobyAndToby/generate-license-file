import { getLicencesForProjects } from "./internal/getLicencesForProjects";
import { ILicense } from "./models/license";

/**
 * @param pathToPackageJson A path to the package.json for the project
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(pathToPackageJson: string): Promise<ILicense[]>;

/**
 * @param pathsToPackageJsons An array of paths to the package.json files for the projects
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(pathsToPackageJsons: string[]): Promise<ILicense[]>;

export async function getProjectLicenses(
  pathsToPackageJsons: string[] | string
): Promise<ILicense[]> {
  if (typeof pathsToPackageJsons === "string") {
    pathsToPackageJsons = [pathsToPackageJsons];
  }

  return await getLicencesForProjects(pathsToPackageJsons);
}
