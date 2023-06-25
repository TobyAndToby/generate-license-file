import { ConfigSchema, parseSchema } from "./schema";
import { doesFileExist } from "../../utils/file.utils";
import { findConfig, loadConfig } from "./configFile";

export const loadConfigFile = async (path?: string): Promise<ConfigSchema> => {
  if (!path) {
    path = process.cwd();
  }

  const fileExists = await doesFileExist(path);

  const config = await (fileExists ? loadConfig(path) : findConfig(path));

  return parseSchema(config);
};
