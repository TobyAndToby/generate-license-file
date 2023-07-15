export interface ReplaceOption {
  /**
   * A map of packages-to-file-paths containing content
   * that should be used instead of the package's license content
   *
   * Packages need to be specified with an exact version
   *
   * This is useful for when a package is dual licensed and you
   * want to use one of the licenses instead of the other
   *
   * @example { "react@16.13.1": "./licenses/react.txt" }
   */
  replace?: Record<string, string>;
}
