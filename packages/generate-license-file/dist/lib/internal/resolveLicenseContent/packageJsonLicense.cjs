const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
const require_file_utils = require('../../utils/file.utils.cjs');
const require_console_utils = require('../../utils/console.utils.cjs');
let path = require("path");
let fs_promises = require("fs/promises");

//#region src/lib/internal/resolveLicenseContent/packageJsonLicense.ts
const packageJsonLicense = async (inputs) => {
	const { packageJson, directory } = inputs;
	const { license, licenses } = packageJson;
	if (typeof license === "string") return parseStringLicense(license, directory);
	if (Array.isArray(license)) return parseArrayLicense(license, packageJson);
	if (typeof license === "object") return parseObjectLicense(license);
	if (Array.isArray(licenses)) return parseArrayLicense(licenses, packageJson);
	return null;
};
const parseStringLicense = async (spdxExpression, directory) => {
	if (!spdxExpression) return null;
	const lowerCaseExpression = spdxExpression.toLowerCase();
	if (lowerCaseExpression.startsWith("http") || lowerCaseExpression.startsWith("www")) return spdxExpression;
	if (!lowerCaseExpression.startsWith("see license in ")) return null;
	const licenseFilePath = sanitise(spdxExpression.substring(15));
	if (licenseFilePath.startsWith("http") || licenseFilePath.startsWith("www")) return spdxExpression;
	return await readLicenseFromDisk(directory, licenseFilePath);
};
const sanitise = (str) => str.replace(/['"<>]/g, "");
const readLicenseFromDisk = async (dir, path$1) => {
	const absolutePath = (0, path.join)(dir, path$1);
	if (!await require_file_utils.doesFileExist(absolutePath)) {
		require_console_utils.default.warn(`Could not find license file '${absolutePath}'`);
		return null;
	}
	try {
		return await (0, fs_promises.readFile)(absolutePath, { encoding: "utf-8" });
	} catch (e) {
		require_console_utils.default.warn(`Could not read license file '${absolutePath}'`);
		return null;
	}
};
const parseArrayLicense = (license, packageJson) => {
	if (license.length === 0) return null;
	if (license.length === 1) return parseObjectLicense(license[0]);
	const warningLines = [
		`The license key for ${packageJson.name}@${packageJson.version} contains multiple licenses`,
		"We suggest you determine which license applies to your project and replace the license content",
		`for ${packageJson.name}@${packageJson.version} using a generate-license-file config file.`,
		"See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
		""
	];
	require_console_utils.default.warn(warningLines.join("\n"));
	return parseObjectLicense(license[0]);
};
const parseObjectLicense = (license) => {
	if (!license.url) return null;
	return license.url;
};

//#endregion
exports.packageJsonLicense = packageJsonLicense;