import { Command } from "@commander-js/extra-typings";
import { loadConfigFile } from "../config";
import { Inputs } from "../args/inputs";
import { Output } from "../args/output";
import { Eol } from "../args/eol";
import { LineEnding } from "../../lineEndings";
import { generateLicenseFile } from "../../generateLicenseFile";
import { spinner } from "../spinner";

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
  .description("// TODO")
  .option("-c,--config <path>", "")
  .option("-i,--input <paths...>", "")
  .option("-o,--output <path>", "")
  .option("--eol <eol>", "")
  .option("--ci", "")
  .option("--no-spinner", "")
  .option("--overwrite", "")
  .action(async givenArgs => {
    const cliArgs = {
      spinner: givenArgs.spinner ? undefined : false,
      ci: givenArgs.ci,
      eol: givenArgs.eol,
      inputs: givenArgs.input,
      output: givenArgs.output,
      overwrite: givenArgs.overwrite,
    };

    const configFile = await loadConfigFile(givenArgs.config);

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

    await generateLicenseFile(inputs, output, eol);
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
