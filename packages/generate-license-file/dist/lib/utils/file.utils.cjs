const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
let path = require("path");
let fs_promises = require("fs/promises");
fs_promises = require_runtime.__toESM(fs_promises);

//#region src/lib/utils/file.utils.ts
const UTF8 = "utf-8";
async function doesFileExist(path$1) {
	try {
		return (await fs_promises.default.stat(path$1)).isFile();
	} catch {
		return false;
	}
}
async function doesFolderExist(path$2) {
	try {
		return (await fs_promises.default.stat(path$2)).isDirectory();
	} catch {
		return false;
	}
}
async function writeFileAsync(filePath, content) {
	const directory = (0, path.dirname)(filePath);
	if (!await doesFolderExist(directory)) await fs_promises.default.mkdir(directory, { recursive: true });
	return await fs_promises.default.writeFile(filePath, content, { encoding: UTF8 });
}

//#endregion
exports.doesFileExist = doesFileExist;
exports.writeFileAsync = writeFileAsync;