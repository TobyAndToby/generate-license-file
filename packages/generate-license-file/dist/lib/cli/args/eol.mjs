import { isLineEnding } from "../../lineEndings.mjs";
import { Argument } from "./argument.mjs";

//#region src/lib/cli/args/eol.ts
var Eol = class extends Argument {
	choices = {
		CRLF: "crlf",
		LF: "lf",
		"System default": void 0
	};
	async resolve(config) {
		const { eol } = config;
		if (eol === void 0 || isLineEnding(eol)) return eol;
		return await this.promptForMultipleChoice("Invalid line ending given. Please choose a line ending: ", this.choices);
	}
	async parse(config) {
		const { eol } = config;
		if (eol !== void 0 && !isLineEnding(eol)) throw new Error(`Invalid line ending given: '${eol}'. Possible values are 'crlf' or 'lf'. Omit the --eol flag to use the system default.`);
		return eol;
	}
};

//#endregion
export { Eol };