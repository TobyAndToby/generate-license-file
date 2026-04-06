import { ExcludeOption } from "./options/exclude.cjs";
import { OmitVersionsOption } from "./options/omitVersions.cjs";
import { IntersectionExpander } from "./options/optionsExpander.cjs";
import { ReplaceOption } from "./options/replace.cjs";
import { ILicense } from "./models/license.cjs";

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