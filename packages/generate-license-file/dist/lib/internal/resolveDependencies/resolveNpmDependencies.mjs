import consoleUtils from "../../utils/console.utils.mjs";
import { maybeReadPackageJson } from "../../utils/packageJson.utils.mjs";
import { resolveLicenseContent } from "../resolveLicenseContent/index.mjs";
import { resolveNotices } from "../resolveNoticeContent/index.mjs";
import { expandExcludes } from "./expandExcludes.mjs";
import { dirname, isAbsolute, join } from "path";
import Arborist from "@npmcli/arborist";

//#region src/lib/internal/resolveDependencies/resolveNpmDependencies.ts
const resolveDependenciesForNpmProject = async (packageJson, licensesMap, options) => {
	const replacements = options?.replace ?? {};
	const exclude = expandExcludes(options?.exclude);
	const topNode = await new Arborist({ path: resolvePath(packageJson) }).loadActual();
	const visitedNodes = /* @__PURE__ */ new Set();
	const parseNode = async (node) => {
		if (visitedNodes.has(node)) return;
		visitedNodes.add(node);
		if (node.dev || node.peer || node.name.startsWith(".")) return;
		const packageJson = await maybeReadPackageJson(join(node.realpath, "package.json"));
		if (packageJson == null) {
			if (node.optional) return;
			throw new Error(`Missing package.json for required package (${node.realpath})`);
		}
		if (exclude.some((excludeRule) => excludeRule.match(packageJson))) return;
		try {
			const licenseContent = await resolveLicenseContent(node.realpath, packageJson, replacements);
			const notices = await resolveNotices(node.realpath);
			const licenseNoticeKey = `${licenseContent}:${notices.length === 0 ? "" : notices.join("\n")}`;
			const resolvedLicense = licensesMap.get(licenseNoticeKey) ?? {
				dependencies: [],
				licenseContent,
				notices
			};
			if (!resolvedLicense.dependencies.find((dep) => dep.name === node.package.name && dep.version === node.package.version)) resolvedLicense.dependencies.push({
				name: node.package.name ?? node.name,
				version: node.package.version
			});
			licensesMap.set(licenseNoticeKey, resolvedLicense);
		} catch (error) {
			const warningLines = [
				`Unable to determine license content for ${packageJson.name}@${packageJson.version} with error:`,
				error instanceof Error ? error.message : error?.toString(),
				""
			];
			consoleUtils.warn(warningLines.join("\n"));
		}
		for (const edgeOut of node.edgesOut.values()) {
			const edgeNode = edgeOut.to;
			if (edgeNode) await parseNode(edgeNode);
		}
	};
	for (const child of topNode.children.values()) if (isTopLevelDependency(child)) await parseNode(child);
};
const resolvePath = (path) => {
	return dirname(isAbsolute(path) ? path : join(process.cwd(), path));
};
const isTopLevelDependency = (node) => {
	for (const edge of node.edgesIn) if (edge.from?.isRoot) return true;
	return false;
};

//#endregion
export { resolveDependenciesForNpmProject };