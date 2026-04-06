const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
const require_file_utils = require('../../utils/file.utils.cjs');
const require_resolveNpmDependencies = require('./resolveNpmDependencies.cjs');
const require_resolvePnpmDependencies = require('./resolvePnpmDependencies.cjs');
let path = require("path");

//#region src/lib/internal/resolveDependencies/index.ts
const resolveDependencies = async (packageJson, licensesMap, options) => {
	const packageManager = await resolvePackageManager(packageJson);
	switch (packageManager) {
		case "npm":
			await require_resolveNpmDependencies.resolveDependenciesForNpmProject(packageJson, licensesMap, options);
			break;
		case "pnpm":
			await require_resolvePnpmDependencies.resolveDependenciesForPnpmProject(packageJson, licensesMap, options);
			break;
		default: throw new Error(`Unknown package manager: ${packageManager}`);
	}
};
const resolvePackageManager = async (packageJson) => {
	if (await require_file_utils.doesFileExist((0, path.join)((0, path.dirname)(packageJson), "pnpm-lock.yaml"))) return "pnpm";
	return "npm";
};

//#endregion
exports.resolveDependencies = resolveDependencies;