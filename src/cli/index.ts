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
  } catch (e: any) {
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
    options.input = await promptForInput();
  }

  let outputFileExists: boolean = await doesFileExist(options.output);
  while (!options.output || (outputFileExists && !options.overwriteOutput)) {
    options.output = await promptForOutput();

    outputFileExists = await doesFileExist(options.output);
    if (outputFileExists) {
      options.overwriteOutput = await promptForOverwrite();
    }
  }

  return options;
}

const promptForInput = async () => {
  const question = "package.json location";
  const packageJsonExists = await doesFileExist("./package.json");
  const initialValue = packageJsonExists ? "./package.json" : "";

  return promptForString(question, initialValue);
};

const promptForOutput = async () => {
  const question = "Output file location:";
  const initialValue = "3rd-party-licenses.txt";

  return promptForString(question, initialValue);
};

const promptForOverwrite = async () => {
  const doesFileExistAnswer = await prompt<IArguments>({
    type: "confirm",
    name: "overwriteOutput",
    message: "The given output file already exists and will be overwritten. Is this OK?"
  });

  return doesFileExistAnswer.overwriteOutput;
};

const promptForString = async (question: string, initialValue: string): Promise<string> => {
  const answer = await prompt<{ value: string }>({
    type: "input",
    name: "value",
    initial: initialValue,
    message: question
  });

  return answer.value;
};
