import { basename } from "node:path";
import { doesFileExist } from "../../utils/file.utils";
import type { CombinedConfig } from "../commands/main";
import { spinner } from "../spinner";
import { Argument } from "./argument";

const PACKAGE_JSON_FILE_NAME = "package.json";

export class Inputs extends Argument<string[]> {
  private question = "Package.json location: ";

  public async resolve(config: CombinedConfig): Promise<string[]> {
    const { inputs } = config;

    if (!inputs) {
      return await this.resolveOne(undefined);
    }

    if (inputs.length === 1) {
      return await this.resolveOne(inputs[0]);
    }

    return await this.resolveMany(inputs);
  }

  public async parse(config: CombinedConfig): Promise<string[]> {
    const { inputs } = config;

    if (!inputs || inputs.length === 0) {
      throw new Error("No --input argument given.");
    }

    const problems: string[] = [];

    for (const input of inputs) {
      const problem = await this.findProblem(input);

      if (problem) {
        spinner.warn(problem);
        problems.push(problem);
      }
    }

    if (problems.length > 0 && inputs.length === 1) {
      throw new Error(problems[0]);
    }

    if (problems.length > 0) {
      throw new Error("One or more given --input files cannot be used");
    }

    return inputs;
  }

  private async resolveOne(input?: string): Promise<string[]> {
    const initialValue = await this.getInputPromptInitialValue();

    let problem = input ? await this.findProblem(input) : undefined;

    while (!input || problem) {
      if (!!input && problem) {
        spinner.fail(problem);
      }

      input = await this.promptForString(this.question, initialValue);
      problem = await this.findProblem(input);
    }

    return [input];
  }

  private async resolveMany(inputs: string[]): Promise<string[]> {
    const validInputs: string[] = [];
    let allValid = true;

    for (const input of inputs) {
      const problem = await this.findProblem(input);

      if (problem) {
        spinner.warn(problem);
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

  // The path identifies which project to report on, but npm and pnpm both resolve the dependency tree using the
  // "package.json" file name, so a differently named file can never be read. Rejecting it here keeps the CLI from
  // going on to produce an output file with no dependencies in it.
  private async findProblem(input: string): Promise<string | undefined> {
    if (!(await doesFileExist(input))) {
      return `${input} could not be found.`;
    }

    if (basename(input) !== PACKAGE_JSON_FILE_NAME) {
      return `${input} is not named ${PACKAGE_JSON_FILE_NAME}, so its dependencies cannot be resolved.`;
    }

    return undefined;
  }

  private async getInputPromptInitialValue(): Promise<string> {
    const packageJsonExists = await doesFileExist("./package.json");
    return packageJsonExists ? "./package.json" : "";
  }

  private async promptForTermination(): Promise<void> {
    const shouldContinue = await this.promptForBoolean(
      "One or more given --input files cannot be used. Do you want to continue?",
    );

    if (!shouldContinue) {
      throw new Error("Process terminated by user");
    }
  }
}
