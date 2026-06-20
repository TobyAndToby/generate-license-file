import cliSpinners from "cli-spinners";
import ora, { type Ora } from "ora";

export const spinner: Ora = ora({
  spinner: cliSpinners.dots,
  text: "Resolving licenses...",
});
