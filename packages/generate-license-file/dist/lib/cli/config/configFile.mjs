import { json5Parse } from "./parsers/json5.mjs";
import { cosmiconfig } from "cosmiconfig";

//#region src/lib/cli/config/configFile.ts
const json5Loader = (_filepath, content) => json5Parse(content);
const loadConfig = async (filePath) => {
	const result = await cosmiconfig("generate-license-file", { loaders: {
		".json": json5Loader,
		".jsonc": json5Loader,
		".json5": json5Loader
	} }).load(filePath);
	if (result !== null && !result?.isEmpty) return {
		path: result.filepath,
		config: result.config
	};
};
const moduleNames = [
	"glf",
	"glfrc",
	"generatelicensefile",
	"generatelicensefilerc"
];
const generateSearchPlaces = (moduleName) => [
	`.${moduleName}`,
	`.${moduleName}.json`,
	`.${moduleName}.jsonc`,
	`.${moduleName}.json5`,
	`.${moduleName}.yaml`,
	`.${moduleName}.yml`,
	`.${moduleName}.js`,
	`.${moduleName}.cjs`,
	`.config/${moduleName}`,
	`.config/${moduleName}.json`,
	`.config/${moduleName}.jsonc`,
	`.config/${moduleName}.json5`,
	`.config/${moduleName}.yaml`,
	`.config/${moduleName}.yml`,
	`.config/${moduleName}.js`,
	`.config/${moduleName}.cjs`,
	`${moduleName}.config.js`,
	`${moduleName}.config.cjs`
];
const searchPlaces = ["package.json"];
for (const moduleName of moduleNames) searchPlaces.push(...generateSearchPlaces(moduleName));
const findConfig = async (directory) => {
	const result = await cosmiconfig("generate-license-file", {
		stopDir: directory,
		loaders: {
			".json": json5Loader,
			".jsonc": json5Loader,
			".json5": json5Loader
		},
		searchPlaces
	}).search(directory);
	if (result !== null && !result?.isEmpty) return {
		path: result.filepath,
		config: result.config
	};
};

//#endregion
export { findConfig, loadConfig };