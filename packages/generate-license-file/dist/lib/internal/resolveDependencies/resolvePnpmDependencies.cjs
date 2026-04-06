const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
const require_console_utils = require('../../utils/console.utils.cjs');
const require_packageJson_utils = require('../../utils/packageJson.utils.cjs');
const require_index = require('../resolveLicenseContent/index.cjs');
const require_index$1 = require('../resolveNoticeContent/index.cjs');
const require_expandExcludes = require('./expandExcludes.cjs');
const require_pnpmCli_utils = require('../../utils/pnpmCli.utils.cjs');
let path = require("path");

//#region src/lib/internal/resolveDependencies/resolvePnpmDependencies.ts
const resolveDependenciesForPnpmProject = async (packageJson, licensesMap, options) => {
	const replacements = options?.replace ?? {};
	const exclude = require_expandExcludes.expandExcludes(options?.exclude);
	await verifyPnpmVersion();
	const dependencies = await require_pnpmCli_utils.getPnpmProjectDependencies((0, path.dirname)(packageJson));
	for (const dependency of dependencies) for (const dependencyPath of dependency.paths) {
		const packageJson = await require_packageJson_utils.readPackageJson((0, path.join)(dependencyPath, "package.json"));
		if (exclude.some((excludeRule) => excludeRule.match(packageJson))) continue;
		try {
			const licenseContent = await require_index.resolveLicenseContent(dependencyPath, packageJson, replacements);
			const notices = await require_index$1.resolveNotices(dependencyPath);
			const licenseNoticePair = `${licenseContent}:${(notices.length === 0 ? "" : notices.join("\n")) ?? ""}`;
			const resolvedLicense = licensesMap.get(licenseNoticePair) ?? {
				dependencies: [],
				licenseContent,
				notices
			};
			if (!resolvedLicense.dependencies.find((dep) => dep.name === dependency.name && dep.version === packageJson.version)) resolvedLicense.dependencies.push({
				name: dependency.name,
				version: packageJson.version
			});
			licensesMap.set(licenseNoticePair, resolvedLicense);
		} catch (error) {
			const warningLines = [
				`Unable to determine license content for ${packageJson.name}@${packageJson.version} with error:`,
				error instanceof Error ? error.message : error?.toString(),
				""
			];
			require_console_utils.default.warn(warningLines.join("\n"));
		}
	}
};
const allowedPnpmMinorVersions = {
	10: 0,
	9: 0,
	8: 0,
	7: 33
};
const verifyPnpmVersion = async () => {
	const pnpmVersion = await require_pnpmCli_utils.getPnpmVersion();
	const allowedMinorVersion = allowedPnpmMinorVersions[pnpmVersion.major];
	if (allowedMinorVersion !== void 0 && pnpmVersion.minor >= allowedMinorVersion) return;
	const errorLines = [
		`Unsupported pnpm version: ${pnpmVersion.major}.${pnpmVersion.minor}.${pnpmVersion.patch}.`,
		"Generate license file currently only supports pnpm versions >=7.33.0 & >=8.0.0",
		"Please either switch to a supported version of pnpm or raise an issue on the generate-license-file repository for us to support your version of pnpm:",
		"https://github.com/TobyAndToby/generate-license-file"
	];
	throw new Error(errorLines.join("\n"));
};

//#endregion
exports.resolveDependenciesForPnpmProject = resolveDependenciesForPnpmProject;