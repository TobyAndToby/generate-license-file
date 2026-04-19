import { dirname, isAbsolute, join } from "node:path";
import type { Link, Node } from "@npmcli/arborist";
import logger from "../../utils/console.utils";
import { maybeReadPackageJson } from "../../utils/packageJson.utils";
import { resolveLicenseContent } from "../resolveLicenseContent";
import type { LicenseNoticeKey, ResolvedLicense } from "../resolveLicenses";
import { resolveNotices } from "../resolveNoticeContent";
import { expandExcludes } from "./expandExcludes";
import { loadArboristTree } from "./loadArboristTree";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export const resolveDependenciesForNpmProject = async (
  packageJson: string,
  licensesMap: Map<LicenseNoticeKey, ResolvedLicense>,
  options?: ResolveLicensesOptions,
) => {
  const replacements = options?.replace ?? {};
  const exclude = expandExcludes(options?.exclude);

  const projectPath = resolvePath(packageJson);

  const topNode = await loadArboristTree(projectPath);

  const visitedNodes = new Set<Node | Link>();

  const parseNode = async (node: Node | Link) => {
    if (visitedNodes.has(node)) {
      return;
    }
    visitedNodes.add(node);

    if (node.dev || node.peer || node.name.startsWith(".")) {
      return;
    }

    const packageJson = await maybeReadPackageJson(join(node.realpath, "package.json"));

    if (packageJson == null) {
      // We can drop the node if the package is optional and wasn't found on disk.
      if (node.optional) {
        return;
      }

      throw new Error(`Missing package.json for required package (${node.realpath})`);
    }

    if (exclude.some(excludeRule => excludeRule.match(packageJson))) {
      return;
    }

    try {
      const licenseContent = await resolveLicenseContent(node.realpath, packageJson, replacements);
      const notices = await resolveNotices(node.realpath);

      const noticeContent = notices.length === 0 ? "" : notices.join("\n");
      const licenseNoticeKey: LicenseNoticeKey = `${licenseContent}:${noticeContent}`;

      const resolvedLicense: ResolvedLicense = licensesMap.get(licenseNoticeKey) ?? {
        dependencies: [],
        licenseContent,
        notices,
      };

      const alreadyExists = resolvedLicense.dependencies.find(
        dep => dep.name === node.package.name && dep.version === node.package.version,
      );

      if (!alreadyExists) {
        resolvedLicense.dependencies.push({
          name: node.package.name ?? node.name,
          version: node.package.version,
        });
      }

      licensesMap.set(licenseNoticeKey, resolvedLicense);
    } catch (error) {
      const warningLines = [
        `Unable to determine license content for ${packageJson.name}@${packageJson.version} with error:`,
        error instanceof Error ? error.message : error?.toString(),
        "", // Empty line for spacing
      ];

      logger.warn(warningLines.join("\n"));
    }

    for (const edgeOut of node.edgesOut.values()) {
      const edgeNode = edgeOut.to;
      if (edgeNode) {
        await parseNode(edgeNode);
      }
    }
  };

  for (const child of topNode.children.values()) {
    const isTopLevel = isTopLevelDependency(child, projectPath);
    if (isTopLevel) {
      await parseNode(child);
    }
  }
};

const resolvePath = (path: string): string => {
  const absolutePackageJson = isAbsolute(path) ? path : join(process.cwd(), path);

  return dirname(absolutePackageJson);
};

const isTopLevelDependency = (node: Node | Link, packageJsonDir: string): boolean => {
  for (const edge of node.edgesIn) {
    if (edge.from?.path === packageJsonDir) {
      return true;
    }
  }

  return false;
};
