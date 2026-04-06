import { readFile } from "../../utils/file.utils.mjs";
import consoleUtils from "../../utils/console.utils.mjs";
import { extname, relative } from "path";
import { glob } from "glob";

//#region src/lib/internal/resolveLicenseContent/licenseFile.ts
const extensionDenyList = [
	".js",
	".ts",
	".sh",
	".ps1"
];
const licenseFile = async (inputs) => {
	const { directory, packageJson } = inputs;
	const filteredLicenseFiles = (await glob("{license,licence,copying}{,-*,.*}", {
		nocase: true,
		nodir: true,
		absolute: true,
		cwd: directory,
		maxDepth: 1
	})).filter((file) => !extensionDenyList.includes(extname(file)));
	if (filteredLicenseFiles.length === 0) return null;
	if (filteredLicenseFiles.length > 1) {
		const relativeLicenseFiles = filteredLicenseFiles.map((file) => ` - ./${relative(directory, file)}`);
		const warningLines = [
			`Found multiple license files for ${packageJson.name}@${packageJson.version}:`,
			...relativeLicenseFiles,
			"We suggest you determine which file you wish to use and replace the license content",
			`for ${packageJson.name}@${packageJson.version} using a generate-license-file config file.`,
			"See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
			""
		];
		consoleUtils.warn(warningLines.join("\n"));
	}
	return await readFile(filteredLicenseFiles[0], { encoding: "utf-8" });
};

//#endregion
export { licenseFile };