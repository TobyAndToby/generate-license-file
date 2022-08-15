import { Result } from "arg";
import { isLineEnding, LineEnding } from "../../lineEndings";
import { ArgumentsWithAliases } from "../cli-arguments";
import { Argument, MultipleChoiceOptions } from "./argument";

export class Eol extends Argument<LineEnding | undefined> {
  private readonly choices: MultipleChoiceOptions<LineEnding | undefined> = {
    CRLF: "crlf",
    LF: "lf",
    "System default": undefined,
  };

  public async resolve(args: Result<ArgumentsWithAliases>): Promise<LineEnding | undefined> {
    const inputtedEol = args["--eol"];

    if (isLineEnding(inputtedEol)) {
      return inputtedEol;
    }

    const answer = await this.promptForMultipleChoice(
      "Invalid line ending given. Please choose a line ending: ",
      this.choices,
    );

    return answer;
  }

  public async parse(args: Result<ArgumentsWithAliases>): Promise<LineEnding | undefined> {
    const eol = args["--eol"];

    if (!isLineEnding(eol)) {
      throw new Error(
        `Invalid line ending given: '${eol}'. Possible values are 'crlf' or 'lf'. Omit the --eol flag to use the system default.`,
      );
    }

    return eol;
  }
}
