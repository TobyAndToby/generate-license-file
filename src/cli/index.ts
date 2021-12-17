import arg from "arg";
import { pong } from "cli-spinners";
import { prompt } from "enquirer";
import ora, { Ora } from "ora";
import { generateLicenseFile } from "../generateLicenseFile";
import { doesFileExist } from "../utils/file.utils";
import { IArguments } from "./arguments.interface";
import { validArguments } from "./valid-arguments";

export async function cli(args: string[]): Promise<void> {
  let options: IArguments = parseArgumentsIntoOptions(args);
  options = await promptForAnswers(options);

  const spinner: Ora = ora({
    spinner: pong,
    text: "Resolving licenses..."
  });
  spinner.start();

  try {
    await generateLicenseFile(options.input, options.output, options.eol);
    spinner.stop();
  } catch (e) {
    spinner.fail(e?.message ?? e ?? "Unknown error");
  }
}

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
    options = await promptForInput(options);
  }

  let outputFileExists: boolean = await doesFileExist(options.output);
  while (!options.output || (outputFileExists && !options.overwriteOutput)) {
    options = await promptForOutput(options);

    outputFileExists = await doesFileExist(options.output);
    if (outputFileExists) {
      options = await promptForOverwrite(options);
    }
  }

  return options;
}

const promptForInput = async (options: IArguments) => {
  const packageJsonExists = await doesFileExist("./package.json");

  const answer = await prompt<IArguments>({
    type: "input",
    name: "input",
    initial: packageJsonExists ? "./package.json" : "",
    message: "package.json location:"
  });

  options.input = answer.input;
  return options;
};

const promptForOutput = async (options: IArguments) => {
  const outputAnswer = await prompt<IArguments>({
    type: "input",
    name: "output",
    initial: "3rd-party-licenses.txt",
    message: "Output file location:"
  });

  options.output = outputAnswer.output;
  return options;
};

const promptForOverwrite = async (options: IArguments) => {
  const doesFileExistAnswer = await prompt<IArguments>({
    type: "confirm",
    name: "overwriteOutput",
    message: "The given output file already exists and will be overwritten. Is this OK?"
  });

  options.overwriteOutput = doesFileExistAnswer.overwriteOutput;
  return options;
};
