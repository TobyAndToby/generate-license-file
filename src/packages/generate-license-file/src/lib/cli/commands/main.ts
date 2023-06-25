import { Command } from "@commander-js/extra-typings";
import { loadConfigFile } from "../config";
import { Inputs } from "../args/inputs";
import { Output } from "../args/output";
import { Eol } from "../args/eol";
import { NoSpinner } from "../args/no-spinner";
import { LineEnding } from "../../lineEndings";
import { generateLicenseFile } from "../../generateLicenseFile";
import { spinner } from "../spinner";

export type CombinedConfig = {
  inputs?: string[];
  output?: string;
  eol?: string;
  ci?: boolean;
  overwrite?: boolean;
  noSpinner?: boolean;
};

export interface ProgramOptions {
  inputs: string[];
  output: string;
  eol?: LineEnding;
  noSpinner: boolean;
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
  .action(async cliArgs => {
    const configFile = await loadConfigFile(cliArgs.config);

    const { input, ...rest } = cliArgs;

    const filteredRest = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== undefined),
    );

    const combinedConfig = {
      ...configFile,
      ...filteredRest,
    };

    if (input) {
      combinedConfig.inputs = input;
    }

    const { inputs, noSpinner, output, eol } = await parseArgumentsIntoOptions(combinedConfig);

    if (!noSpinner) {
      spinner.start();
    }

    await generateLicenseFile(inputs, output, eol);
    spinner.stop();
  });

async function parseArgumentsIntoOptions(config: CombinedConfig): Promise<ProgramOptions> {
  if (config.ci) {
    config.noSpinner = true;

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
  const noSpinner = await new NoSpinner().parse(config);

  return { inputs, output, eol, noSpinner };
}

async function promptForMissingOptions(config: CombinedConfig): Promise<ProgramOptions> {
  const inputs = await new Inputs().resolve(config);
  const output = await new Output().resolve(config);
  const eol = await new Eol().resolve(config);
  const noSpinner = await new NoSpinner().resolve(config);

  return { inputs, output, eol, noSpinner };
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
