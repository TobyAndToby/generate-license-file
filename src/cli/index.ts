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
  const questions: Question[] = [];

  if (!options.input) {
    questions.push({
      type: "input",
      name: "input",
      message: "Please give the location of the input package.json file:",
      validate: async (input: any, answers?: Answers | undefined): Promise<string | boolean> => {
        return (await doesFileExist(input)) ? true : "That is not a valid file";
      }
    });
  }

  if (!options.output) {
    questions.push({
      type: "input",
      name: "output",
      message: "Please give the location of the output JSON file:",
      validate: (input: any, answers?: Answers | undefined): string | boolean => {
        return ("" + input).length !== 0 ? true : "You need to enter an output file location";
      }
    });
  }

  questions.push({
    type: "confirm",
    name: "overwriteOutput",
    message: "The given output file already exists and will be overwritten. Is this OK?",
    when: async (answers: Answers): Promise<boolean> => {
      return await doesFileExist(answers.output);
    }
  });

  const results: any = await inquirer.prompt(questions);

  return {
    ...options,
    input: options.input || results.input,
    output: options.output || results.output,
    overwriteOutput: options.overwriteOutput || results.overwriteOutput,
  };
}

export async function cli(args: string[]): Promise<void> {
  let options: IArguments = parseArgumentsIntoOptions(args);
  options = await promptForAnswers(options);

  const licenses: ILicense[] = await getProjectLicenses(options.input);
  const stream: fs.WriteStream = fs.createWriteStream(options.output, {
    encoding: "utf-8",
    flags: "w+"
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
