import arg, { Result } from "arg";
import { generateLicenseFile } from "../generateLicenseFile";
import { Eol } from "./args/eol";
import { Input } from "./args/input";
import { NoSpinner } from "./args/no-spinner";
import { Output } from "./args/output";
import { ArgumentsWithAliases, argumentsWithAliases, CliOptions } from "./cli-arguments";
import { spinner } from "./spinner";

export async function main(args: string[]): Promise<void> {
  try {
    await cli(args);
  } catch (e) {
    spinner.fail(e?.message ?? e ?? "Unknown error");
    process.exitCode = 1;
  }
}

async function cli(args: string[]) {
  const givenUserInputs = parseUserInputs(args);

  const { input, output, eol, noSpinner } = await parseArgumentsIntoOptions(givenUserInputs);

  if (!noSpinner) {
    spinner.start();
  }

  await generateLicenseFile(input, output, eol);
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
    } catch (e) {
      throw new Error(`Error parsing arguments in --ci mode: ${e?.message ?? e}`);
    }
  }

  return await promptForMissingOptions(args);
}

async function getOptionsOrThrow(options: Result<ArgumentsWithAliases>): Promise<CliOptions> {
  const input = await new Input().parse(options);
  const output = await new Output().parse(options);
  const eol = await new Eol().parse(options);
  const noSpinner = await new NoSpinner().parse(options);

  return { input, output, eol, noSpinner };
}

async function promptForMissingOptions(options: Result<ArgumentsWithAliases>): Promise<CliOptions> {
  const input = await new Input().resolve(options);
  const output = await new Output().resolve(options);
  const eol = await new Eol().resolve(options);
  const noSpinner = await new NoSpinner().resolve(options);

  return { input, output, eol, noSpinner };
}
