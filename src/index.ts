import { Compiler } from "webpack";
import { compilationTapFactory } from "./compilationTapFactory";
import { Options } from "./options";

const defaultOptions: Options = {
  outputFileName: "third-party-licenses.txt",
  outputFolder: "./",
  projectFolder: "./",
  isDev: false,
  lineEnding: undefined
};

class LicenseFilePlugin {
  private pluginName = LicenseFilePlugin.name;

  private options: Options;

  constructor(options?: Partial<Options>) {
    this.options = { ...defaultOptions, ...options };
  }

  apply(compiler: Compiler) {
    const compilationTap = compilationTapFactory(this.options, compiler);

    compiler.hooks.thisCompilation.tap(this.pluginName, compilationTap);
  }
}

export = LicenseFilePlugin;
