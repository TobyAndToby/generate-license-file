import { LineEnding } from "generate-license-file";

export interface Options {
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
  lineEnding?: LineEnding;
}
