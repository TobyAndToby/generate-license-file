import { resolveLicenses } from "./internal/resolveLicenses.mjs";

//#region src/lib/getProjectLicenses.ts
/**
* Scans the project found at the given path and returns an array of objects each
* containing the details of an identified license and the dependencies it pertains to.
* @param pathToPackageJson A path to the package.json for the project
* @param options Additional options for the license discovery
* @returns Array of `ILicense`s each containing the license content and respective dependencies
*/
async function getProjectLicenses(pathToPackageJson, options) {
	const licenses = await resolveLicenses([pathToPackageJson], options);
	const results = [];
	for (const license of licenses) {
		const dependencies = license.dependencies.map((dep) => {
			if (options?.omitVersions) return dep.name;
			return `${dep.name}@${dep.version ?? "unknown"}`;
		});
		results.push({
			content: license.licenseContent,
			notices: license.notices,
			dependencies
		});
	}
	return results;
}

//#endregion
export { getProjectLicenses };