const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
const require_console_utils = require('../../utils/console.utils.cjs');
let path = require("path");
let glob = require("glob");
let fs_promises = require("fs/promises");

//#region src/lib/internal/resolveLicenseContent/licenseFile.ts
const extensionDenyList = [
	".js",
	".ts",
	".sh",
	".ps1"
];
const licenseFile = async (inputs) => {
	const { directory, packageJson } = inputs;
	const filteredLicenseFiles = (await (0, glob.glob)("{license,licence,copying}{,-*,.*}", {
		nocase: true,
		nodir: true,
		absolute: true,
		cwd: directory,
		maxDepth: 1
	})).filter((file) => !extensionDenyList.includes((0, path.extname)(file)));
	if (filteredLicenseFiles.length === 0) return null;
	if (filteredLicenseFiles.length > 1) {
		const relativeLicenseFiles = filteredLicenseFiles.map((file) => ` - ./${(0, path.relative)(directory, file)}`);
		const warningLines = [
			`Found multiple license files for ${packageJson.name}@${packageJson.version}:`,
			...relativeLicenseFiles,
			"We suggest you determine which file you wish to use and replace the license content",
			`for ${packageJson.name}@${packageJson.version} using a generate-license-file config file.`,
			"See: https://generate-license-file.js.org/docs/cli/config-file for more information.",
			""
		];
		require_console_utils.default.warn(warningLines.join("\n"));
	}
	return await (0, fs_promises.readFile)(filteredLicenseFiles[0], { encoding: "utf-8" });
};

//#endregion
exports.licenseFile = licenseFile;