import { ExcludeOption } from "./options/exclude.mjs";
import { OmitVersionsOption } from "./options/omitVersions.mjs";
import { IntersectionExpander } from "./options/optionsExpander.mjs";
import { ReplaceOption } from "./options/replace.mjs";
import { ILicense } from "./models/license.mjs";

//#region src/lib/getProjectLicenses.d.ts
type GetProjectLicensesOptions = IntersectionExpander<ReplaceOption & ExcludeOption & OmitVersionsOption>;
/**
 * Scans the project found at the given path and returns an array of objects each
 * containing the details of an identified license and the dependencies it pertains to.
 * @param pathToPackageJson A path to the package.json for the project
 * @param options Additional options for the license discovery
 * @returns Array of `ILicense`s each containing the license content and respective dependencies
 */
declare function getProjectLicenses(pathToPackageJson: string, options?: GetProjectLicensesOptions): Promise<ILicense[]>;
//#endregion
export { GetProjectLicensesOptions, getProjectLicenses };