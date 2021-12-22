/* istanbul ignore file */

import { Spec } from "arg";
import { LineEnding } from "../generateLicenseFile";

export interface UserInputs {
  input?: string;
  output?: string;
  overwriteOutput?: boolean;
  eol?: string;
  noSpinner?: boolean;
}

export interface CliOptions {
  input: string;
  output: string;
  eol?: LineEnding;
  noSpinner: boolean;
}

export interface ArgumentsWithAliases extends Spec {
  "--input": typeof String;
  "--output": typeof String;
  "--overwrite": typeof Boolean;
  "--eol": typeof String;
  "--no-spinner": typeof Boolean;
  "-i": "--input";
  "-o": "--output";
}

export const argumentsWithAliases: ArgumentsWithAliases = {
  "--input": String,
  "--output": String,
  "--overwrite": Boolean,
  "--eol": String,
  "--no-spinner": Boolean,
  "-i": "--input",
  "-o": "--output"
};
