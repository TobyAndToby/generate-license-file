import { Compiler } from "webpack";
import { getLicenseFileText, LineEnding } from "generate-license-file";
import { join } from "path/posix";

interface Options {
	outputFileName: string;
  outputFolder: string;
  isDev: boolean
  lineEnding?: LineEnding
}

const devImplementation = () => Promise.resolve(`In a production build this file will contain the licenses of your production dependencies.

For dev builds it only contains this text for the sake of build speed.`);

class LicenseFilePlugin {
	private pluginName = LicenseFilePlugin.name;

  private static defaultOptions: Options = {
    outputFileName: "third-party-licenses.txt",
    outputFolder: "./",
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
    const { outputFileName, outputFolder, isDev, lineEnding } = this.options;
		
    compiler.hooks.thisCompilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: this.pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (_, resolve) => {
          const projectFolder = compiler.context;
          const outputPath = join(outputFolder, outputFileName);

          const implementation = isDev ? devImplementation : getLicenseFileText;

					implementation(projectFolder, lineEnding).then(text => {
            compilation.emitAsset(
              outputPath,
              new RawSource(text)
            );
            resolve();
          });
        }
      );
    });
  }
}

export = { LicenseFilePlugin };