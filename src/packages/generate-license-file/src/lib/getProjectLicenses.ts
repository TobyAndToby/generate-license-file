import { resolveLicenses } from "./internal/resolveLicenses";
import { ILicense } from "./models/license";
import { ExcludeOption } from "./options/exclude";
import { IntersectionExpander } from "./options/optionsExpander";
import { OmitVersionsOption } from "./options/omitVersions";
import { ReplaceOption } from "./options/replace";

export type GetProjectLicensesOptions = IntersectionExpander<
  ReplaceOption & ExcludeOption & OmitVersionsOption
>;

/**
 * Scans the project found at the given path and returns an array of objects each
 * containing the details of an identified license and the dependencies it pertains to.
 * @param pathToPackageJson A path to the package.json for the project
 * @param options Additional options for the license discovery
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
export async function getProjectLicenses(
  pathToPackageJson: string,
  options?: GetProjectLicensesOptions,
): Promise<ILicense[]> {
  const licenses = await resolveLicenses([pathToPackageJson], options);

  const results: ILicense[] = [];

  for (const license of licenses) {
    const dependencies = license.dependencies.map(dep => {
      if (options?.omitVersions) {
        return dep.name;
      }

      return `${dep.name}@${dep.version ?? "unknown"}`;
    });

    results.push({
      content: license.licenseContent,
      dependencies,
    });
  }

  return results;
}
