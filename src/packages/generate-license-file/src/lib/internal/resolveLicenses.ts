import { License } from "../models/license";
import { resolveDependencies } from "./resolveDependencies";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export const resolveLicenses = async (
  packageJsons: string[],
  options?: ResolveLicensesOptions,
): Promise<License[]> => {
  const licensesMap: Map<string, Set<string>> = new Map<string, Set<string>>();

  for (const packageJson of packageJsons) {
    await resolveDependencies(packageJson, licensesMap, options);
  }

  return flattenDependencyMapToLicenseArray(licensesMap);
};

const flattenDependencyMapToLicenseArray = (dependencyLicenses: Map<string, Set<string>>) => {
  const licenses: License[] = [];

  for (const [license, dependencies] of dependencyLicenses) {
    const dependencyArray = Array.from(dependencies.values());
    licenses.push(new License(license, dependencyArray));
  }

  return licenses;
};
