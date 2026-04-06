import consoleUtils from "../../utils/console.utils.mjs";
import { readPackageJson } from "../../utils/packageJson.utils.mjs";
import { resolveLicenseContent } from "../resolveLicenseContent/index.mjs";
import { resolveNotices } from "../resolveNoticeContent/index.mjs";
import { expandExcludes } from "./expandExcludes.mjs";
import { getPnpmProjectDependencies, getPnpmVersion } from "../../utils/pnpmCli.utils.mjs";
import { dirname, join } from "path";

//#region src/lib/internal/resolveDependencies/resolvePnpmDependencies.ts
const resolveDependenciesForPnpmProject = async (packageJson, licensesMap, options) => {
	const replacements = options?.replace ?? {};
	const exclude = expandExcludes(options?.exclude);
	await verifyPnpmVersion();
	const dependencies = await getPnpmProjectDependencies(dirname(packageJson));
	for (const dependency of dependencies) for (const dependencyPath of dependency.paths) {
		const packageJson = await readPackageJson(join(dependencyPath, "package.json"));
		if (exclude.some((excludeRule) => excludeRule.match(packageJson))) continue;
		try {
			const licenseContent = await resolveLicenseContent(dependencyPath, packageJson, replacements);
			const notices = await resolveNotices(dependencyPath);
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
			consoleUtils.warn(warningLines.join("\n"));
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
	const pnpmVersion = await getPnpmVersion();
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
export { resolveDependenciesForPnpmProject };