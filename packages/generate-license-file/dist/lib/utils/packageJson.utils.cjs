const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
const require_file_utils = require('./file.utils.cjs');
let fs_promises = require("fs/promises");

//#region src/lib/utils/packageJson.utils.ts
var PackageJson = class {
	_identifier;
	constructor(name, version, license, licenses) {
		this.name = name;
		this.version = version;
		this.license = license;
		this.licenses = licenses;
	}
	get identifier() {
		return this._identifier ??= `${this.name ?? "unknown"}@${this.version ?? "unknown"}`;
	}
};
var PackageJsonNotFoundError = class extends Error {};
const readPackageJson = async (pathToPackageJson) => {
	if (!await require_file_utils.doesFileExist(pathToPackageJson)) throw new PackageJsonNotFoundError(`Cannot find the file: '${pathToPackageJson}'`);
	const packageJsonAsString = await (0, fs_promises.readFile)(pathToPackageJson, { encoding: "utf-8" });
	const packageJsonData = JSON.parse(packageJsonAsString);
	return new PackageJson(packageJsonData.name, packageJsonData.version, packageJsonData.license, packageJsonData.licenses);
};
const maybeReadPackageJson = async (pathToPackageJson) => {
	try {
		return await readPackageJson(pathToPackageJson);
	} catch (error) {
		if (error instanceof PackageJsonNotFoundError) return null;
		throw error;
	}
};

//#endregion
exports.maybeReadPackageJson = maybeReadPackageJson;
exports.readPackageJson = readPackageJson;