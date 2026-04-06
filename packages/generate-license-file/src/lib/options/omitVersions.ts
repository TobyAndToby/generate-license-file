export interface OmitVersionsOption {
  /**
   * Option to omit the package version numbers in the output
   *
   * This is useful when you want to generate a license file that only
   * includes the package name without a specific version number.
   *
   * @example true
   */
  omitVersions?: boolean;
}
