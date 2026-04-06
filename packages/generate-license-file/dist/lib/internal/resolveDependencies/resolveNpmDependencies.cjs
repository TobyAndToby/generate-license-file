const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
const require_console_utils = require('../../utils/console.utils.cjs');
const require_packageJson_utils = require('../../utils/packageJson.utils.cjs');
const require_index = require('../resolveLicenseContent/index.cjs');
const require_index$1 = require('../resolveNoticeContent/index.cjs');
const require_expandExcludes = require('./expandExcludes.cjs');
let path = require("path");
let _npmcli_arborist = require("@npmcli/arborist");
_npmcli_arborist = require_runtime.__toESM(_npmcli_arborist);

//#region src/lib/internal/resolveDependencies/resolveNpmDependencies.ts
const resolveDependenciesForNpmProject = async (packageJson, licensesMap, options) => {
	const replacements = options?.replace ?? {};
	const exclude = require_expandExcludes.expandExcludes(options?.exclude);
	const topNode = await new _npmcli_arborist.default({ path: resolvePath(packageJson) }).loadActual();
	const visitedNodes = /* @__PURE__ */ new Set();
	const parseNode = async (node) => {
		if (visitedNodes.has(node)) return;
		visitedNodes.add(node);
		if (node.dev || node.peer || node.name.startsWith(".")) return;
		const packageJson = await require_packageJson_utils.maybeReadPackageJson((0, path.join)(node.realpath, "package.json"));
		if (packageJson == null) {
			if (node.optional) return;
			throw new Error(`Missing package.json for required package (${node.realpath})`);
		}
		if (exclude.some((excludeRule) => excludeRule.match(packageJson))) return;
		try {
			const licenseContent = await require_index.resolveLicenseContent(node.realpath, packageJson, replacements);
			const notices = await require_index$1.resolveNotices(node.realpath);
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
			require_console_utils.default.warn(warningLines.join("\n"));
		}
		for (const edgeOut of node.edgesOut.values()) {
			const edgeNode = edgeOut.to;
			if (edgeNode) await parseNode(edgeNode);
		}
	};
	for (const child of topNode.children.values()) if (isTopLevelDependency(child)) await parseNode(child);
};
const resolvePath = (path$1) => {
	return (0, path.dirname)((0, path.isAbsolute)(path$1) ? path$1 : (0, path.join)(process.cwd(), path$1));
};
const isTopLevelDependency = (node) => {
	for (const edge of node.edgesIn) if (edge.from?.isRoot) return true;
	return false;
};

//#endregion
exports.resolveDependenciesForNpmProject = resolveDependenciesForNpmProject;