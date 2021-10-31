import { Compiler } from "webpack";
import { getLicenseFileText } from "generate-license-file";
import { join } from "path";

interface Options {
	outputFileName: string;
  outputFolder: string;
}

class LicenseFilePlugin {
	private pluginName = LicenseFilePlugin.name;

  private static defaultOptions: Options = {
    outputFileName: "third-party-licenses.txt",
    outputFolder: "./"
  };

	private options: Options;

  constructor(options: Partial<Options>) {
    this.options = { ...LicenseFilePlugin.defaultOptions, ...options };
  }

  apply(compiler: Compiler) {
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    const { outputFileName, outputFolder } = this.options;
		
    compiler.hooks.thisCompilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: this.pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (_, resolve) => {
          const projectFolder = compiler.context;

					getLicenseFileText(projectFolder).then(text => {
            compilation.emitAsset(
              join(outputFolder, outputFileName),
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