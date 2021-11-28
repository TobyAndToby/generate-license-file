import arg from "arg";
import { pong } from "cli-spinners";
import { prompt } from "enquirer";
import ora, { Ora } from "ora";
import path from "path";
import { generateLicenseFile } from "../generateLicenseFile";
import { doesFileExist } from "../utils/file.utils";
import { IArguments } from "./arguments.interface";
import { validArguments } from "./valid-arguments";

function parseArgumentsIntoOptions(rawArgs: string[]): IArguments {
  const args: arg.Result<any> = arg(validArguments, {
    argv: rawArgs.slice(2)
  });

  return {
    input: args["--input"] || undefined,
    output: args["--output"] || undefined,
    overwriteOutput: args["--overwrite"] || undefined,
    eol: args["--eol"] || undefined
  };
}

async function promptForAnswers(options: IArguments): Promise<IArguments> {
  if (!options.input) {
    const answer: any = await prompt({
      type: "input",
      name: "input",
      initial: (await doesFileExist("./package.json")) ? "./package.json" : "",
      message: "package.json location:"
    });

    options.input = answer.input;
  }

  while (!options.output || options.overwriteOutput === false) {
    const answer: any = await prompt({
      type: "input",
      name: "output",
      initial: "3rd-party-licenses.txt",
      message: "Output file location:"
    });

    options.output = answer.output;

    if (await doesFileExist(options.output)) {
      const yesNoAnswer: any = await prompt({
        type: "confirm",
        name: "overwriteOutput",
        message: "The given output file already exists and will be overwritten. Is this OK?"
      });

      options.overwriteOutput = yesNoAnswer.overwriteOutput;
    }
  }

  return options;
}

export async function cli(args: string[]): Promise<void> {
  let options: IArguments = parseArgumentsIntoOptions(args);
  options = await promptForAnswers(options);

  const spinner: Ora = ora({
    spinner: pong,
    text: "Resolving licenses..."
  });
  spinner.start();

  const directory: string = path.dirname(options.input);

  await generateLicenseFile(directory, options.output, options.eol);

  spinner.stop();
}
