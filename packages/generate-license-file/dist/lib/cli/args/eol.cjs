const require_lineEndings = require('../../lineEndings.cjs');
const require_argument = require('./argument.cjs');

//#region src/lib/cli/args/eol.ts
var Eol = class extends require_argument.Argument {
	choices = {
		CRLF: "crlf",
		LF: "lf",
		"System default": void 0
	};
	async resolve(config) {
		const { eol } = config;
		if (eol === void 0 || require_lineEndings.isLineEnding(eol)) return eol;
		return await this.promptForMultipleChoice("Invalid line ending given. Please choose a line ending: ", this.choices);
	}
	async parse(config) {
		const { eol } = config;
		if (eol !== void 0 && !require_lineEndings.isLineEnding(eol)) throw new Error(`Invalid line ending given: '${eol}'. Possible values are 'crlf' or 'lf'. Omit the --eol flag to use the system default.`);
		return eol;
	}
};

//#endregion
exports.Eol = Eol;