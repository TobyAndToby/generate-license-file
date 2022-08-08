import { Result } from "arg";
import { doesFileExist } from "../../utils/file.utils";
import { ArgumentsWithAliases } from "../cli-arguments";
import { Argument } from "./argument";

export class Output extends Argument<string> {
  private question = "Output location: ";

  private initialValue = "third-party-licenses.txt";

  public async resolve(args: Result<ArgumentsWithAliases>): Promise<string> {
    let output = args["--output"];
    let outputExists = output ? await doesFileExist(output) : false;
    let overwriteOutput = args["--overwrite"];

    while (!output || (outputExists && !overwriteOutput)) {
      if (!output) {
        output = await this.promptForString(this.question, this.initialValue);
      }

      outputExists = await doesFileExist(output);

      if (outputExists && overwriteOutput === undefined) {
        overwriteOutput = await this.promptForBoolean(
          "This file already exists - do you want to overwrite it?"
        );
      }

      if (outputExists && overwriteOutput === false) {
        output = undefined;
        overwriteOutput = undefined;
      }
    }

    return output;
  }

  public async parse(args: Result<ArgumentsWithAliases>): Promise<string> {
    const output = args["--output"];
    const allowOverwrite = args["--overwrite"];

    if (!output) {
      throw new Error("No --output argument given.");
    }

    const outputExists = await doesFileExist(output);

    if (outputExists && !allowOverwrite) {
      throw new Error(
        `Given --output file already exists at '${output}'. Use --overwrite to allow overwriting.`
      );
    }

    return output;
  }
}
