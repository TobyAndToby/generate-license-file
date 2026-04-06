import { doesFileExist } from "../../utils/file.utils.mjs";
import { resolveDependenciesForNpmProject } from "./resolveNpmDependencies.mjs";
import { resolveDependenciesForPnpmProject } from "./resolvePnpmDependencies.mjs";
import { dirname, join } from "path";

//#region src/lib/internal/resolveDependencies/index.ts
const resolveDependencies = async (packageJson, licensesMap, options) => {
	const packageManager = await resolvePackageManager(packageJson);
	switch (packageManager) {
		case "npm":
			await resolveDependenciesForNpmProject(packageJson, licensesMap, options);
			break;
		case "pnpm":
			await resolveDependenciesForPnpmProject(packageJson, licensesMap, options);
			break;
		default: throw new Error(`Unknown package manager: ${packageManager}`);
	}
};
const resolvePackageManager = async (packageJson) => {
	if (await doesFileExist(join(dirname(packageJson), "pnpm-lock.yaml"))) return "pnpm";
	return "npm";
};

//#endregion
export { resolveDependencies };