import { getLicenseFileText, GetLicenseFileTextOptions } from "generate-license-file";
import { join } from "path/posix";
import { Compilation, Compiler, WebpackError } from "webpack";
import { LicenseFilePlugin } from "./licenseFilePlugin";
import { devImplementation } from "./devImplementation";
import { Options } from "./options";

export type AssetProcessingAsyncTap = (_: unknown, resolve: (error?: WebpackError) => void) => void;

const unknownError = "Unknown Error! Check for error output above.";

export const asyncProcessAssetTapFactory = (
  options: Options,
  compiler: Compiler,
  compilation: Compilation,
): AssetProcessingAsyncTap => {
  const pluginName = LicenseFilePlugin.name;

  const {
    outputFileName,
    outputFolder,
    isDev,
    pathToPackageJson,
    lineEnding,
    append,
    exclude,
    replace,
  } = options;

  const getLicenseFileTextOptions: GetLicenseFileTextOptions = {
    lineEnding,
    append,
    exclude,
    replace,
  };

  const RawSource = compiler.webpack.sources.RawSource;

  return (_, resolve) => {
    const implementation = resolveImplementation(isDev);

    implementation(pathToPackageJson, getLicenseFileTextOptions)
      .then(text => {
        const outputPath = join(outputFolder, outputFileName);
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

const resolveImplementation = (isDev: boolean): typeof getLicenseFileText => {
  if (isDev) {
    return devImplementation;
  }

  return getLicenseFileText;
};
