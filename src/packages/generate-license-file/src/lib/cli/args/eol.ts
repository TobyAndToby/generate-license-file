import { isLineEnding, LineEnding } from "../../lineEndings";
import { Argument, MultipleChoiceOptions } from "./argument";
import { CombinedConfig } from "../commands/main";

export class Eol extends Argument<LineEnding | undefined> {
  private readonly choices: MultipleChoiceOptions<LineEnding | undefined> = {
    CRLF: "crlf",
    LF: "lf",
    "System default": undefined,
  };

  public async resolve(config: CombinedConfig): Promise<LineEnding | undefined> {
    const { eol } = config;

    if (isLineEnding(eol)) {
      return eol;
    }

    const answer = await this.promptForMultipleChoice(
      "Invalid line ending given. Please choose a line ending: ",
      this.choices,
    );

    return answer;
  }

  public async parse(config: CombinedConfig): Promise<LineEnding | undefined> {
    const { eol } = config;

    if (!isLineEnding(eol)) {
      throw new Error(
        `Invalid line ending given: '${eol}'. Possible values are 'crlf' or 'lf'. Omit the --eol flag to use the system default.`,
      );
    }

    return eol;
  }
}
