export interface NameOption {
  /**
   * Option to omit the package version number in the output
   *
   * This is useful when you want to generate a license file that only
   * includes the package name without a specific version number.
   *
   * @example true
   */
  omitVersion?: boolean;
}
