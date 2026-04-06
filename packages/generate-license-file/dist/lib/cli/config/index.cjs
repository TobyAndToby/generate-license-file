const require_runtime = require('../../../_virtual/_rolldown/runtime.cjs');
const require_file_utils = require('../../utils/file.utils.cjs');
const require_configFile = require('./configFile.cjs');
const require_schema = require('./schema.cjs');
let path = require("path");

//#region src/lib/cli/config/index.ts
const loadConfigFile = async (path$1) => {
	if (path$1 && await require_file_utils.doesFileExist(path$1)) return loadAndParseConfig(path$1);
	else if (path$1) throw new Error("Config file could not be found.");
	return findAndParseConfig(process.cwd());
};
const findAndParseConfig = async (directory) => {
	return await parseConfig(await require_configFile.findConfig(directory), directory);
};
const loadAndParseConfig = async (filePath) => {
	return await parseConfig(await require_configFile.loadConfig(filePath), (0, path.dirname)(filePath));
};
const parseConfig = async (configFile, directory) => {
	const config = require_schema.parseSchema(configFile?.config);
	if (config === void 0) return;
	for (const replacement in config?.replace) {
		const replacementPath = config.replace[replacement];
		const absolutePath = (0, path.join)(directory, replacementPath);
		if (await require_file_utils.doesFileExist(absolutePath)) config.replace[replacement] = absolutePath;
	}
	if (config.append) for (let i = 0; i < config.append.length; i++) {
		const appendixPath = config.append[i];
		if ((0, path.isAbsolute)(appendixPath)) continue;
		const absolutePath = (0, path.join)(directory, appendixPath);
		config.append[i] = absolutePath;
	}
	return config;
};

//#endregion
exports.loadConfigFile = loadConfigFile;