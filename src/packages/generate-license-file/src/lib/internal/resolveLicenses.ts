import BTree from "sorted-btree";
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
  const licensesMap = new BTree<string, Set<string>>();

  for (const packageJson of packageJsons) {
    await resolveDependencies(packageJson, licensesMap, options);
  }

  return flattenDependencyMapToLicenseArray(licensesMap);
};

const flattenDependencyMapToLicenseArray = (dependencyLicenses: BTree<string, Set<string>>) => {
  const licenses: License[] = [];

  for (const [license, dependencies] of dependencyLicenses.entries()) {
    const dependencyArray = Array.from(dependencies.values()).sort();
    licenses.push(new License(license, dependencyArray));
  }

  return licenses;
};
