﻿import { execAsync } from "./exec.utils";

export type PnpmVersion = {
  major: number;
  minor: number;
  patch: number;
};

type PnpmLsJsonStdOut = {
  [spdxKey: string]: Dependency[];
};

export type Dependency = {
  name: string;
  version: string;
  path: string;
};

export const getPnpmVersion = async (): Promise<PnpmVersion> => {
  const { stdout } = await execAsync("pnpm --version");

  const [major, minor, patch] = stdout.split(".").map(Number);

  return { major, minor, patch };
};

export const getPnpmProjectDependencies = async (
  projectDirectory: string,
): Promise<Dependency[]> => {
  const { stdout } = await execAsync("pnpm licenses list --json --prod", { cwd: projectDirectory });

  const parsed = JSON.parse(stdout) as PnpmLsJsonStdOut;

  return Object.values(parsed).flatMap(dependencies => dependencies);
};
