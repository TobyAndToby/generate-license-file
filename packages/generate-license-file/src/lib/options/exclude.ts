export interface ExcludeOption {
  /**
   * Packages to exclude from the generated license file
   *
   * Packages need to be specified with an exact version
   *
   * This is useful for when you're confident that a package
   * is not actually used in your project and you want to
   * exclude it from the generated license file
   *
   * @example ["react@16.13.1"]
   */
  exclude?: string[];
}
