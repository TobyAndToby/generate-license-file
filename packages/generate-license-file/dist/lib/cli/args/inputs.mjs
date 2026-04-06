import { doesFileExist } from "../../utils/file.utils.mjs";
import { spinner } from "../spinner.mjs";
import { Argument } from "./argument.mjs";

//#region src/lib/cli/args/inputs.ts
var Inputs = class extends Argument {
	question = "Package.json location: ";
	async resolve(config) {
		const { inputs } = config;
		if (!inputs) return await this.resolveOne(void 0);
		if (inputs.length === 1) return await this.resolveOne(inputs[0]);
		return await this.resolveMany(inputs);
	}
	async parse(config) {
		const { inputs } = config;
		if (!inputs || inputs.length === 0) throw new Error("No --input argument given.");
		let allValid = true;
		for (const input of inputs) if (!await doesFileExist(input)) {
			spinner.warn(`${input} could not be found.`);
			allValid = false;
		}
		if (!allValid && inputs.length === 1) throw new Error("Given --input file not found");
		if (!allValid) throw new Error("One or more given --input files not found");
		return inputs;
	}
	async resolveOne(input) {
		const initialValue = await this.getInputPromptInitialValue();
		let inputExists = input ? await doesFileExist(input) : false;
		while (!input || !inputExists) {
			if (!!input && !inputExists) spinner.fail("Given --input file not found");
			input = await this.promptForString(this.question, initialValue);
			inputExists = await doesFileExist(input);
		}
		return [input];
	}
	async resolveMany(inputs) {
		const validInputs = [];
		let allValid = true;
		for (const input of inputs) {
			if (!await doesFileExist(input)) {
				spinner.warn(`${input} could not be found.`);
				allValid = false;
				continue;
			}
			validInputs.push(input);
		}
		if (!allValid) await this.promptForTermination();
		return validInputs;
	}
	async getInputPromptInitialValue() {
		return await doesFileExist("./package.json") ? "./package.json" : "";
	}
	async promptForTermination() {
		if (!await this.promptForBoolean("One or more given --input files not found. Do you want to continue?")) throw new Error("Process terminated by user");
	}
};

//#endregion
export { Inputs };