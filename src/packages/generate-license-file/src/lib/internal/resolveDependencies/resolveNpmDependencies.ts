import Arborist, { Link, Node } from "@npmcli/arborist";
import { dirname, isAbsolute, join } from "path";
import logger from "../../utils/console.utils";
import { maybeReadPackageJson } from "../../utils/packageJson.utils";
import { resolveLicenseContent } from "../resolveLicenseContent";
import { LicenseNoticeKey, ResolvedLicense } from "../resolveLicenses";
import { resolveNotices } from "../resolveNoticeContent";
import { expandExcludes } from "./expandExcludes";

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

  const path = resolvePath(packageJson);

  const arborist = new Arborist({ path });
  const topNode = await arborist.loadActual();

  const parseNode = async (node: Node | Link) => {
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
