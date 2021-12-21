import arg, { Result } from "arg";
import { generateLicenseFile } from "../generateLicenseFile";
import { Eol } from "./args/eol";
import { Input } from "./args/input";
import { Output } from "./args/output";
import { ArgumentsWithAliases, argumentsWithAliases, CliOptions } from "./cli-arguments";
import { spinner } from "./spinner";

export async function cli(args: string[]): Promise<void> {
  const givenUserInputs = parseUserInputs(args);
  const cliOptions: CliOptions = await promptForMissingOptions(givenUserInputs);

  spinner.start();

  try {
    await generateLicenseFile(cliOptions.input, cliOptions.output, cliOptions.eol);
    spinner.stop();
  } catch (e: any) {
    spinner.fail(e?.message ?? e ?? "Unknown error");
  }
}

function parseUserInputs(rawArgs: string[]): Result<ArgumentsWithAliases> {
  return arg(argumentsWithAliases, {
    argv: rawArgs.slice(2)
  });
}

async function promptForMissingOptions(options: Result<ArgumentsWithAliases>): Promise<CliOptions> {
  const input = await new Input().resolve(options);
  const output = await new Output().resolve(options);
  const eol = await new Eol().resolve(options);

  return { input, output, eol };
}
