import { getLicenseFileText } from "generate-license-file";
import { join } from "path/posix";
import { Compilation, Compiler, WebpackError } from "webpack";
import LicenseFilePlugin from ".";
import { devImplementation } from "./devImplementation";
import { Options } from "./options";

type AssetProcessingAsyncTap = (_: any, resolve: (error?: WebpackError) => void) => void;

const unknownError = "Unknown Error! Check for error output above.";

export const asyncProcessAssetTapFactory = (
  options: Options,
  compiler: Compiler,
  compilation: Compilation
): AssetProcessingAsyncTap => {
  const pluginName = LicenseFilePlugin.name;

  const {
    outputFileName,
    outputFolder,
    isDev,
    lineEnding,
    projectFolder: configuredProjectFolder
  } = options;

  const RawSource = compiler.webpack.sources.RawSource;

  return (_, resolve) => {
    const projectFolder = configuredProjectFolder ?? compiler.context;
    const outputPath = join(outputFolder, outputFileName);

    const implementation = !!isDev ? devImplementation : getLicenseFileText;

    implementation(projectFolder, lineEnding)
      .then(text => {
        compilation.emitAsset(outputPath, new RawSource(text));
        resolve();
      })
      .catch(error => {
        const errorMessage = `${pluginName}: ${error ?? unknownError}`;
        const webpackError = new WebpackError(errorMessage);
        compilation.errors.push(webpackError);
        resolve(webpackError);
      });
  };
};
