import { spinner } from "../spinner.mjs";
import consoleUtils from "../../utils/console.utils.mjs";
import { readPackageJson } from "../../utils/packageJson.utils.mjs";
import { generateLicenseFile } from "../../generateLicenseFile.mjs";
import { Eol } from "../args/eol.mjs";
import { Inputs } from "../args/inputs.mjs";
import { Output } from "../args/output.mjs";
import { loadConfigFile } from "../config/index.mjs";
import { join } from "path";
import { Command } from "@commander-js/extra-typings";

//#region src/lib/cli/commands/main.ts
const mainCommand = new Command().name("generate-license-file").description("Generates a text file containing all of the licenses for your production dependencies").helpOption("-h,--help", "Display help text").option("-c,--config <path>", "Specify a path to a generate-license-file config file. Files will be automatically detected if this flag is not given").option("-i,--input <paths...>", "Specify one or more paths to package.json files to include").option("-o,--output <path>", "Specify the path of the file to be created").option("--overwrite", "Indicates that the output file should be overwritten if it already exists").option("--eol <eol>", "Specify a particular line ending to use in the output file. Otherwise, the line ending of the current OS will be used").option("--ci", "Fail with a non-zero exit code if user input is required").option("--no-spinner", "Don't show the progress spinner while generating the license file. This is implicitly true if --ci is given").option("--omit-versions", "Omit the package version numbers from the output.").option("-v,--version", "Prints the installed version of generate-license-file").action(async (givenArgs) => {
	if (givenArgs.version) {
		await printPackageVersion();
		return;
	}
	const cliArgs = {
		spinner: givenArgs.spinner ? void 0 : false,
		ci: givenArgs.ci,
		eol: givenArgs.eol,
		inputs: givenArgs.input,
		output: givenArgs.output,
		overwrite: givenArgs.overwrite,
		omitVersions: givenArgs.omitVersions
	};
	const configFile = await loadConfigFile(givenArgs.config);
	const filteredCliArgs = Object.fromEntries(Object.entries(cliArgs).filter(([, v]) => v !== void 0));
	const { inputs, showSpinner, output, eol, omitVersions } = await parseArgumentsIntoOptions({
		...configFile,
		...filteredCliArgs
	});
	if (showSpinner) spinner.start();
	await generateLicenseFile(inputs, output, {
		lineEnding: eol,
		replace: configFile?.replace,
		exclude: configFile?.exclude,
		append: configFile?.append,
		omitVersions
	});
	spinner.stop();
});
async function parseArgumentsIntoOptions(config) {
	if (config.ci) {
		config.spinner = false;
		try {
			return await getOptionsOrThrow(config);
		} catch (e) {
			const errorMessage = getMessageFromCaughtUnknown(e);
			throw new Error(`Error parsing arguments in --ci mode: ${errorMessage}`);
		}
	}
	return await promptForMissingOptions(config);
}
async function getOptionsOrThrow(config) {
	return {
		inputs: await new Inputs().parse(config),
		output: await new Output().parse(config),
		eol: await new Eol().parse(config),
		showSpinner: config.spinner ?? true,
		omitVersions: config.omitVersions ?? false
	};
}
async function promptForMissingOptions(config) {
	return {
		inputs: await new Inputs().resolve(config),
		output: await new Output().resolve(config),
		eol: await new Eol().resolve(config),
		showSpinner: config.spinner ?? true,
		omitVersions: config.omitVersions ?? false
	};
}
function getMessageFromCaughtUnknown(e) {
	if (e instanceof Error) return e.message;
	if (typeof e === "string") return e;
	return "Unknown error";
}
const printPackageVersion = async () => {
	const { version } = await readPackageJson(join(__dirname, "../../../../package.json"));
	consoleUtils.log(`v${version}`);
};

//#endregion
export { mainCommand };