import { mainCommand } from "./lib/cli/commands/main.mjs";

//#region src/lib/cli/index.ts
const main = async (args) => {
	await program.parseAsync(args);
};
const program = mainCommand;

//#endregion
export { main };