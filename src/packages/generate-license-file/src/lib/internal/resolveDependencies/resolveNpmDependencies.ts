import Arborist, { Link, Node } from "@npmcli/arborist";
import { resolveLicenseContent } from "../resolveLicenseContent";
import { dirname, isAbsolute, join } from "path";
import { Dependency, LicenseContent } from "../resolveLicenses";
import { readPackageJson } from "../../utils/packageJson.utils";
import { satisfies } from "semver";
import { findMatchingSemver } from "../findMatchingSemver";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export const resolveDependenciesForNpmProject = async (
  packageJson: string,
  licensesMap: Map<LicenseContent, Dependency[]>,
  options?: ResolveLicensesOptions,
) => {
  const replacements = options?.replace ?? {};
  const exclusions = options?.exclude ?? [];

  const path = resolvePath(packageJson);

  const arborist = new Arborist({ path });
  const topNode = await arborist.loadActual();

  const parseNode = async (node: Node | Link) => {
    if (node.dev || node.peer) {
      return;
    }

    const packageJson = await readPackageJson(join(node.realpath, "package.json"));

    const foundExclude = findMatchingSemver(exclusions, packageJson);
    if (foundExclude) {
      return;
    }

    const licenseContent = await resolveLicenseContent(node.realpath, packageJson, replacements);

    if (licenseContent) {
      const dependencies = licensesMap.get(licenseContent) ?? [];

      const alreadyExists = dependencies.find(
        dep => dep.name === node.package.name && dep.version === node.package.version,
      );

      if (!alreadyExists) {
        dependencies.push({ name: node.package.name ?? node.name, version: node.package.version });
      }

      licensesMap.set(licenseContent, dependencies);
    }

    for (const child of node.children.values()) {
      await parseNode(child);
    }
  };

  for (const child of topNode.children.values()) {
    await parseNode(child);
  }
};

const resolvePath = (path: string): string => {
  const absolutePackageJson = isAbsolute(path) ? path : join(process.cwd(), path);

  return dirname(absolutePackageJson);
};
