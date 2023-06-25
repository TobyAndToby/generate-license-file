import { doesFileExist } from "../../utils/file.utils";
import { Argument } from "./argument";
import { CombinedConfig } from "../commands/main";

export class Output extends Argument<string> {
  private question = "Output location: ";

  private initialValue = "third-party-licenses.txt";

  public async resolve(config: CombinedConfig): Promise<string> {
    let { output, overwrite } = config;
    let outputExists = output ? await doesFileExist(output) : false;

    while (!output || (outputExists && !overwrite)) {
      console.log({ output, outputExists, overwrite });

      if (!output) {
        output = await this.promptForString(this.question, this.initialValue);
      }

      outputExists = await doesFileExist(output);

      if (outputExists && overwrite === undefined) {
        overwrite = await this.promptForBoolean(
          "This file already exists - do you want to overwrite it?",
        );
      }

      if (outputExists && overwrite === false) {
        output = undefined;
        overwrite = undefined;
      }
    }

    return output;
  }

  public async parse(config: CombinedConfig): Promise<string> {
    const { output, overwrite } = config;

    if (!output) {
      throw new Error("No --output argument given.");
    }

    const outputExists = await doesFileExist(output);

    if (outputExists && !overwrite) {
      throw new Error(
        `Given --output file already exists at '${output}'. Use --overwrite to allow overwriting.`,
      );
    }

    return output;
  }
}
