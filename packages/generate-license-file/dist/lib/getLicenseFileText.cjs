const require_runtime = require('../_virtual/_rolldown/runtime.cjs');
const require_resolveLicenses = require('./internal/resolveLicenses.cjs');
const require_lineEndings = require('./lineEndings.cjs');
const require_string_utils = require('./utils/string.utils.cjs');
const require_license = require('./models/license.cjs');
let fs_promises = require("fs/promises");

//#region src/lib/getLicenseFileText.ts
const SUFFIX = "-----------";
const CREDIT1 = "This file was generated with the generate-license-file npm package!";
const CREDIT2 = "https://www.npmjs.com/package/generate-license-file";
async function getLicenseFileText(pathsToPackageJsons, options) {
	if (typeof pathsToPackageJsons === "string") pathsToPackageJsons = [pathsToPackageJsons];
	const EOL = require_lineEndings.getLineEndingCharacters(options?.lineEnding);
	const credit = getCredit(EOL);
	const sortedLicenses = (await require_resolveLicenses.resolveLicenses(pathsToPackageJsons, options)).sort((a, b) => a.licenseContent.localeCompare(b.licenseContent));
	let licenseFile = credit + EOL + EOL;
	for (const resolvedLicense of sortedLicenses) {
		const dependencies = resolvedLicense.dependencies.map((dep) => {
			if (options?.omitVersions) return dep.name;
			return `${dep.name}@${dep.version ?? "unknown"}`;
		});
		const license = new require_license.License(resolvedLicense.licenseContent, resolvedLicense.notices, dependencies);
		licenseFile += license.format(EOL) + EOL + EOL + SUFFIX + EOL + EOL;
	}
	for (const appendixFilePath of options?.append ?? []) {
		const formattedAppendixContent = require_string_utils.prepareContentForOutput(await (0, fs_promises.readFile)(appendixFilePath, { encoding: "utf-8" }), EOL);
		licenseFile += formattedAppendixContent + EOL + EOL + SUFFIX + EOL + EOL;
	}
	licenseFile += credit + EOL;
	return licenseFile;
}
const getCredit = (EOL) => CREDIT1 + EOL + CREDIT2;

//#endregion
exports.getLicenseFileText = getLicenseFileText;