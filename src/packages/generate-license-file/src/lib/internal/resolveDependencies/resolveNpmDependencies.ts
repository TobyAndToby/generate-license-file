import Arborist, { Link, Node } from "@npmcli/arborist";
import { dirname, isAbsolute, join } from "path";
import logger from "../../utils/console.utils";
import { readPackageJson } from "../../utils/packageJson.utils";
import { resolveLicenseContent } from "../resolveLicenseContent";
import { LicenseNoticePair, ResolvedLicense } from "../resolveLicenses";
import { resolveNoticeContent } from "../resolveNoticeContent";

type ResolveLicensesOptions = {
  replace?: Record<string, string>;
  exclude?: string[];
};

export const resolveDependenciesForNpmProject = async (
  packageJson: string,
  licensesMap: Map<LicenseNoticePair, ResolvedLicense>,
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

    const packageJson = await readPackageJson(join(node.realpath, "package.json"));

    if (
      exclude.includes(`${packageJson.name}@${packageJson.version}`) ||
      exclude.includes(`${packageJson.name}`)
    ) {
      return;
    }

    try {
      const licenseContent = await resolveLicenseContent(node.realpath, packageJson, replacements);
      const noticeContent = await resolveNoticeContent({ directory: node.realpath, packageJson });

      const licenseNoticePair: LicenseNoticePair = `${licenseContent}:${noticeContent ?? ""}`;

      const resolvedLicense: ResolvedLicense = licensesMap.get(licenseNoticePair) ?? {
        dependencies: [],
        licenseContent,
        noticeContent,
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

      licensesMap.set(licenseNoticePair, resolvedLicense);
    } catch (error) {
      const warningLines = [
        `Unable to determine license content for ${packageJson.name}@${packageJson.version} with error:`,
        error instanceof Error ? error.message : error?.toString(),
        "", // Empty line for spacing
      ];

      logger.warn(warningLines.join("\n"));
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
