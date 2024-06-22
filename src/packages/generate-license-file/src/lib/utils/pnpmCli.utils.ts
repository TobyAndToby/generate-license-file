import { z } from "zod";
import consoleUtils from "./console.utils";
import { execAsync } from "./exec.utils";

export type PnpmVersion = {
  major: number;
  minor: number;
  patch: number;
};

const v8DependencyValidator = z.object({
  name: z.string(),
  path: z.string(),
});

const v9DependencyValidator = z.object({
  name: z.string(),
  paths: z.string().array(),
});

const dependencyValidator = v8DependencyValidator.or(v9DependencyValidator).transform(dep => ({
  name: dep.name,
  paths: "paths" in dep ? dep.paths : [dep.path],
}));

const pnpmLsJsonStdOutValidator = z.record(z.array(dependencyValidator));

export type PnpmDependency = z.infer<typeof dependencyValidator>;

export const getPnpmVersion = async (): Promise<PnpmVersion> => {
  const { stdout } = await execAsync("pnpm --version");

  const [major, minor, patch] = stdout.split(".").map(Number);

  return { major, minor, patch };
};

export const getPnpmProjectDependencies = async (
  projectDirectory: string,
): Promise<PnpmDependency[]> => {
  const { stdout } = await execAsync("pnpm licenses list --json --prod", { cwd: projectDirectory });

  const parsedOutput = JSON.parse(stdout);
  const commandOutput = pnpmLsJsonStdOutValidator.safeParse(parsedOutput);

  if (!commandOutput.success) {
    const errors = JSON.stringify(commandOutput.error.flatten());
    consoleUtils.error("Failed to parse pnpm licenses list output: " + errors);
    throw new Error("Failed to parse pnpm licenses list output");
  }

  return Object.values(commandOutput.data).flatMap(dependencies => dependencies);
};
