import { doesFileExist } from "../../utils/file.utils.mjs";
import { findConfig, loadConfig } from "./configFile.mjs";
import { parseSchema } from "./schema.mjs";
import { dirname, isAbsolute, join } from "path";

//#region src/lib/cli/config/index.ts
const loadConfigFile = async (path) => {
	if (path && await doesFileExist(path)) return loadAndParseConfig(path);
	else if (path) throw new Error("Config file could not be found.");
	return findAndParseConfig(process.cwd());
};
const findAndParseConfig = async (directory) => {
	return await parseConfig(await findConfig(directory), directory);
};
const loadAndParseConfig = async (filePath) => {
	return await parseConfig(await loadConfig(filePath), dirname(filePath));
};
const parseConfig = async (configFile, directory) => {
	const config = parseSchema(configFile?.config);
	if (config === void 0) return;
	for (const replacement in config?.replace) {
		const replacementPath = config.replace[replacement];
		const absolutePath = join(directory, replacementPath);
		if (await doesFileExist(absolutePath)) config.replace[replacement] = absolutePath;
	}
	if (config.append) for (let i = 0; i < config.append.length; i++) {
		const appendixPath = config.append[i];
		if (isAbsolute(appendixPath)) continue;
		const absolutePath = join(directory, appendixPath);
		config.append[i] = absolutePath;
	}
	return config;
};

//#endregion
export { loadConfigFile };