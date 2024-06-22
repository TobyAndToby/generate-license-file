import { dirname, isAbsolute, join } from "path";
import { doesFileExist } from "../../utils/file.utils";
import { ConfigFile, findConfig, loadConfig } from "./configFile";
import { ConfigSchema, parseSchema } from "./schema";

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

  return await parseConfig(configFile, directory);
};

const loadAndParseConfig = async (filePath: string) => {
  const configFile = await loadConfig(filePath);
  const directory = dirname(filePath);

  return await parseConfig(configFile, directory);
};

const parseConfig = async (
  configFile: ConfigFile | undefined,
  directory: string,
): Promise<ConfigSchema> => {
  const config = parseSchema(configFile?.config);

  if (config === undefined) {
    return;
  }

  for (const replacement in config?.replace) {
    const replacementPath = config.replace[replacement];

    // The replacement value could be multiple things (e.g. file path, or a
    // URL). If it's a file path, then at this stage the CLI is aware of the
    // execution directory and needs to make the path absolute before handing
    // it off to the library implementation. Otherwise, pass the raw replacement
    // value into the library so it can handle it however it wants.
    const absolutePath = join(directory, replacementPath);

    if (await doesFileExist(absolutePath)) {
      config.replace[replacement] = absolutePath;
    }
  }

  if (config.append) {
    for (let i = 0; i < config.append.length; i++) {
      const appendixPath = config.append[i];
      if (isAbsolute(appendixPath)) {
        continue;
      }

      const absolutePath = join(directory, appendixPath);
      config.append[i] = absolutePath;
    }
  }

  return config;
};
