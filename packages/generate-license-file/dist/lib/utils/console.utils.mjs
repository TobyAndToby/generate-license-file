import { spinner } from "../cli/spinner.mjs";

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
		const isSpinning = spinner.isSpinning;
		if (isSpinning) spinner.stop();
		logger(message, ...optionalParams);
		if (isSpinning) spinner.start();
	}
};
const consoleUtils = new ConsoleUtils();

//#endregion
export { consoleUtils as default };