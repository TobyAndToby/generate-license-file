import { Result } from "arg";
import { ArgumentsWithAliases } from "../cli-arguments";
import { Argument } from "./argument";

export class NoSpinner extends Argument<boolean> {
  public resolve(args: Result<ArgumentsWithAliases>): Promise<boolean> {
    const inputtedNoSpinner = args["--no-spinner"];
    return Promise.resolve(inputtedNoSpinner ?? false);
  }

  public parse(args: Result<ArgumentsWithAliases>): Promise<boolean> {
    const inputtedNoSpinner = args["--no-spinner"];
    return Promise.resolve(inputtedNoSpinner ?? false);
  }
}
