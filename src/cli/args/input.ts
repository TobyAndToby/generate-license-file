import { Result } from "arg";
import { doesFileExist } from "../../utils/file.utils";
import { ArgumentsWithAliases } from "../cli-arguments";
import { spinner } from "../spinner";
import { Argument } from "./argument";

export class Input extends Argument<string> {
  private question = "Package.json location: ";

  public async resolve(args: Result<ArgumentsWithAliases>): Promise<string> {
    const initialValue = await this.getInitialValue();

    let input = args["--input"];
    let inputExists = input ? await doesFileExist(input) : false;

    while (!input || !inputExists) {
      if (!!input && !inputExists) {
        spinner.fail("Package.json not found!");
      }

      input = await this.promptForString(this.question, initialValue);
      inputExists = await doesFileExist(input);
    }

    return input;
  }

  public async parse(args: Result<ArgumentsWithAliases>): Promise<string> {
    const input = args["--input"];

    if (!input) {
      throw new Error("No --input argument given.");
    }

    const inputExists = await doesFileExist(input);

    if (!inputExists) {
      throw new Error(`Given --input file not found. Cannot find '${input}'.`);
    }

    return input;
  }

  private async getInitialValue(): Promise<string> {
    const packageJsonExists = await doesFileExist("./package.json");
    return packageJsonExists ? "./package.json" : "";
  }
}
