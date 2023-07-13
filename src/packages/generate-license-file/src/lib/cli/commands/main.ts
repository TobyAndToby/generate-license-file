import { Command } from "@commander-js/extra-typings";
import { loadConfigFile } from "../config";
import { Inputs } from "../args/inputs";
import { Output } from "../args/output";
import { Eol } from "../args/eol";
import { LineEnding } from "../../lineEndings";
import { generateLicenseFile } from "../../generateLicenseFile";
import { spinner } from "../spinner";
import { join } from "path";
import logger from "../../utils/console.utils";
import { readPackageJson } from "../../utils/packageJson.utils";

export type CombinedConfig = {
  inputs?: string[];
  output?: string;
  eol?: string;
  ci?: boolean;
  overwrite?: boolean;
  spinner?: boolean;
};

export interface ProgramOptions {
  inputs: string[];
  output: string;
  eol?: LineEnding;
  showSpinner: boolean;
}

export const mainCommand = new Command()
  .name("generate-license-file")
  .description(
    "Generates a text file containing all of the licenses for your production dependencies",
  )
  .helpOption("-h,--help", "Display help text")
  .option(
    "-c,--config <path>",
    "Specify a path to a generate-license-file config file. Files will be automatically detected if this flag is not given",
  )
  .option("-i,--input <paths...>", "Specify one or more paths to package.json files to include")
  .option("-o,--output <path>", "Specify the path of the file to be created")
  .option(
    "--overwrite",
    "Indicates that the output file should be overwritten if it already exists",
  )
  .option(
    "--eol <eol>",
    "Specify a particular line ending to use in the output file. Otherwise, the line ending of the current OS will be used",
  )
  .option("--ci", "Fail with a non-zero exit code if user input is required")
  .option(
    "--no-spinner",
    "Don't show the progress spinner while generating the license file. This is implicitly true if --ci is given",
  )
  .option("-v,--version", "Prints the installed version of generate-license-file")
  .action(async givenArgs => {
    if (givenArgs.version) {
      printPackageVersion();
      return;
    }

    const cliArgs = {
      // Commander sets spinner to true by default, meaning it will always override
      // a spinner value in the config file - set to undefined if it is true (ie,
      // omitted from CLI args) so the filtering below removes it.
      spinner: givenArgs.spinner ? undefined : false,
      ci: givenArgs.ci,
      eol: givenArgs.eol,
      inputs: givenArgs.input,
      output: givenArgs.output,
      overwrite: givenArgs.overwrite,
    };

    const configFile = await loadConfigFile(givenArgs.config);

    console.log(configFile);

    // Filter out undefined values in the CLI args, so they do not
    // potentially override values provided in the config file.
    const filteredCliArgs = Object.fromEntries(
      Object.entries(cliArgs).filter(([, v]) => v !== undefined),
    );

    const combinedConfig = {
      ...configFile,
      ...filteredCliArgs,
    };

    const { inputs, showSpinner, output, eol } = await parseArgumentsIntoOptions(combinedConfig);

    if (showSpinner) {
      spinner.start();
    }

    console.log(combinedConfig);

    await generateLicenseFile(inputs, output, {
      lineEnding: eol,
      replace: configFile?.replace,
      exclude: configFile?.exclude,
      append: configFile?.append,
    });

    spinner.stop();
  });

async function parseArgumentsIntoOptions(config: CombinedConfig): Promise<ProgramOptions> {
  if (config.ci) {
    config.spinner = false;

    try {
      return await getOptionsOrThrow(config);
    } catch (e: unknown) {
      const errorMessage = getMessageFromCaughtUnknown(e);
      throw new Error(`Error parsing arguments in --ci mode: ${errorMessage}`);
    }
  }

  return await promptForMissingOptions(config);
}

async function getOptionsOrThrow(config: CombinedConfig): Promise<ProgramOptions> {
  const inputs = await new Inputs().parse(config);
  const output = await new Output().parse(config);
  const eol = await new Eol().parse(config);
  const showSpinner = config.spinner ?? true;

  return { inputs, output, eol, showSpinner };
}

async function promptForMissingOptions(config: CombinedConfig): Promise<ProgramOptions> {
  const inputs = await new Inputs().resolve(config);
  const output = await new Output().resolve(config);
  const eol = await new Eol().resolve(config);
  const showSpinner = config.spinner ?? true;

  return { inputs, output, eol, showSpinner };
}

function getMessageFromCaughtUnknown(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  }

  if (typeof e === "string") {
    return e;
  }

  return "Unknown error";
}

const printPackageVersion = async (): Promise<void> => {
  const packageJsonLocation = join(__dirname, "../../../../package.json");
  const { version } = await readPackageJson(packageJsonLocation);
  logger.log(`v${version}`);
};
