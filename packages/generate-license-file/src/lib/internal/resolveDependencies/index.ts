import { basename, dirname, join } from "node:path";
import { doesFileExist } from "../../utils/file.utils";
import type { LicenseNoticeKey, ResolvedLicense } from "../resolveLicenses";
import { resolveDependenciesForNpmProject } from "./resolveNpmDependencies";
import { resolveDependenciesForPnpmProject } from "./resolvePnpmDependencies";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

type PackageManager = "npm" | "pnpm";

const PACKAGE_JSON_FILE_NAME = "package.json";

export const resolveDependencies = async (
  packageJson: string,
  licensesMap: Map<LicenseNoticeKey, ResolvedLicense>,
  options?: ResolveLicensesOptions,
) => {
  verifyPackageJsonFileName(packageJson);

  const packageManager = await resolvePackageManager(packageJson);

  switch (packageManager) {
    case "npm":
      await resolveDependenciesForNpmProject(packageJson, licensesMap, options);
      break;

    case "pnpm":
      await resolveDependenciesForPnpmProject(packageJson, licensesMap, options);
      break;

    // istanbul ignore next
    default: {
      const _exhaustiveCheck: never = packageManager;
      throw new Error(`Unknown package manager: ${packageManager}`);
    }
  }
};

// The given path identifies which project to report on, but the dependency tree itself is resolved by
// npm and pnpm using the "package.json" file name at every level. A differently named file can never be
// read, so reject it here rather than silently resolving no dependencies at all.
const verifyPackageJsonFileName = (packageJson: string): void => {
  const fileName = basename(packageJson);

  if (fileName === PACKAGE_JSON_FILE_NAME) {
    return;
  }

  throw new Error(
    `Expected a path to a file named "${PACKAGE_JSON_FILE_NAME}" but was given "${fileName}" (${packageJson}). ` +
      `Dependencies are resolved by npm and pnpm using the "${PACKAGE_JSON_FILE_NAME}" file name, so a file with a ` +
      `different name cannot be used as an input.`,
  );
};

const resolvePackageManager = async (packageJson: string): Promise<PackageManager> => {
  const directory = dirname(packageJson);

  const potentialPnpmLockFile = join(directory, "pnpm-lock.yaml");
  if (await doesFileExist(potentialPnpmLockFile)) {
    return "pnpm";
  }

  return "npm";
};
