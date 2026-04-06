Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_main = require('./lib/cli/commands/main.cjs');

//#region src/lib/cli/index.ts
const main = async (args) => {
	await program.parseAsync(args);
};
const program = require_main.mainCommand;

//#endregion
exports.main = main;