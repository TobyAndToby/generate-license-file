import { dots } from "cli-spinners";
import ora, { type Ora } from "ora";

export const spinner: Ora = ora({
  spinner: dots,
  text: "Resolving licenses...",
});
