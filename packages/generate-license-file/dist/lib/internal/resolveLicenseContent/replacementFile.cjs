const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
const require_file_utils = require('../../utils/file.utils.cjs');
let fs_promises = require("fs/promises");

//#region src/lib/internal/resolveLicenseContent/replacementFile.ts
const replacementFile = async (location) => {
	if (!await require_file_utils.doesFileExist(location)) return null;
	return (0, fs_promises.readFile)(location, { encoding: "utf-8" });
};

//#endregion
exports.replacementFile = replacementFile;