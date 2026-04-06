import { readFile } from "./utils/file.utils.mjs";
import { resolveLicenses } from "./internal/resolveLicenses.mjs";
import { getLineEndingCharacters } from "./lineEndings.mjs";
import { prepareContentForOutput } from "./utils/string.utils.mjs";
import { License } from "./models/license.mjs";

//#region src/lib/getLicenseFileText.ts
const SUFFIX = "-----------";
const CREDIT1 = "This file was generated with the generate-license-file npm package!";
const CREDIT2 = "https://www.npmjs.com/package/generate-license-file";
async function getLicenseFileText(pathsToPackageJsons, options) {
	if (typeof pathsToPackageJsons === "string") pathsToPackageJsons = [pathsToPackageJsons];
	const EOL = getLineEndingCharacters(options?.lineEnding);
	const credit = getCredit(EOL);
	const sortedLicenses = (await resolveLicenses(pathsToPackageJsons, options)).sort((a, b) => a.licenseContent.localeCompare(b.licenseContent));
	let licenseFile = credit + EOL + EOL;
	for (const resolvedLicense of sortedLicenses) {
		const dependencies = resolvedLicense.dependencies.map((dep) => {
			if (options?.omitVersions) return dep.name;
			return `${dep.name}@${dep.version ?? "unknown"}`;
		});
		const license = new License(resolvedLicense.licenseContent, resolvedLicense.notices, dependencies);
		licenseFile += license.format(EOL) + EOL + EOL + SUFFIX + EOL + EOL;
	}
	for (const appendixFilePath of options?.append ?? []) {
		const formattedAppendixContent = prepareContentForOutput(await readFile(appendixFilePath, { encoding: "utf-8" }), EOL);
		licenseFile += formattedAppendixContent + EOL + EOL + SUFFIX + EOL + EOL;
	}
	licenseFile += credit + EOL;
	return licenseFile;
}
const getCredit = (EOL) => CREDIT1 + EOL + CREDIT2;

//#endregion
export { getLicenseFileText };