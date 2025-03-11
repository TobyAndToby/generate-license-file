import Arborist, { Link, Node } from "@npmcli/arborist";
import { dirname, isAbsolute, join } from "path";
import logger from "../../utils/console.utils";
import { readPackageJson } from "../../utils/packageJson.utils";
import { resolveLicenseContent } from "../resolveLicenseContent";
import { LicenseNoticeKey, ResolvedLicense } from "../resolveLicenses";
import { resolveNotices } from "../resolveNoticeContent";

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
  const exclude = options?.exclude ?? [];

  const path = resolvePath(packageJson);

  const arborist = new Arborist({ path });
  const topNode = await arborist.loadActual();

  const visitedNodes = new Set<Node | Link>();

  const parseNode = async (node: Node | Link) => {
    if (visitedNodes.has(node)) {
      return;
    }
    visitedNodes.add(node);

    if (node.dev || node.peer) {
      return;
    }

    const packageJson = await readPackageJson(join(node.realpath, "package.json"));

    if (
      exclude.includes(`${packageJson.name}@${packageJson.version}`) ||
      exclude.includes(`${packageJson.name}`)
    ) {
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
    const isTopLevel = isTopLevelDependency(child);
    if (isTopLevel) {
      await parseNode(child);
    }
  }
};

const resolvePath = (path: string): string => {
  const absolutePackageJson = isAbsolute(path) ? path : join(process.cwd(), path);

  return dirname(absolutePackageJson);
};

const isTopLevelDependency = (node: Node | Link): boolean => {
  for (const edge of node.edgesIn) {
    if (edge.from?.isRoot) {
      return true;
    }
  }

  return false;
};
