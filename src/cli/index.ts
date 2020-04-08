import arg from "arg";
import inquirer, { Question, Answers } from "inquirer";
import { validArguments } from "./valid-arguments";
import { IArguments } from "./arguements.interface";
import { doesFileExist } from "../utils/file.utils";
import { getProjectLicenses } from "../main";
import { ILicense } from "../models/license.interface";
import * as fs from "fs";
import * as os from "os";
import { promisify } from "util";
import ora, { Ora } from "ora";
import { pong } from "cli-spinners";
import { prompt } from "enquirer";

const BULLET: string = " - ";
const PREFIX: string = "The following NPM packages may be included in this product:" + os.EOL + os.EOL;
const MIDFIX: string = os.EOL + "These packages each contain the following license and notice below:" + os.EOL + os.EOL;
const SUFFIX: string = os.EOL + os.EOL + "-----------" + os.EOL + os.EOL;
const FOOTER: string = "This file was generated with license-file! https://www.npmjs.com/package/license-file";

function parseArgumentsIntoOptions(rawArgs: string[]): IArguments {
  const args: arg.Result<any> = arg(validArguments, {
     argv: rawArgs.slice(2),
   });

  return {
    input: args["--input"] || undefined,
    output: args["--output"] || undefined,
    overwriteOutput: args["--overwrite"] || undefined
  };
}

async function promptForAnswers(options: IArguments): Promise<IArguments> {
  const result: IArguments = {
    ...options
  };

  if (!options.input) {
    const answer: any = await prompt({
      type: "input",
      name: "input",
      initial: "package.json",
      message: "package.json location:"
    });

    result.input = answer.input;
  }

  while (!result.output || result.overwriteOutput === false) {
    const answer: any = await prompt({
      type: "input",
      name: "output",
      message: "Output file location:"
    });

    result.output = answer.output;

    if (await doesFileExist(result.output)) {
      const yesNoAnswer: any = await prompt({
        type: "confirm",
        name: "overwriteOutput",
        message: "The given output file already exists and will be overwritten. Is this OK?"
      });

      result.overwriteOutput = yesNoAnswer.overwriteOutput;
    }
  }

  return result;
}

export async function cli(args: string[]): Promise<void> {
  let options: IArguments = parseArgumentsIntoOptions(args);
  options = await promptForAnswers(options);

  const spinner: Ora = ora({
    spinner: pong,
    text: "Resolving licenses..."
  });
  spinner.start();

  const licenses: ILicense[] = await getProjectLicenses(options.input);
  const stream: fs.WriteStream = fs.createWriteStream(options.output, {
    encoding: "utf-8",
    flags: "w+"
  });

  stream.on("close", () => {
    spinner.stop();
  });

  stream.once("open" , (fd) => {
    for (const license of licenses) {
      stream.write(PREFIX);

      for (const dep of license.dependencies) {
        stream.write(BULLET);
        stream.write(dep);
        stream.write(os.EOL);
      }

      stream.write(MIDFIX);

      stream.write(license.content.trim());

      stream.write(SUFFIX);
    }

    stream.end(FOOTER);
  });
}
