import { licenseFile } from "./licenseFile.mjs";
import { packageJsonLicense } from "./packageJsonLicense.mjs";
import { replacementFile } from "./replacementFile.mjs";
import { replacementHttp } from "./replacementHttp.mjs";
import { spdxExpression } from "./spdxExpression.mjs";

//#region src/lib/internal/resolveLicenseContent/index.ts
const resolutions = [
	packageJsonLicense,
	licenseFile,
	spdxExpression
];
const replacementResolutions = [replacementHttp, replacementFile];
const resolveLicenseContent = async (directory, packageJson, replacements) => {
	const replacementPath = replacements[`${packageJson.name}@${packageJson.version}`] || replacements[`${packageJson.name}`];
	if (replacementPath) return runReplacementResolutions(replacementPath, packageJson);
	return runResolutions({
		directory,
		packageJson
	}, packageJson);
};
const runReplacementResolutions = async (replacementPath, packageJson) => {
	for (const resolution of replacementResolutions) {
		const result = await resolution(replacementPath);
		if (result) return result;
	}
	throw new Error(`Could not find replacement content at ${replacementPath} for ${packageJson.name}@${packageJson.version}`);
};
const runResolutions = async (inputs, packageJson) => {
	for (const resolution of resolutions) {
		const result = await resolution(inputs);
		if (result) return result;
	}
	throw new Error(`Could not find license content for ${packageJson.name}@${packageJson.version}`);
};

//#endregion
export { resolveLicenseContent };