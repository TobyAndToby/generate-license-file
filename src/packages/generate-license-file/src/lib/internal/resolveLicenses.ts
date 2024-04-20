import { resolveDependencies } from "./resolveDependencies";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export type LicenseContent = string;

export type Dependency = {
  name: string;
  version: string | undefined;
};

export type ResolvedLicense = {
  licenseContent: LicenseContent;
  dependencies: Dependency[];
};

export const resolveLicenses = async (
  packageJsons: string[],
  options?: ResolveLicensesOptions,
): Promise<ResolvedLicense[]> => {
  const licensesMap = new Map<LicenseContent, Dependency[]>();

  for (const packageJson of packageJsons) {
    await resolveDependencies(packageJson, licensesMap, options);
  }

  return flattenDependencyMapToLicenseArray(licensesMap);
};

const flattenDependencyMapToLicenseArray = (
  dependencyLicenses: Map<LicenseContent, Dependency[]>,
): ResolvedLicense[] => {
  const licenses: ResolvedLicense[] = [];

  for (const [licenseContent, dependencies] of dependencyLicenses) {
    licenses.push({ licenseContent, dependencies });
  }

  return licenses;
};
