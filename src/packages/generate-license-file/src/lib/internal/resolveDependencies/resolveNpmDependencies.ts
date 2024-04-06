import Arborist, { Link, Node } from "@npmcli/arborist";
import { resolveLicenseContent } from "../resolveLicenseContent";
import { dirname, isAbsolute, join } from "path";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
  omitVersion?: boolean;
};

export const resolveDependenciesForNpmProject = async (
  packageJson: string,
  licensesMap: Map<string, Set<string>>,
  options?: ResolveLicensesOptions,
) => {
  const replacements = options?.replace ?? {};
  const exclude = options?.exclude ?? [];

  const path = resolvePath(packageJson);

  const arborist = new Arborist({ path });
  const topNode = await arborist.loadActual();

  const parseNode = async (node: Node | Link) => {
    if (node.dev || node.peer) {
      return;
    }

    if (exclude.includes(node.pkgid)) {
      return;
    }

    const licenseContent = await resolveLicenseContent(node.realpath, replacements);

    if (licenseContent) {
      let pkIdOutput = node.pkgid;

      if (options?.omitVersion === true){
        pkIdOutput = node.packageName;
      }

      const set = licensesMap.get(licenseContent) ?? new Set<string>();
      set.add(pkIdOutput);
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

const resolvePath = (path: string): string => {
  const absolutePackageJson = isAbsolute(path) ? path : join(process.cwd(), path);

  return dirname(absolutePackageJson);
};
