import { LineEnding, LineEnding as LineEnding$1 } from "generate-license-file";
import { Compiler } from "webpack";

//#region src/lib/options.d.ts
interface Options {
  /**
   * The name of the asset file containing the licenses.
   *
   * @default "third-party-licenses.txt"
   */
  outputFileName: string;
  /**
   * The path within the project's output folder where the generated file will be written.
   *
   * @default "./"
   * @example "./assets"
   */
  outputFolder: string;
  /**
   * Path to the project's package.json.
   *
   * @default "./package.json".
   */
  pathToPackageJson: string;
  /**
   * Configures the plugin to use placeholder text in the output file.
   * Useful to help speed up dev compile times.
   *
   * @default false
   */
  isDev: boolean;
  /**
   * The line ending to use when writing the licenses file.
   * Defaults to the line ending of the operating system.
   *
   * @default undefined
   */
  lineEnding?: LineEnding$1;
  /**
   * File paths to read in and append to the bottom of the generated license file
   *
   * This is useful for content that's included via a CDN or for other types
   * of content that are not included in the project's package.json
   * like images or fonts
   *
   * @example ["./licenses/some-image.txt", "./licenses/some-font.txt"]
   */
  append?: string[];
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
//#endregion
//#region src/lib/defaultOptions.d.ts
declare const defaultOptions: Options;
//#endregion
//#region src/lib/licenseFilePlugin.d.ts
/**
 * Webpack plugin to generate a text file asset containing all of the licenses for your production third-party dependencies.
 */
declare class LicenseFilePlugin {
  private pluginName;
  private options;
  constructor(options?: Partial<Options>);
  apply(compiler: Compiler): void;
}
//#endregion
export { LicenseFilePlugin, LineEnding, defaultOptions };