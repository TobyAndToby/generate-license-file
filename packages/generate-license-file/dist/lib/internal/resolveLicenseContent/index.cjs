const require_licenseFile = require('./licenseFile.cjs');
const require_packageJsonLicense = require('./packageJsonLicense.cjs');
const require_replacementFile = require('./replacementFile.cjs');
const require_replacementHttp = require('./replacementHttp.cjs');
const require_spdxExpression = require('./spdxExpression.cjs');

//#region src/lib/internal/resolveLicenseContent/index.ts
const resolutions = [
	require_packageJsonLicense.packageJsonLicense,
	require_licenseFile.licenseFile,
	require_spdxExpression.spdxExpression
];
const replacementResolutions = [require_replacementHttp.replacementHttp, require_replacementFile.replacementFile];
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
exports.resolveLicenseContent = resolveLicenseContent;