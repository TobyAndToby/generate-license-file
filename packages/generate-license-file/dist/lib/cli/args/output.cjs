const require_file_utils = require('../../utils/file.utils.cjs');
const require_argument = require('./argument.cjs');

//#region src/lib/cli/args/output.ts
var Output = class extends require_argument.Argument {
	question = "Output location: ";
	initialValue = "third-party-licenses.txt";
	async resolve(config) {
		let { output, overwrite } = config;
		let outputExists = output ? await require_file_utils.doesFileExist(output) : false;
		while (!output || outputExists && !overwrite) {
			if (!output) output = await this.promptForString(this.question, this.initialValue);
			outputExists = await require_file_utils.doesFileExist(output);
			if (outputExists && overwrite === void 0) overwrite = await this.promptForBoolean("This file already exists - do you want to overwrite it?");
			if (outputExists && overwrite === false) {
				output = void 0;
				overwrite = void 0;
			}
		}
		return output;
	}
	async parse(config) {
		const { output, overwrite } = config;
		if (!output) throw new Error("No --output argument given.");
		if (await require_file_utils.doesFileExist(output) && !overwrite) throw new Error(`Given --output file already exists at '${output}'. Use --overwrite to allow overwriting.`);
		return output;
	}
};

//#endregion
exports.Output = Output;