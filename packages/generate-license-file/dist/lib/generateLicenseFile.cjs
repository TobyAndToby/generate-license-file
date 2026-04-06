const require_file_utils = require('./utils/file.utils.cjs');
const require_getLicenseFileText = require('./getLicenseFileText.cjs');

//#region src/lib/generateLicenseFile.ts
async function generateLicenseFile(pathsToPackageJsons, outputPath, options) {
	if (typeof pathsToPackageJsons === "string") pathsToPackageJsons = [pathsToPackageJsons];
	await require_file_utils.writeFileAsync(outputPath, await require_getLicenseFileText.getLicenseFileText(pathsToPackageJsons, options));
}

//#endregion
exports.generateLicenseFile = generateLicenseFile;