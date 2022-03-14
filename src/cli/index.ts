import arg, { Result } from "arg";
import { join } from "path";
import { generateLicenseFile } from "../generateLicenseFile";
import console from "../utils/console.utils";
import { readPackageJson } from "../utils/packageJson.utils";
import { Eol } from "./args/eol";
import { Inputs } from "./args/inputs";
import { NoSpinner } from "./args/no-spinner";
import { Output } from "./args/output";
import { ArgumentsWithAliases, argumentsWithAliases, CliOptions } from "./cli-arguments";
import { spinner } from "./spinner";

export async function main(args: string[]): Promise<void> {
  try {
    await cli(args);
  } catch (e: unknown) {
    const errorMessage = getMessageFromCaughtUnknown(e);
    spinner.fail(errorMessage);
    process.exitCode = 1;
  }
}

async function cli(args: string[]) {
  const givenUserInputs = parseUserInputs(args);

  if (givenUserInputs && givenUserInputs["--version"]) {
    await printPackageVersion();
    return;
  }

  const { inputs, output, eol, noSpinner } = await parseArgumentsIntoOptions(givenUserInputs);

  if (!noSpinner) {
    spinner.start();
  }

  await generateLicenseFile(inputs, output, eol);
  spinner.stop();
}

function parseUserInputs(rawArgs: string[]): Result<ArgumentsWithAliases> {
  return arg(argumentsWithAliases, {
    argv: rawArgs.slice(2)
  });
}

async function parseArgumentsIntoOptions(args: Result<ArgumentsWithAliases>): Promise<CliOptions> {
  const isCi = args["--ci"];

  if (isCi) {
    args["--no-spinner"] = true;

    try {
      return await getOptionsOrThrow(args);
    } catch (e: unknown) {
      const errorMessage = getMessageFromCaughtUnknown(e);
      throw new Error(`Error parsing arguments in --ci mode: ${errorMessage}`);
    }
  }

  return await promptForMissingOptions(args);
}

async function getOptionsOrThrow(options: Result<ArgumentsWithAliases>): Promise<CliOptions> {
  const inputs = await new Inputs().parse(options);
  const output = await new Output().parse(options);
  const eol = await new Eol().parse(options);
  const noSpinner = await new NoSpinner().parse(options);

  return { inputs, output, eol, noSpinner };
}

async function promptForMissingOptions(options: Result<ArgumentsWithAliases>): Promise<CliOptions> {
  const inputs = await new Inputs().resolve(options);
  const output = await new Output().resolve(options);
  const eol = await new Eol().resolve(options);
  const noSpinner = await new NoSpinner().resolve(options);

  return { inputs, output, eol, noSpinner };
}

async function printPackageVersion(): Promise<void> {
  const { version } = await readPackageJson(join(__dirname, "../../package.json"));
  console.log(`v${version}`);
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
