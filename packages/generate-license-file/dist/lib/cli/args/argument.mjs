import { prompt } from "enquirer";

//#region src/lib/cli/args/argument.ts
var Argument = class {
	async promptForString(question, initialValue) {
		return taperDoubleQuotes((await prompt({
			type: "input",
			name: "value",
			initial: initialValue,
			message: question
		})).value);
	}
	async promptForBoolean(question) {
		return (await prompt({
			type: "confirm",
			name: "value",
			message: question
		})).value;
	}
	async promptForMultipleChoice(question, options) {
		return options[(await prompt({
			type: "select",
			name: "value",
			message: question,
			choices: Object.keys(options)
		})).value];
	}
};
/**
* Process a strings double quotes in the same way that process.argv appears to.
* It 'downgrades' their escape-level. Unescaped quotes are removed, and escaped quotes
* become just quotes.
*/
const taperDoubleQuotes = (input) => {
	input = input.replace(/(?<!\\)"/g, "");
	return input.replace(/\\"/g, "\"");
};

//#endregion
export { Argument };