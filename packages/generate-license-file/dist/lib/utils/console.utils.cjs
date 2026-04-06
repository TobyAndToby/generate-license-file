const require_spinner = require('../cli/spinner.cjs');

//#region src/lib/utils/console.utils.ts
var ConsoleUtils = class {
	log(message, ...optionalParams) {
		this.writeMessage(global.console.log, message, ...optionalParams);
	}
	warn(message, ...optionalParams) {
		this.writeMessage(global.console.warn, message, ...optionalParams);
	}
	error(message, ...optionalParams) {
		this.writeMessage(global.console.error, message, ...optionalParams);
	}
	writeMessage(logger, message, ...optionalParams) {
		const isSpinning = require_spinner.spinner.isSpinning;
		if (isSpinning) require_spinner.spinner.stop();
		logger(message, ...optionalParams);
		if (isSpinning) require_spinner.spinner.start();
	}
};
const consoleUtils = new ConsoleUtils();

//#endregion
exports.default = consoleUtils;