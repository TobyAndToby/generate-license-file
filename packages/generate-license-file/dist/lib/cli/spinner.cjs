const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
let cli_spinners = require("cli-spinners");
let ora = require("ora");
ora = require_runtime.__toESM(ora);

//#region src/lib/cli/spinner.ts
const spinner = (0, ora.default)({
	spinner: cli_spinners.dots,
	text: "Resolving licenses..."
});

//#endregion
exports.spinner = spinner;