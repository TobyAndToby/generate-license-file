import { writeFileAsync } from "./utils/file.utils.mjs";
import { getLicenseFileText } from "./getLicenseFileText.mjs";

//#region src/lib/generateLicenseFile.ts
async function generateLicenseFile(pathsToPackageJsons, outputPath, options) {
	if (typeof pathsToPackageJsons === "string") pathsToPackageJsons = [pathsToPackageJsons];
	await writeFileAsync(outputPath, await getLicenseFileText(pathsToPackageJsons, options));
}

//#endregion
export { generateLicenseFile };