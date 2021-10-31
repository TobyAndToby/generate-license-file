import { getLicenseFileText, LineEnding } from "generate-license-file";
import { join } from "path/posix";
import { Compiler, WebpackError } from "webpack";

interface Options {
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

const unknownError = "Unknown Error! Check for error output above.";

const devImplementation = () =>
  Promise.resolve(`In a production build this file will contain the licenses of your production dependencies.

For dev builds it only contains this text for the sake of build speed.`);

class LicenseFilePlugin {
  private pluginName = LicenseFilePlugin.name;

  private static defaultOptions: Options = {
    outputFileName: "third-party-licenses.txt",
    outputFolder: "./",
    projectFolder: "./",
    isDev: false,
    lineEnding: undefined
  };

  private options: Options;

  constructor(options: Partial<Options>) {
    this.options = { ...LicenseFilePlugin.defaultOptions, ...options };
  }

  apply(compiler: Compiler) {
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    const {
      outputFileName,
      outputFolder,
      isDev,
      lineEnding,
      projectFolder: configuredProjectFolder
    } = this.options;

    compiler.hooks.thisCompilation.tap(this.pluginName, compilation => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: this.pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
        },
        (_, resolve) => {
          const projectFolder = configuredProjectFolder ?? compiler.context;
          const outputPath = join(outputFolder, outputFileName);

          const implementation = !!isDev ? devImplementation : getLicenseFileText;

          implementation(projectFolder, lineEnding)
            .then(text => {
              compilation.emitAsset(outputPath, new RawSource(text));
              resolve();
            })
            .catch(error => {
              const errorMessage = `${this.pluginName}: ${error ?? unknownError}`;
              const webpackError = new WebpackError(errorMessage);
              compilation.errors.push(webpackError);
              resolve(webpackError);
            });
        }
      );
    });
  }
}

export = { LicenseFilePlugin };
