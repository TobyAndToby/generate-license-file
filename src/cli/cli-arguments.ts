/* istanbul ignore file */

import { Spec } from "arg";
import { LineEnding } from "../generateLicenseFile";

export interface UserInputs {
  input?: string;
  output?: string;
  overwriteOutput?: boolean;
  eol?: string;
}

export interface CliOptions {
  input: string;
  output: string;
  overwriteOutput: boolean;
  eol?: LineEnding;
}

export interface ArgumentsWithAliases extends Spec {
  "--input": typeof String;
  "--output": typeof String;
  "--overwrite": typeof Boolean;
  "--eol": typeof String;
  "-i": "--input";
  "-o": "--output";
}

export const argumentsWithAliases: ArgumentsWithAliases = {
  "--input": String,
  "--output": String,
  "--overwrite": Boolean,
  "--eol": String,
  "-i": "--input",
  "-o": "--output"
};
