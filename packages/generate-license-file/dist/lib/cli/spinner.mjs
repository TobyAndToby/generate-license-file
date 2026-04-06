import { dots } from "cli-spinners";
import ora from "ora";

//#region src/lib/cli/spinner.ts
const spinner = ora({
	spinner: dots,
	text: "Resolving licenses..."
});

//#endregion
export { spinner };