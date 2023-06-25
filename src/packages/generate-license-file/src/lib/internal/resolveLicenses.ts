import { License } from "../models/license";
import { Node, Link } from "@npmcli/arborist";
import Arborist from "@npmcli/arborist";
import { dirname, isAbsolute, join } from "path";
import { resolveLicenseContent } from "./resolveLicenseContent";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export const resolveLicenses = async (
  packageJsons: string[],
  options?: ResolveLicensesOptions,
): Promise<License[]> => {
  const replacements = options?.replace ?? {};
  const exclude = options?.exclude ?? [];

  const licensesMap: Map<string, Set<string>> = new Map<string, Set<string>>();

  const resolveLicensesForPackageJson = async (packageJson: string) => {
    const path = resolvePath(packageJson);

    const arborist = new Arborist({ path });
    const topNode = await arborist.loadActual();

    const parseNode = async (node: Node | Link) => {
      if (node.dev) {
        return;
      }

      if (exclude.includes(node.pkgid)) {
        return;
      }

      const licenseContent = await resolveLicenseContent(node.realpath, replacements);

      if (licenseContent) {
        const set = licensesMap.get(licenseContent) ?? new Set<string>();
        set.add(node.pkgid);
        licensesMap.set(licenseContent, set);
      }

      for (const child of node.children.values()) {
        await parseNode(child);
      }
    };

    for (const child of topNode.children.values()) {
      await parseNode(child);
    }
  };

  for (const packageJson of packageJsons) {
    await resolveLicensesForPackageJson(packageJson);
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

const resolvePath = (path: string): string => {
  const absolutePackageJson = isAbsolute(path) ? path : join(process.cwd(), path);

  return dirname(absolutePackageJson);
};
