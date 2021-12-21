import { Result } from "arg";
import { isValidEol, LineEnding } from "../../generateLicenseFile";
import { ArgumentsWithAliases } from "../cli-arguments";
import { Argument, MultipleChoiceOptions } from "./argument";

export class Eol extends Argument<LineEnding | undefined> {
  private readonly choices: MultipleChoiceOptions<LineEnding | undefined> = {
    Windows: "windows",
    POSIX: "posix",
    "System default": undefined
  };

  public async resolve(args: Result<ArgumentsWithAliases>): Promise<LineEnding | undefined> {
    let inputtedEol = args["--eol"];

    if (isValidEol(inputtedEol)) {
      return inputtedEol;
    }

    const answer = await this.promptForMultipleChoice(
      "Invalid line ending given. Please choose a line ending: ",
      this.choices
    );

    return answer;
  }
}
