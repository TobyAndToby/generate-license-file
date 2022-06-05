import { Result } from "arg";
import { doesFileExist } from "../../utils/file.utils";
import { ArgumentsWithAliases } from "../cli-arguments";
import { spinner } from "../spinner";
import { Argument } from "./argument";

export class Inputs extends Argument<string[]> {
  private question = "Package.json location: ";

  public async resolve(args: Result<ArgumentsWithAliases>): Promise<string[]> {
    const inputs = args["--input"];

    if (!inputs) {
      return await this.resolveOne(undefined);
    }

    if (inputs.length === 1) {
      return await this.resolveOne(inputs[0]);
    }

    return await this.resolveMany(inputs);
  }

  public async parse(args: Result<ArgumentsWithAliases>): Promise<string[]> {
    const inputs = args["--input"];

    if (!inputs || inputs.length === 0) {
      throw new Error("No --input argument given.");
    }

    let allValid = true;

    for (const input of inputs) {
      const inputExists = await doesFileExist(input);

      if (!inputExists) {
        spinner.warn(`${input} could not be found.`);
        allValid = false;
      }
    }

    if (!allValid) {
      throw new Error(`One or more package.jsons could not be found.`);
    }

    return inputs;
  }

  private async resolveOne(input?: string): Promise<string[]> {
    const initialValue = await this.getInputPromptInitialValue();

    let inputExists = input ? await doesFileExist(input) : false;

    while (!input || !inputExists) {
      if (!!input && !inputExists) {
        spinner.fail("Package.json not found!");
      }

      input = await this.promptForString(this.question, initialValue);
      inputExists = await doesFileExist(input);
    }

    return [input];
  }

  private async resolveMany(inputs: string[]): Promise<string[]> {
    const validInputs: string[] = [];
    let allValid = true;

    for (const input of inputs) {
      const inputExists = await doesFileExist(input);

      if (!inputExists) {
        spinner.warn(`${input} could not be found.`);
        allValid = false;

        continue;
      }

      validInputs.push(input);
    }

    if (!allValid) {
      await this.promptForTermination();
    }

    return validInputs;
  }

  private async getInputPromptInitialValue(): Promise<string> {
    const packageJsonExists = await doesFileExist("./package.json");
    return packageJsonExists ? "./package.json" : "";
  }

  private async promptForTermination(): Promise<void> {
    const shouldContinue = await this.promptForBoolean(
      "One or more package.jsons could not be found. Do you want to continue?"
    );

    if (!shouldContinue) {
      throw new Error("Process terminated by user");
    }
  }
}
