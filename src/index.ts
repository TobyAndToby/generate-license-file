import { Compiler } from "webpack";
import { compilationTapFactory } from "./compilationTapFactory";
import { defaultOptions } from "./defaultOptions";
import { Options } from "./options";

/**
 * Webpack plugin to generate a text file asset containing all of the licenses for your production third-party dependencies.
 */
export class LicenseFilePlugin {
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

export { LineEnding } from "generate-license-file";
