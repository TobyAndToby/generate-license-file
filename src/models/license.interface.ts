export interface ILicense {
  /**
   * Body of the license.
   */
  content: string;

  /**
   * List of node packages that this license applies to.
   */
  dependencies: string[];
}
