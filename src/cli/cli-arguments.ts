/* istanbul ignore file */

import { Spec } from "arg";
import { LineEnding } from "../lineEndings";

export interface UserInputs {
  inputs?: string[];
  output?: string;
  overwriteOutput?: boolean;
  eol?: string;
  noSpinner?: boolean;
  version?: boolean;
  ci?: boolean;
}

export interface CliOptions {
  inputs: string[];
  output: string;
  eol?: LineEnding;
  noSpinner: boolean;
}

export interface ArgumentsWithAliases extends Spec {
  "--input": [typeof String];
  "--output": typeof String;
  "--overwrite": typeof Boolean;
  "--eol": typeof String;
  "--no-spinner": typeof Boolean;
  "--version": typeof Boolean;
  "--ci": typeof Boolean;
  "-i": "--input";
  "-o": "--output";
  "-v": "--version";
}

export const argumentsWithAliases: ArgumentsWithAliases = {
  "--input": [String],
  "--output": String,
  "--overwrite": Boolean,
  "--eol": String,
  "--no-spinner": Boolean,
  "--version": Boolean,
  "--ci": Boolean,
  "-i": "--input",
  "-o": "--output",
  "-v": "--version"
};
