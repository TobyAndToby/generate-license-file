import { pong } from "cli-spinners";
import ora, { Ora } from "ora";

export const spinner: Ora = ora({
  spinner: pong,
  text: "Resolving licenses..."
});
