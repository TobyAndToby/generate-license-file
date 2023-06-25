import { ConfigSchema, parseSchema } from "./schema";
import { doesFileExist } from "../../utils/file.utils";
import { ConfigFile, findConfig, loadConfig } from "./configFile";
import { dirname, isAbsolute, join } from "path";

export const loadConfigFile = async (path?: string): Promise<ConfigSchema> => {
  if (path && (await doesFileExist(path))) {
    return loadAndParseConfig(path);
  } else if (path) {
    // TODO Should this be nicer? (yes).
    throw new Error("Config file could not be found.");
  }

  return findAndParseConfig(process.cwd());
};

const findAndParseConfig = async (directory: string): Promise<ConfigSchema> => {
  const configFile = await findConfig(directory);

  return parseConfig(configFile, directory);
};

const loadAndParseConfig = async (filePath: string) => {
  const configFile = await loadConfig(filePath);
  const directory = dirname(filePath);

  return parseConfig(configFile, directory);
};

const parseConfig = (configFile: ConfigFile | undefined, directory: string): ConfigSchema => {
  const config = parseSchema(configFile?.config);

  if (config === undefined) {
    return;
  }

  for (const replacement in config?.replace) {
    const replacementPath = config.replace[replacement];

    if (isAbsolute(replacementPath)) {
      continue;
    }

    const absolutePath = join(directory, replacementPath);
    config.replace[replacement] = absolutePath;
  }

  return config;
};
