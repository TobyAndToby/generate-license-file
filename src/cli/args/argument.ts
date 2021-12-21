import { Result } from "arg";
import { prompt } from "enquirer";
import { ArgumentsWithAliases } from "../cli-arguments";

export type MultipleChoiceOptions<T> = {
  [key: string]: T;
};

export abstract class Argument<T> {
  abstract resolve(args: Result<ArgumentsWithAliases>): Promise<T>;

  protected async promptForString(question: string, initialValue: string): Promise<string> {
    const answer = await prompt<{ value: string }>({
      type: "input",
      name: "value",
      initial: initialValue,
      message: question
    });

    return answer.value;
  }

  protected async promptForBoolean(question: string): Promise<boolean> {
    const answer = await prompt<{ value: boolean }>({
      type: "confirm",
      name: "value",
      message: question
    });

    return answer.value;
  }

  protected async promptForMultipleChoice<T>(
    question: string,
    options: MultipleChoiceOptions<T>
  ): Promise<T> {
    const answer = await prompt<{ value: string }>({
      type: "select",
      name: "value",
      message: question,
      choices: Object.keys(options)
    });

    const selection = answer.value;

    return options[selection];
  }
}
