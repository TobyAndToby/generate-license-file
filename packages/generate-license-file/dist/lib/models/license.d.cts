//#region src/lib/models/license.d.ts
/**
 * ILicense contains the content of a given license and the list of dependencies it pertains to.
 */
interface ILicense {
  /**
   * Body of the license.
   */
  content: string;
  /**
   * Notices for the license.
   */
  notices: string[];
  /**
   * List of node packages that this license applies to.
   */
  dependencies: string[];
}
//#endregion
export { ILicense };