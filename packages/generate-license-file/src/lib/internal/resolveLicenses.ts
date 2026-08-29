import logger from "../utils/console.utils";
import { resolveDependencies } from "./resolveDependencies";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export type LicenseContent = string;
export type NoticeKey = string;
export type LicenseNoticeKey = `${LicenseContent}:${NoticeKey}`;

export type Dependency = {
  name: string;
  version: string | undefined;
};

export type ResolvedLicense = {
  licenseContent: LicenseContent;
  notices: string[];
  dependencies: Dependency[];
};

export const resolveLicenses = async (
  packageJsons: string[],
  options?: ResolveLicensesOptions,
): Promise<ResolvedLicense[]> => {
  const licensesMap = new Map<LicenseNoticeKey, ResolvedLicense>();

  for (const packageJson of packageJsons) {
    await resolveDependencies(packageJson, licensesMap, options);
  }

  if (licensesMap.size === 0) {
    warnNoDependenciesFound(packageJsons);
  }

  return Array.from(licensesMap.values());
};

// An empty result is a valid outcome for a project without production dependencies, but it is far more often a
// sign that the dependencies aren't installed, or that the wrong project was given. Say so rather than quietly
// producing an output file with nothing in it.
const warnNoDependenciesFound = (packageJsons: string[]): void => {
  const warningLines = [
    "No production dependencies were found, so the output will be empty.",
    "This is expected if the project has no production dependencies. Otherwise, check that:",
    ` - the dependencies have been installed for ${packageJsons.join(", ")}`,
    " - the given input is the package.json of the project you meant to scan",
    "", // Empty line for spacing
  ];

  logger.warn(warningLines.join("\n"));
};
