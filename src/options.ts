import { LineEnding } from "generate-license-file";

export interface Options {
  /**
   * The file name for the file containing the licenses.
   */
  outputFileName: string;

  /**
   * The folder path within the project's output folder where the licenses file will be written.
   */
  outputFolder: string;

  /**
   * The folder containing the project's package.json.
   * Defaults to the webpack context directory which is usually sufficient for most setups.
   */
  projectFolder: string;

  /**
   * Configures the plugin to use a dev-only placeholder text value.
   * Useful to help speed up dev compile times.
   */
  isDev: boolean;

  /**
   * The line ending to use when writing the licenses file.
   * Defaults to the line ending of the operating system.
   */
  lineEnding?: LineEnding;
}
